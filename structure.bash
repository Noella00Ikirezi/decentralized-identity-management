/DIMS
├── frontend/
│   ├── src/components/     # Composants React réutilisables
│   ├── src/pages/          # Pages principales (Accueil, Profil, Documents…)
│   ├── services/           # Appels API vers le backend
│   ├── App.jsx, main.jsx   # Entrées de l'application
│   └── index.html, vite.config.js
├── backend/
│   ├── controllers/        # Logiciels de gestion (identité, documents, IPFS)
│   ├── routes/             # Routes Express (REST API)
│   ├── services/           # Intégration Ethereum et IPFS
│   ├── middlewares/        # Authentification, logs, validations
│   ├── .env                # Variables sensibles (clé privée Ganache…)
│   └── index.js            # Entrée principale du serveur
├── smart-contracts/
│   ├── contracts/          # Fichiers Solidity
│   ├── migrations/         # Scripts Truffle
│   ├── build/              # ABI générée automatiquement
│   └── truffle-config.js   # Déploiement local 



| Fonction             | Description                                                |
| -------------------- | ---------------------------------------------------------- |
| `addDocument`        | Ajoute un document IPFS                                    |
| `getMyDocuments`     | Récupère les documents du wallet                           |
| `revokeDocument`     | Révoque un document                                        |
| `shareDocument`      | Partage un document avec expiration                        |
| `revokeSharedAccess` | Révoque un partage actif                                   |
| `canAccess`          | Vérifie si quelqu’un a un accès temporaire                 |
| `getSharedAccesses`  | Affiche toutes les personnes avec qui un doc a été partagé |
