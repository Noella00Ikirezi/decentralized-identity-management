import React, { useState, useContext } from "react";
import { AccountContext } from "../contexts/AccountContext";

const IssueCredential = () => {
  const { account } = useContext(AccountContext);
  const [credentialType, setCredentialType] = useState("");
  const [credentialData, setCredentialData] = useState({ name: "", email: "" });
  const [issuedCredential, setIssuedCredential] = useState(null);

  const handleInputChange = (e) => {
    setCredentialData({
      ...credentialData,
      [e.target.name]: e.target.value,
    });
  };

  const issueCredential = async () => {
    if (!account) {
      alert("Connect to MetaMask first!");
      return;
    }

    const response = await fetch("http://localhost:5000/issue-credential", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subjectDID: `did:ethr:${account}`,
        credentialType,
        credentialData,
      }),
    });

    const data = await response.json();
    setIssuedCredential(data.credential);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Issue a Verifiable Credential</h2>
      <input
        type="text"
        placeholder="Credential Type (e.g., Student ID, Employee)"
        value={credentialType}
        onChange={(e) => setCredentialType(e.target.value)}
      />
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={credentialData.name}
        onChange={handleInputChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={credentialData.email}
        onChange={handleInputChange}
      />
      <button onClick={issueCredential}>Issue Credential</button>

      {issuedCredential && (
        <div>
          <h3>Issued Verifiable Credential:</h3>
          <pre>{JSON.stringify(issuedCredential, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default IssueCredential;
