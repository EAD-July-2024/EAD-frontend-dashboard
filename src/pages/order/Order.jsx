import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import ConfirmModal from "../../components/confirm-modal/ConfirmModal";
import AddOrderModal from "../../components/order/AddOrder";
import ViewOrderModal from "../../components/order/ViewOrder";

const Order = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddOrderModal, setShowAddOrderModal] = useState(false);
  const [showAddConfirmModal, setShowAddConfirmModal] = useState(false);
  const [showEditConfirmModal, setShowEditConfirmModal] = useState(false);
  const [showCancelConfirmModal, setShowCancelConfirmModal] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [cancelOrderId, setCancelOrderId] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  const [Orders, setOrders] = useState([
    {
      id: 1,
      name: "Order 1",
      total: 100,
      status: "Processing",
      placed_date: "2021-10-10",
      products: [
        { id: 1, name: "Product 1", price: 50, quantity: 2 },
        { id: 2, name: "Product 2", price: 50, quantity: 7 },
        { id: 13, name: "Product 13", price: 50, quantity: 1 },
        { id: 14, name: "Product 14", price: 60, quantity: 20 },
      ],
    },
    {
      id: 2,
      name: "Order 2",
      total: 150,
      status: "Dispatched",
      placed_date: "2021-10-10",
      products: [
        { id: 3, name: "Product 3", price: 50, quantity: 2 },
        { id: 8, name: "Product 8", price: 50, quantity: 2 },
        { id: 5, name: "Product 5", price: 50, quantity: 2 },
      ],
    },
    {
      id: 3,
      name: "Order 3",
      total: 200,
      status: "Delivered",
      placed_date: "2021-10-10",
      products: [
        { id: 6, name: "Product 6", price: 50, quantity: 6 },
        { id: 11, name: "Product 11", price: 50, quantity: 1 },
        { id: 4, name: "Product 4", price: 50, quantity: 4 },
        { id: 9, name: "Product 9", price: 50, quantity: 2 },
      ],
    },
    {
      id: 4,
      name: "Order 4",
      total: 260,
      status: "Cancelled",
      placed_date: "2021-10-10",
      products: [
        { id: 10, name: "Product 10", price: 50, quantity: 2 },
        { id: 7, name: "Product 7", price: 50, quantity: 10 },
        { id: 12, name: "Product 12", price: 50, quantity: 5 },
      ],
    },
  ]);
  const [newOrderData, setNewOrderData] = useState(null);
  const [editOrderId, setEditOrderId] = useState(null);

  // Function to handle adding a new Order or editing an existing one
  const handleAddOrder = (Order) => {
    if (editOrderId !== null) {
      // Edit mode
      setNewOrderData(Order);
      setShowEditConfirmModal(true);
      setShowAddOrderModal(false);
    } else {
      // Add mode
      setNewOrderData(Order);
      setShowAddConfirmModal(true);
      setShowAddOrderModal(false);
    }
  };

  const handleAddOrderOnConfirm = () => {
    console.log("Adding new Order", newOrderData);
    setOrders((prevOrders) => [...prevOrders, newOrderData]);
    setShowAddOrderModal(false);
  };

  const handleCancelOrderOnConfirm = () => {
    console.log("Cancelling existing Order:", cancelOrderId);

    // Find the order to cancel
    const orderToCancel = Orders.find((p) => p.id === cancelOrderId);

    if (!orderToCancel) {
      console.error("Order not found!");
      return;
    }

    // Create updated order data
    const updatedOrderData = {
      ...orderToCancel,
      status: "Cancelled",
    };

    // Update the orders state with the modified order data
    setOrders((prevOrders) =>
      prevOrders.map((p) => (p.id === cancelOrderId ? updatedOrderData : p))
    );

    setShowCancelConfirmModal(false);
  };

  const handleEditOrderOnConfirm = () => {
    console.log("Updating exsisting Order", newOrderData);
    setOrders((prevOrders) =>
      prevOrders.map((p) => (p.id === newOrderData.id ? newOrderData : p))
    );
    setEditOrderId(null);
    setShowAddOrderModal(false);
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Function to filter Orders based on search query and rating
  const filteredOrders = Orders.filter((Order) => {
    if (!Order) return false;

    const matchesSearch =
      Order.name.toLowerCase().includes(searchQuery) ||
      Order.total.toString().includes(searchQuery);

    const matchesStatus = selectedStatus
      ? Order.status.toLowerCase() === selectedStatus.toLowerCase()
      : true;
    return matchesSearch && matchesStatus;
  });

  // Function to handle cancel button click
  const handleCancel = (id) => {
    console.log(`Cancel Order with ID: ${id}`);
    setCancelOrderId(id);
    setShowCancelConfirmModal(true);
  };

  // Function to handle edit button click
  const handleEdit = (id) => {
    const OrderToEdit = Orders.find((Order) => Order.id === id);
    setNewOrderData(OrderToEdit);
    setEditOrderId(id);
    setShowAddOrderModal(true); // Open the modal
  };

  // Function to handle delete button click
  const handleDelete = (id) => {
    console.log(`Delete Order with ID: ${id}`);
    setShowModal(true);
  };

  const handleAdd = () => {
    console.log("Add new Order button clicked");
    // Reset the Order data to clear the fields
    setNewOrderData({ id: "", name: "", vendor: "", total: "", rating: 1 }); // Reset fields
    setEditOrderId(null); // Ensure edit mode is reset
    setShowAddOrderModal(true);
  };

  const handleOrderClick = (e, id) => {
    e.preventDefault();
    console.log(`Order with ID: ${id} clicked`);
    setShowOrderModal(true);
  };

  // Function to handle displaying order details
  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderModal(true);
  };

  return (
    <div className="px-4 my-4">
      {/* Header text */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>List of All Orders</h1>
        <Button variant="primary" onClick={handleAdd}>
          Add New Order
        </Button>
      </div>

      {/* Filters */}
      <div
        className="mb-4"
        style={{
          backgroundColor: "#edf2fd",
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <h4>Search Orders</h4>
        <div className="d-flex justify-content-between align-items-center">
          <input
            type="text"
            className="form-control w-25"
            placeholder="Search by name or total price"
            onChange={handleSearchChange}
          />

          {/* Filter by Status */}
          <select
            className="form-select w-25"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">Filter by Status</option>
            <option value="processing">Processing</option>
            <option value="dispatched">Dispatched</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div>
        {/* Order Table */}
        <Table
          bordered
          hover
          style={{ backgroundColor: "#edf2fd" }}
          className="custom-table"
        >
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Order Name</th>
              <th>Total Price</th>
              <th>Placed Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((Order) => (
              <tr key={Order.id} onClick={() => handleViewDetails(Order)}>
                <td>{Order.id}</td>
                <td>{Order.name}</td>
                <td>{Order.total}</td>
                <td>{Order.placed_date}</td>
                <td>{Order.status}</td>

                <td>
                  <Button
                    disabled={Order.status === "Cancelled"}
                    variant="secondary"
                    className="me-2"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents the click from bubbling up to the row
                      handleCancel(Order.id);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(Order.id);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(Order.id);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Add Order Modal */}
      <AddOrderModal
        show={showAddOrderModal}
        onClose={() => setShowAddOrderModal(false)}
        onAddOrder={handleAddOrder}
        initialData={newOrderData}
      />

      {/* Confirmation of delete Order */}
      <ConfirmModal
        show={showModal}
        title="Delete Order"
        body="Are you sure you want to delete this Order?"
        onConfirm={() => {
          console.log("Delete confirmed");
          setShowModal(false);
        }}
        onClose={() => {
          console.log("Delete cancelled");
          setShowModal(false);
        }}
      />

      {/* Confirmation of add new Order */}
      <ConfirmModal
        show={showAddConfirmModal}
        title="Confirm New Order"
        body="Are you sure you want to add this Order?"
        onConfirm={() => {
          console.log("Create confirmed");
          handleAddOrderOnConfirm(newOrderData);
          setShowAddConfirmModal(false);
        }}
        onClose={() => {
          console.log("Create cancelled");
          setShowAddConfirmModal(false);
        }}
      />

      {/* Confirmation of cancel Order */}
      <ConfirmModal
        show={showCancelConfirmModal}
        title="Confirm Cancel Order"
        body="Are you sure you want to cancel this Order?"
        onConfirm={() => {
          console.log("Cancel confirmed");
          handleCancelOrderOnConfirm();
          setCancelOrderId("");
        }}
        onClose={() => {
          console.log("Update cancelled");
          setCancelOrderId("");
          setShowCancelConfirmModal(false);
        }}
      />

      {/* Confirmation of edit Order */}
      <ConfirmModal
        show={showEditConfirmModal}
        title="Confirm Edit Order"
        body="Are you sure you want to update this Order?"
        onConfirm={() => {
          console.log("Update confirmed");
          handleEditOrderOnConfirm(newOrderData);
          setShowEditConfirmModal(false);
        }}
        onClose={() => {
          console.log("Update cancelled");
          setShowEditConfirmModal(false);
        }}
      />

      {/* View Order Modal */}
      <ViewOrderModal
        show={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        order={selectedOrder}
      />
    </div>
  );
};

export default Order;
