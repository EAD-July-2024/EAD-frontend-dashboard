import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import Select from "react-select";

const vendorOptions = [
  { value: "V0001", label: "Vendor 1" },
  { value: "V0002", label: "Vendor 2" },
  { value: "V0003", label: "Vendor 3" },
];

const categoryOptions = [
  { value: "CAT001", label: "Electronics" },
  { value: "CAT002", label: "Clothing" },
  { value: "CAT003", label: "Beauty & Personal Care" },
  { value: "CAT004", label: "Home & Kitchen" },
];

const AddProductModal = ({
  show,
  onClose,
  onAddProduct,
  initialData,
  editModal,
  selectedImages,
  setSelectedImages,
}) => {
  const [productData, setProductData] = useState(initialData);
  // const [selectedImages, setSelectedImages] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleModalClose = () => {
    setShowConfirm(true);
  };

  const handleConfirmClose = () => {
    setProductData({});
    setSelectedImages([]);
    setShowConfirm(false);
    onClose();
  };

  const handleCancelClose = () => {
    setShowConfirm(false);
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + selectedImages.length > 5) {
      alert("You can upload up to 5 images.");
      return;
    }
    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));
    setSelectedImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
  };

  const handleReplaceImage = (index, e) => {
    const file = e.target.files[0];
    const newImages = [...selectedImages];
    newImages[index] = { file, url: URL.createObjectURL(file) };
    setSelectedImages(newImages);
  };

  // Handle vendor select
  const handleVendorChange = (selectedOption) => {
    handleChange({
      target: {
        name: "vendor",
        value: selectedOption?.value || "",
      },
    });
  };

  // Handle category select
  const handleCategoryChange = (selectedOption) => {
    handleChange({
      target: { name: "category", value: selectedOption?.value || "" },
    });
  };

  useEffect(() => {
    setProductData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = (e) => {
    console.log("SSSSSS: ", productData);
    console.log("selectedImages: ", selectedImages);
    e.preventDefault();
    onAddProduct(productData, selectedImages);
  };

  return (
    <>
      <Modal show={show} onHide={handleModalClose} size="xl" scrollable>
        <Modal.Header closeButton style={{ backgroundColor: "#edf2fd" }}>
          <Modal.Title>
            {initialData?.id ? "Edit Product" : "Add New Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#f7f8ff" }}>
          <Form onSubmit={handleSubmit}>
            <Row>
              {/* Left Half - Product Details */}
              <Col md={6}>
                {editModal === true && (
                  <Form.Group controlId="productId">
                    <Form.Label>Product ID</Form.Label>
                    <Form.Control
                      type="text"
                      name="id"
                      value={productData?.id || ""}
                      onChange={handleChange}
                      disabled
                    />
                  </Form.Group>
                )}

                <Form.Group controlId="productName" className="mt-2">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={productData?.name || ""}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="vendor" className="mt-2">
                  <Form.Label>Vendor</Form.Label>
                  <Select
                    options={vendorOptions}
                    value={
                      vendorOptions.find(
                        (option) => option.value === productData?.vendor
                      ) || null
                    }
                    onChange={handleVendorChange}
                    isSearchable={true}
                    placeholder="Select a vendor"
                  />
                </Form.Group>

                <Form.Group controlId="category" className="mt-2">
                  <Form.Label>Category</Form.Label>
                  <Select
                    options={categoryOptions}
                    value={
                      categoryOptions.find(
                        (option) => option.value === productData?.category
                      ) || null
                    }
                    onChange={handleCategoryChange}
                    isSearchable={true}
                    placeholder="Select a category"
                  />
                </Form.Group>

                <Form.Group controlId="price" className="mt-2">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={productData?.price || ""}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="description" className="mt-2">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={productData?.description || ""}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="status" className="mt-2">
                  <Form.Label>Status</Form.Label>
                  <Form.Check
                    type="switch"
                    id="status"
                    name="status"
                    label={productData?.status ? "Active" : "Inactive"}
                    checked={productData?.status || false}
                    onChange={(e) =>
                      handleChange({
                        target: {
                          name: "status",
                          value: e.target.checked,
                        },
                      })
                    }
                  />
                </Form.Group>
              </Col>

              {/* Right Half - Image Upload */}
              <Col md={6}>
                <Form.Group controlId="images" className="mt-2">
                  <Form.Label>Images (Max 5)</Form.Label>
                  <Form.Control
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={selectedImages && selectedImages.length >= 5}
                  />
                  <div className="mt-3">
                    {selectedImages.map((image, index) => (
                      <div key={index} className="mb-2">
                        <img
                          src={image.url}
                          alt={`Uploaded preview ${index + 1}`}
                          style={{
                            width: "200px",
                            height: "150px",
                            objectFit: "cover",
                            marginRight: "10px",
                          }}
                        />
                        <Button
                          variant="danger"
                          size="sm"
                          className="me-2"
                          onClick={() => handleRemoveImage(index)}
                        >
                          Remove
                        </Button>
                        <Form.Control
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleReplaceImage(index, e)}
                          style={{ display: "inline-block", width: "200px" }}
                        />
                      </div>
                    ))}
                  </div>
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" type="submit" className="mt-4">
              {initialData?.id ? "Update" : "Add Product"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Confirmation Modal */}
      <Modal show={showConfirm} onHide={handleCancelClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Close</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to close? Any unsaved changes will be lost.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddProductModal;
