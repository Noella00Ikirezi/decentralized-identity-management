// SPDX-License-Identifier: MIT
pragma solidity ^0.5.0;
pragma experimental ABIEncoderV2;

contract DocumentStore {
    struct Document {
        string cid;
        string title;
    }

    struct ShareLog {
        address from;
        address to;
        uint docIndex;
        uint timestamp;
        bool revoked;
    }

    ShareLog[] public shareLogs;

    mapping(address => Document[]) private userDocuments;

    event DocumentAdded(address indexed user, string cid, string title);
    event DocumentShared(address indexed from, address indexed to, uint docIndex);
    event AccessRevoked(address indexed from, address indexed to, uint docIndex);

    // 📥 Ajouter un document
    function addDocument(string memory _cid, string memory _title) public {
        require(bytes(_cid).length > 0, "CID requis");
        require(bytes(_title).length > 0, "Titre requis");
        userDocuments[msg.sender].push(Document(_cid, _title));
        emit DocumentAdded(msg.sender, _cid, _title);
    }

    // 📚 Voir ses documents
    function getDocumentCount() public view returns (uint) {
        return userDocuments[msg.sender].length;
    }

    function getDocumentByIndex(uint index) public view returns (string memory cid, string memory title) {
        require(index < userDocuments[msg.sender].length, "Index invalide");
        Document memory doc = userDocuments[msg.sender][index];
        return (doc.cid, doc.title);
    }

    // 🔗 Partage simplifié
    mapping(address => mapping(address => mapping(uint => bool))) public sharedAccess;

    function shareDocument(address to, uint docIndex) public {
        require(docIndex < userDocuments[msg.sender].length, "Index invalide");
        sharedAccess[msg.sender][to][docIndex] = true;
        shareLogs.push(ShareLog(msg.sender, to, docIndex, now, false));
        emit DocumentShared(msg.sender, to, docIndex);
    }

    function revokeAccess(address to, uint docIndex) public {
        require(docIndex < userDocuments[msg.sender].length, "Index invalide");
        sharedAccess[msg.sender][to][docIndex] = false;
        shareLogs.push(ShareLog(msg.sender, to, docIndex, now, true));
        emit AccessRevoked(msg.sender, to, docIndex);
    }

    // 🔍 Obtenir tous les logs de partage
    function getShareLogCount() public view returns (uint) {
    return shareLogs.length;
    }

    function getShareLogByIndex(uint index) public view returns (
        address from,
        address to,
        uint docIndex,
        uint timestamp,
        bool revoked
    ) {
        require(index < shareLogs.length, "Index invalide");
        ShareLog memory log = shareLogs[index];
        return (log.from, log.to, log.docIndex, log.timestamp, log.revoked);
    }


    function canAccess(address owner, uint docIndex) public view returns (bool) {
        return sharedAccess[owner][msg.sender][docIndex];
    }

    function getDocumentByIndexFrom(address owner, uint index) public view returns (string memory cid, string memory title) {
        require(index < userDocuments[owner].length, "Index invalide");
        Document memory doc = userDocuments[owner][index];
        return (doc.cid, doc.title);
    }
}
