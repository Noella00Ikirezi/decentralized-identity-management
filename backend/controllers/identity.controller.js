import Web3 from 'web3';
import contractJSON from '../../smart-contracts/build/contracts/IdentityManager.json' assert { type: 'json' };

const web3 = new Web3('http://127.0.0.1:7545');
const networkId = Object.keys(contractJSON.networks)[0];
const contractAddress = contractJSON.networks[networkId].address;
const IdentityManager = new web3.eth.Contract(contractJSON.abi, contractAddress);

const toDelegateTypeHash = (delegateType) => web3.utils.keccak256(delegateType);

export const getOwner = async (req, res) => {
  try {
    const { identity } = req.params;
    const owner = await IdentityManager.methods.getOwner(identity).call();
    res.json({ identity, owner });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const changeOwner = async (req, res) => {
  try {
    const { identity, newOwner, from } = req.body;
    const tx = await IdentityManager.methods.changeOwner(identity, newOwner).send({ from });
    res.json({ success: true, txHash: tx.transactionHash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const changeOwnerSigned = async (req, res) => {
  try {
    const { identity, newOwner, v, r, s, from } = req.body;
    const tx = await IdentityManager.methods.changeOwnerSigned(identity, newOwner, v, r, s).send({ from });
    res.json({ success: true, txHash: tx.transactionHash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addDelegate = async (req, res) => {
  try {
    const { identity, delegate, delegateType, expiresIn, from } = req.body;
    const typeHash = toDelegateTypeHash(delegateType);
    const tx = await IdentityManager.methods.addDelegate(identity, typeHash, delegate, expiresIn).send({ from });
    res.json({ success: true, txHash: tx.transactionHash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addDelegateSigned = async (req, res) => {
  try {
    const { identity, delegate, delegateType, expiresIn, v, r, s, from } = req.body;
    const typeHash = toDelegateTypeHash(delegateType);
    const tx = await IdentityManager.methods.addDelegateSigned(identity, typeHash, delegate, expiresIn, v, r, s).send({ from });
    res.json({ success: true, txHash: tx.transactionHash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const revokeDelegate = async (req, res) => {
  try {
    const { identity, delegate, delegateType, from } = req.body;
    const typeHash = toDelegateTypeHash(delegateType);
    const tx = await IdentityManager.methods.revokeDelegate(identity, typeHash, delegate).send({ from });
    res.json({ success: true, txHash: tx.transactionHash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const revokeDelegateSigned = async (req, res) => {
  try {
    const { identity, delegate, delegateType, v, r, s, from } = req.body;
    const typeHash = toDelegateTypeHash(delegateType);
    const tx = await IdentityManager.methods.revokeDelegateSigned(identity, typeHash, delegate, v, r, s).send({ from });
    res.json({ success: true, txHash: tx.transactionHash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const setAttribute = async (req, res) => {
  try {
    const { identity, name, value, expiresIn, from } = req.body;
    const nameHash = web3.utils.keccak256(name);
    const tx = await IdentityManager.methods.setAttribute(identity, nameHash, web3.utils.hexToBytes(value), expiresIn).send({ from });
    res.json({ success: true, txHash: tx.transactionHash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const setAttributeSigned = async (req, res) => {
  try {
    const { identity, name, value, expiresIn, v, r, s, from } = req.body;
    const nameHash = web3.utils.keccak256(name);
    const tx = await IdentityManager.methods.setAttributeSigned(identity, nameHash, web3.utils.hexToBytes(value), expiresIn, v, r, s).send({ from });
    res.json({ success: true, txHash: tx.transactionHash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const revokeAttribute = async (req, res) => {
  try {
    const { identity, name, value, from } = req.body;
    const nameHash = web3.utils.keccak256(name);
    const tx = await IdentityManager.methods.revokeAttribute(identity, nameHash, web3.utils.hexToBytes(value)).send({ from });
    res.json({ success: true, txHash: tx.transactionHash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const revokeAttributeSigned = async (req, res) => {
  try {
    const { identity, name, value, v, r, s, from } = req.body;
    const nameHash = web3.utils.keccak256(name);
    const tx = await IdentityManager.methods.revokeAttributeSigned(identity, nameHash, web3.utils.hexToBytes(value), v, r, s).send({ from });
    res.json({ success: true, txHash: tx.transactionHash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createHashes = async (req, res) => {
  try {
    const { method, identity, params } = req.body;
    let hash;
    switch (method) {
      case 'changeOwner':
        hash = await IdentityManager.methods.createChangeOwnerHash(identity, params.newOwner).call();
        break;
      case 'addDelegate':
        hash = await IdentityManager.methods.createAddDelegateHash(identity, toDelegateTypeHash(params.delegateType), params.delegate, params.expiresIn).call();
        break;
      case 'revokeDelegate':
        hash = await IdentityManager.methods.createRevokeDelegateHash(identity, toDelegateTypeHash(params.delegateType), params.delegate).call();
        break;
      case 'setAttribute':
        hash = await IdentityManager.methods.createSetAttributeHash(identity, web3.utils.keccak256(params.name), web3.utils.hexToBytes(params.value), params.expiresIn).call();
        break;
      case 'revokeAttribute':
        hash = await IdentityManager.methods.createRevokeAttributeHash(identity, web3.utils.keccak256(params.name), web3.utils.hexToBytes(params.value)).call();
        break;
      default:
        return res.status(400).json({ error: 'Unsupported method' });
    }
    res.json({ method, hash });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
