import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [account, setAccount] = useState(null);

  // 🔁 Lecture automatique depuis MetaMask ou localStorage
  useEffect(() => {
    async function checkConnection() {
      const saved = localStorage.getItem("auth_address");
      if (saved) {
        setAccount(saved);
        return;
      }

      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      }
    }
    checkConnection();
  }, []);

  const login = async () => {
    if (!window.ethereum) {
      alert("Veuillez installer MetaMask !");
      return;
    }
    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        localStorage.setItem("auth_address", accounts[0]);
      }
    } catch (err) {
      console.error("Erreur MetaMask :", err);
    }
  };

  const logout = () => {
    setAccount(null);
    localStorage.removeItem("auth_address");
  };

  return (
    <AuthContext.Provider value={{ account, setAccount, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
