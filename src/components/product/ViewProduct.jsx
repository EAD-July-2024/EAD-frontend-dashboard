import React, { useState } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import ProductViewContent from "./productViewContent";
// const vendorOptions = [
//   { value: "V0001", label: "Vendor 1" },
//   { value: "V0002", label: "Vendor 2" },
//   { value: "V0003", label: "Vendor 3" },
// ];

// const categoryOptions = [
//   { value: "CAT001", label: "Electronics" },
//   { value: "CAT002", label: "Clothing" },
//   { value: "CAT003", label: "Beauty & Personal Care" },
//   { value: "CAT004", label: "Home & Kitchen" },
// ];

const ViewProduct = ({ show, onClose, productData }) => {
  const [selectedImg, setSelectedImg] = useState(
    productData && productData.imageUrls[0]
  );

  const handleMouseEnter = (imgURL) => {
    setSelectedImg(imgURL);
  };

  console.log("productData: ", productData);

  return (
    <>
      <Modal show={show} onHide={onClose} size="xl" scrollable>
        <Modal.Header closeButton style={{ backgroundColor: "#edf2fd" }}>
          <Modal.Title>Product Preview</Modal.Title>
        </Modal.Header>

        {productData ? (
          <Modal.Body
            style={{ backgroundColor: "#f7f8ff", minHeight: "550px" }}
          >
            <ProductViewContent productData={productData} />
          </Modal.Body>
        ) : (
          <div
            className="spinner-border"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ViewProduct;
