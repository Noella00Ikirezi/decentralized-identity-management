import { create } from 'kubo-rpc-client';
import dotenv from 'dotenv';

dotenv.config();

// Vérification des variables d'environnement
if (!process.env.IPFS_HOST || !process.env.IPFS_PORT || !process.env.IPFS_PROTOCOL) {
  console.error("IPFS configuration manquante dans les variables d'environnement");
  process.exit(1);  // Arrêter le processus si la configuration est manquante
}

// Création du client IPFS avec les variables d'environnement
const ipfs = create({
  host: process.env.IPFS_HOST || 'localhost',
  port: process.env.IPFS_PORT || '5001',
  protocol: process.env.IPFS_PROTOCOL || 'http',
});

// Vérification de la connexion IPFS
const checkConnection = async () => {
  try {
    const id = await ipfs.id(); // Vérifie si IPFS est connecté en récupérant l'identifiant du nœud
    console.log("Connecté à IPFS avec l'ID :", id.id);
  } catch (err) {
    console.error("Erreur lors de la connexion à IPFS :", err.message);
    process.exit(1);  // Arrêter le processus si la connexion échoue
  }
};

checkConnection();  // Tester la connexion

export default ipfs;  // Exporter le client IPFS
