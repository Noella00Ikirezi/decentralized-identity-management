# 🚀 Decentralized Identity Management Solution

## 🔖 Description
Ce projet propose une solution complète de gestion d'identité décentralisée (DID) sécurisée sur Ethereum. Il facilite le partage d'identités et documents vérifiés à l'aide d'un simple QR code, adapté à des scénarios comme :

- 📄 Partager rapidement ses derniers bulletins de paie avec un bailleur.
- 🎓 Présenter une carte étudiante numérisée pour bénéficier de réductions dans des commerces.

---

## ✨ Fonctionnalités Principales

- **✅ Identités Numériques Décentralisées (DID) sur Ethereum**
- **✅ Stockage sécurisé des documents via IPFS**
- **✅ Création et partage simplifié de Verifiable Credentials**
- **✅ Génération et validation instantanée via QR codes**

---

## 🛠️ Stack Technique choisie

| Composant               | Technologie choisie           |
|-------------------------|-------------------------------|
| Blockchain              | **Ethereum**                  |
| Smart Contracts         | **Solidity**                  |
| Backend                 | **Node.js (Express)**         |
| Frontend                | **React.js**                  |
| Stockage décentralisé   | **IPFS**                      |
| Génération de QR codes  | **QRCode.js**                 |
| Sécurité                | **JWT, AES, RSA**             |

---

## 📂 Structure du Projet

- **`backend/`**
  - API REST en Node.js (Express)
  - Connexion à Ethereum via Web3.js/Ethers.js
  - Déploiement et gestion des Smart Contracts Solidity
  - Stockage des documents vérifiés sur IPFS

- **`frontend/`**
  - Application React.js
  - Génération et lecture dynamique de QR codes (QRCode.js)
  - Interaction utilisateur simple et intuitive
  - Connexion sécurisée avec le backend

- **`smart-contracts/`**
  - Contrats Solidity pour DID et Verifiable Credentials
  - Scripts de déploiement automatisés (Truffle ou Hardhat)

- **`docs/`**
  - Documentation technique et architecture détaillée
  - Guides utilisateur et développeur

- **`scripts/`**
  - Automatisation des tests et du déploiement

- **`.github/workflows/`**
  - Intégration continue et déploiement automatique via GitHub Actions

---

## 🚧 Installation

Guide complet bientôt disponible dans [`docs/installation.md`](docs/installation.md).

---

## 🌟 Contribution

Les contributions sont les bienvenues !

1. 🍴 Fork le repository  
2. 🌿 Crée ta branche de feature (`git checkout -b feature/ma-nouvelle-feature`)  
3. 💻 Commit tes changements (`git commit -m "Ajout : Ma nouvelle feature"`)  
4. 🚀 Push ta branche (`git push origin feature/ma-nouvelle-feature`)  
5. ✅ Ouvre une Pull Request sur GitHub !

---

## 📜 Licence

Ce projet est sous licence **MIT** — Voir [LICENSE](LICENSE) pour plus de détails.
