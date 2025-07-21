import { contract, wallet } from "../utils/ethereum.js";
import { ethers } from "ethers";

// Obtenir les documents de l'utilisateur connecté
export async function getMyDocuments(req, res) {
  try {
    console.log("[getMyDocuments] Démarrage de la récupération des documents");

    const account = req.headers["x-wallet-address"];
    if (!account) {
      console.warn("[getMyDocuments] Aucune adresse fournie dans les headers");
      return res.status(400).json({ error: "Adresse Ethereum manquante" });
    }

    console.log(`[getMyDocuments] Adresse Ethereum reçue : ${account}`);
    const documents = await contract.connect(wallet).getMyDocuments();
    console.log(`[getMyDocuments] Documents récupérés (${documents.length})`);

    res.json(documents);
  } catch (error) {
    console.error("[getMyDocuments] Erreur :", error);
    res.status(500).json({ error: "Impossible de récupérer les documents" });
  }
}

// Ajouter un document
export async function addDocument(req, res) {
  try {
    console.log("[addDocument] Requête reçue");
    const { cid, mimeType, title, docType, expiresIn, ethereumAddress } = req.body;

    if (!ethereumAddress) {
      console.warn("[addDocument] Adresse Ethereum manquante");
      return res.status(400).json({ error: "Adresse Ethereum requise" });
    }

    if (!cid || !mimeType || !title || !docType || !expiresIn) {
      console.warn("[addDocument] Champs manquants dans le payload :", req.body);
      return res.status(400).json({ error: "Champs requis manquants" });
    }

    console.log(`[addDocument] CID: ${cid}`);
    console.log(`[addDocument] MIME: ${mimeType}`);
    console.log(`[addDocument] Title: ${title}`);
    console.log(`[addDocument] DocType: ${docType}`);
    console.log(`[addDocument] ExpiresIn: ${expiresIn}`);
    console.log(`[addDocument] Depuis wallet: ${ethereumAddress}`);

    const tx = await contract.connect(wallet).addDocument(
      cid,
      mimeType,
      title,
      docType,
      expiresIn
    );

    console.log(`[addDocument] Transaction envoyée : ${tx.hash}`);
    await tx.wait();
    console.log(`[addDocument] Transaction confirmée`);

    res.json({ message: "Document ajouté avec succès", txHash: tx.hash });
  } catch (error) {
    console.error(`[addDocument] Erreur :`, error);
    res.status(500).json({ error: "Erreur lors de l'ajout du document" });
  }
}


// Révoquer un document
export async function revokeDocument(req, res) {
  try {
    const { docId } = req.params;
    const account = req.headers["x-wallet-address"];

    if (!account) {
      console.warn("[revokeDocument] Adresse Ethereum manquante");
      return res.status(400).json({ error: "Adresse Ethereum requise" });
    }

    const tx = await contract.connect(wallet).revokeDocument(Number(docId));
    await tx.wait();
    res.json({ message: "Document révoqué avec succès" });
  } catch (error) {
    console.error(`[revokeDocument] Erreur :`, error);
    res.status(500).json({ error: "Erreur lors de la révocation du document" });
  }
}

// Partager un document
export async function shareDocument(req, res) {
  try {
    const { docId, recipient, duration } = req.body;
    const account = req.headers["x-wallet-address"];

    if (!account) {
      console.warn("[shareDocument] Adresse Ethereum manquante");
      return res.status(400).json({ error: "Adresse Ethereum requise" });
    }

    if (!docId || !recipient || !duration) {
      console.warn("[shareDocument] Champs manquants dans le payload :", req.body);
      return res.status(400).json({ error: "Champs requis manquants" });
    }

    const tx = await contract.connect(wallet).shareDocument(docId, recipient, duration);
    await tx.wait();
    res.json({ message: "Document partagé avec succès" });
  } catch (error) {
    console.error("[shareDocument] Erreur :", error);
    res.status(500).json({ error: "Erreur lors du partage du document" });
  }
}

// Révoquer un partage
export async function revokeSharedAccess(req, res) {
  try {
    const { docId, recipient } = req.body;
    const account = req.headers["x-wallet-address"];

    if (!account) {
      console.warn("[revokeSharedAccess] Adresse Ethereum manquante");
      return res.status(400).json({ error: "Adresse Ethereum requise" });
    }

    if (!docId || !recipient) {
      console.warn("[revokeSharedAccess] Champs manquants dans le payload :", req.body);
      return res.status(400).json({ error: "Champs requis manquants" });
    }

    const tx = await contract.connect(wallet).revokeSharedAccess(docId, recipient);
    await tx.wait();
    res.json({ message: "Partage révoqué avec succès" });
  } catch (error) {
    console.error("[revokeSharedAccess] Erreur :", error);
    res.status(500).json({ error: "Erreur lors de la révocation du partage" });
  }
}

// Obtenir l'historique des accès
export async function getSharedAccesses(req, res) {
  try {
    const { docId } = req.params;
    const account = req.headers["x-wallet-address"];

    if (!account) {
      console.warn("[getSharedAccesses] Adresse Ethereum manquante");
      return res.status(400).json({ error: "Adresse Ethereum requise" });
    }

    const accesses = await contract.connect(wallet).getSharedAccesses(docId);
    res.json(accesses);
  } catch (error) {
    console.error("[getSharedAccesses] Erreur :", error);
    res.status(500).json({ error: "Erreur lors de la récupération des accès partagés" });
  }
}

// Vérifier si l'utilisateur peut accéder à un document
export async function canAccessDocument(req, res) {
  try {
    const { owner, docId } = req.params;
    const account = req.headers["x-wallet-address"];

    if (!account) {
      console.warn("[canAccessDocument] Adresse Ethereum manquante");
      return res.status(400).json({ error: "Adresse Ethereum requise" });
    }

    const result = await contract.connect(wallet).canAccess(owner, docId);
    res.json({ canAccess: result });
  } catch (error) {
    console.error("[canAccessDocument] Erreur :", error);
    res.status(500).json({ error: "Erreur lors de la vérification d'accès" });
  }
}
