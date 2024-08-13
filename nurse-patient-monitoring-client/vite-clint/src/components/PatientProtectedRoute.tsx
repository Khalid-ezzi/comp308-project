import React from 'react';
import { Navigate } from 'react-router-dom';
import useUserRole from '@/hooks/useUserRole';

const PatientProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isPatient } = useUserRole();

  if (!isPatient) {
    return <Navigate to="/not-authorized" replace />;
  }

  return <>{children}</>;
};

export default PatientProtectedRoute;
