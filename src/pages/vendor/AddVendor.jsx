import React, { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddVendorModal = ({ show, onClose, onAddVendor, initialData }) => {
  const [vendorData, setVendorData] = React.useState(initialData);

  // Update vendor data state on initialData change (for editing)
  useEffect(() => {
    setVendorData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorData({ ...vendorData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddVendor(vendorData);
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton style={{ backgroundColor: "#edf2fd" }}>
        <Modal.Title>
          {initialData?.id ? "Edit Vendor" : "Add New Vendor"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#f7f8ff" }}>
        <Form onSubmit={handleSubmit}>
          {/* Editable Vendor ID for Adding New Vendor */}
          <Form.Group controlId="vendorId">
            <Form.Label>Vendor ID</Form.Label>
            <Form.Control
              type="text"
              name="id"
              value={vendorData?.id || ""}
              onChange={handleChange}
              disabled={!!initialData?.id} // Disable if editing
              required
            />
          </Form.Group>

          <Form.Group controlId="vendorName" className="mt-2">
            <Form.Label>Vendor Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={vendorData?.name || ""}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="vendor" className="mt-2">
            <Form.Label>Vendor</Form.Label>
            <Form.Control
              type="text"
              name="vendor"
              value={vendorData?.vendor || ""}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="price" className="mt-2">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={vendorData?.price || ""}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="rating" className="mt-2">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              as="select"
              name="rating"
              value={vendorData?.rating || 1}
              onChange={handleChange}
              required
            >
              <option value="1">1 Star</option>
              <option value="2">2 Stars</option>
              <option value="3">3 Stars</option>
              <option value="4">4 Stars</option>
              <option value="5">5 Stars</option>
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-4">
            {initialData?.id ? "Update" : "Add Vendor"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddVendorModal;
