import React, { useState, useEffect } from "react";

const MyCredentials = () => {
  const [credentials, setCredentials] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/my-credentials")
      .then((res) => res.json())
      .then((data) => setCredentials(data))
      .catch((err) => console.error("Error fetching credentials:", err));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>My Credentials</h2>
      {credentials.length === 0 ? (
        <p>No credentials found.</p>
      ) : (
        credentials.map((cred, index) => (
          <div key={index} style={{ border: "1px solid black", padding: "10px", marginBottom: "10px" }}>
            <pre>{JSON.stringify(cred, null, 2)}</pre>
          </div>
        ))
      )}
    </div>
  );
};

export default MyCredentials;
