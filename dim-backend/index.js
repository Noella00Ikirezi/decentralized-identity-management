require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { ethers } = require('ethers');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

// ✅ Connect to Ethereum using Infura
const provider = new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
const issuerDID = `did:ethr:${wallet.address}`;

console.log(`🔹 Ethereum Wallet Connected: ${wallet.address}`);
console.log(`🔹 Using Infura Project ID: ${process.env.INFURA_PROJECT_ID}`);

// ✅ Store issued credentials (Temporary, Replace with DB later)
const issuedCredentials = [];

// ✅ Issue Verifiable Credential
app.post('/issue-credential', async (req, res) => {
  try {
    console.log("🔵 Received Credential Issuance Request...");
    const { subjectDID, credentialType, credentialData } = req.body;

    if (!subjectDID || !credentialType || !credentialData) {
      console.error("❌ Error: Missing required fields.");
      return res.status(400).json({ error: "Missing required fields" });
    }

    console.log(`📌 Issuing Credential for DID: ${subjectDID}`);
    console.log(`📌 Credential Type: ${credentialType}`);
    console.log(`📌 Credential Data:`, credentialData);

    const vc = {
      "@context": ["https://www.w3.org/2018/credentials/v1"],
      "id": `urn:uuid:${uuidv4()}`,
      "type": ["VerifiableCredential", credentialType],
      "issuer": issuerDID,
      "issuanceDate": new Date().toISOString(),
      "credentialSubject": {
        "id": subjectDID,
        ...credentialData
      },
      "proof": {
        "type": "EthereumSignature",
        "created": new Date().toISOString(),
        "verificationMethod": `${issuerDID}#keys-1`,
        "proofPurpose": "assertionMethod",
        "proofValue": await wallet.signMessage(JSON.stringify(credentialData))
      }
    };

    console.log(`✅ Credential Issued Successfully:`, vc);
    issuedCredentials.push(vc);
    res.json({ credential: vc });

  } catch (error) {
    console.error("❌ Credential Issuance Failed:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// ✅ Verify Credential
app.post('/verify-credential', async (req, res) => {
  try {
    console.log("🔵 Received Credential Verification Request...");
    const { credential } = req.body;

    if (!credential || !credential.proof || !credential.proof.proofValue) {
      console.error("❌ Error: Invalid credential format.");
      return res.status(400).json({ error: "Invalid credential format" });
    }

    console.log("📌 Credential to Verify:", credential);
    
    const { proofValue, verificationMethod } = credential.proof;
    const credentialData = JSON.stringify(credential.credentialSubject);
    
    console.log("🔹 Recovering address from signature...");
    const recoveredAddress = ethers.verifyMessage(credentialData, proofValue);
    const expectedIssuer = verificationMethod.replace("#keys-1", "");

    console.log(`🔹 Expected Issuer Address: ${expectedIssuer}`);
    console.log(`🔹 Recovered Address from Signature: ${recoveredAddress}`);

    if (recoveredAddress.toLowerCase() === expectedIssuer.toLowerCase()) {
      console.log("✅ Credential Verified Successfully!");
      return res.json({ valid: true, message: "Credential is valid ✅" });
    } else {
      console.error("❌ Verification Failed: Credential signature is invalid.");
      return res.json({ valid: false, message: "Credential signature is invalid ❌" });
    }

  } catch (error) {
    console.error("❌ Credential Verification Failed:", error.message);
    res.status(500).json({ error: "Verification failed", details: error.message });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
  console.log(`✅ Issuer DID: ${issuerDID}`);
});
