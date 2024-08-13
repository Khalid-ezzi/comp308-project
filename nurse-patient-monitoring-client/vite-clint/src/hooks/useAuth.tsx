import { useState, useContext, createContext, ReactNode, useEffect } from 'react';
import {  register, logout } from '../services/accountService';

interface User {
  userId: string;
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  register: (userDetails: { username: string; email: string; password: string; role: string }) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  register: async () => {
    return { userId: '', username: '', role: '' };
  },
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('role');
    if (token && userId && username && role) {
      setUser({ userId, username, role });
    }
  }, []);

  const handleRegister = async (userDetails: { username: string; email: string; password: string; role: string }) => {
    const newUser = await register(userDetails);
    return newUser;
  };

  const handleLogout = () => {
    localStorage.clear();    
    setUser(null);
    logout();
  };

  return (
    <AuthContext.Provider value={{ user,  register: handleRegister, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
