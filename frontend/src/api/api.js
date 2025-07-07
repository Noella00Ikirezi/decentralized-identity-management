<<<<<<< HEAD
// === api/api.js ===
=======
// src/api/api.js
export const API_BASE = process.env.API_BASE ;
>>>>>>> 033a0c7cf4583b98f5ecba33ed7edf0aa16cd4bf

const API_BASE = 'http://localhost:5000';

// === IPFS ===
export const uploadFileToIPFS = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return fetch(`${API_BASE}/ipfs/upload`, {
    method: 'POST',
    body: formData,
  }).then(res => res.json());
};

export const uploadProfileJSON = (identity, profile) => {
  return fetch(`${API_BASE}/ipfs/profile/upload`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identity, profile })
  }).then(res => res.json());
};

export const getProfile = (identity) => fetch(`${API_BASE}/ipfs/profile/${identity}`).then(res => res.json());
export const deleteProfile = (identity) => fetch(`${API_BASE}/ipfs/profile`, {
  method: 'DELETE',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ identity })
}).then(res => res.json());

// === Documents ===
export const addDocument = (doc) => fetch(`${API_BASE}/documents/add`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(doc)
}).then(res => res.json());

export const revokeDocument = (docId) => fetch(`${API_BASE}/documents/revoke`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ docId })
}).then(res => res.json());

export const shareDocument = (docId, recipient, duration) => fetch(`${API_BASE}/documents/share`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ docId, recipient, duration })
}).then(res => res.json());

export const revokeShare = (docId, recipient) => fetch(`${API_BASE}/documents/revoke-share`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ docId, recipient })
}).then(res => res.json());

export const canAccess = (owner, docId) => fetch(`${API_BASE}/documents/access/${owner}/${docId}`).then(res => res.json());
export const getMyDocuments = () => fetch(`${API_BASE}/documents/my`).then(res => res.json());
export const getSharedAccesses = (docId) => fetch(`${API_BASE}/documents/shared/${docId}`).then(res => res.json());

// === Identity ===
export const getOwner = (identity) => fetch(`${API_BASE}/identity/owner/${identity}`).then(res => res.json());
export const changeOwner = (identity, newOwner) => fetch(`${API_BASE}/identity/owner/change`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ identity, newOwner })
}).then(res => res.json());

export const changeOwnerSigned = (data) => fetch(`${API_BASE}/identity/owner/change-signed`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
}).then(res => res.json());

export const addDelegate = (data) => fetch(`${API_BASE}/identity/delegate/add`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
}).then(res => res.json());

export const revokeDelegate = (data) => fetch(`${API_BASE}/identity/delegate/revoke`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
}).then(res => res.json());

export const setAttribute = (data) => fetch(`${API_BASE}/identity/attribute/set`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
}).then(res => res.json());

export const revokeAttribute = (data) => fetch(`${API_BASE}/identity/attribute/revoke`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
}).then(res => res.json());

export const getAttributes = (identity) => fetch(`${API_BASE}/identity/attributes/${identity}`).then(res => res.json());
export const getAttribute = (identity, name) => fetch(`${API_BASE}/identity/attribute/${identity}/${name}`).then(res => res.json());

export const getChainId = () => fetch(`${API_BASE}/identity/chain-id`).then(res => res.json());
export const createChangeOwnerHash = (identity, newOwner) => fetch(`${API_BASE}/identity/hash/owner-change`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ identity, newOwner })
}).then(res => res.json());
