// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

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

    mapping(address => address) public owners;
    mapping(address => mapping(address => mapping(bytes32 => Delegate))) public delegates;
    mapping(address => mapping(bytes32 => Attribute)) public attributes;

    event DIDOwnerChanged(address indexed identity, address owner);
    event DIDDelegateChanged(address indexed identity, bytes32 delegateType, address delegate, uint256 validTo);
    event DIDAttributeChanged(address indexed identity, bytes32 name, bytes value, uint256 validTo);

    modifier onlyOwner(address identity) {
        require(msg.sender == getOwner(identity), "Not identity owner");
        _;
    }

    function getOwner(address identity) public view returns (address) {
        if (owners[identity] == address(0)) return identity;
        return owners[identity];
    }

    function changeOwner(address identity, address newOwner) external onlyOwner(identity) {
        owners[identity] = newOwner;
        emit DIDOwnerChanged(identity, newOwner);
    }

    function changeOwnerSigned(address identity, address newOwner, uint8 v, bytes32 r, bytes32 s) external {
        bytes32 hash = createChangeOwnerHash(identity, newOwner);
        address signer = ecrecover(hash, v, r, s);
        require(signer == getOwner(identity), "Invalid signature");
        owners[identity] = newOwner;
        emit DIDOwnerChanged(identity, newOwner);
    }

    function addDelegate(address identity, bytes32 delegateType, address delegate, uint256 expiresIn) external onlyOwner(identity) {
        uint256 validTo = block.timestamp + expiresIn;
        delegates[identity][delegate][delegateType] = Delegate(delegateType, validTo);
        emit DIDDelegateChanged(identity, delegateType, delegate, validTo);
    }

    function addDelegateSigned(address identity, bytes32 delegateType, address delegate, uint256 expiresIn, uint8 v, bytes32 r, bytes32 s) external {
        bytes32 hash = createAddDelegateHash(identity, delegateType, delegate, expiresIn);
        address signer = ecrecover(hash, v, r, s);
        require(signer == getOwner(identity), "Invalid signature");
        uint256 validTo = block.timestamp + expiresIn;
        delegates[identity][delegate][delegateType] = Delegate(delegateType, validTo);
        emit DIDDelegateChanged(identity, delegateType, delegate, validTo);
    }

    function revokeDelegate(address identity, bytes32 delegateType, address delegate) external onlyOwner(identity) {
        delegates[identity][delegate][delegateType].expires = block.timestamp;
        emit DIDDelegateChanged(identity, delegateType, delegate, block.timestamp);
    }

    function revokeDelegateSigned(address identity, bytes32 delegateType, address delegate, uint8 v, bytes32 r, bytes32 s) external {
        bytes32 hash = createRevokeDelegateHash(identity, delegateType, delegate);
        address signer = ecrecover(hash, v, r, s);
        require(signer == getOwner(identity), "Invalid signature");
        delegates[identity][delegate][delegateType].expires = block.timestamp;
        emit DIDDelegateChanged(identity, delegateType, delegate, block.timestamp);
    }

    function setAttribute(address identity, bytes32 name, bytes memory value, uint256 expiresIn) external onlyOwner(identity) {
        uint256 validTo = block.timestamp + expiresIn;
        attributes[identity][keccak256(abi.encodePacked(name, value))] = Attribute(value, validTo);
        emit DIDAttributeChanged(identity, name, value, validTo);
    }

    function setAttributeSigned(address identity, bytes32 name, bytes memory value, uint256 expiresIn, uint8 v, bytes32 r, bytes32 s) external {
        bytes32 hash = createSetAttributeHash(identity, name, value, expiresIn);
        address signer = ecrecover(hash, v, r, s);
        require(signer == getOwner(identity), "Invalid signature");
        uint256 validTo = block.timestamp + expiresIn;
        attributes[identity][keccak256(abi.encodePacked(name, value))] = Attribute(value, validTo);
        emit DIDAttributeChanged(identity, name, value, validTo);
    }

    function revokeAttribute(address identity, bytes32 name, bytes memory value) external onlyOwner(identity) {
        attributes[identity][keccak256(abi.encodePacked(name, value))].expires = block.timestamp;
        emit DIDAttributeChanged(identity, name, value, block.timestamp);
    }

    function revokeAttributeSigned(address identity, bytes32 name, bytes memory value, uint8 v, bytes32 r, bytes32 s) external {
        bytes32 hash = createRevokeAttributeHash(identity, name, value);
        address signer = ecrecover(hash, v, r, s);
        require(signer == getOwner(identity), "Invalid signature");
        attributes[identity][keccak256(abi.encodePacked(name, value))].expires = block.timestamp;
        emit DIDAttributeChanged(identity, name, value, block.timestamp);
    }

    function createChangeOwnerHash(address identity, address newOwner) public pure returns (bytes32) {
        return keccak256(abi.encodePacked("changeOwner", identity, newOwner));
    }

    function createAddDelegateHash(address identity, bytes32 delegateType, address delegate, uint256 expiresIn) public pure returns (bytes32) {
        return keccak256(abi.encodePacked("addDelegate", identity, delegateType, delegate, expiresIn));
    }

    function createRevokeDelegateHash(address identity, bytes32 delegateType, address delegate) public pure returns (bytes32) {
        return keccak256(abi.encodePacked("revokeDelegate", identity, delegateType, delegate));
    }

    function createSetAttributeHash(address identity, bytes32 name, bytes memory value, uint256 expiresIn) public pure returns (bytes32) {
        return keccak256(abi.encodePacked("setAttribute", identity, name, value, expiresIn));
    }

    function createRevokeAttributeHash(address identity, bytes32 name, bytes memory value) public pure returns (bytes32) {
        return keccak256(abi.encodePacked("revokeAttribute", identity, name, value));
    }

    function getChainId() external view returns (uint256) {
        return block.chainid;
    }
}
