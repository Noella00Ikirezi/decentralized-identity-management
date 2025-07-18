// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract IdentityManager {
    struct IPFSDocument {
        string cid;
        string mimeType;
        string title;
        string docType;
        uint256 uploadedAt;
        bool revoked;
    }

    struct SharedAccess {
        address sharedWith;
        uint256 expiresAt;
        bool revoked;
    }

    mapping(address => IPFSDocument[]) public userDocuments;
    mapping(address => mapping(uint => SharedAccess[])) public sharedDocuments;

    event DocumentAdded(address indexed owner, uint indexed docId, string cid);
    event DocumentRevoked(address indexed owner, uint indexed docId);
    event DocumentShared(address indexed owner, uint indexed docId, address sharedWith, uint expiresAt);
    event DocumentShareRevoked(address indexed owner, uint indexed docId, address sharedWith);

    // Ajouter un document IPFS
    function addDocument(string memory cid, string memory mimeType, string memory title, string memory docType) public {
        IPFSDocument memory doc = IPFSDocument({
            cid: cid,
            mimeType: mimeType,
            title: title,
            docType: docType,
            uploadedAt: block.timestamp,
            revoked: false
        });

        userDocuments[msg.sender].push(doc);
        emit DocumentAdded(msg.sender, userDocuments[msg.sender].length - 1, cid);
    }

    // Récupérer tous les documents d'un utilisateur
    function getMyDocuments() external view returns (IPFSDocument[] memory) {
        return userDocuments[msg.sender];
    }

    // Révoquer un document
    function revokeDocument(uint docId) external {
        require(docId < userDocuments[msg.sender].length, "Invalid docId");
        userDocuments[msg.sender][docId].revoked = true;
        emit DocumentRevoked(msg.sender, docId);
    }

    // Partager un document avec un autre utilisateur pour une durée
    function shareDocument(uint docId, address recipient, uint duration) external {
        require(docId < userDocuments[msg.sender].length, "Invalid docId");
        IPFSDocument storage doc = userDocuments[msg.sender][docId];
        require(!doc.revoked, "Document is revoked");

        sharedDocuments[msg.sender][docId].push(SharedAccess({
            sharedWith: recipient,
            expiresAt: block.timestamp + duration,
            revoked: false
        }));

        emit DocumentShared(msg.sender, docId, recipient, block.timestamp + duration);
    }

    // Révoquer un partage actif
    function revokeSharedAccess(uint docId, address recipient) external {
        SharedAccess[] storage shares = sharedDocuments[msg.sender][docId];
        for (uint i = 0; i < shares.length; i++) {
            if (shares[i].sharedWith == recipient && !shares[i].revoked) {
                shares[i].revoked = true;
                emit DocumentShareRevoked(msg.sender, docId, recipient);
                return;
            }
        }
        revert("No active share found");
    }

    // Vérifie si un utilisateur a accès à un document
    function canAccess(address owner, uint docId) external view returns (bool) {
        if (msg.sender == owner) return true;
        SharedAccess[] storage shares = sharedDocuments[owner][docId];
        for (uint i = 0; i < shares.length; i++) {
            if (
                shares[i].sharedWith == msg.sender &&
                !shares[i].revoked &&
                block.timestamp < shares[i].expiresAt
            ) {
                return true;
            }
        }
        return false;
    }

    // Liste des partages actifs pour un document
    function getSharedAccesses(uint docId) external view returns (SharedAccess[] memory) {
        return sharedDocuments[msg.sender][docId];
    }
}
