// controllers/ipfs.controller.js
import ipfs from '../utils/ipfs.js';  // Assurez-vous que le module ipfs.js est correctement configuré

// Fonction pour uploader un fichier ou du texte vers IPFS
export const uploadToIPFS = async (req, res) => {
  try {
    // Vérification si un fichier est envoyé ou si du texte est fourni
    const content = req.file 
      ? req.file.buffer  // Si un fichier est envoyé, on utilise le buffer du fichier
      : Buffer.from(req.body.text || '');  // Sinon, on récupère le texte envoyé

    // Ajout du contenu à IPFS
    const { cid } = await ipfs.add(content);  // Ajout du contenu à IPFS
    res.json({ success: true, cid: cid.toString() });  // Envoie la réponse avec le CID du contenu
  } catch (err) {
    res.status(500).json({ error: err.message });  // En cas d'erreur, retourne un message d'erreur
  }
};

// Fonction pour récupérer un fichier ou du texte depuis IPFS via un CID
export const getFromIPFS = async (req, res) => {
  try {
    const { cid } = req.params;  // Récupère le CID depuis les paramètres de la requête
    const chunks = [];  // Tableau pour stocker les morceaux du fichier

    // Utilisation de l'API `cat` pour récupérer les morceaux du fichier
    for await (const chunk of ipfs.cat(cid)) {
      chunks.push(chunk);  // Ajouter chaque morceau au tableau
    }

    // Concaténer les morceaux pour obtenir le contenu complet et le convertir en chaîne
    const content = Buffer.concat(chunks).toString();  
    res.send(content);  // Envoie le contenu récupéré à l'utilisateur
  } catch (err) {
    res.status(500).json({ error: err.message });  // En cas d'erreur, retourne un message d'erreur
  }
};
