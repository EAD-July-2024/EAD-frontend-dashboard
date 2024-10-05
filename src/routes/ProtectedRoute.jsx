// import React from "react";
// import { Navigate } from "react-router-dom";
// import Layout from "../Layout";

// const ProtectedRoute = () => {
//   const isAuthenticated = !!localStorage.getItem("auth");
//   return isAuthenticated ? <Layout /> : <Navigate to="/login" />;
// };

// export default ProtectedRoute;

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Layout from "../Layout";

const ProtectedRoute = ({ requiredRole }) => {
  const auth = JSON.parse(localStorage.getItem("auth"));

  // Check if the user is authenticated
  const isAuthenticated = auth && auth.token;

  // Check if the user has the required role (if specified)
  const hasRequiredRole = !requiredRole || (auth && auth.role === requiredRole);

  // if (!isAuthenticated) {
  //   // Redirect to login if not authenticated
  //   return <Navigate to="/login" />;
  // }

  // if (!hasRequiredRole) {
  //   // Redirect to a "not authorized" page or some other appropriate action if the role is insufficient
  //   return <Navigate to="/not-authorized" />;
  // }

  // If authenticated and has the required role, render the layout with Outlet for nested routes
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default ProtectedRoute;
