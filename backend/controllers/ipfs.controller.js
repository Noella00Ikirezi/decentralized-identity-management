import ipfs from '../utils/ipfs.js';

// Upload un fichier ou du texte vers IPFS
export const uploadToIPFS = async (req, res) => {
  try {
    const content = req.file
      ? req.file.buffer
      : Buffer.from(req.body.text || '');

    const { cid } = await ipfs.add(content);
    res.json({ success: true, cid: cid.toString() });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lire un contenu depuis IPFS via CID
export const getFromIPFS = async (req, res) => {
  try {
    const { cid } = req.params;
    const chunks = [];

    for await (const chunk of ipfs.cat(cid)) {
      chunks.push(chunk);
    }

    const content = Buffer.concat(chunks).toString();
    res.send(content);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
