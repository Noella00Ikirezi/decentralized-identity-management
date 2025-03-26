// /js/api.js

const apiBaseUrl = 'http://localhost:3000';  // Remplacez par l'URL de votre backend si nécessaire

// Fonction pour télécharger du texte ou un fichier vers IPFS
export const uploadToIPFS = async (file = null, text = '') => {
  const formData = new FormData();
  if (file) {
    formData.append('file', file);  // Si un fichier est sélectionné
  } else if (text) {
    formData.append('text', text);  // Si du texte est fourni
  }

  try {
    const response = await fetch(`${apiBaseUrl}/ipfs/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (data.success) {
      return data.cid;  // Retourne le CID du contenu
    } else {
      throw new Error('Échec du téléchargement');
    }
  } catch (error) {
    console.error('Erreur lors du téléchargement vers IPFS:', error);
    throw error;
  }
};

// Fonction pour récupérer le contenu depuis IPFS via CID
export const getFromIPFS = async (cid) => {
  try {
    const response = await fetch(`${apiBaseUrl}/ipfs/content/${cid}`, {
      method: 'GET',
    });
    
    const content = await response.text();  // Le contenu peut être du texte ou des données binaires
    return content;  // Retourne le contenu récupéré
  } catch (error) {
    console.error('Erreur lors de la récupération depuis IPFS:', error);
    throw error;
  }
};

// Fonction pour obtenir le propriétaire d'une identité
export const getOwner = async (identity) => {
  try {
    const response = await fetch(`${apiBaseUrl}/identity/owner/${identity}`, {
      method: 'GET',
    });
    const data = await response.json();
    return data;  // Retourne les informations sur l'identité
  } catch (error) {
    console.error('Erreur lors de la récupération du propriétaire:', error);
    throw error;
  }
};

// Fonction pour changer le propriétaire d'une identité
export const changeOwner = async (identity, newOwner, from) => {
  try {
    const response = await fetch(`${apiBaseUrl}/identity/owner/change`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identity, newOwner, from }),
    });
    const data = await response.json();
    return data;  // Retourne les informations de transaction
  } catch (error) {
    console.error('Erreur lors du changement de propriétaire:', error);
    throw error;
  }
};

// Fonction pour ajouter un délégué
export const addDelegate = async (identity, delegate, delegateType, expiresIn, from) => {
  try {
    const response = await fetch(`${apiBaseUrl}/identity/delegate/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identity, delegate, delegateType, expiresIn, from }),
    });
    const data = await response.json();
    return data;  // Retourne les informations de transaction
  } catch (error) {
    console.error('Erreur lors de l\'ajout du délégué:', error);
    throw error;
  }
};
