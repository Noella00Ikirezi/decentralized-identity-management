// À compléter avec ethers ou wagmi si tu veux signer/émettre des transactions
export const connectWallet = async () => {
  if (!window.ethereum) throw new Error('MetaMask non détecté');
  const [address] = await window.ethereum.request({ method: 'eth_requestAccounts' });
  return address;
};
