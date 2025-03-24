import React, { useState } from "react";

const VerifyCredential = () => {
  const [credentialType, setCredentialType] = useState("");
  const [issuerDID, setIssuerDID] = useState("");
  const [subjectDID, setSubjectDID] = useState("");
  const [issuedDate, setIssuedDate] = useState("");
  const [proofSignature, setProofSignature] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const [error, setError] = useState(null);

  const handleVerify = async () => {
    setError(null);
    setVerificationResult(null);

    if (!credentialType || !issuerDID || !subjectDID || !issuedDate || !proofSignature) {
      setError("All fields are required!");
      return;
    }

    const credential = {
      "@context": ["https://www.w3.org/2018/credentials/v1"],
      "type": ["VerifiableCredential", credentialType],
      "issuer": issuerDID,
      "issuanceDate": issuedDate,
      "credentialSubject": {
        "id": subjectDID
      },
      "proof": {
        "type": "EthereumSignature",
        "created": issuedDate,
        "verificationMethod": `${issuerDID}#keys-1`,
        "proofPurpose": "assertionMethod",
        "proofValue": proofSignature
      }
    };

    try {
      const response = await fetch("http://localhost:5000/verify-credential", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential }),
      });

      const data = await response.json();
      setVerificationResult(data);
    } catch (err) {
      setError("Verification failed. Please check your input.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px", maxWidth: "600px", margin: "auto" }}>
      <h1>Verify a Verifiable Credential</h1>

      <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <label>Credential Type:</label>
        <input
          type="text"
          placeholder="e.g., StudentID, Employee"
          value={credentialType}
          onChange={(e) => setCredentialType(e.target.value)}
        />

        <label>Issuer DID:</label>
        <input
          type="text"
          placeholder="Issuer's DID"
          value={issuerDID}
          onChange={(e) => setIssuerDID(e.target.value)}
        />

        <label>Subject DID:</label>
        <input
          type="text"
          placeholder="Subject's DID"
          value={subjectDID}
          onChange={(e) => setSubjectDID(e.target.value)}
        />

        <label>Issued Date:</label>
        <input
          type="date"
          value={issuedDate}
          onChange={(e) => setIssuedDate(e.target.value)}
        />

        <label>Proof Signature:</label>
        <input
          type="text"
          placeholder="Paste proof signature"
          value={proofSignature}
          onChange={(e) => setProofSignature(e.target.value)}
        />

        <button type="button" onClick={handleVerify} style={{ marginTop: "10px" }}>
          Verify Credential
        </button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {verificationResult && (
        <div style={{ marginTop: "20px", padding: "10px", border: "1px solid #ccc" }}>
          <h2>Verification Result</h2>
          <p><strong>Status:</strong> {verificationResult.valid ? "✅ Valid" : "❌ Invalid"}</p>
          <p>{verificationResult.message}</p>
        </div>
      )}
    </div>
  );
};

export default VerifyCredential;
