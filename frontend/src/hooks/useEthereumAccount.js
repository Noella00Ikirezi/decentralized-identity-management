// ✅ src/hooks/useEthereumAccount.js
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

export const useEthereumAccount = () => {
  const [account, setAccount] = useState('');

  useEffect(() => {
    const connect = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          await provider.send('eth_requestAccounts', []);
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          setAccount(address);
        } catch (e) {
          console.error('[Ethereum Connection Error]', e);
        }
      }
    };

    connect();
  }, []);

  return account;
};