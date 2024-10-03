import React, { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const ViewOrderModal = ({ show, onClose, order }) => {
  if (!order) return null; // Return null if no order is provided

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton style={{ backgroundColor: "#edf2fd" }}>
        <Modal.Title>Order Details - {order.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#f7f8ff" }}>
        <p>
          <strong>Order ID: {order.id}</strong>
        </p>
        <p>
          <strong>Total Price:</strong> ${order.total}
        </p>
        <p>
          <strong>Placed Date:</strong> {order.placed_date}
        </p>
        <p>
          <strong>Status:</strong> {order.status}
        </p>
        <p>
          <strong>Products:</strong>
        </p>
        <ul>
          {order.products.map((product) => (
            <li key={product.id}>
              {product.name} - ${product.price} (Quantity: {product.quantity})
            </li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#edf2fd" }}>
        <Button variant="primary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewOrderModal;
