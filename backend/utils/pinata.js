import axios from 'axios';
import FormData from 'form-data';
import dotenv from 'dotenv';
dotenv.config();

const PINATA_BASE_URL = 'https://api.pinata.cloud/pinning';

console.log('📦 Initialisation de l’utilitaire Pinata...');
console.log('🔐 Clé API chargée :', !!process.env.PINATA_API_KEY);
console.log('🔐 Secret chargé :', !!process.env.PINATA_API_SECRET);

const pinFileToIPFS = async (fileBuffer, metadata = {}) => {
  console.log('📁 Étape 1 : Préparation du formulaire avec le fichier...');

  const formData = new FormData();
  formData.append('file', fileBuffer, 'upload.dat');

  console.log('📨 Étape 2 : Envoi de la requête à Pinata...');
  try {
    const res = await axios.post(`${PINATA_BASE_URL}/pinFileToIPFS`, formData, {
      maxBodyLength: Infinity,
      headers: {
        ...formData.getHeaders(),
        pinata_api_key: process.env.PINATA_API_KEY,
        pinata_secret_api_key: process.env.PINATA_API_SECRET,
      }
    });

    console.log('✅ Étape 3 : Réponse reçue depuis Pinata :');
    console.log('➡️ CID :', res.data.IpfsHash);
    console.log('📏 Taille :', res.data.PinSize, 'octets');
    console.log('🕒 Horodatage :', res.data.Timestamp);

    return res.data;
  } catch (err) {
    console.error('❌ Échec de l’envoi vers Pinata :', err.message);
    if (err.response) {
      console.error('🔍 Détails erreur HTTP :', err.response.data);
    }
    throw err;
  }
};

export default { pinFileToIPFS };
