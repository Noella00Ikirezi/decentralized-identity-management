import { ethers } from "ethers";
import DocumentStore from "../abis/DocumentStore.json";

export const initEthers = () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  return provider;
};

export const loadContract = async (provider) => {
  const signer = await provider.getSigner();
  const account = await signer.getAddress();

  const contractAddress = "0x6BeF476662082f2965E8B3D7270bC48a48847fee";

  if (!ethers.isAddress(contractAddress)) {
    throw new Error("❌ Adresse du contrat invalide.");
  }

  // Instancier le contrat directement avec le signer
  const contract = new ethers.Contract(
    contractAddress,
    DocumentStore.abi,
    signer // ✅ signer directement ici
  );

  return { contract, account };
};

// 🔍 Récupérer les documents associés à l'utilisateur connecté
export const fetchDocuments = async () => {
  const provider = initEthers();
  const { contract, account } = await loadContract(provider);

  const count = await contract.getDocumentCount();
  const documents = [];

  for (let i = 0; i < count; i++) {
    const [cid, title] = await contract.getDocumentByIndex(i);
    documents.push({
      cid,
      title,
      mimeType: "unknown", // pas stocké dans le contrat
      docType: "unknown",   // pas stocké non plus
      uploadedAt: "0",      // idem
      revoked: false        // pas géré dans ce contrat
    });
  }

  return documents;
};
export const shareDocument = async (docIndex, recipient) => {
  try {
    const provider = initEthers();
    const { contract } = await loadContract(provider);
    const tx = await contract.shareDocument(recipient, parseInt(docIndex));
    await tx.wait();
  } catch (error) {
    console.error("❌ Erreur complète shareDocument :", error);
    throw error;
  }
};
export const revokeAccess = async (docIndex, address) => {
  try {
    const provider = initEthers();
    const { contract } = await loadContract(provider);
    const tx = await contract.revokeAccess(address, parseInt(docIndex));
    await tx.wait();
  } catch (error) {
    console.error("❌ Erreur complète revokeAccess :", error);
    throw error;
  }
};
export const canAccess = async (docIndex, address) => {
  try {
    const provider = initEthers();
    const { contract } = await loadContract(provider);
    const canAccess = await contract.canAccess(address, parseInt(docIndex));
    return canAccess;
  } catch (error) {
    console.error("❌ Erreur complète canAccess :", error);
    throw error;
  }
};
export const getSharedWithMe = async () => {
  const provider = initEthers();
  const { contract, account } = await loadContract(provider);

  // ⚠️ Tu dois avoir une liste connue des owners possibles (ex : [user1, user2, ...])
  const possibleOwners = ["0x123...", "0x456..."]; // à rendre dynamique plus tard
  const sharedDocs = [];

  for (const owner of possibleOwners) {
    for (let i = 0; i < 10; i++) { // on teste les 10 premiers docs
      try {
        const can = await contract.canAccess(owner, i);
        if (can) {
          const [cid, title] = await contract.getDocumentByIndexFrom(owner, i);
          sharedDocs.push({ cid, title, owner, index: i });
        }
      } catch (err) {
        continue; // ignore les erreurs d'index
      }
    }
  }

  return sharedDocs;
};
export const getMyShares = async () => {
  const provider = initEthers();
  const { contract, account } = await loadContract(provider);

  // Hardcodé pour l’instant — tu peux améliorer avec une liste dynamique
  const possibleRecipients = ["0xabc...", "0xdef..."];
  const myShares = [];

  const count = await contract.getDocumentCount();
  for (let i = 0; i < count; i++) {
    const [cid, title] = await contract.getDocumentByIndex(i);
    for (const recipient of possibleRecipients) {
      try {
        const isShared = await contract.canAccess(account, i, { from: recipient });
        if (isShared) {
          myShares.push({ cid, title, index: i, sharedWith: recipient });
        }
      } catch (err) {
        continue;
      }
    }
  }

  return myShares;
};

export const getAllShareLogs = async () => {
  const provider = initEthers();
  const { contract } = await loadContract(provider);

  const count = await contract.getShareLogCount();
  let logs = [];
  for (let i = 0; i < count; i++) {
    const log = await contract.getShareLogByIndex(i);
    logs.push({
      from: log[0],
      to: log[1],
      docIndex: log[2],
      timestamp: Number(log[3]),
      revoked: log[4]
    });
  }

  return logs;
};


