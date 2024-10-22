import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/admin-login" replace />;
  }

  console.log('User in ProtectedRoute:', user); // Debug log

  if (user && user.user_metadata && allowedRoles.includes(user.user_metadata.role)) {
    return <>{children}</>;
  }

  console.log('User does not have required role'); // Debug log
  return <Navigate to="/" replace />;
};

export default ProtectedRoute;