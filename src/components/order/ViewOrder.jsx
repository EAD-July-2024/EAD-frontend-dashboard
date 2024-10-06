import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import ConfirmModal from "../../components/confirm-modal/ConfirmModal";
import ProductViewContent from "../product/productViewContent";

const ViewOrderModal = ({ show, onClose, order }) => {
  const [showModal, setShowModal] = useState(false);
  const [showProductView, setShowProductView] = useState(false);
  const [orderStatus, setOrderStatus] = useState("");
  const [orderItems, setOrderItems] = useState([]);

  useEffect(() => {
    if (order) {
      setOrderStatus(order.status);
      setOrderItems(order.orderItems);
    }
  }, [order]);

  const handleConfirmationModel = () => {
    setShowModal(!showModal);
  };

  const handleProductView = () => {
    setShowProductView(!showProductView);
  };

  const productData = {};

  if (!order) return null; // Return null if no order is provided

  console.log("Order", order);
  console.log("order.orderItems", order.orderItems);

  return (
    <Modal show={show} onHide={onClose} size="xl" scrollable>
      <Modal.Header closeButton style={{ backgroundColor: "#edf2fd" }}>
        <Modal.Title>Order Details - {order.orderId}</Modal.Title>
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
                Are you sure you want to save changes?
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
                <Button variant="success" onClick={handleConfirmationModel}>
                  Yes
                </Button>
                <Button variant="danger" onClick={handleConfirmationModel}>
                  No
                </Button>
              </span>
            </div>
          </div>
        ) : (
          <>
            {showProductView ? (
              <ProductViewContent productData={productData} />
            ) : (
              <div style={{ minHeight: "400px" }}>
                <p>
                  <strong>Order ID: {order.orderId}</strong>
                </p>
                <p>
                  <strong>Total Price:</strong> ${order.totalPrice}
                </p>
                <p>
                  <strong>Placed Date:</strong>{" "}
                  {new Date(order.createdDate).toISOString().split("T")[0]}
                </p>
                <p>
                  <strong>Order Status:</strong>{" "}
                  <select
                    style={{
                      padding: "5px 10px",
                      borderRadius: "20px",
                      marginLeft: "10px",
                    }}
                    value={orderStatus}
                    onChange={(e) => setOrderStatus(e.target.value)}
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
                      <th>Quantity</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems && orderItems.length > 0 ? (
                      orderItems.map((item) => (
                        <tr key={item.productId} style={{ cursor: "pointer" }}>
                          <td onClick={handleProductView}>{item.productId}</td>
                          <td onClick={handleProductView}>
                            {item.productName}
                          </td>
                          <td onClick={handleProductView}>{item.vendorId}</td>
                          <td onClick={handleProductView}>{item.price}</td>
                          <td onClick={handleProductView}>{item.quantity}</td>
                          <td>
                            <select
                              style={{
                                padding: "5px 10px",
                                borderRadius: "20px",
                              }}
                              value={item.status}
                              // onChange={(e) => {
                              //   const updatedItems = orderItems.map((i) => {
                              //     if (i.productId === item.productId) {
                              //       return { ...i, status: e.target.value };
                              //     }
                              //     return i;
                              //   });
                              //   setOrderItems(updatedItems);
                              // }}
                            >
                              <option value="">All</option>
                              <option value="processing">Processing</option>
                              <option value="dispatched">Dispatched</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6">No products found</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            )}
          </>
        )}
      </Modal.Body>
      <Modal.Footer style={{ backgroundColor: "#edf2fd" }}>
        {!showModal && (
          <span>
            <Button variant="primary" onClick={handleConfirmationModel}>
              Save
            </Button>
          </span>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ViewOrderModal;
