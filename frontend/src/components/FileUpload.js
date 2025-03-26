import { useState } from "react";
import axios from "axios";
import { Button, Form, InputGroup } from "react-bootstrap";

const provider = new ethers.providers.Web3Provider(window.ethereum);

const FileUpload = ({ contract, account, provider }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No image selected");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `Enter Your Key`,
            pinata_secret_api_key: `Enter Your Secret Key`,
            "Content-Type": "multipart/form-data",
          },
        });
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        contract.add(account, ImgHash);
        alert("Successfully Image Uploaded");
        setFileName("No image selected");
        setFile(null);
      } catch (e) {const handleSubmit = async (e) => {
  e.preventDefault();
  // other code...
}
        alert("Unable to upload image to Pinata");
      }
    }
    alert("Successfully Image Uploaded");
    setFileName("No image selected");
    setFile(null);
  };

  const retrieveFile = (e) => {
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(e.target.files[0]);
    };
    setFileName(e.target.files[0].name);
    e.preventDefault();
  };

  return (
    <div className="top">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="fileUpload" className="mb-3">
          <Form.Label>Choose Image</Form.Label>
          <InputGroup>
            <Form.Control
              type="file"
              id="file-upload"
              name="data"
              onChange={retrieveFile}
              disabled={!account}
            />
            <InputGroup.Text>{fileName}</InputGroup.Text>
          </InputGroup>
        </Form.Group>

        <Button type="submit" variant="success" disabled={!file}>
          Upload File
        </Button>
      </Form>
    </div>
  );
};

export default FileUpload;
