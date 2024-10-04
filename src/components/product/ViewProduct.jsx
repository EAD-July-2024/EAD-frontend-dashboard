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

const ViewProduct = ({
  show,
  onClose,
  onAddProduct,
  initialData,
  editModal,
  selectedImages,
  setSelectedImages,
}) => {
  const imgURLList = [
    "https://eadbucket.s3.amazonaws.com/ProductImages/P15120_image_0.jpg",
    "https://eadbucket.s3.amazonaws.com/ProductImages/P15120_image_1.jpg",
    "https://eadbucket.s3.amazonaws.com/ProductImages/P15120_image_2.jpg",
    "https://eadbucket.s3.amazonaws.com/ProductImages/P15120_image_0.jpg",
    "https://eadbucket.s3.amazonaws.com/ProductImages/P15120_image_2.jpg",
  ];

  const [productData, setProductData] = useState(initialData);
  // const [selectedImages, setSelectedImages] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedImg, setSelectedImg] = useState(imgURLList[0]);

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
  const handleMouseEnter = (imgURL) => {
    setSelectedImg(imgURL);
  };

  return (
    <>
      <Modal show={show} onHide={handleConfirmClose} size="xl" scrollable>
        <Modal.Header closeButton style={{ backgroundColor: "#edf2fd" }}>
          <Modal.Title>Listening Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#f7f8ff", minHeight: "550px" }}>
          <Form onSubmit={handleSubmit}>
            <Row>
              {/* Left Half - Product Details */}
              <Col sm={12} md={12} lg={6}>
                <div className="custom-padding-prod-img">
                  <Row>
                    <Col sm={12}>
                      {" "}
                      <img
                        src={selectedImg}
                        alt="Uploaded preview"
                        class="img-fluid custom-img"
                      />
                    </Col>
                  </Row>
                  <Row className="g-0 cmt-10 justify-content-center">
                    {imgURLList.map((imgURL, index) => (
                      <Col
                        xs={2}
                        sm={2}
                        key={index}
                        onMouseEnter={() => handleMouseEnter(imgURL)}
                      >
                        <img
                          src={imgURL}
                          alt={`Uploaded preview ${index}`}
                          class="img-fluid custom-img-preview"
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
                    <p className="product-viewe-title">Product Name </p>
                    <div className="cmt-10">
                      {false ? (
                        <span className="product-viewe-title-status-active ">
                          active
                        </span>
                      ) : (
                        <span className="product-viewe-title-status-inactive ">
                          inactive
                        </span>
                      )}
                    </div>
                  </div>{" "}
                  <p style={{ fontWeight: "normal", marginTop: "-25px" }}>
                    P00125
                  </p>{" "}
                  <p style={{ fontWeight: "bold", marginTop: "-13px" }}>
                    Category
                  </p>{" "}
                </Row>
                <Row>
                  {" "}
                  <div className="d-flex flex-row">
                    <p className="product-view-price">LKR</p>{" "}
                    <p className="product-view-amount"> 4500</p>
                    <p className="product-view-price"> .00</p>
                  </div>
                </Row>
                <Row>
                  {" "}
                  <div className="d-flex flex-row">
                    <p class="fw-bold">Available quantity : 4500</p>{" "}
                  </div>
                </Row>
                <Row>
                  {" "}
                  <div className="d-flex flex-row">
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's
                      standard dummy text ever since the 1500s, when an unknown
                      printer took a galley of type and scrambled it to make a
                      type specimen book. It has survived not only five
                      centuries, but also the leap into electronic typesetting,
                      remaining essentially unchanged. It was popularised in the
                      1960s with the release of Letraset sheets containing Lorem
                      Ipsum passages, and more recently with desktop publishing
                      software like Aldus PageMaker including versions of Lorem
                      Ipsum.
                    </p>{" "}
                  </div>
                </Row>
              </Col>

              {/* Right Half - Image Upload */}
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ViewProduct;
