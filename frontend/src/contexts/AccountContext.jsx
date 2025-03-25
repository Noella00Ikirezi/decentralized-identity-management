import React, { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import ipfs from '../utils/ipfs';
import contractJSON from '../abi.json';

const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [address, setAddress] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (!window.ethereum) return alert('Please install MetaMask');

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const addr = await signer.getAddress();
      const contract = new ethers.Contract(
        process.env.REACT_APP_CONTRACT_ADDRESS,
        contractJSON.abi,
        signer
      );

      setAddress(addr);
      setContract(contract);
    };

    init();
  }, []);

  return (
    <AccountContext.Provider value={{ address, contract, ipfs }}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => useContext(AccountContext);
