import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from './auth';
import DashboardLayout from '../components/layouts/DashboardLayout';

const ProtectedRoute = () => {
  const token = getToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <DashboardLayout />;
};

export default ProtectedRoute;
