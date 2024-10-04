import React, { useState } from "react";
import { Modal, Row, Col } from "react-bootstrap";

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
          <Modal.Title>Listening Preview</Modal.Title>
        </Modal.Header>

        {productData ? (
          <Modal.Body
            style={{ backgroundColor: "#f7f8ff", minHeight: "550px" }}
          >
            <Row>
              <Col sm={12} md={12} lg={6}>
                <div className="custom-padding-prod-img">
                  <Row>
                    <Col sm={12}>
                      {" "}
                      <img
                        src={selectedImg}
                        alt="Uploaded preview"
                        className="img-fluid custom-img"
                      />
                    </Col>
                  </Row>
                  <Row className="g-0 cmt-10 justify-content-center">
                    {productData.imageUrls &&
                      productData.imageUrls.map((imgURL, index) => (
                        <Col
                          xs={2}
                          sm={2}
                          key={index}
                          onMouseEnter={() => handleMouseEnter(imgURL)}
                        >
                          <img
                            src={imgURL}
                            alt={`Uploaded preview ${index}`}
                            className="img-fluid custom-img-preview"
                          />
                        </Col>
                      ))}
                  </Row>
                </div>
              </Col>
              <Col sm={12} md={12} lg={6}>
                <Row>
                  {" "}
                  <div className="d-flex flex-row">
                    <p className="product-viewe-title">{productData.name}</p>
                    <div className="cmt-10">
                      <span
                        className={
                          productData.isActive
                            ? "product-viewe-title-status-active"
                            : "product-viewe-title-status-inactive"
                        }
                      >
                        {productData.isActive ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </div>{" "}
                  <p style={{ fontWeight: "normal", marginTop: "-25px" }}>
                    {productData.productId}
                  </p>{" "}
                  <p style={{ fontWeight: "bold", marginTop: "-13px" }}>
                    {productData.categoryID}
                  </p>{" "}
                </Row>
                <Row>
                  {" "}
                  <div className="d-flex flex-row">
                    <p className="product-view-price">LKR</p>{" "}
                    {/* check this again */}
                    <p className="product-view-amount">{productData.price}</p>
                    <p className="product-view-price"> .00</p>
                  </div>
                </Row>
                <Row>
                  {" "}
                  <div className="d-flex flex-row">
                    <p className="fw-bold">
                      Available quantity : {productData.quantity}
                    </p>{" "}
                  </div>
                </Row>
                <Row>
                  {" "}
                  <div className="d-flex flex-row">
                    <p>{productData.description}</p>{" "}
                  </div>
                </Row>
              </Col>
            </Row>
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
