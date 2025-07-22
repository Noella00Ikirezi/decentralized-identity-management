import axios from "axios";

// 🎯 Adresse de ton daemon IPFS local
const IPFS_API_URL = "http://127.0.0.1:5001/api/v0";

// 📤 Upload de fichier vers IPFS
export async function uploadToIPFS(file) {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(`${IPFS_API_URL}/add`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const cid = response.data.Hash;
    console.log("✅ Fichier ajouté à IPFS avec CID :", cid);
    return cid;
  } catch (error) {
    console.error("❌ Erreur upload IPFS :", error.message);
    throw error;
  }
}

// 📥 Récupération d’un fichier depuis son CID
export async function getFileFromIPFS(cid) {
  try {
    const url = `http://127.0.0.1:8080/ipfs/${cid}`;
    const response = await axios.get(url, { responseType: "blob" });
    return response.data;
  } catch (error) {
    console.error("❌ Erreur de récupération IPFS :", error.message);
    throw error;
  }
}

// 📄 Lecture d’un fichier texte/JSON depuis CID
export async function getTextFromIPFS(cid) {
  try {
    const url = `http://127.0.0.1:8080/ipfs/${cid}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("❌ Erreur de lecture texte IPFS :", error.message);
    throw error;
  }
}

// 🧪 Test de disponibilité du daemon IPFS
export async function isIPFSAvailable() {
  try {
    const res = await axios.post(`${IPFS_API_URL}/id`);
    return !!res.data.ID;
  } catch (e) {
    console.warn("⚠️ IPFS non disponible localement :", e.message);
    return false;
  }
}
