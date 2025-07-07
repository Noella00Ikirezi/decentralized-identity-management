// backend/controllers/documents.controller.js

import { create } from 'kubo-rpc-client';
import { contract } from '../utils/ethereum.js';
import { fileTypeFromBuffer } from 'file-type';
import { Buffer } from 'buffer';

const ipfs = create({ url: 'http://127.0.0.1:5001/api/v0' });

// ⬆️ Upload d'un document vers IPFS + enregistrement sur la blockchain
export const uploadDocument = async (req, res) => {
  try {
    console.log('📥 [UPLOAD] Requête reçue');

    const { file } = req;
    if (!file || !file.buffer) {
      console.warn('⚠️ Aucun fichier fourni dans la requête');
      return res.status(400).json({ error: 'Aucun fichier fourni.' });
    }

    const buffer = file.buffer;
    console.log(`📦 Taille du buffer : ${buffer.length} octets`);

    const type = await fileTypeFromBuffer(buffer);
    const mimeType = type?.mime || 'application/octet-stream';
    console.log(`🧾 Type MIME détecté : ${mimeType}`);

    const result = await ipfs.add(buffer);
    const cid = result.cid.toString();
    console.log(`✅ Fichier ajouté à IPFS : ${cid}`);

    const tx = await contract.connect(contract.signer).addDocument(cid, mimeType);
    await tx.wait();
    console.log(`⛓ Document enregistré dans le smart contract : ${tx.hash}`);

    res.json({
      success: true,
      cid,
      mimeType,
      size: buffer.length,
      txHash: tx.hash
    });
  } catch (err) {
    console.error('❌ Erreur lors de l’upload de document :', err);
    res.status(500).json({ error: err.message });
  }
};

// 🔎 Récupération du contenu d'un document par CID
export const getDocument = async (req, res) => {
  try {
    const { cid } = req.params;
    console.log(`📤 [GET] Lecture du document CID: ${cid}`);

    const stream = ipfs.cat(cid);
    const chunks = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }

    const content = Buffer.concat(chunks);
    console.log(`📄 Document récupéré depuis IPFS (${content.length} octets)`);

    const type = await fileTypeFromBuffer(content);
    res.setHeader('Content-Type', type?.mime || 'application/octet-stream');
    res.send(content);
  } catch (err) {
    console.error('❌ Erreur lors de la lecture IPFS :', err);
    res.status(500).json({ error: 'Impossible de lire le fichier IPFS' });
  }
};

// ❌ Révocation d'un document
export const revokeDocument = async (req, res) => {
  try {
    const { docId } = req.body;
    console.log(`🗑️ Révocation du document ID: ${docId}`);

    const tx = await contract.connect(contract.signer).revokeDocument(parseInt(docId));
    await tx.wait();

    console.log(`✅ Document révoqué : TX Hash = ${tx.hash}`);
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    console.error('❌ Erreur lors de la révocation :', err);
    res.status(500).json({ error: err.message });
  }
};

// 📄 Récupération des métadonnées d’un document
export const getDocumentMetadata = async (req, res) => {
  try {
    const { cid } = req.params;
    console.log(`📑 Métadonnées pour CID : ${cid}`);

    const metadata = await contract.getDocumentMetadata(cid);
    console.log('🧾 Métadonnées récupérées :', metadata);

    res.json(metadata);
  } catch (err) {
    console.error('❌ Erreur lors de la récupération des métadonnées :', err);
    res.status(500).json({ error: err.message });
  }
};

// 📂 Liste des documents associés à une adresse
export const getDocumentsByAddress = async (req, res) => {
  try {
    const { address } = req.params;
    console.log(`📂 Récupération des documents pour l'adresse : ${address}`);

    const docs = await contract.getDocumentsByOwner(address);
    console.log(`📋 ${docs.length} document(s) trouvés pour ${address}`);

    res.json(docs);
  } catch (err) {
    console.error('❌ Erreur lors de la récupération des documents :', err);
    res.status(500).json({ error: err.message });
  }
};
