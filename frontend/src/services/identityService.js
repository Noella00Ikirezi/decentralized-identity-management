// utils/identityService.js
import axios from 'axios';
import {
  GET_OWNER,
  CHANGE_OWNER,
  CHANGE_OWNER_SIGNED,
  ADD_DELEGATE,
  ADD_DELEGATE_SIGNED,
  REVOKE_DELEGATE,
  REVOKE_DELEGATE_SIGNED,
  SET_ATTRIBUTE,
  SET_ATTRIBUTE_SIGNED,
  REVOKE_ATTRIBUTE,
  REVOKE_ATTRIBUTE_SIGNED,
  GET_ATTRIBUTE,
  LINK_PROFILE,
  CREATE_HASH
} from '../api/api';

export const getOwner = (identity) => axios.get(GET_OWNER(identity));

export const changeOwner = (payload) => axios.post(CHANGE_OWNER, payload);
export const changeOwnerSigned = (payload) => axios.post(CHANGE_OWNER_SIGNED, payload);

export const addDelegate = (payload) => axios.post(ADD_DELEGATE, payload);
export const addDelegateSigned = (payload) => axios.post(ADD_DELEGATE_SIGNED, payload);
export const revokeDelegate = (payload) => axios.post(REVOKE_DELEGATE, payload);
export const revokeDelegateSigned = (payload) => axios.post(REVOKE_DELEGATE_SIGNED, payload);

export const setAttribute = (payload) => axios.post(SET_ATTRIBUTE, payload);
export const setAttributeSigned = (payload) => axios.post(SET_ATTRIBUTE_SIGNED, payload);
export const revokeAttribute = (payload) => axios.post(REVOKE_ATTRIBUTE, payload);
export const revokeAttributeSigned = (payload) => axios.post(REVOKE_ATTRIBUTE_SIGNED, payload);

export const getAttribute = (identity, nameHash) => axios.get(GET_ATTRIBUTE(identity, nameHash));
export const linkProfile = (payload) => axios.post(LINK_PROFILE, payload);

export const createHash = (payload) => axios.post(CREATE_HASH, payload);