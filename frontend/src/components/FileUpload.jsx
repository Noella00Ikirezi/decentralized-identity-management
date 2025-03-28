import { useState } from "react";
import axios from "axios";
import { Button, Form, InputGroup } from "react-bootstrap";

const FileUpload = ({ contract, account, provider }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      // 1. Upload vers backend → IPFS
      const { data } = await axios.post("http://localhost:5000/ipfs/upload", formData);
      const cid = data.cid;
      const ipfsURL = `https://gateway.pinata.cloud/ipfs/${cid}`;

      // 2. Enregistrement dans le smart contract
      const signer = provider.getSigner();
      const tx = await contract.connect(signer).addDocument(account, ipfsURL);
      await tx.wait();

      alert("✅ Fichier uploadé et enregistré avec succès !");
    } catch (err) {
      console.error(err);
      alert("❌ Échec de l'upload.");
    } finally {
      setFile(null);
      setFileName("No image selected");
      setUploading(false);
    }
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0];
    if (data) {
      setFile(data);
      setFileName(data.name);
    }
  };

  return (
    <div className="top">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="fileUpload" className="mb-3">
          <Form.Label>Choisissez un fichier</Form.Label>
          <InputGroup>
            <Form.Control
              type="file"
              onChange={retrieveFile}
              disabled={!account || uploading}
            />
            <InputGroup.Text>{fileName}</InputGroup.Text>
          </InputGroup>
        </Form.Group>

        <Button type="submit" variant="success" disabled={!file || uploading}>
          {uploading ? "Uploading..." : "Upload File"}
        </Button>
      </Form>
    </div>
  );
};

export default FileUpload;
