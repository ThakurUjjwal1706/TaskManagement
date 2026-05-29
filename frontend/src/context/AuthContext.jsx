import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import API from '../api/axios';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('taskmanager_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem('taskmanager_token') || null);
  const [loading, setLoading] = useState(false);

  const saveAuth = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem('taskmanager_user', JSON.stringify(userData));
    localStorage.setItem('taskmanager_token', userToken);
  };

  const clearAuth = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('taskmanager_user');
    localStorage.removeItem('taskmanager_token');
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const { data } = await API.post('/auth/register', { name, email, password });
      saveAuth({ _id: data._id, name: data.name, email: data.email }, data.token);
      toast.success(`Welcome, ${data.name}! 🎉`);
      return { success: true };
    } catch (error) {
      const msg = error.response?.data?.message || 'Registration failed';
      toast.error(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await API.post('/auth/login', { email, password });
      saveAuth({ _id: data._id, name: data.name, email: data.email }, data.token);
      toast.success(`Welcome back, ${data.name}! 👋`);
      return { success: true };
    } catch (error) {
      const msg = error.response?.data?.message || 'Login failed';
      toast.error(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  const logout = useCallback(() => {
    clearAuth();
    toast.success('Logged out successfully');
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
