import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import ConfirmModal from "../../components/confirm-modal/ConfirmModal";
import ProductViewContent from "../product/productViewContent";
const ViewOrderModal = ({ show, onClose, order }) => {
  const [showModal, setShowModal] = useState(false);
  const [showProductView, setShowProductView] = useState(false);
  const handleConfirmationModel = () => {
    setShowModal(!showModal);
  };

  const handleProductView = () => {
    setShowProductView(!showProductView);
  };

  const productData = {};

  if (!order) return null; // Return null if no order is provided

  return (
    <Modal show={show} onHide={onClose} size="xl" scrollable>
      <Modal.Header closeButton style={{ backgroundColor: "#edf2fd" }}>
        <Modal.Title>Order Details - {order.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#f7f8ff" }}>
        {showModal ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              minHeight: "400px",
            }}
          >
            <div
              style={{
                width: "400px",
                height: "250px",
                border: "2px solid ",
                borderRadius: "20px",
                display: "flex",

                alignItems: "center",
                alignContent: "center",
                flexDirection: "column",
              }}
            >
              <span style={{ marginTop: "100px" }}>
                Are you sure you want to save changes ?
              </span>
              <span
                style={{
                  marginTop: "50px",
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "right",
                  width: "100%",
                  padding: "10px",
                  gap: "20px",
                }}
              >
                {" "}
                <Button variant="success" onClick={handleConfirmationModel}>
                  yes
                </Button>
                <Button variant="danger" onClick={handleConfirmationModel}>
                  no
                </Button>
              </span>
            </div>
          </div>
        ) : (
          <>
            {showProductView ? (
              <>
                {" "}
                <ProductViewContent productData={productData} />
              </>
            ) : (
              <>
                {" "}
                <div style={{ minHeight: "400px" }}>
                  {" "}
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
                    <strong>Order Status:</strong>{" "}
                    <select
                      style={{
                        padding: "5px 10px",
                        borderRadius: "20px",
                        marginLeft: "10px",
                      }}
                    >
                      <option value="">All</option>
                      <option value="processing">Processing</option>
                      <option value="dispatched">Dispatched</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </p>
                  <Button variant="danger" onClick={onClose}>
                    Delete this Order
                  </Button>
                  <p style={{ marginTop: "20px" }}>
                    <strong>Products:</strong>
                  </p>
                  <Table
                    bordered
                    hover
                    style={{ backgroundColor: "#edf2fd" }}
                    className="custom-table"
                  >
                    <thead>
                      <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Vendor</th>
                        <th>Price</th>
                        <th>quantity</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ cursor: "pointer" }}>
                        <td onClick={handleProductView}>ssda</td>
                        <td onClick={handleProductView}>sad</td>
                        <td onClick={handleProductView}>asd</td>
                        <td onClick={handleProductView}>asd</td>
                        <td onClick={handleProductView}>asd</td>

                        <td>
                          <select
                            style={{
                              padding: "5px 10px",
                              borderRadius: "20px",
                            }}
                          >
                            <option value="">All</option>
                            <option value="processing">Processing</option>
                            <option value="dispatched">Dispatched</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </>
            )}
          </>
        )}
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#edf2fd" }}>
        {!showModal && (
          <span>
            {" "}
            <Button variant="primary" onClick={handleConfirmationModel}>
              Save
            </Button>
          </span>
        )}{" "}
      </Modal.Footer>
      {/* <ConfirmModal
        show={showModal}
        title="Change Order Status"
        body="Are you sure you want to change Order Status?"
        onConfirm={handleConfirmationModel}
        onClose={handleConfirmationModel}
      /> */}
    </Modal>
  );
};

export default ViewOrderModal;
