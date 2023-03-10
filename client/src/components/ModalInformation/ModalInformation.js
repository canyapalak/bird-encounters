import "./ModalInformation.css";
import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";

const ModalInformation = ({
  show,
  isSuccess,
  isFailure,
  isLoading,
  closeModal,
  successMsg,
  errorMsg,
}) => {
  return (
    <Modal show={show} className="signup-modal">
      <Modal.Body>
        {isLoading && <p>Uploading...</p>}
        {isSuccess && <p>{successMsg}</p>}
        {isFailure && <p id="error-message">{errorMsg}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          className="signup-modal-button"
          onClick={closeModal}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalInformation;
