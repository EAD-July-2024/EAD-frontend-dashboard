import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import ConfirmModal from "../confirm-modal/ConfirmModal";

const ViewCustomerModal = ({ show, onClose, customer }) => {
  const [showModal, setShowModal] = useState(false);
  const [showCustomerView, setShowCustomerView] = useState(false);
  const [customerStatus, setCustomerStatus] = useState("");
  const [customerItems, setCustomerItems] = useState([]);

  console.log("customer", customer);

  useEffect(() => {
    if (customer) {
      setCustomerStatus(customer.isApproved ? "Approved" : "Pending");
      setCustomerItems(customer.customerItems);
    }
  }, [customer]);

  const handleConfirmationModel = () => {
    setShowModal(!showModal);
  };

  const handleCustomerView = () => {
    setShowCustomerView(!showCustomerView);
  };

  const customerData = {};

  if (!customer) return null; // Return null if no customer is provided

  console.log("Customer", customer);
  console.log("customer.customerItems", customer.customerItems);

  return (
    <Modal show={show} onHide={onClose} size="md" scrollable>
      <Modal.Header closeButton style={{ backgroundColor: "#edf2fd" }}>
        {showModal ? (
          <Modal.Title>Confirm Save Changes</Modal.Title>
        ) : (
          <Modal.Title>Customer Details - {customer.fullName}</Modal.Title>
        )}
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#f7f8ff" }}>
        {showModal ? (
          <div>
            <span>Are you sure you want to save changes?</span>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "20px",
              }}
            >
              <Button
                variant="warning"
                onClick={handleConfirmationModel}
                style={{ minWidth: "80px", marginRight: "10px" }}
              >
                No
              </Button>
              <Button
                variant="success"
                onClick={handleConfirmationModel}
                style={{ minWidth: "80px" }}
              >
                Yes
              </Button>
            </div>
          </div>
        ) : (
          <>
            {showCustomerView ? (
              <></>
            ) : (
              <div>
                <p>
                  <strong>Customer ID: {customer.userId}</strong>
                </p>
                <p>
                  <strong>Full Name:</strong> ${customer.fullName}
                </p>
                <p>
                  <strong>E-mail:</strong> {customer.email}
                </p>
                <p>
                  <strong>Rating:</strong> {customer.email}
                </p>
                <p>
                  <strong>Customer Status:</strong>{" "}
                  <select
                    style={{
                      padding: "5px 10px",
                      bcustomerRadius: "20px",
                      marginLeft: "10px",
                    }}
                    value={customerStatus}
                    onChange={(e) => setCustomerStatus(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="Approved">Approved</option>
                    <option value="Pending">Pending</option>
                  </select>
                </p>
              </div>
            )}
          </>
        )}
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#edf2fd" }}>
        {!showModal && (
          <>
            {/* <span>
              <Button variant="danger" onClick={onClose}>
                Delete this Customer
              </Button>
            </span> */}
            <span>
              <Button variant="primary" onClick={handleConfirmationModel}>
                Save Changes
              </Button>
            </span>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ViewCustomerModal;
