// SPDX-License-Identifier: MIT

pragma solidity >=0.8.21;

// Déclaration du contrat principal
contract IdentityManager {
    // Structure définissant un Document stocké sur IPFS
    struct Document {
        string ipfsHash;   // Hash IPFS du document
        uint256 timestamp; // Timestamp de stockage
        string docType;    // Type du document (ex : "bulletin_paie", "carte_etudiant")
    }

    // Mapping qui relie l'adresse Ethereum à une liste de ses documents
    mapping(address => Document[]) private documents;

    // Évènement déclenché à chaque ajout de document
    event DocumentStored(address indexed user, string ipfsHash, string docType, uint256 timestamp);

    // Fonction pour stocker un nouveau document IPFS
    function storeDocumentHash(string memory _ipfsHash, string memory _docType) public {
        // Création d'une nouvelle instance de Document
        Document memory newDoc = Document({
            ipfsHash: _ipfsHash,
            timestamp: block.timestamp,
            docType: _docType
        });

        // Ajoute le document à la liste correspondant à l'utilisateur (msg.sender)
        documents[msg.sender].push(newDoc);

        // Émet l'évènement de stockage
        emit DocumentStored(msg.sender, _ipfsHash, _docType, block.timestamp);
    }

    // Fonction pour récupérer tous les documents d'un utilisateur
    function getMyDocuments() public view returns (Document[] memory) {
        return documents[msg.sender];
    }

    // Fonction pour récupérer un document spécifique par index
    function getMyDocument(uint index) public view returns (Document memory) {
        require(index < documents[msg.sender].length, "Document inexistant");
        return documents[msg.sender][index];
    }

    // Fonction pour obtenir le nombre total de documents stockés par l'utilisateur
    function getMyDocumentCount() public view returns (uint) {
        return documents[msg.sender].length;
    }
}
