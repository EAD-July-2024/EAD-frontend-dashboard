import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import ConfirmModal from "../../components/confirm-modal/ConfirmModal";
import AddProductModal from "./AddProduct";
import { PRODUCT_URLS } from "../../utils/config";

const Product = () => {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRating, setSelectedRating] = useState();
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showAddConfirmModal, setShowAddConfirmModal] = useState(false);
  const [showEditConfirmModal, setShowEditConfirmModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [productss, setProductss] = useState([
    {
      id: 1,
      name: "Product 1",
      vendor: "Vendor A",
      price: 100,
      rating: 1,
      status: true,
    },
    {
      id: 2,
      name: "Product 2",
      vendor: "Vendor B",
      price: 150,
      rating: 2,
      status: true,
    },
    {
      id: 3,
      name: "Product 3",
      vendor: "Vendor C",
      price: 200,
      rating: 5,
      status: false,
    },
  ]);
  const [newProductData, setNewProductData] = useState(null);
  const [editProductId, setEditProductId] = useState(null);

  // Function to handle product fetch
  const fetchProducts = async () => {
    try {
      const response = await fetch(PRODUCT_URLS.PRODUCT_GET_ALL_URL);
      const data = await response.json();
      console.log("Products", data);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to handle adding a new product or editing an existing one
  const handleAddProduct = (product) => {
    if (editProductId !== null) {
      // Edit mode
      setNewProductData(product);
      setShowEditConfirmModal(true);
      setShowAddProductModal(false);
    } else {
      // Add mode
      setNewProductData(product);

      setShowAddConfirmModal(true);
      setShowAddProductModal(false);
    }
  };

  const handleAddProductOnConfirm = () => {
    console.log("Adding new product", newProductData);
    setProductss((prevProducts) => [...prevProducts, newProductData]);
    setShowAddProductModal(false);
  };

  const handleEditProductOnConfirm = () => {
    console.log("Updating exsisting product", newProductData);
    setProductss((prevProducts) =>
      prevProducts.map((p) => (p.id === newProductData.id ? newProductData : p))
    );
    setEditProductId(null); // Reset edit mode
    setShowAddProductModal(false);
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Function to handle rating filter change
  const handleRatingChange = (e) => {
    setSelectedRating(e.target.value);
  };

  // Function to filter products based on search query and rating
  const filteredProducts = productss.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery) ||
      product.vendor.toLowerCase().includes(searchQuery) ||
      product.price.toString().includes(searchQuery);

    const matchesRating = selectedRating
      ? product.rating.toString() === selectedRating
      : true;

    return matchesSearch && matchesRating;
  });

  // Function to handle edit button click
  const handleEdit = (id) => {
    setEditModal(true);
    const productToEdit = productss.find((product) => product.id === id);
    setNewProductData(productToEdit);
    setEditProductId(id);
    setShowAddProductModal(true); // Open the modal
  };

  // Function to handle delete button click
  const handleDelete = (id) => {
    console.log(`Delete product with ID: ${id}`);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditModal(false);
    setNewProductData({ id: "", name: "", vendor: "", price: "", rating: 1 });
    setEditProductId(null);
    setShowAddProductModal(true);
  };

  const handleToggleStatus = (id) => {
    const updatedProducts = productss.map((product) =>
      product.id === id ? { ...product, status: !product.status } : product
    );

    setProductss(updatedProducts); // Update the main products state
  };

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
              <th>Rating</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} onClick={() => console.log(product.id)}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.vendor}</td>
                <td>{product.price}</td>
                <td>{product.rating}</td>
                <td>
                  <Form.Check
                    type="switch"
                    id={`custom-switch-${product.id}`}
                    label={product.status ? "Active" : "Inactive"} // Dynamic label
                    checked={product.status} // Boolean value
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
      </div>

      {/* Add Product Modal */}
      <AddProductModal
        show={showAddProductModal}
        onClose={() => setShowAddProductModal(false)}
        onAddProduct={handleAddProduct}
        initialData={newProductData}
        editModal={editModal}
      />

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
      />
    </div>
  );
};

export default Product;

// import React, { useState } from "react";
// import { Button } from "react-bootstrap";
// import Table from "react-bootstrap/Table";
// import ConfirmModal from "../../components/confirm-modal/ConfirmModal";
// import AddProductModal from "./AddProduct";

// const Product = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedRating, setSelectedRating] = useState();
//   const [showAddProductModal, setShowAddProductModal] = useState(false);
//   const [showAddConfirmModal, setShowAddConfirmModal] = useState(false);
//   const [productss, setProductss] = useState([
//     { id: 1, name: "Product 1", vendor: "Vendor A", price: 100, rating: 1 },
//     { id: 2, name: "Product 2", vendor: "Vendor B", price: 150, rating: 2 },
//     { id: 3, name: "Product 3", vendor: "Vendor C", price: 200, rating: 5 },
//   ]);
//   const [newProductData, setNewProductData] = useState();

//   // Function to handle adding a new product
//   const handleAddProduct = (newProduct) => {
//     setNewProductData(newProduct);
//     setShowAddConfirmModal(true);
//     // setProductss((prevProducts) => [...prevProducts, newProduct]);
//   };

//   const handleAddProductOnConfirm = () => {
//     console.log("Adding new product", newProductData);
//     setProductss((prevProducts) => [...prevProducts, newProductData]);
//     setShowAddProductModal(false);
//   };

//   // Function to handle search input change
//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value.toLowerCase());
//   };

//   // Function to handle rating filter change
//   const handleRatingChange = (e) => {
//     setSelectedRating(e.target.value);
//   };

//   // Function to filter productss based on search query and rating
//   const filteredProducts = productss.filter((product) => {
//     // Check if the product matches the search query
//     const matchesSearch =
//       product.name.toLowerCase().includes(searchQuery) ||
//       product.vendor.toLowerCase().includes(searchQuery) ||
//       product.price.toString().includes(searchQuery);

//     // Check if the product matches the selected rating (if a rating is selected)
//     const matchesRating = selectedRating
//       ? product.rating.toString() === selectedRating
//       : true;

//     // Only return productss that match both the search and the rating filter
//     return matchesSearch && matchesRating;
//   });

//   // Function to map productss into table rows
//   const renderProducts = () => {
//     return filteredProducts.map((product) => (
//       <tr key={product.id}>
//         <td>{product.id}</td>
//         <td>{product.name}</td>
//         <td>{product.vendor}</td>
//         <td>{product.price}</td>
//         <td>{product.rating}</td>
//         <td>
//           <Button variant="warning" className="me-2">
//             Edit
//           </Button>
//           <Button variant="danger">Delete</Button>
//         </td>
//       </tr>
//     ));
//   };

//   // Handle Edit onclick event
//   const handleEdit = (id) => {
//     console.log(`Edit product with ID: ${id}`);
//   };

//   // Handle Delete onclick event
//   const handleDelete = (id) => {
//     console.log(`Delete product with ID: ${id}`);
//     setShowModal(true);
//     // Add your delete logic here
//   };

//   const handleAdd = () => {
//     console.log("Add new product button clicked");
//     setShowAddProductModal(true);
//   };

//   return (
//     <div className="container my-4">
//       {/* Header text */}
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h1>List of All Products</h1>
//         <Button variant="primary" onClick={handleAdd}>
//           Add New Product
//         </Button>
//       </div>

//       {/* Filters */}
//       <div className="my-4">
//         <h4>Search Products</h4>
//         <div className="d-flex justify-content-between align-items-center">
//           <input
//             type="text"
//             className="form-control w-25"
//             placeholder="Search by name, vendor, or price"
//             onChange={handleSearchChange}
//           />

//           {/* Filter by Rating */}
//           <select
//             className="form-select w-25"
//             value={selectedRating}
//             onChange={handleRatingChange}
//           >
//             <option value="">Filter by Rating</option>
//             <option value="1">1 Star</option>
//             <option value="2">2 Stars</option>
//             <option value="3">3 Stars</option>
//             <option value="4">4 Stars</option>
//             <option value="5">5 Stars</option>
//           </select>
//         </div>
//       </div>

//       {/* Table */}
//       <div>
//         {/* Product Table */}
//         <Table bordered hover>
//           <thead>
//             <tr>
//               <th>Product ID</th>
//               <th>Product Name</th>
//               <th>Vendor</th>
//               <th>Price</th>
//               <th>Rating</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>{renderProducts()}</tbody>
//         </Table>
//       </div>

//       {/* Add Product Modal */}
//       <AddProductModal
//         show={showAddProductModal}
//         onClose={() => setShowAddProductModal(false)}
//         onAddProduct={handleAddProduct}
//       />

//       {/* Confirmation of delete product */}
//       <ConfirmModal
//         show={showModal}
//         title="Delete Product"
//         body="Are you sure you want to delete this product?"
//         onConfirm={() => console.log("Delete confirmed")}
//         onClose={() => {
//           console.log("Delete cancelled");
//           setShowModal(false);
//         }}
//       />

//       {/* Confirmation of add new product */}
//       <ConfirmModal
//         show={showAddConfirmModal}
//         title="Confirm New Product"
//         body="Are you sure you want to add this product?"
//         onConfirm={() => {
//           console.log("Create confirmed");
//           handleAddProductOnConfirm(newProductData);
//           setShowAddConfirmModal(false);
//         }}
//         onClose={() => {
//           console.log("Create cancelled");
//           setShowAddConfirmModal(false);
//         }}
//       />
//     </div>
//   );
// };

// export default Product;
