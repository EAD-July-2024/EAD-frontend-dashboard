import React, { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import UserProfile from "../../components/profile/UserProfile";
const ViewVendorModal = ({ show, onClose }) => {
  return (
    <Modal show={show} onHide={onClose} size="xl" scrollable>
      <Modal.Header
        closeButton
        style={{ backgroundColor: "#edf2fd" }}
      ></Modal.Header>
      <Modal.Body style={{ backgroundColor: "#f7f8ff" }}>
        <UserProfile />
      </Modal.Body>
    </Modal>
  );
};

export default ViewVendorModal;
