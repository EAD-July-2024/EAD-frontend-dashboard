import React from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmModal = ({ show, title, body, onConfirm, onClose }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button
          variant={title.includes("Delete") ? "danger" : "success"}
          onClick={onConfirm}
        >
          {title.includes("Delete") ? "Delete" : "Confirm"}
        </Button>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
