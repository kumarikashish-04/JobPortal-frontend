import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (storedToken && storedUser) {
        try {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));

          // Verify token with backend
          const response = await api.get('/auth/me');
          if (response.data.success) {
            // Backend returns user in response.data.data
            const userData = response.data.data;
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
          }
        } catch (error) {
          console.error('Token verification failed:', error);
          // Token is invalid, clear everything
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await api.post('/auth/login', { email, password });

      if (response.data.success) {
        // Backend returns: { success, message, data: { _id, name, email, role, avatar }, accessToken, refreshToken }
        const { accessToken, data } = response.data;

        localStorage.setItem('token', accessToken);
        localStorage.setItem('user', JSON.stringify(data));

        setToken(accessToken);
        setUser(data);

        toast.success(`Welcome back, ${data.name}!`);

        if (data.role === 'employer') {
          navigate('/employer-dashboard');
        } else {
          navigate('/find-jobs');
        }

        return { success: true };
      }
    } catch (error) {
      console.error('Login error:', error);
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    try {
      setLoading(true);
      // Backend expects: { name, email, password, role, companyName (if employer) }
      const payload = {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData.role,
      };

      // Add companyName for employer role
      if (userData.role === 'employer' && userData.companyName) {
        payload.companyName = userData.companyName;
      }

      const response = await api.post('/auth/register', payload);

      if (response.data.success) {
        const { accessToken, data } = response.data;

        localStorage.setItem('token', accessToken);
        localStorage.setItem('user', JSON.stringify(data));

        setToken(accessToken);
        setUser(data);

        toast.success('Account created successfully!');

        if (data.role === 'employer') {
          navigate('/employer-dashboard');
        } else {
          navigate('/find-jobs');
        }

        return { success: true };
      }
    } catch (error) {
      console.error('Signup error:', error);
      const message = error.response?.data?.message || 'Signup failed';
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const updateProfile = async (formData) => {
    try {
      const endpoint = user?.role === 'employer' ? '/employer/profile' : '/jobseeker/profile';
      const response = await api.put(endpoint, formData);

      if (response.data.success) {
        const updatedData = response.data.data;
        // Merge profile data with existing user data
        const updatedUser = { ...user, ...updatedData };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        toast.success('Profile updated successfully');
        return { success: true, user: updatedUser };
      }
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
      return { success: false, error: error.message };
    }
  };

  const saveJob = async (jobId) => {
    try {
      const response = await api.post(`/jobseeker/saved-jobs/${jobId}`);
      if (response.data.success) {
        toast.success(response.data.message || 'Job saved!');
        return { success: true };
      }
    } catch (error) {
      console.error('Save job error:', error);
      toast.error(error.response?.data?.message || 'Failed to save job');
      return { success: false };
    }
  };

  const unsaveJob = async (jobId) => {
    try {
      const response = await api.post(`/jobseeker/saved-jobs/${jobId}`);
      if (response.data.success) {
        toast.success(response.data.message || 'Job removed from saved');
        return { success: true };
      }
    } catch (error) {
      console.error('Unsave job error:', error);
      toast.error(error.response?.data?.message || 'Failed to remove job');
      return { success: false };
    }
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user && !!token,
    login,
    signup,
    logout,
    updateProfile,
    saveJob,
    unsaveJob,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;