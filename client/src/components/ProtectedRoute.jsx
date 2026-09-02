import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getStoredUser, isAdminUser } from '../utils/auth';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const user = getStoredUser();
  const location = useLocation();

  if (!user) return <Navigate to="/" replace state={{ from: location }} />;

  if (requireAdmin && !isAdminUser(user)) {
    return <Navigate to="/" replace state={{ from: location }}  />;
  }

  return children;
};

export default ProtectedRoute;
