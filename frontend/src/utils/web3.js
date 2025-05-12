// utils/web3.js
import { Web3Storage } from 'web3.storage';

const token = 'z6Mkw5pc8BPPxn8SeFaMzPc5wgc6Sj6JXbGG4DL4TBqFTcoy';

function makeStorageClient() {
  return new Web3Storage({ token });
}

export async function uploadToWeb3Storage(file) {
  const client = makeStorageClient();
  const cid = await client.put([file]);
  return cid;
}
