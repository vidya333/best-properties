import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getStoredUser, isAuthenticated, isAdminUser } from '../utils/auth';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const isAuth = isAuthenticated();
  const user = getStoredUser();
  const location = useLocation();

  if (!isAuth || !user) {
    return <Navigate to="/admin" replace state={{ from: location }} />;
  }

  if (requireAdmin && !isAdminUser(user)) {
    return <Navigate to="/admin" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;