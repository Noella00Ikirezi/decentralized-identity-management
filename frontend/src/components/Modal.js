import { Button, Modal as BootstrapModal } from "react-bootstrap";
import { useEffect } from "react";


const Modal = ({ setModalOpen, contract }) => {
  const sharing = async () => {
    const address = document.querySelector(".address").value;
    await contract.allow(address);
    setModalOpen(false);
  };

  useEffect(() => {
    const accessList = async () => {
      const addressList = await contract.shareAccess();
      let select = document.querySelector("#selectNumber");
      const options = addressList;

      for (let i = 0; i < options.length; i++) {
        let opt = options[i];
        let e1 = document.createElement("option");
        e1.textContent = opt;
        e1.value = opt;
        select.appendChild(e1);
      }
    };
    contract && accessList();
  }, [contract]);

  return (
    <BootstrapModal show onHide={() => setModalOpen(false)}>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>Share with</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>
        <input
          type="text"
          className="address"
          placeholder="Enter Address"
        />
        <form id="myForm">
          <select id="selectNumber">
            <option className="address">People With Access</option>
          </select>
        </form>
      </BootstrapModal.Body>
      <BootstrapModal.Footer>
        <Button variant="secondary" onClick={() => setModalOpen(false)}>
          Cancel
        </Button>
        <Button variant="primary" onClick={sharing}>
          Share
        </Button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
};

export default Modal;
