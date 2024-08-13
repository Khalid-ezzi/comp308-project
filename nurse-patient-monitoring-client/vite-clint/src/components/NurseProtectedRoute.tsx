import React from 'react';
import { Navigate } from 'react-router-dom';
import useUserRole from '@/hooks/useUserRole';

const NurseProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isNurse } = useUserRole();

  console.log(isNurse);
  if (!isNurse) {
    return <Navigate to="/not-authorized" replace />;
  }

  return <>{children}</>;
};

export default NurseProtectedRoute;
