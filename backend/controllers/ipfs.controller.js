// backend/controllers/ipfs.controller.js
import ipfs from '../utils/ipfs.js';
import { fileTypeFromBuffer } from 'file-type';
import { Buffer } from 'buffer';

// Fonction pour uploader un fichier ou un texte vers IPFS
export const uploadToIPFS = async (req, res) => {
  try {
    const { file } = req;
    const { content } = req.body;

    let buffer;
    if (file) {
      buffer = file.buffer;
    } else if (content) {
      buffer = Buffer.from(content);
    } else {
      return res.status(400).json({ error: 'Aucun fichier ni contenu texte fourni' });
    }

    const fileType = await fileTypeFromBuffer(buffer);
    const result = await ipfs.add(buffer);

    res.json({
      cid: result.cid.toString(),
      size: result.size,
      type: fileType ? fileType.mime : 'unknown',
      base64: buffer.toString('base64')
    });
  } catch (err) {
    console.error('Erreur lors de lupload vers IPFS :', err);
    res.status(500).json({ error: err.message });
  }
};

// Fonction pour récupérer un fichier ou texte depuis IPFS
export const getFromIPFS = async (req, res) => {
  try {
    const { cid } = req.params;
    const chunks = [];

    for await (const chunk of ipfs.cat(cid)) {
      chunks.push(chunk);
    }

    const content = Buffer.concat(chunks);
    const fileType = await fileTypeFromBuffer(content);
    const mimeType = fileType?.mime || 'text/plain';

    res.setHeader('Content-Type', mimeType);
    res.send(content);
  } catch (err) {
    console.error('Erreur IPFS get:', err);
    res.status(500).json({ error: 'Impossible de récupérer le fichier' });
  }
};