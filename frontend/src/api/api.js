// src/api/api.js
export const API_BASE = 'http://localhost:5000';

// IPFS
export const UPLOAD_IPFS = `${API_BASE}/ipfs/upload`;
export const GET_IPFS = (cid) => `${API_BASE}/ipfs/content/${cid}`;

// Identity - Profile
export const LINK_PROFILE = `${API_BASE}/identity/profile`;
export const GET_ATTRIBUTE = (identity, nameHash) =>
  `${API_BASE}/identity/attribute/${identity}/${nameHash}`;

// Identity - Owner
export const GET_OWNER = (identity) => `${API_BASE}/identity/owner/${identity}`;
export const CHANGE_OWNER = `${API_BASE}/identity/owner/change`;
export const CHANGE_OWNER_SIGNED = `${API_BASE}/identity/owner/change-signed`;

// Identity - Delegate
export const ADD_DELEGATE = `${API_BASE}/identity/delegate/add`;
export const ADD_DELEGATE_SIGNED = `${API_BASE}/identity/delegate/add-signed`;
export const REVOKE_DELEGATE = `${API_BASE}/identity/delegate/revoke`;
export const REVOKE_DELEGATE_SIGNED = `${API_BASE}/identity/delegate/revoke-signed`;

// Identity - Attribute
export const SET_ATTRIBUTE = `${API_BASE}/identity/attribute/set`;
export const SET_ATTRIBUTE_SIGNED = `${API_BASE}/identity/attribute/set-signed`;
export const REVOKE_ATTRIBUTE = `${API_BASE}/identity/attribute/revoke`;
export const REVOKE_ATTRIBUTE_SIGNED = `${API_BASE}/identity/attribute/revoke-signed`;

// Identity - Hashes
export const CREATE_HASH = `${API_BASE}/identity/hash`;

// Documents
export const GET_DOCUMENTS = `${API_BASE}/documents`;
