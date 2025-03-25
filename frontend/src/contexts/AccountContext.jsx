import React, { createContext, useState, useEffect, useContext } from "react";

export const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [network, setNetwork] = useState(null);

  useEffect(() => {
    const getAccount = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
          setAccount(accounts[0]);

          // Get the current network
          const chainId = await window.ethereum.request({ method: "eth_chainId" });
          setNetwork(chainId);

          // Watch for account changes
          window.ethereum.on("accountsChanged", (accounts) => {
            setAccount(accounts[0] || null);
          });

          // Watch for network changes
          window.ethereum.on("chainChanged", (newChainId) => {
            setNetwork(newChainId);
            window.location.reload();
          });
        } catch (err) {
          console.error("Error connecting to MetaMask:", err);
        }
      } else {
        console.warn("MetaMask not detected");
      }
    };

    getAccount();

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", () => {});
        window.ethereum.removeListener("chainChanged", () => {});
      }
    };
  }, []);

  const disconnect = () => {
    setAccount(null);
    setNetwork(null);
  };

  return (
    <AccountContext.Provider value={{ account, network, setAccount, setNetwork, disconnect }}>
      {children}
    </AccountContext.Provider>
  );
};

// Custom hook to use the Account context
export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  return context;
};
