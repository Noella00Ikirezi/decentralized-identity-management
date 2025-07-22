// src/services/walletService.js

/**
 * Demande la connexion à MetaMask et retourne l'adresse du compte sélectionné.
 */
export const connectWallet = async () => {
  if (!window.ethereum) {
    throw new Error("🦊 MetaMask non détecté. Installe-le pour continuer.");
  }

  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    if (!accounts || accounts.length === 0) {
      throw new Error("Aucun compte MetaMask connecté.");
    }
    return accounts[0];
  } catch (error) {
    console.error("Erreur de connexion MetaMask :", error);
    throw new Error("Échec de la connexion MetaMask.");
  }
};

/**
 * Vérifie si un compte MetaMask est déjà connecté (sans popup).
 */
export const checkWalletConnection = async () => {
  if (!window.ethereum) return null;

  try {
    const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    return accounts.length > 0 ? accounts[0] : null;
  } catch (error) {
    console.error("Erreur lors de la vérification MetaMask :", error);
    return null;
  }
};

/**
 * Écoute les changements de compte dans MetaMask et appelle un callback.
 * @param {Function} callback - Fonction à appeler avec le nouveau compte ou null.
 */
export const onWalletChange = (callback) => {
  if (window.ethereum && typeof callback === 'function') {
    window.ethereum.on('accountsChanged', (accounts) => {
      callback(accounts.length > 0 ? accounts[0] : null);
    });
  }
};
