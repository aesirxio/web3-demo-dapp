import { Button, Col, Form, Row } from "react-bootstrap";

export default function CreateComponent() {
  return (
    <div>
      <h1>Create new Product</h1>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Name" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridSKU">
            <Form.Label>SKU</Form.Label>
            <Form.Control type="text" placeholder="SKU" />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridToken">
            <Form.Label>Token</Form.Label>
            <Form.Control type="text" placeholder="Enter Token" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridBlock">
            <Form.Label>Block</Form.Label>
            <Form.Control type="text" placeholder="Enter Block" />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridDesc">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" placeholder="Enter Description" />
          </Form.Group>
        </Row>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
