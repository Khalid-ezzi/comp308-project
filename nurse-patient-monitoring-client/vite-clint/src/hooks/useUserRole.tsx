import { useMemo } from 'react';

const useUserRole = () => {
  const role = useMemo(() => {
    return localStorage.getItem('role');
  }, []);

  const isNurse = useMemo(() => role === 'nurse', [role]);
  const isPatient = useMemo(() => role === 'patient', [role]);

  return { role, isNurse, isPatient };
};

export default useUserRole;
