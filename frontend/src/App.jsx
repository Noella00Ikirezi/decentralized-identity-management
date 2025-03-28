import { useState, useEffect } from "react";
import { ethers } from "ethers";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
import IdentityManager from "../../smart-contracts/build/contracts/IdentityManager.json";

import { Button, Container, Row, Col } from "react-bootstrap";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        const networkId = await provider.getNetwork().then(n => n.chainId.toString());
        const contractAddress = IdentityManager.networks[networkId].address;


        

    const contract = new ethers.Contract(
      contractAddress,
      IdentityManager.abi,
      signer
    );

        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
    };
    provider && loadProvider();
  }, []);

  return (
    <div className="App">
      <Container className="mt-5">
        {!modalOpen && (
          <Button
            className="share-btn"
            variant="primary"
            onClick={() => setModalOpen(true)}
          >
            Share
          </Button>
        )}

        {modalOpen && (
          <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
        )}

        <Row>
          <Col>
            <h1 style={{ color: "white" }}>Gdrive 3.0</h1>
            <p style={{ color: "white" }}>
              Account: {account ? account : "Not connected"}
            </p>
            <FileUpload
              account={account}
              provider={provider}
              contract={contract}
            ></FileUpload>
          </Col>
        </Row>

        <Row>
          <Col>
            <Display contract={contract} account={account}></Display>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
