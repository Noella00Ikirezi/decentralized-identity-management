// SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;

contract IdentityManager {
    struct Document {
        string ipfsHash;
        uint256 timestamp;
        string docType;
    }

    struct Profile {
        string email;
        string phoneNumber;
        string ipfsPhoto;
        bool exists;
    }

    struct AccessLog {
        address accessor;
        uint256 timestamp;
        string resourceType; // "document" or "profile"
        string resourceDetail; // docType or "full-profile"
    }

    mapping(address => Profile) private profiles;
    mapping(address => Document[]) private documents;
    mapping(address => mapping(address => bool)) private profileAccess;
    mapping(address => mapping(address => mapping(uint256 => bool))) private documentAccess;
    mapping(address => AccessLog[]) private accessLogs;

    event ProfileCreated(address indexed user);
    event ProfileShared(address indexed from, address indexed to);
    event ProfileAccessRevoked(address indexed from, address indexed to);
    event DocumentStored(address indexed user, string ipfsHash, string docType, uint256 timestamp);
    event DocumentShared(address indexed from, address indexed to, uint index);
    event DocumentAccessRevoked(address indexed from, address indexed to, uint index);
    event AccessLogged(address indexed accessor, string resourceType, string resourceDetail, uint256 timestamp);

    modifier onlyProfileOwner() {
        require(profiles[msg.sender].exists, "Profile does not exist");
        _;
    }

    function createProfile(string memory email, string memory phoneNumber, string memory ipfsPhoto) public {
        require(!profiles[msg.sender].exists, "Profile already exists");
        profiles[msg.sender] = Profile(email, phoneNumber, ipfsPhoto, true);
        emit ProfileCreated(msg.sender);
    }

    function updateProfile(string memory email, string memory phoneNumber, string memory ipfsPhoto) public onlyProfileOwner {
        profiles[msg.sender] = Profile(email, phoneNumber, ipfsPhoto, true);
    }

    function getMyProfile() public view returns (string memory, string memory, string memory) {
        Profile memory p = profiles[msg.sender];
        require(p.exists, "Profile not found");
        return (p.email, p.phoneNumber, p.ipfsPhoto);
    }

    function getProfileOf(address user) public view returns (string memory, string memory, string memory) {
        require(profileAccess[user][msg.sender], "Access denied to profile");
        Profile memory p = profiles[user];
        require(p.exists, "Profile not found");
        return (p.email, p.phoneNumber, p.ipfsPhoto);
    }

    function shareProfileWith(address target) public onlyProfileOwner {
        profileAccess[msg.sender][target] = true;
        emit ProfileShared(msg.sender, target);
    }

    function revokeProfileAccess(address target) public onlyProfileOwner {
        profileAccess[msg.sender][target] = false;
        emit ProfileAccessRevoked(msg.sender, target);
    }

    function hasAccessToProfile(address owner) public view returns (bool) {
        return profileAccess[owner][msg.sender];
    }

    function storeDocumentHash(string memory ipfsHash, string memory docType) public {
        documents[msg.sender].push(Document(ipfsHash, block.timestamp, docType));
        emit DocumentStored(msg.sender, ipfsHash, docType, block.timestamp);
    }

    function getMyDocuments() public view returns (Document[] memory) {
        return documents[msg.sender];
    }

    function getMyDocument(uint index) public view returns (Document memory) {
        require(index < documents[msg.sender].length, "Invalid document index");
        return documents[msg.sender][index];
    }

    function shareDocumentWith(address target, uint index) public {
        require(index < documents[msg.sender].length, "Invalid document index");
        documentAccess[msg.sender][target][index] = true;
        emit DocumentShared(msg.sender, target, index);
    }

    function acceptDocumentShare(address from, uint index) public {
        require(index < documents[from].length, "Invalid document index");
        documentAccess[from][msg.sender][index] = true;
        emit DocumentShared(from, msg.sender, index);
    }

    function revokeDocumentAccess(address target, uint index) public {
        documentAccess[msg.sender][target][index] = false;
        emit DocumentAccessRevoked(msg.sender, target, index);
    }

    function hasAccessToDocument(address owner, uint index) public view returns (bool) {
        return documentAccess[owner][msg.sender][index];
    }

    function getDocumentFrom(address owner, uint index) public view returns (Document memory) {
        require(documentAccess[owner][msg.sender][index], "Access denied");
        Document memory doc = documents[owner][index];
        return doc;
    }

    function logAccess(address accessor, string memory resourceType, string memory resourceDetail) internal {
        accessLogs[accessor].push(AccessLog(accessor, block.timestamp, resourceType, resourceDetail));
        emit AccessLogged(accessor, resourceType, resourceDetail, block.timestamp);
    }

    function getMyAccessLogs() public view returns (AccessLog[] memory) {
        return accessLogs[msg.sender];
    }
}