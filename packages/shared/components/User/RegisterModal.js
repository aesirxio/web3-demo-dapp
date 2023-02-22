import { Modal } from "react-bootstrap";

import RegisterForm from "@shared_components/User/RegisterForm";

const RegisterModal = ({ show, setShow }) => {
  return (
    <>
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="ps-3">{"Register"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-4 pb-5">
          <RegisterForm setShow={setShow} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default RegisterModal;
