import React, { useState } from 'react';
import { motion } from "framer-motion";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Briefcase, 
  Sparkles,
  ArrowRight
} from "lucide-react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading } = useAuth();
  
  const requestedRole = location.state?.requestedRole || null;
  const fromPage = location.state?.from || '';
  
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      const result = await login(formData.email, formData.password);
      if (!result?.success) {
        setErrors({ form: result?.error || 'Login failed' });
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1929] flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#3B82F6]/5 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-96 bg-gradient-to-t from-[#3B82F6]/5 to-transparent"></div>
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#3B82F6]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#1E40AF]/5 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#3B82F6]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #3B82F6 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}
        ></div>
      </div>

      {/* Main container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#1A2B3E] flex items-center justify-center shadow-lg shadow-[#3B82F6]/10 group-hover:shadow-[#3B82F6]/40 transition-all duration-300">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">
              Job<span className="text-[#3B82F6]">Portal</span>
            </span>
          </div>
        </motion.div>

        {/* Welcome text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-white mb-2">
            Welcome Back!
          </h2>
          <p className="text-[#9CA3AF]">
            {fromPage === 'find-jobs' && "Sign in to browse and apply for jobs"}
            {fromPage === 'employer' && "Sign in with your employer account to post jobs"}
            {!fromPage && "Sign in to continue your job search journey"}
          </p>
        </motion.div>

        {/* Context Messages */}
        {fromPage === 'find-jobs' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-[#3B82F6]/10 border border-[#3B82F6]/20 rounded-lg text-blue-400 text-sm text-center"
          >
            Please login to browse and apply for jobs
          </motion.div>
        )}

        {fromPage === 'employer' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg text-purple-400 text-sm text-center"
          >
            Please login with an employer account to post jobs
          </motion.div>
        )}

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-[#1A2B3E] backdrop-blur-none rounded-2xl border border-[#3B82F6]/20 p-8 shadow-xl"
        >
          {/* Form Error */}
          {errors.form && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {errors.form}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#9CA3AF] mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-[#9CA3AF]" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-3 py-3 bg-[#1A2B3E] border ${
                    errors.email ? 'border-red-500' : 'border-[#3B82F6]/20'
                  } rounded-xl text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#3B82F6] transition-colors duration-200`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#9CA3AF] mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#9CA3AF]" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-10 py-3 bg-[#1A2B3E] border ${
                    errors.password ? 'border-red-500' : 'border-[#3B82F6]/20'
                  } rounded-xl text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#3B82F6] transition-colors duration-200`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-[#9CA3AF] hover:text-[#3B82F6] transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-[#9CA3AF] hover:text-[#3B82F6] transition-colors" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#3B82F6] to-[#1A2B3E] text-white font-semibold rounded-xl shadow-lg shadow-[#3B82F6]/10 hover:shadow-[#3B82F6]/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </motion.button>

            {/* Sign up link */}
            <p className="text-center text-sm text-[#9CA3AF]">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/signup', { state: { requestedRole, from: fromPage } })}
                className="text-[#3B82F6] hover:text-[#60A5FA] font-medium transition-colors"
              >
                Sign up now
              </button>
            </p>
          </form>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center justify-center gap-6 mt-8"
        >
          <div className="flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-xs text-[#9CA3AF]">Secure Login</span>
          </div>
          <div className="flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-green-400" />
            <span className="text-xs text-[#9CA3AF]">Privacy Protected</span>
          </div>
          <div className="flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-[#9CA3AF]">24/7 Support</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;