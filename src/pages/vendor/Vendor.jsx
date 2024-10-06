import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import ConfirmModal from "../../components/confirm-modal/ConfirmModal";
import AddVendorModal from "../../components/vendor/AddVendor";
import ViewVendorModal from "../../components/vendor/ViewVendor";

const Vendor = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRating, setSelectedRating] = useState();
  const [showAddVendorModal, setShowAddVendorModal] = useState(false);
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [showAddConfirmModal, setShowAddConfirmModal] = useState(false);
  const [showEditConfirmModal, setShowEditConfirmModal] = useState(false);
  const [vendors, setVendors] = useState([
    {
      id: 1,
      name: "Vendor 1",
      rating: 1,
      country: "Sri lanka",
      comments: [
        {
          cusId: 1,
          comment: "Good vendor",
        },
        {
          cusId: 2,
          comment: "Bad vendor",
        },
        {
          cusId: 3,
          comment: "Average vendor",
        },
      ],
    },
    {
      id: 2,
      name: "Vendor 2",
      rating: 2,
      country: "China",
      comments: [
        {
          cusId: 1,
          comment: "Good vendor",
        },
        {
          cusId: 2,
          comment: "Bad vendor",
        },
        {
          cusId: 3,
          comment: "Average vendor",
        },
      ],
    },
    {
      id: 3,
      name: "Vendor 3",
      rating: 5,
      country: "Japan",
      comments: [
        {
          cusId: 1,
          comment: "Good vendor",
        },
        {
          cusId: 2,
          comment: "Bad vendor",
        },
        {
          cusId: 3,
          comment: "Average vendor",
        },
      ],
    },
  ]);
  const [newVendorData, setNewVendorData] = useState(null);
  const [editVendorId, setEditVendorId] = useState(null);

  // Function to handle adding a new vendor or editing an existing one
  const handleAddVendor = (vendor) => {
    if (editVendorId !== null) {
      // Edit mode
      setNewVendorData(vendor);
      setShowEditConfirmModal(true);
      setShowAddVendorModal(false);
    } else {
      // Add mode
      setNewVendorData(vendor);

      setShowAddConfirmModal(true);
      setShowAddVendorModal(false);
    }
  };

  const handleVendorViewModal = (vendor) => {
    setShowVendorModal(!showVendorModal);
  };
  const handleAddVendorOnConfirm = () => {
    console.log("Adding new vendor", newVendorData);
    setVendors((prevVendors) => [...prevVendors, newVendorData]);
    setShowAddVendorModal(false);
  };

  const handleEditVendorOnConfirm = () => {
    console.log("Updating exsisting vendor", newVendorData);
    setVendors((prevVendors) =>
      prevVendors.map((p) => (p.id === newVendorData.id ? newVendorData : p))
    );
    setEditVendorId(null); // Reset edit mode
    setShowAddVendorModal(false);
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Function to handle rating filter change
  const handleRatingChange = (e) => {
    setSelectedRating(e.target.value);
  };

  // Function to filter vendors based on search query and rating
  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchQuery) ||
      vendor.vendor.toLowerCase().includes(searchQuery) ||
      vendor.price.toString().includes(searchQuery);

    const matchesRating = selectedRating
      ? vendor.rating.toString() === selectedRating
      : true;

    return matchesSearch && matchesRating;
  });

  // Function to handle edit button click
  const handleEdit = (id) => {
    const vendorToEdit = vendors.find((vendor) => vendor.id === id);
    setNewVendorData(vendorToEdit);
    setEditVendorId(id);
    setShowAddVendorModal(true); // Open the modal
  };

  // Function to handle delete button click
  const handleDelete = (id) => {
    console.log(`Delete vendor with ID: ${id}`);
    setShowModal(true);
  };

  const handleAdd = () => {
    console.log("Add new vendor button clicked");
    // Reset the vendor data to clear the fields
    setNewVendorData({ id: "", name: "", vendor: "", price: "", rating: 1 }); // Reset fields
    setEditVendorId(null); // Ensure edit mode is reset
    setShowAddVendorModal(true);
  };

  const handleToggleStatus = (id) => {
    const updatedVendors = vendors.map((vendor) =>
      vendor.id === id ? { ...vendor, status: !vendor.status } : vendor
    );

    setVendors(updatedVendors); // Update the main vendors state
  };

  return (
    <div className="px-4 my-4">
      {/* Header text */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>List of All Vendors</h1>
        <Button variant="primary" onClick={handleAdd}>
          Create a Vendor
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
        <h4>Search Vendors</h4>
        <div className="d-flex justify-content-between align-items-center">
          <input
            type="text"
            className="form-control w-25"
            placeholder="Search by name, vendor, or price"
            onChange={handleSearchChange}
          />

          {/* Filter by Rating */}
          <select
            className="form-select w-25"
            value={selectedRating}
            onChange={handleRatingChange}
          >
            <option value="">Filter by Rating</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div>
        {/* Vendor Table */}
        <Table bordered hover>
          <thead>
            <tr>
              <th>Vendor ID</th>
              <th>Vendor Name</th>
              <th>Country</th>
              <th>Rating</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredVendors.map((vendor) => (
              <tr key={vendor.id} onClick={() => console.log(vendor.id)}>
                <td onClick={handleVendorViewModal}>{vendor.id}</td>
                <td onClick={handleVendorViewModal}>{vendor.name}</td>
                <td onClick={handleVendorViewModal}>{vendor.country}</td>
                <td onClick={handleVendorViewModal}>{vendor.rating}</td>
                <td>
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => handleEdit(vendor.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(vendor.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Add Vendor Modal */}
      <AddVendorModal
        show={showAddVendorModal}
        onClose={() => setShowAddVendorModal(false)}
        onAddVendor={handleAddVendor}
        initialData={newVendorData} // Pass the vendor data to be edited
      />

      <ViewVendorModal show={showVendorModal} onClose={handleVendorViewModal} />

      {/* Confirmation of delete vendor */}
      <ConfirmModal
        show={showModal}
        title="Delete Vendor"
        body="Are you sure you want to delete this vendor?"
        onConfirm={() => {
          console.log("Delete confirmed");
          setShowModal(false);
        }}
        onClose={() => {
          console.log("Delete cancelled");
          setShowModal(false);
        }}
      />

      {/* Confirmation of add new vendor */}
      <ConfirmModal
        show={showAddConfirmModal}
        title="Confirm New Vendor"
        body="Are you sure you want to add this vendor?"
        onConfirm={() => {
          console.log("Create confirmed");
          handleAddVendorOnConfirm(newVendorData);
          setShowAddConfirmModal(false);
        }}
        onClose={() => {
          console.log("Create cancelled");
          setShowAddConfirmModal(false);
        }}
      />

      {/* Confirmation of edit vendor */}
      <ConfirmModal
        show={showEditConfirmModal}
        title="Confirm Edit Vendor"
        body="Are you sure you want to update this vendor?"
        onConfirm={() => {
          console.log("Update confirmed");
          handleEditVendorOnConfirm(newVendorData);
          setShowEditConfirmModal(false);
        }}
        onClose={() => {
          console.log("Update cancelled");
          setShowEditConfirmModal(false);
        }}
      />
    </div>
  );
};

export default Vendor;
