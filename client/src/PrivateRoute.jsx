// PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token'); // Check for the auth token
  return isAuthenticated ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;