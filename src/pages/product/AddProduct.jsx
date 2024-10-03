import React, { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddProductModal = ({ show, onClose, onAddProduct, initialData }) => {
  const [productData, setProductData] = React.useState(initialData);

  // Update product data state on initialData change (for editing)
  useEffect(() => {
    setProductData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProduct(productData);
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton style={{ backgroundColor: "#edf2fd" }}>
        <Modal.Title>
          {initialData?.id ? "Edit Product" : "Add New Product"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#f7f8ff" }}>
        <Form onSubmit={handleSubmit}>
          {/* Editable Product ID for Adding New Product */}
          <Form.Group controlId="productId">
            <Form.Label>Product ID</Form.Label>
            <Form.Control
              type="text"
              name="id"
              value={productData?.id || ""}
              onChange={handleChange}
              disabled={!!initialData?.id} // Disable if editing
              required
            />
          </Form.Group>

          <Form.Group controlId="productName" className="mt-2">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={productData?.name || ""}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="vendor" className="mt-2">
            <Form.Label>Vendor</Form.Label>
            <Form.Control
              type="text"
              name="vendor"
              value={productData?.vendor || ""}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="price" className="mt-2">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={productData?.price || ""}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="rating" className="mt-2">
            <Form.Label>Rating</Form.Label>
            <Form.Control
              as="select"
              name="rating"
              value={productData?.rating || 1}
              onChange={handleChange}
              required
            >
              <option value="1">1 Star</option>
              <option value="2">2 Stars</option>
              <option value="3">3 Stars</option>
              <option value="4">4 Stars</option>
              <option value="5">5 Stars</option>
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-4">
            {initialData?.id ? "Update" : "Add Product"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddProductModal;

// import React, { useState } from "react";
// import { Modal, Button, Form } from "react-bootstrap";

// const AddProductModal = ({ show, onClose, onAddProduct }) => {
//   const [productData, setProductData] = useState({
//     id: "",
//     name: "",
//     vendor: "",
//     price: "",
//     rating: 1, // Default rating
//   });

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProductData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Call the onAddProduct function passed as a prop
//     onAddProduct(productData);
//     // Reset the form
//     setProductData({ id: "", name: "", vendor: "", price: "", rating: 1 });
//     // Close the modal
//     onClose();
//   };

//   return (
//     <Modal show={show} onHide={onClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>Add New Product</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form onSubmit={handleSubmit}>
//           <Form.Group controlId="formProductId">
//             <Form.Label>Product ID</Form.Label>
//             <Form.Control
//               type="number"
//               name="id"
//               value={productData.id}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>
//           <Form.Group controlId="formProductName">
//             <Form.Label>Product Name</Form.Label>
//             <Form.Control
//               type="text"
//               name="name"
//               value={productData.name}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>
//           <Form.Group controlId="formVendor">
//             <Form.Label>Vendor</Form.Label>
//             <Form.Control
//               type="text"
//               name="vendor"
//               value={productData.vendor}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>
//           <Form.Group controlId="formPrice">
//             <Form.Label>Price</Form.Label>
//             <Form.Control
//               type="number"
//               name="price"
//               value={productData.price}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>
//           <Form.Group controlId="formRating">
//             <Form.Label>Rating</Form.Label>
//             <Form.Control
//               as="select"
//               name="rating"
//               value={productData.rating}
//               onChange={handleChange}
//             >
//               <option value="1">1 Star</option>
//               <option value="2">2 Stars</option>
//               <option value="3">3 Stars</option>
//               <option value="4">4 Stars</option>
//               <option value="5">5 Stars</option>
//             </Form.Control>
//           </Form.Group>
//           <Button variant="primary" type="submit" className="mt-3">
//             Add Product
//           </Button>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// };

// export default AddProductModal;
