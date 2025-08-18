import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
  const isAdmin = localStorage.getItem('isAdmin');
  const loginTime = localStorage.getItem('loginTime');

  // 1 hour in milliseconds
  const EXPIRATION_TIME = 60 * 60 * 1000;

  if (isAdmin && loginTime) {
    const now = Date.now();
    if (now - loginTime > EXPIRATION_TIME) {
      // time expired, clear storage
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('loginTime');
      return <Navigate to="/Login" />;
    }
    return <Outlet />;
  }

  return <Navigate to="/Login" />;
};

export default ProtectedRoutes;
