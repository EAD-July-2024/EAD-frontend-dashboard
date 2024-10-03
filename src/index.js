import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import Product from "./pages/product/Product";
import Order from "./pages/order/Order";
import Inventory from "./pages/inventory/Inventory";
import Vendor from "./pages/vendor/Vendor";
import ProtectedRoute from "./routes/ProtectedRoute";
import NotAuthorized from "./pages/NotAuthorized";
import "./custom.scss";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Login route */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/product" element={<Product />} />
          <Route path="/order" element={<Order />} />
          <Route path="/vendor" element={<Vendor />} />
        </Route>

        {/* Protected route for admin only */}
        <Route element={<ProtectedRoute requiredRole="admin" />}>
          <Route path="/inventory" element={<Inventory />} />
        </Route>

        {/* Default route to redirect to login */}
        <Route path="/" element={<Login />} />

        {/* Not Authorized route */}
        <Route path="/not-authorized" element={<NotAuthorized />} />
      </Routes>
    </Router>
  );
};

// Using createRoot instead of ReactDOM.render
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(<App />);
