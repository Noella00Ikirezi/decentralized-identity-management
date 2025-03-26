// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract IdentityManagerWithUpload {

    // Enum for different types of delegates
    enum DelegateType { veriKey, sigAuth, enc }

    // Struct to represent a Delegate with its type and expiration date
    struct Delegate {
        bytes32 delegateType;
        uint256 expires;
    }

    // Struct for storing an Attribute (e.g., email, phone number) and its expiration date
    struct Attribute {
        bytes value;
        uint256 expires;
    }

    // Struct to track the access status of users to a specific document
    struct Access {
        address user; 
        bool access; // true if access is granted, false otherwise
    }

    // Mappings to manage different aspects of identity, documents, and access control
    mapping(address => address) public identityOwners; // Maps an identity to its owner
    mapping(address => mapping(address => mapping(bytes32 => Delegate))) public identityDelegates; // Maps identity to delegates
    mapping(address => mapping(bytes32 => Attribute)) public identityAttributes; // Maps identity to its attributes
    mapping(address => string[]) public documentURLs; // Maps a user to an array of document URLs
    mapping(address => mapping(address => bool)) public ownership; // Tracks document ownership between users
    mapping(address => Access[]) public accessList; // List of users with access to a user's documents
    mapping(address => mapping(address => bool)) public previousAccessRecords; // Tracks previous access for each user

    // Events to log changes to ownership, delegates, and attributes
    event DIDOwnerChanged(address indexed identity, address newOwner);
    event DIDDelegateChanged(address indexed identity, bytes32 delegateType, address delegate, uint256 validTo);
    event DIDAttributeChanged(address indexed identity, bytes32 name, bytes value, uint256 validTo);

    // Modifier to restrict functions to only the identity owner
    modifier onlyOwner(address identity) {
        require(msg.sender == getOwner(identity), "Not the identity owner");
        _;
    }

    // Function to retrieve the current owner of an identity
    function getOwner(address identity) public view returns (address) {
        return identityOwners[identity] == address(0) ? identity : identityOwners[identity];
    }

    // Function to transfer ownership of an identity (only accessible by the current owner)
    function changeOwner(address identity, address newOwner) external onlyOwner(identity) {
        identityOwners[identity] = newOwner;
        emit DIDOwnerChanged(identity, newOwner);
    }

    // Function to add a delegate to an identity (only accessible by the owner)
    function addDelegate(address identity, bytes32 delegateType, address delegate, uint256 expiresIn) external onlyOwner(identity) {
        uint256 validTo = block.timestamp + expiresIn;
        identityDelegates[identity][delegate][delegateType] = Delegate(delegateType, validTo);
        emit DIDDelegateChanged(identity, delegateType, delegate, validTo);
    }

    // Function to revoke a delegate's access to an identity (only accessible by the owner)
    function revokeDelegate(address identity, bytes32 delegateType, address delegate) external onlyOwner(identity) {
        identityDelegates[identity][delegate][delegateType].expires = block.timestamp;
        emit DIDDelegateChanged(identity, delegateType, delegate, block.timestamp);
    }

    // Function to set an attribute for an identity (only accessible by the owner)
    function setAttribute(address identity, bytes32 name, bytes memory attributeValue, uint256 expiresIn) external onlyOwner(identity) {
        uint256 validTo = block.timestamp + expiresIn;
        identityAttributes[identity][keccak256(abi.encodePacked(name, attributeValue))] = Attribute(attributeValue, validTo);
        emit DIDAttributeChanged(identity, name, attributeValue, validTo);
    }

    // Function to revoke an attribute from an identity (only accessible by the owner)
    function revokeAttribute(address identity, bytes32 name, bytes memory attributeValue) external onlyOwner(identity) {
        identityAttributes[identity][keccak256(abi.encodePacked(name, attributeValue))].expires = block.timestamp;
        emit DIDAttributeChanged(identity, name, attributeValue, block.timestamp);
    }

    // Function to add a document URL to a user's document collection
    function addDocument(address user, string memory url) external {
        documentURLs[user].push(url);
    }

    // Function to grant access to documents for a specific user
    function allowAccess(address user) external {
        ownership[msg.sender][user] = true; // Grant access to the user's documents
        if (previousAccessRecords[msg.sender][user]) {
            // If the user had previous access, update their access status
            for (uint i = 0; i < accessList[msg.sender].length; i++) {
                if (accessList[msg.sender][i].user == user) {
                    accessList[msg.sender][i].access = true;
                }
            }
        } else {
            // If the user had no previous access, add them to the access list
            accessList[msg.sender].push(Access(user, true));
            previousAccessRecords[msg.sender][user] = true;
        }
    }

    // Function to revoke access to documents for a specific user
    function disallowAccess(address user) external {
        ownership[msg.sender][user] = false; // Revoke access to the user's documents
        for (uint i = 0; i < accessList[msg.sender].length; i++) {
            if (accessList[msg.sender][i].user == user) {
                accessList[msg.sender][i].access = false; // Remove access for the user
            }
        }
    }

    // Function to display the documents owned by a specific user (with access control)
    function displayDocuments(address user) external view returns (string[] memory) {
        require(user == msg.sender || ownership[user][msg.sender], "You don't have access");
        return documentURLs[user];
    }

    // Function to get the list of users who have access to the calling user's documents
    function shareAccess() external view returns (Access[] memory) {
        return accessList[msg.sender];
    }

    // Helper functions to generate hashes for various operations (for off-chain validation)
    function createChangeOwnerHash(address identity, address newOwner) public pure returns (bytes32) {
        return keccak256(abi.encodePacked("changeOwner", identity, newOwner));
    }

    function createAddDelegateHash(address identity, bytes32 delegateType, address delegate, uint256 expiresIn) public pure returns (bytes32) {
        return keccak256(abi.encodePacked("addDelegate", identity, delegateType, delegate, expiresIn));
    }

    function createRevokeDelegateHash(address identity, bytes32 delegateType, address delegate) public pure returns (bytes32) {
        return keccak256(abi.encodePacked("revokeDelegate", identity, delegateType, delegate));
    }

    function createSetAttributeHash(address identity, bytes32 name, bytes memory attributeValue, uint256 expiresIn) public pure returns (bytes32) {
        return keccak256(abi.encodePacked("setAttribute", identity, name, attributeValue, expiresIn));
    }

    function createRevokeAttributeHash(address identity, bytes32 name, bytes memory attributeValue) public pure returns (bytes32) {
        return keccak256(abi.encodePacked("revokeAttribute", identity, name, attributeValue));
    }

    // Function to get the chain ID (useful for identifying the network the contract is deployed on)
    function getChainId() external view returns (uint256) {
        return block.chainid;
    }
}
