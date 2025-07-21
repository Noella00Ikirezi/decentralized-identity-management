// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
pragma experimental ABIEncoderV2;

contract IdentityManager {
    enum DelegateType { veriKey, sigAuth, enc }

    struct Delegate {
        bytes32 delegateType;
        uint256 expires;
    }

    struct Attribute {
        bytes value;
        uint256 expires;
    }

    struct IPFSDocument {
        string cid;
        string mimeType;
        string title;
        string docType;
        uint256 uploadedAt;
        uint256 expiresAt;
        bool revoked;
    }

    struct SharedAccess {
        address sharedWith;
        uint256 expiresAt;
        bool revoked;
    }

    mapping(address => address) public owners;
    mapping(address => mapping(address => mapping(bytes32 => Delegate))) public delegates;
    mapping(address => mapping(bytes32 => Attribute)) public attributes;
    mapping(address => IPFSDocument[]) public userDocuments;
    mapping(address => mapping(uint => SharedAccess[])) public sharedDocuments;

    event DIDOwnerChanged(address indexed identity, address owner);
    event DIDDelegateChanged(address indexed identity, bytes32 delegateType, address delegate, uint256 validTo);
    event DIDAttributeChanged(address indexed identity, bytes32 name, bytes value, uint256 validTo);
    event DocumentAdded(address indexed owner, uint indexed docId, string cid);
    event DocumentRevoked(address indexed owner, uint indexed docId);
    event DocumentShared(address indexed owner, uint indexed docId, address sharedWith, uint expiresAt);
    event DocumentShareRevoked(address indexed owner, uint indexed docId, address sharedWith);

    modifier onlyOwner(address identity) {
        require(msg.sender == getOwner(identity), "Not identity owner");
        _;
    }

    function getOwner(address identity) public view returns (address) {
        if (owners[identity] == address(0)) return identity;
        return owners[identity];
    }

    function changeOwner(address identity, address newOwner) external onlyOwner(identity) {
        require(newOwner != address(0), "Invalid new owner");
        owners[identity] = newOwner;
        emit DIDOwnerChanged(identity, newOwner);
    }

    function changeOwnerSigned(address identity, address newOwner, uint8 v, bytes32 r, bytes32 s) external {
        bytes32 hash = createChangeOwnerHash(identity, newOwner);
        bytes32 ethSignedHash = keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", hash)
        );
        address signer = ecrecover(ethSignedHash, v, r, s);
        require(signer == getOwner(identity), "Invalid signature");
        owners[identity] = newOwner;
        emit DIDOwnerChanged(identity, newOwner);
    }

    function createChangeOwnerHash(address identity, address newOwner) public pure returns (bytes32) {
        return keccak256(abi.encodePacked("changeOwner", identity, newOwner));
    }

    function getMyDocuments() external view returns (IPFSDocument[] memory) {
        return userDocuments[msg.sender];
    }

    function getDocument(uint docId) external view returns (IPFSDocument memory) {
        require(docId < userDocuments[msg.sender].length, "Invalid docId");
        return userDocuments[msg.sender][docId];
    }

    function addDocument(
        string memory cid,
        string memory mimeType,
        string memory title,
        string memory docType,
        uint256 expiresIn
    ) public {
        require(bytes(cid).length > 0, "CID manquant");
        require(bytes(mimeType).length > 0, "MIME type manquant");
        require(bytes(title).length > 0, "Titre manquant");
        require(bytes(docType).length > 0, "Type de document manquant");
        require(expiresIn > 0, "Expiration invalide");

        IPFSDocument memory doc = IPFSDocument({
            cid: cid,
            mimeType: mimeType,
            title: title,
            docType: docType,
            uploadedAt: block.timestamp,
            expiresAt: block.timestamp + expiresIn,
            revoked: false
        });

        userDocuments[msg.sender].push(doc);
        emit DocumentAdded(msg.sender, userDocuments[msg.sender].length - 1, cid);
    }

    function revokeDocument(uint docId) external {
        require(docId < userDocuments[msg.sender].length, "Invalid docId");
        IPFSDocument storage doc = userDocuments[msg.sender][docId];
        require(!doc.revoked, "Already revoked");

        doc.revoked = true;
        emit DocumentRevoked(msg.sender, docId);
    }

    function shareDocument(uint docId, address recipient, uint256 duration) external {
        require(recipient != address(0), "Invalid recipient");
        require(duration > 0, "Invalid duration");
        require(docId < userDocuments[msg.sender].length, "Invalid docId");

        IPFSDocument storage doc = userDocuments[msg.sender][docId];
        require(!doc.revoked && block.timestamp < doc.expiresAt, "Document invalid");

        sharedDocuments[msg.sender][docId].push(SharedAccess({
            sharedWith: recipient,
            expiresAt: block.timestamp + duration,
            revoked: false
        }));

        emit DocumentShared(msg.sender, docId, recipient, block.timestamp + duration);
    }

    function revokeSharedAccess(uint docId, address recipient) external {
        SharedAccess[] storage accesses = sharedDocuments[msg.sender][docId];
        for (uint i = 0; i < accesses.length; i++) {
            if (accesses[i].sharedWith == recipient && !accesses[i].revoked) {
                accesses[i].revoked = true;
                emit DocumentShareRevoked(msg.sender, docId, recipient);
                return;
            }
        }
        revert("No active share found");
    }

    function getSharedAccesses(uint docId) external view returns (SharedAccess[] memory) {
        return sharedDocuments[msg.sender][docId];
    }

    function canAccess(address owner, uint docId) external view returns (bool) {
        if (docId >= userDocuments[owner].length) return false;
        IPFSDocument storage doc = userDocuments[owner][docId];

        if (msg.sender == getOwner(owner) && !doc.revoked && block.timestamp < doc.expiresAt) {
            return true;
        }

        SharedAccess[] storage accesses = sharedDocuments[owner][docId];
        for (uint i = 0; i < accesses.length; i++) {
            if (accesses[i].sharedWith == msg.sender && !accesses[i].revoked && block.timestamp < accesses[i].expiresAt) {
                return true;
            }
        }
        return false;
    }

    function addDelegate(address identity, bytes32 delegateType, address delegate, uint256 expiresIn) external onlyOwner(identity) {
        uint256 validTo = block.timestamp + expiresIn;
        delegates[identity][delegate][delegateType] = Delegate(delegateType, validTo);
        emit DIDDelegateChanged(identity, delegateType, delegate, validTo);
    }

    function revokeDelegate(address identity, bytes32 delegateType, address delegate) external onlyOwner(identity) {
        delegates[identity][delegate][delegateType].expires = block.timestamp;
        emit DIDDelegateChanged(identity, delegateType, delegate, block.timestamp);
    }

    function setAttribute(address identity, bytes32 name, bytes calldata value, uint256 expiresIn) external onlyOwner(identity) {
        uint256 validTo = block.timestamp + expiresIn;
        attributes[identity][keccak256(abi.encodePacked(name, value))] = Attribute(value, validTo);
        emit DIDAttributeChanged(identity, name, value, validTo);
    }

    function revokeAttribute(address identity, bytes32 name, bytes calldata value) external onlyOwner(identity) {
        attributes[identity][keccak256(abi.encodePacked(name, value))].expires = block.timestamp;
        emit DIDAttributeChanged(identity, name, value, block.timestamp);
    }
}
