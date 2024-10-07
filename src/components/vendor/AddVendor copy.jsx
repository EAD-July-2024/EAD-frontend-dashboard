import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddVendorModal = ({
  show,
  onClose,
  onAddVendor,
  initialData,
  isLoading,
  onConfirm,
}) => {
  const [vendorData, setVendorData] = useState(initialData);
  const [showConfirm, setShowConfirm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newVendorData, setNewVendorData] = useState({});

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
    // console.log("Vendor Data: ", name, email, password, confirmPassword);
    // setNewVendorData({ name, email, password, confirmPassword });

    // onAddVendor(vendorData);

    setShowConfirm(true);
  };

  const btnClick = () => {
    console.log("Button Clicked");
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton style={{ backgroundColor: "#edf2fd" }}>
        {showConfirm ? (
          <Modal.Title>Confirm New Vendor</Modal.Title>
        ) : (
          <Modal.Title>
            {initialData?.id ? "Edit Vendor" : "Add New Vendor"}
          </Modal.Title>
        )}
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#f7f8ff" }}>
        {showConfirm ? (
          <>Are you sure you want to add this vendor?</>
        ) : (
          <>
            <Form onSubmit={handleSubmit}>
              {/* Editable Vendor ID for Adding New Vendor */}
              <Form.Group controlId="vendorName" className="mt-2">
                <Form.Label>Vendor Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fullName"
                  defaultValue={vendorData?.name || ""}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="vendor" className="mt-2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  defaultValue={vendorData?.email || ""}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="price" className="mt-2">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="price" className="mt-2">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>

              {/* <Form.Group controlId="rating" className="mt-2">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              name="rating"
              value={vendorData?.rating || 1}
              onChange={handleChange}
              required
            >
              <option value="">Select Role</option>
              <option value="active">Vendor</option>
              <option value="inactive">CSR</option>
            </Form.Control>
          </Form.Group> */}

              {/* <Button
                variant="primary"
                type="submit"
                className="mt-4"
                onClick={handleSubmit}
              >
                {initialData?.id ? "Update" : "Add Vendor"}
              </Button> */}
            </Form>

            {/* <Button
              variant="primary"
              type="submit"
              className="mt-4"
              onClick={btnClick}
            >
              Test btn
            </Button> */}
          </>
        )}
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#edf2fd" }}>
        {showConfirm ? (
          <Button
            variant="primary"
            type="submit"
            className="mt-4"
            onClick={() => handleSubmit}
          >
            {initialData?.id ? "Update" : "Add Vendor"}
          </Button>
        ) : (
          <>
            <Button
              variant="warning"
              onClick={setShowConfirm(false)}
              style={{ minWidth: "80px" }}
            >
              No
            </Button>
            <Button
              disabled={isLoading}
              variant={"success"}
              onClick={onConfirm}
              style={{ minWidth: "80px" }}
            >
              Yes
            </Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default AddVendorModal;
