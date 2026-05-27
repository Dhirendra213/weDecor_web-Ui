import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for stored auth on mount
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('weDecor_token');
      const storedUser = localStorage.getItem('weDecor_user');

      if (token && storedUser) {
        try {
          const res = await authService.getMe();
          setUser(res.data.data.user);
          localStorage.setItem('weDecor_user', JSON.stringify(res.data.data.user));
        } catch {
          localStorage.removeItem('weDecor_token');
          localStorage.removeItem('weDecor_user');
          setUser(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    const res = await authService.login({ email, password });
    const { user: userData, token } = res.data.data;
    localStorage.setItem('weDecor_token', token);
    localStorage.setItem('weDecor_user', JSON.stringify(userData));
    setUser(userData);
    toast.success(`Welcome back, ${userData.name}! 🌸`);
    return userData;
  };

  const register = async (name, email, password) => {
    const res = await authService.register({ name, email, password });
    const { user: userData, token } = res.data.data;
    localStorage.setItem('weDecor_token', token);
    localStorage.setItem('weDecor_user', JSON.stringify(userData));
    setUser(userData);
    toast.success(`Welcome to weDecor, ${userData.name}! 🌸`);
    return userData;
  };

  const logout = () => {
    localStorage.removeItem('weDecor_token');
    localStorage.removeItem('weDecor_user');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const isAdmin = user?.role === 'admin';
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAdmin,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
