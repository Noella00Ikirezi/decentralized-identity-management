# 📑 Smart Contract : IdentityManager.sol

Ce document présente en détail un smart contract Solidity nommé `IdentityManager.sol`. Ce contrat permet de gérer efficacement et simplement le stockage de documents vérifiés (tels que des bulletins de paie ou cartes étudiantes) sur la blockchain Ethereum en utilisant IPFS comme solution décentralisée de stockage.

## 📌 Code du Smart Contract Solidity (IdentityManager.sol)

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract IdentityManager {
    struct Document {
        string ipfsHash;
        uint256 timestamp;
        string docType;
    }

    mapping(address => Document[]) private documents;

    event DocumentStored(address indexed user, string ipfsHash, string docType, uint256 timestamp);

    function storeDocumentHash(string memory _ipfsHash, string memory _docType) public {
        Document memory newDoc = Document({
            ipfsHash: _ipfsHash,
            timestamp: block.timestamp,
            docType: _docType
        });

        documents[msg.sender].push(newDoc);
        emit DocumentStored(msg.sender, _ipfsHash, _docType, block.timestamp);
    }

    function getMyDocuments() public view returns (Document[] memory) {
        return documents[msg.sender];
    }

    function getMyDocument(uint index) public view returns (Document memory) {
        require(index < documents[msg.sender].length, "Document inexistant");
        return documents[msg.sender][index];
    }

    function getMyDocumentCount() public view returns (uint) {
        return documents[msg.sender].length;
    }
}
```

## ⚙️ Explications détaillées

- **`storeDocumentHash()`** : Permet de stocker un hash IPFS d'un document avec son type associé pour l'utilisateur Ethereum actuel (`msg.sender`).
- **`getMyDocuments()`** : Renvoie la liste complète des documents stockés par l'utilisateur.
- **`getMyDocument()`** : Renvoie un document précis en fonction de l'index spécifié.
- **`getMyDocumentCount()`** : Renvoie le nombre total de documents stockés par l'utilisateur.

## 📖 Cas d'utilisation

- **Cas 1 : Partage de documents (Ex. : Alice)**
  - Alice stocke ses bulletins de paie sur IPFS via l'application backend/frontend.
  - Le backend appelle le contrat Ethereum via `storeDocumentHash` pour enregistrer le hash IPFS.
  - Alice peut partager le hash facilement par QR code.

- **Cas 2 : Vérification rapide (Ex. : Bob)**
  - Bob scanne le QR code pour vérifier rapidement les documents d'Alice.

## 🔑 Événements générés

| Événement           | Description                                                          |
|---------------------|----------------------------------------------------------------------|
| **DocumentStored**  | Notifie chaque fois qu'un nouveau document est stocké sur Ethereum.  |

## 🚀 Déploiement rapide

```bash
truffle compile
truffle migrate --network development
```

L'adresse Ethereum obtenue doit être ajoutée dans le `.env` du backend.

## 🧩 ABI du Contrat

L'ABI générée automatiquement est disponible dans :

```bash
smart-contracts/build/contracts/IdentityManager.json
```

Copiez la partie `abi` dans `backend/abi.json` pour l'intégration backend rapide.

✨ Ce contrat est maintenant prêt à être intégré à votre solution décentralisée !
