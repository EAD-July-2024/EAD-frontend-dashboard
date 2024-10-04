import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import ConfirmModal from "../../components/confirm-modal/ConfirmModal";
import AddProductModal from "../../components/product/AddProduct";
import ViewProduct from "../../components/product/ViewProduct";
import { PRODUCT_URLS } from "../../utils/config";
import axios from "axios";

const Product = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRating, setSelectedRating] = useState();
  const [selectedImages, setSelectedImages] = useState([]);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showAddConfirmModal, setShowAddConfirmModal] = useState(false);
  const [showEditConfirmModal, setShowEditConfirmModal] = useState(false);
  const [showViewProductModal, setShowViewProductModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editModal, setEditModal] = useState(false);
  const [newProductData, setNewProductData] = useState(null);
  const [editProductId, setEditProductId] = useState(null);
  const [isProductUpdated, setIsProductUpdated] = useState(false);

  // Function to handle product fetch
  const fetchProducts = async () => {
    try {
      const response = await fetch(PRODUCT_URLS.PRODUCT_GET_ALL_URL);
      const data = await response.json();
      console.log("Products: ", data);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
    setIsLoading(false);
  }, [isProductUpdated]);

  // Function to handle adding a new product or editing an existing one
  const handleAddProduct = (product, images) => {
    if (editProductId !== null) {
      // Edit mode
      setNewProductData(product);
      setSelectedImages(images);
      setShowEditConfirmModal(true);
      setShowAddProductModal(false);
    } else {
      // Add mode
      setNewProductData(product);
      setSelectedImages(images);
      setShowAddConfirmModal(true);
      setShowAddProductModal(false);
    }
  };

  // Function to handle adding a new product
  const handleAddProductOnConfirm = async () => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", newProductData.name);
      formData.append("description", newProductData.description);
      formData.append("price", newProductData.price);
      formData.append("categoryID", newProductData.category);
      formData.append("vendorID", newProductData.vendor);
      formData.append("isActive", newProductData.status);

      // Append image files if you have any
      selectedImages.forEach((image) => {
        formData.append("images", image.file);
      });

      await axios
        .post(PRODUCT_URLS.PRODUCT_CREATE_URL, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Product added successfully:", response.data);
          setShowAddProductModal(false);
          setIsProductUpdated(true);
        });
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product. Please try again.");
    }
    setIsLoading(false);
  };

  const handleEditProductOnConfirm = () => {
    console.log("Updating exsisting product", newProductData);
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === newProductData.id ? newProductData : p))
    );
    setEditProductId(null); // Reset edit mode
    setShowAddProductModal(false);
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Function to handle category filter change
  const handleRatingChange = (e) => {
    setSelectedRating(e.target.value);
  };

  // Function to filter products based on search query and category
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery) ||
      product.vendor.toLowerCase().includes(searchQuery) ||
      product.price.toString().includes(searchQuery);

    const matchesRating = selectedRating
      ? product.category.toString() === selectedRating
      : true;

    return matchesSearch && matchesRating;
  });

  // Function to handle edit button click
  const handleEdit = (id) => {
    setEditModal(true);
    const productToEdit = products.find((product) => product.id === id);
    setNewProductData(productToEdit);
    setEditProductId(id);
    setShowAddProductModal(true);
  };

  // Function to handle delete button click
  const handleDelete = (id) => {
    console.log(`Delete product with ID: ${id}`);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditModal(false);
    setNewProductData({
      id: "",
      name: "",
      vendor: "",
      price: "",
      category: "",
    });
    setSelectedImages([]);
    setEditProductId(null);
    setShowAddProductModal(true);
  };

  const handleToggleStatus = (id) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, status: !product.status } : product
    );
    setProducts(updatedProducts);
  };

  //handle product view
  const handleProductView = (id) => {
    const productToView = products.find((product) => product.id === id);
    setNewProductData(productToView);
    setShowViewProductModal(true);
  };

  //pagination
  const itemsPerPage = 2;

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="px-4 my-4">
      {/* Header text */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>List of All Products</h1>
        <Button variant="primary" onClick={handleAdd}>
          Add New Product
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
        <h4>Search Products</h4>
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
        {isLoading && products ? (
          <div
            className="spinner-border"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          ></div>
        ) : (
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
                <th>Category</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  onClick={() => console.log(product.id)}
                  style={{ cursor: "pointer" }}
                >
                  <td
                    onClick={() => {
                      handleProductView(product.id);
                    }}
                  >
                    {product.productId}
                  </td>
                  <td
                    onClick={() => {
                      handleProductView(product.id);
                    }}
                  >
                    {product.name}
                  </td>
                  <td
                    onClick={() => {
                      handleProductView(product.id);
                    }}
                  >
                    {product.vendor}
                  </td>
                  <td
                    onClick={() => {
                      handleProductView(product.id);
                    }}
                  >
                    {product.price}
                  </td>
                  <td
                    onClick={() => {
                      handleProductView(product.id);
                    }}
                  >
                    {product.category}
                  </td>
                  <td>
                    <Form.Check
                      type="switch"
                      id={`custom-switch-${product.id}`}
                      label={product.isActive ? "Active" : "Inactive"}
                      checked={product.isActive}
                      onChange={() => handleToggleStatus(product.id)}
                    />
                  </td>
                  <td>
                    <Button
                      variant="warning"
                      className="me-2"
                      onClick={() => handleEdit(product.id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>

      {/* Add Product Modal */}
      <AddProductModal
        show={showAddProductModal}
        onClose={() => setShowAddProductModal(false)}
        onAddProduct={handleAddProduct}
        initialData={newProductData}
        editModal={editModal}
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
      />

      {/* View Product Modal */}
      {/* <ViewProduct
        show={showViewProductModal}
        onClose={() => setShowViewProductModal(false)}
        onAddProduct={handleAddProduct}
        productData={newProductData}
        editModal={editModal}
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
      /> */}

      {/* Confirmation of delete product */}
      <ConfirmModal
        show={showModal}
        title="Delete Product"
        body="Are you sure you want to delete this product?"
        onConfirm={() => {
          console.log("Delete confirmed");
          setShowModal(false);
        }}
        onClose={() => {
          console.log("Delete cancelled");
          setShowModal(false);
        }}
        isLoading={isLoading}
      />

      {/* Confirmation of add new product */}
      <ConfirmModal
        show={showAddConfirmModal}
        title="Confirm New Product"
        body="Are you sure you want to add this product?"
        onConfirm={() => {
          console.log("Create confirmed");
          handleAddProductOnConfirm(newProductData);
          setShowAddConfirmModal(false);
        }}
        onClose={() => {
          console.log("Create cancelled");
          setShowAddConfirmModal(false);
        }}
        isLoading={isLoading}
      />

      {/* Confirmation of edit product */}
      <ConfirmModal
        show={showEditConfirmModal}
        title="Confirm Edit Product"
        body="Are you sure you want to update this product?"
        onConfirm={() => {
          console.log("Update confirmed");
          handleEditProductOnConfirm(newProductData);
          setShowEditConfirmModal(false);
        }}
        onClose={() => {
          console.log("Update cancelled");
          setShowEditConfirmModal(false);
        }}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Product;
