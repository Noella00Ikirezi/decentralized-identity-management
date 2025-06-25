// src/api/api.js
export const API_BASE = process.env.API_BASE ;

// IPFS
export const UPLOAD_IPFS = `${API_BASE}/ipfs/upload`;
export const GET_IPFS = (cid) => `${API_BASE}/ipfs/content/${cid}`;
export const GET_DOCUMENTS = (address) => `${API_BASE}/ipfs/list/${address}`;
export const REVOKE_DOCUMENT = `${API_BASE}/ipfs/revoke`;

// Identity - Create
export const CREATE_IDENTITY = `${API_BASE}/identity/create`;
export const CREATE_IDENTITY_SIGNED = `${API_BASE}/identity/create-signed`;

// Identity - Profile
export const LINK_PROFILE = `${API_BASE}/identity/profile`;
export const GET_ATTRIBUTE = (identity, nameHash) =>
  `${API_BASE}/identity/attribute/${identity}/${nameHash}`;

// Identity - Owner
export const GET_OWNER = (identity) => `${API_BASE}/identity/owner/${identity}`;
export const CHANGE_OWNER = `${API_BASE}/identity/change-owner`;
export const CHANGE_OWNER_SIGNED = `${API_BASE}/identity/change-owner-signed`;

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
export const CREATE_HASHES = `${API_BASE}/identity/hashes`;

// Identity - Search
export const GET_IDENTITY = (identity) => `${API_BASE}/identity/identity/${identity}`;
export const GET_IDENTITY_BY_OWNER = (owner) => `${API_BASE}/identity/by-owner/${owner}`;
export const GET_IDENTITY_BY_DELEGATE = (delegate) => `${API_BASE}/identity/by-delegate/${delegate}`;
export const GET_IDENTITY_BY_ATTRIBUTE = (name, value) => `${API_BASE}/identity/by-attribute/${name}/${value}`;
export const GET_IDENTITY_BY_PROFILE = (cid) => `${API_BASE}/identity/by-profile/${cid}`;
export const GET_IDENTITY_BY_OWNER_AND_PROFILE = (owner, cid) =>
  `${API_BASE}/identity/by-owner-and-profile/${owner}/${cid}`;
export const GET_IDENTITY_BY_OWNER_AND_ATTRIBUTE = (owner, name, value) =>
  `${API_BASE}/identity/by-owner-and-attribute/${owner}/${name}/${value}`;
export const GET_IDENTITY_BY_DELEGATE_AND_PROFILE = (delegate, cid) =>
  `${API_BASE}/identity/by-delegate-and-profile/${delegate}/${cid}`;
export const GET_IDENTITY_BY_DELEGATE_AND_ATTRIBUTE = (delegate, name, value) =>
  `${API_BASE}/identity/by-delegate-and-attribute/${delegate}/${name}/${value}`;
export const GET_IDENTITY_BY_PROFILE_AND_ATTRIBUTE = (cid, name, value) =>
  `${API_BASE}/identity/by-profile-and-attribute/${cid}/${name}/${value}`;
export const GET_IDENTITY_BY_OWNER_AND_PROFILE_AND_ATTRIBUTE = (owner, cid, name, value) =>
  `${API_BASE}/identity/by-owner-and-profile-and-attribute/${owner}/${cid}/${name}/${value}`;
export const GET_IDENTITY_BY_DELEGATE_AND_PROFILE_AND_ATTRIBUTE = (delegate, cid, name, value) =>
  `${API_BASE}/identity/by-delegate-and-profile-and-attribute/${delegate}/${cid}/${name}/${value}`;
export const GET_IDENTITY_BY_OWNER_AND_DELEGATE = (owner, delegate) =>
  `${API_BASE}/identity/by-owner-and-delegate/${owner}/${delegate}`;
export const GET_IDENTITY_BY_OWNER_AND_DELEGATE_AND_PROFILE = (owner, delegate, cid) =>
  `${API_BASE}/identity/by-owner-and-delegate-and-profile/${owner}/${delegate}/${cid}`;
export const GET_IDENTITY_BY_OWNER_AND_DELEGATE_AND_ATTRIBUTE = (owner, delegate, name, value) =>
  `${API_BASE}/identity/by-owner-and-delegate-and-attribute/${owner}/${delegate}/${name}/${value}`;
