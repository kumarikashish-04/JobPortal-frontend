import React, { useState } from 'react';
import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
  Lock, 
  Briefcase, 
  Eye, 
  EyeOff,
  Sparkles,
  ArrowRight,
  Building2
} from "lucide-react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signup, loading } = useAuth();
  
  const requestedRole = location.state?.requestedRole || null;
  const fromPage = location.state?.from || '';
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userType, setUserType] = useState(requestedRole || 'jobseeker');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    agreeTerms: false
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (userType === 'employer' && !formData.companyName) {
      newErrors.companyName = 'Company name is required for employers';
    }
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: userType,
      };

      if (userType === 'employer') {
        userData.companyName = formData.companyName;
      }
      
      const result = await signup(userData);
      
      if (!result?.success) {
        setErrors({ form: result?.error || 'Signup failed' });
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
            Create Account
          </h2>
          <p className="text-[#9CA3AF]">
            {userType === 'employer' 
              ? 'Start posting jobs and finding talent' 
              : 'Find your dream job today'}
          </p>
        </motion.div>

        {/* Context Messages */}
        {fromPage === 'find-jobs' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-[#3B82F6]/10 border border-[#3B82F6]/20 rounded-lg text-blue-400 text-sm text-center"
          >
            Create a job seeker account to browse and apply for jobs
          </motion.div>
        )}

        {fromPage === 'employer' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg text-purple-400 text-sm text-center"
          >
            Create an employer account to post jobs and hire talent
          </motion.div>
        )}

        {/* Signup Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-[#1A2B3E] backdrop-blur-none border border-[#3B82F6]/20 rounded-2xl p-8 shadow-xl"
        >
          {/* Form Error */}
          {errors.form && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {errors.form}
            </div>
          )}

          {/* User Type Toggle */}
          <div className="flex gap-2 mb-6 p-1 bg-[#1A2B3E] rounded-xl">
            <button
              type="button"
              onClick={() => setUserType('jobseeker')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                userType === 'jobseeker'
                  ? 'bg-gradient-to-r from-[#3B82F6] to-[#1A2B3E] text-white'
                  : 'text-[#9CA3AF] hover:text-white'
              }`}
            >
              Job Seeker
            </button>
            <button
              type="button"
              onClick={() => setUserType('employer')}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                userType === 'employer'
                  ? 'bg-gradient-to-r from-[#3B82F6] to-[#1A2B3E] text-white'
                  : 'text-[#9CA3AF] hover:text-white'
              }`}
            >
              Employer
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-[#9CA3AF]" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-3 py-3 bg-[#1A2B3E] border ${
                    errors.name ? 'border-red-500' : 'border-[#3B82F6]/20'
                  } rounded-xl text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#3B82F6] transition-colors duration-200`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-[#9CA3AF]" />
                </div>
                <input
                  type="email"
                  name="email"
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

            {/* Company Name (only for employer) */}
            {userType === 'employer' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                  Company Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Building2 className="h-5 w-5 text-[#9CA3AF]" />
                  </div>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-3 bg-[#1A2B3E] border ${
                      errors.companyName ? 'border-red-500' : 'border-[#3B82F6]/20'
                    } rounded-xl text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#3B82F6] transition-colors duration-200`}
                    placeholder="Enter your company name"
                  />
                </div>
                {errors.companyName && (
                  <p className="mt-1 text-xs text-red-500">{errors.companyName}</p>
                )}
              </motion.div>
            )}

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#9CA3AF]" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-10 py-3 bg-[#1A2B3E] border ${
                    errors.password ? 'border-red-500' : 'border-[#3B82F6]/20'
                  } rounded-xl text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#3B82F6] transition-colors duration-200`}
                  placeholder="Create a password"
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

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#9CA3AF]" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-10 py-3 bg-[#1A2B3E] border ${
                    errors.confirmPassword ? 'border-red-500' : 'border-[#3B82F6]/20'
                  } rounded-xl text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#3B82F6] transition-colors duration-200`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-[#9CA3AF] hover:text-[#3B82F6] transition-colors" />
                  ) : (
                    <Eye className="h-5 w-5 text-[#9CA3AF] hover:text-[#3B82F6] transition-colors" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start mt-4">
              <div className="flex items-center h-5">
                <input
                  id="agreeTerms"
                  name="agreeTerms"
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="h-4 w-4 bg-[#1A2B3E] border-[#3B82F6]/20 rounded text-[#3B82F6] focus:ring-[#3B82F6] focus:ring-offset-0 focus:ring-offset-[#1A2B3E]"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="agreeTerms" className="text-[#9CA3AF]">
                  I agree to the{' '}
                  <a href="#" className="text-[#3B82F6] hover:text-[#60A5FA] transition-colors">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-[#3B82F6] hover:text-[#60A5FA] transition-colors">
                    Privacy Policy
                  </a>
                </label>
              </div>
            </div>
            {errors.agreeTerms && (
              <p className="text-xs text-red-500">{errors.agreeTerms}</p>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#3B82F6] to-[#1A2B3E] text-white font-semibold rounded-xl shadow-lg shadow-[#3B82F6]/10 hover:shadow-[#3B82F6]/40 transition-all duration-300 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </motion.button>

            {/* Login link */}
            <p className="text-center text-sm text-[#9CA3AF] mt-6">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/login', { state: { requestedRole: userType, from: fromPage } })}
                className="text-[#3B82F6] hover:text-[#60A5FA] font-medium transition-colors"
              >
                Sign in
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
            <Sparkles className="w-4 h-4 text-green-400" />
            <span className="text-xs text-[#9CA3AF]">Free to join</span>
          </div>
          <div className="flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-[#9CA3AF]">Privacy protected</span>
          </div>
          <div className="flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-xs text-[#9CA3AF]">Verified companies</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignUp;