import axios from 'axios';

export const uploadToIPFS = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await axios.post('http://localhost:5000/ipfs/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return res.data.cid;
};
