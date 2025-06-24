// backend/controllers/ipfs.controller.js
import pinata from '../utils/pinata.js';
import { contract } from '../utils/ethereum.js';
import { fileTypeFromBuffer } from 'file-type';
import { Buffer } from 'buffer';

// ✅ Upload vers Pinata + enregistrement sur le smart contract
export const uploadToIPFSAndLink = async (req, res) => {
  try {
    const { address, content } = req.body; // expiresIn supprimé
    const { file } = req;

    let buffer;
    if (file) {
      buffer = file.buffer;
    } else if (content) {
      buffer = Buffer.from(content);
    } else {
      return res.status(400).json({ error: 'Aucun fichier ni contenu texte fourni' });
    }

    const fileType = await fileTypeFromBuffer(buffer);
    const mimeType = fileType?.mime || 'application/octet-stream';

    const metadata = {
      name: 'dims-file',
    };

    // 📤 Envoi vers Pinata
    const result = await pinata.pinFileToIPFS(buffer, metadata);
    const cid = result.IpfsHash;

    console.log("✅ Fichier uploadé sur IPFS (Pinata):", cid);

    // ⛓ Enregistrement du CID + MIME sur le smart contract (sans expiration)
    const tx = await contract.connect(contract.signer).addDocument(cid, mimeType);
    await tx.wait();

    res.json({
      success: true,
      cid,
      type: mimeType,
      size: buffer.length,
      txHash: tx.hash,
      base64: buffer.toString('base64')
    });
  } catch (err) {
    console.error('❌ Erreur lors de l’upload & lien Pinata + blockchain :', err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Liste des documents liés à une adresse
export const getDocuments = async (req, res) => {
  try {
    const { address } = req.params;
    const docs = await contract.connect(contract.signer).getMyDocuments({ from: address });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Récupération d’un fichier IPFS via CID
export const getFromIPFS = async (req, res) => {
  try {
    const { cid } = req.params;
    const url = `https://gateway.pinata.cloud/ipfs/${cid}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Échec du téléchargement depuis IPFS: ${response.statusText}`);
    }

    const content = Buffer.from(await response.arrayBuffer());
    const fileType = await fileTypeFromBuffer(content);
    const mimeType = fileType?.mime || 'text/plain';

    res.setHeader('Content-Type', mimeType);
    res.send(content);
  } catch (err) {
    console.error('❌ Erreur IPFS get:', err);
    res.status(500).json({ error: 'Impossible de récupérer le fichier' });
  }
};

// ✅ Révocation d’un document IPFS dans le smart contract
export const revokeDocument = async (req, res) => {
  try {
    const { docId } = req.body;
    const tx = await contract.connect(contract.signer).revokeDocument(parseInt(docId));
    await tx.wait();
    res.json({ success: true, txHash: tx.hash });
  } catch (err) {
    console.error('❌ Erreur lors de la révocation du document :', err);
    res.status(500).json({ error: err.message });
  }
};
