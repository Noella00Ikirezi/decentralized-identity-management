import { useState } from "react";
import { Button, Form, Card, Row, Col } from "react-bootstrap";


const Display = ({ contract, account }) => {
  const [data, setData] = useState("");

  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;
    try {
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
      } else {
        dataArray = await contract.display(account);
      }
    } catch (e) {
      alert("You don't have access");
    }

    const isEmpty = Object.keys(dataArray).length === 0;
    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      const images = str_array.map((item, i) => (
        <Col key={i} xs={6} md={4} lg={3}>
          <Card>
            <Card.Img
              variant="top"
              src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
              alt="Uploaded Image"
            />
            <Card.Body>
              <Button variant="primary" href={item} target="_blank">
                View Image
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ));
      setData(images);
    } else {
      alert("No image to display");
    }
  };

  return (
    <div>
      <Form className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Address"
          className="address mb-2"
        />
        <Button variant="primary" onClick={getdata}>
          Get Data
        </Button>
      </Form>

      <Row>{data}</Row>
    </div>
  );
};

export default Display;
