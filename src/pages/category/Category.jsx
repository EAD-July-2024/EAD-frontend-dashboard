import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import ConfirmModal from "../../components/confirm-modal/ConfirmModal";
import AddCategoryModal from "../../components/category/AddCategory";
import { CATEGORY_URLS } from "../../utils/config";
import axios from "axios";

const Category = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState();
  const [selectedImages, setSelectedImages] = useState([]);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showAddConfirmModal, setShowAddConfirmModal] = useState(false);
  const [showEditConfirmModal, setShowEditConfirmModal] = useState(false);
  const [showViewCategoryModal, setShowViewCategoryModal] = useState(false);
  const [categorys, setCategorys] = useState([]);
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [editModal, setEditModal] = useState(false);
  const [newCategoryData, setNewCategoryData] = useState(null);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [isCategoryUpdated, setIsCategoryUpdated] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Function to handle category fetch
  const fetchCategorys = async () => {
    try {
      const response = await fetch(CATEGORY_URLS.CATEGORY_GET_ALL_URL);
      const data = await response.json();
      console.log("Categorys: ", data);
      setCategorys(data);
    } catch (error) {
      console.error("Error fetching categorys", error);
    }
  };

  // Toggle function to change the status
  const handleToggleStatus = async (id) => {
    console.log("Toggling status for category with ID:", id);
    const updatedCategories = categorys.map((category) =>
      category.id === id ? { ...category, status: !category.status } : category
    );

    await axios
      .put(`${CATEGORY_URLS.CATEGORY_UPDATE_URL}/${id}`, {
        status: updatedCategories.find((category) => category.id === id).status,
      })
      .then((response) => {
        alert("Category updated successfully!");
      })
      .catch((error) => {
        alert("Something went wrong! Please try again later.");
      });
    setCategorys(updatedCategories);
  };

  // Fetch categorys on component mount
  useEffect(() => {
    fetchCategorys();
    setIsLoading(false);
  }, [isCategoryUpdated]);

  // Function to handle adding a new category or editing an existing one
  const handleAddCategory = (category, images) => {
    if (editCategoryId !== null) {
      // Edit mode
      setNewCategoryData(category);
      setSelectedImages(images);
      setShowEditConfirmModal(true);
      setShowAddCategoryModal(false);
    } else {
      // Add mode
      setNewCategoryData(category);
      setSelectedImages(images);
      setShowAddConfirmModal(true);
      setShowAddCategoryModal(false);
    }
  };

  // Function to handle adding a new category
  const handleAddCategoryOnConfirm = async () => {
    setIsLoading(true);
    setIsLoading(false);
  };

  const handleEditCategoryOnConfirm = async () => {
    console.log("Updating exsisting category", newCategoryData);
    setIsLoading(true);
    setIsLoading(false);

    setEditCategoryId(null); // Reset edit mode
    setShowAddCategoryModal(false);
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Function to handle status filter change
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  // Function to filter categorys based on search query and category
  const filteredCategories = categorys.filter((category) => {
    const matchesSearch =
      category.name.toLowerCase().includes(searchQuery) ||
      category.categoryId.toLowerCase().includes(searchQuery);

    const matchesStatus = selectedStatus
      ? category.status.toLowerCase() === selectedStatus.toLowerCase()
      : true;

    return matchesSearch && matchesStatus;
  });

  // Function to handle edit button click
  const handleEdit = (id) => {
    setEditModal(true);
    const categoryToEdit = categorys.find((category) => category.id === id);
    setNewCategoryData(categoryToEdit);
    setEditCategoryId(id);
    setShowAddCategoryModal(true);
  };

  // Function to handle delete button click
  const handleDelete = (id) => {
    console.log(`Delete category with ID: ${id}`);
    setEditCategoryId(id);
    setShowModal(true);
  };

  // Function to handle delete confirmation ///////////////////////////////////// Check this /////////////////////////////////////
  const handleDeleteConfirm = () => {
    console.log("Delete confirmed");
    axios
      .put(CATEGORY_URLS.CATEGORY_DELETE_URL, {
        data: {
          categoryId: editCategoryId,
          vendorId: JSON.parse(localStorage.getItem("auth")).userId,
          isDeleted: true,
        },
      })
      .then((response) => {
        console.log("Category deleted successfully:", response.data);
        setIsCategoryUpdated(true);
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
        alert("Failed to delete category. Please try again.");
      });

    setShowModal(false);
  };

  const handleAdd = () => {
    setEditModal(false);
    setNewCategoryData({
      id: "",
      name: "",
      vendor: "",
      price: "",
      category: "",
    });
    setSelectedImages([]);
    setEditCategoryId(null);
    setShowAddCategoryModal(true);
  };

  //handle category view
  const handleCategoryView = (id) => {
    const categoryToView = categorys.find((category) => category.id === id);
    setNewCategoryData(categoryToView);
    setShowViewCategoryModal(true);
  };

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // You can set this to any number of items per page

  // Calculate total pages based on filtered categorys
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  // Calculate the categorys for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategorys = filteredCategories.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Function to handle page change
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Function to handle displaying category details
  const handleViewDetails = (order) => {
    setSelectedCategory(order);
    setShowCategoryModal(true);
  };

  return (
    <div className="px-4 my-4">
      {/* Header text */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>List of All Categorys</h1>
        <Button variant="primary" onClick={handleAdd}>
          Add New Category
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
        <h4>Search Categorys</h4>
        <div className="d-flex justify-content-between align-items-center">
          <input
            type="text"
            className="form-control w-25"
            placeholder="Search by ID, name, or email"
            onChange={handleSearchChange}
          />

          {/* Filter by Rating */}
          <select
            className="form-select w-25"
            value={selectedStatus}
            onChange={handleStatusChange}
          >
            <option value="">Filter by Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div>
        {isLoading && !categorys ? (
          <div
            className="spinner-border"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          ></div>
        ) : (
          <>
            <Table
              bordered
              hover
              style={{ backgroundColor: "#edf2fd" }}
              className="custom-table"
            >
              <thead>
                <tr>
                  <th>Category ID</th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((category) => (
                  <tr
                    key={category.categoryId}
                    onClick={() => handleViewDetails(category)}
                    style={{ cursor: "pointer" }}
                  >
                    <td onClick={() => handleCategoryView(category.userId)}>
                      {category.categoryId}
                    </td>
                    <td onClick={() => handleCategoryView(category.userId)}>
                      {category.name}
                    </td>
                    <td onClick={() => handleCategoryView(category.userId)}>
                      <Form.Check
                        type="switch"
                        id={`custom-switch-${category.categoryId}`}
                        label={category.status}
                        defaultChecked={category.status === "Active"}
                        onChange={() => handleToggleStatus(category.categoryId)}
                      />
                    </td>

                    <td>
                      <Button
                        variant="warning"
                        className="me-2"
                        onClick={() => handleEdit(category.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(category.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* Pagination Controls */}
            <div
              className="pagination-controls"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "10px",
              }}
            >
              <Button
                style={{
                  marginLeft: "10px",
                }}
                variant="primary"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              {[...Array(totalPages)].map((_, index) => (
                <Button
                  key={index}
                  variant={currentPage === index + 1 ? "primary" : "light"}
                  onClick={() => handlePageChange(index + 1)}
                  style={{
                    marginLeft: "10px",
                  }}
                >
                  {index + 1}
                </Button>
              ))}
              <Button
                style={{
                  marginLeft: "10px",
                }}
                variant="primary"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </>
        )}
      </div>

      {/* Add Category Modal */}
      <AddCategoryModal
        show={showAddCategoryModal}
        onClose={() => setShowAddCategoryModal(false)}
        onAddCategory={handleAddCategory}
        initialData={newCategoryData}
        editModal={editModal}
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
      />
      <ConfirmModal
        show={showModal}
        title="Delete Category"
        body="Are you sure you want to delete this category?"
        onConfirm={() => {
          handleDeleteConfirm();
        }}
        onClose={() => {
          console.log("Delete cancelled");
          setShowModal(false);
        }}
        isLoading={isLoading}
      />

      {/* Confirmation of add new category */}
      <ConfirmModal
        show={showAddConfirmModal}
        title="Confirm New Category"
        body="Are you sure you want to add this category?"
        onConfirm={() => {
          console.log("Create confirmed");
          handleAddCategoryOnConfirm(newCategoryData);
          setShowAddConfirmModal(false);
        }}
        onClose={() => {
          console.log("Create cancelled");
          setShowAddConfirmModal(false);
        }}
        isLoading={isLoading}
      />

      {/* Confirmation of edit category */}
      <ConfirmModal
        show={showEditConfirmModal}
        title="Confirm Edit Category"
        body="Are you sure you want to update this category?"
        onConfirm={() => {
          console.log("Update confirmed");
          handleEditCategoryOnConfirm(newCategoryData);
          setShowEditConfirmModal(false);
        }}
        onClose={() => {
          console.log("Update cancelled");
          setShowEditConfirmModal(false);
        }}
        isLoading={isLoading}
      />

      {/* View Order Modal */}
      {/* <ViewCategoryModal
        show={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
        category={selectedCategory}
      /> */}
    </div>
  );
};

export default Category;
