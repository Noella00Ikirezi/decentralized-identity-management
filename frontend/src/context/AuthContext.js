import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [account, setAccount] = useState(null);

  const login = async () => {
    if (!window.ethereum) {
      alert("MetaMask non détecté.");
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
      const expiresAt = Date.now() + 4 * 60 * 60 * 1000;
      localStorage.setItem("auth_expiration", expiresAt);
    } catch (err) {
      console.error("Erreur MetaMask:", err);
    }
  };

  const logout = () => {
    setAccount(null);
    localStorage.removeItem("auth_expiration");
  };

  useEffect(() => {
    const expiresAt = localStorage.getItem("auth_expiration");
    if (expiresAt && Date.now() < parseInt(expiresAt)) {
      window.ethereum?.request({ method: "eth_accounts" })
        .then((accounts) => {
          if (accounts.length > 0) setAccount(accounts[0]);
        })
        .catch(console.error);
    } else {
      logout();
    }

    window.ethereum?.on("accountsChanged", (accounts) => {
      if (accounts.length === 0) logout();
      else setAccount(accounts[0]);
    });
  }, []);

  return React.createElement(
    AuthContext.Provider,
    { value: { account, login, logout } },
    children
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
