import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, 
  LayoutDashboard, 
  LogIn, 
  UserPlus, 
  Menu, 
  X, 
  Sparkles,
  LogOut,
  User,
  BriefcaseBusiness,
  Users
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    navigate('/');
  };

  const handleFindJobs = () => {
    setMobileOpen(false);
    if (!isAuthenticated) {
      navigate('/login', { state: { requestedRole: 'jobseeker', from: 'find-jobs' } });
    } else {
      navigate('/find-jobs');
    }
  };

  const handleEmployerClick = () => {
    setMobileOpen(false);
    if (!isAuthenticated) {
      navigate('/login', { state: { requestedRole: 'employer', from: 'employer' } });
    } else if (user?.role === 'employer') {
      navigate('/employer-dashboard');
    } else {
      navigate('/login', { state: { requestedRole: 'employer', from: 'employer', message: 'Please login with an employer account' } });
    }
  };

  const handleDashboardClick = () => {
    setMobileOpen(false);
    if (user?.role === 'employer') {
      navigate('/employer-dashboard');
    } else {
      navigate('/find-jobs');
    }
  };

  const handleProfileClick = () => {
    setMobileOpen(false);
    if (user?.role === 'employer') {
      navigate('/company-profile');
    } else {
      navigate('/profile');
    }
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        (scrolled || !isHomePage)
          ? "bg-[#0A1929]/90 backdrop-blur-none shadow-lg border-b border-[#3B82F6]/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <motion.div
            className="flex items-center gap-2.5 cursor-pointer group"
            onClick={() => navigate("/")}
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#1A2B3E] shadow-lg shadow-[#3B82F6]/10 group-hover:shadow-[#3B82F6]/40 transition-all duration-300">
              <Briefcase className="w-5 h-5 text-white" size={18} />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">
              Aspire<span className="text-[#3B82F6]">Map</span>
            </span>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {(!isAuthenticated || user?.role === 'jobseeker') && (
              <NavLink 
                onClick={handleFindJobs} 
                label="Find Jobs" 
                icon={<Users size={14} className="mr-1" />}
                active={pathname === '/find-jobs'}
              />
            )}
            {(!isAuthenticated || user?.role === 'employer') && (
              <NavLink
                onClick={handleEmployerClick}
                label="For Employers"
                icon={<BriefcaseBusiness size={14} className="mr-1" />}
                active={pathname === '/employer-dashboard'}
              />
            )}
            <NavLink 
              onClick={() => navigate("/about")} 
              label="About" 
              active={pathname === '/about'}
            />
          </nav>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <motion.div 
                  onClick={handleProfileClick}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1A2B3E] backdrop-blur-none border border-[#3B82F6]/20 shadow-lg cursor-pointer hover:border-[#3B82F6]/50 transition-all"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#1A2B3E] flex items-center justify-center text-white text-xs font-bold shadow-sm">
                    {user?.name?.[0] || 'U'}
                  </div>
                  <span className="text-[#E5E7EB] text-sm font-medium">
                    {user?.name || 'User'}
                  </span>
                </motion.div>

                <motion.button
                  onClick={handleDashboardClick}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#1A2B3E] text-white text-sm font-semibold shadow-lg shadow-[#3B82F6]/10 hover:shadow-[#3B82F6]/40 transition-all duration-300"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <LayoutDashboard size={15} />
                  Dashboard
                </motion.button>

                <motion.button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-400 text-sm font-semibold hover:bg-red-500/20 transition-all duration-200"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <LogOut size={15} />
                  Logout
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <motion.button
                  onClick={() => navigate("/login")}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[#E5E7EB] hover:text-[#3B82F6] text-sm font-medium hover:bg-[#3B82F6]/10 transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <LogIn size={15} />
                  Login
                </motion.button>
                <motion.button
                  onClick={() => navigate("/signup")}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#1A2B3E] text-white text-sm font-semibold shadow-lg shadow-[#3B82F6]/10 hover:shadow-[#3B82F6]/40 transition-all duration-300"
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <UserPlus size={15} />
                  Sign Up
                </motion.button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden p-2 rounded-lg bg-[#3B82F6]/20 text-[#3B82F6]"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#1A2B3E] border-t border-[#3B82F6]/20"
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {(!isAuthenticated || user?.role === 'jobseeker') && (
                <MobileNavLink label="Find Jobs" onClick={handleFindJobs} />
              )}
              {(!isAuthenticated || user?.role === 'employer') && (
                <MobileNavLink label="For Employers" onClick={handleEmployerClick} />
              )}
              <MobileNavLink label="About" onClick={() => { setMobileOpen(false); navigate("/about"); }} />
              
              <div className="border-t border-[#3B82F6]/20 mt-2 pt-3 flex flex-col gap-2">
                {isAuthenticated ? (
                  <>
                    <button onClick={handleDashboardClick} className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#3B82F6] to-[#1A2B3E] text-white text-sm font-semibold text-center">Dashboard</button>
                    <button onClick={handleLogout} className="w-full py-2.5 rounded-xl bg-red-500/10 text-red-400 text-sm font-semibold text-center">Logout</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => { setMobileOpen(false); navigate("/login"); }} className="py-2.5 rounded-xl text-center text-[#E5E7EB] text-sm font-medium">Login</button>
                    <button onClick={() => { setMobileOpen(false); navigate("/signup"); }} className="py-2.5 rounded-xl text-center bg-gradient-to-r from-[#3B82F6] to-[#1A2B3E] text-white text-sm font-semibold">Sign Up</button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

const NavLink = ({ onClick, label, icon, active }) => (
  <motion.button
    onClick={onClick}
    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 group flex items-center ${
      active 
        ? "text-[#3B82F6] bg-[#3B82F6]/10" 
        : "text-[#9CA3AF] hover:text-[#3B82F6] hover:bg-[#3B82F6]/10"
    }`}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    {icon}
    {label}
  </motion.button>
);

const MobileNavLink = ({ onClick, label }) => (
  <button
    onClick={onClick}
    className="w-full text-left px-3 py-2.5 text-[#9CA3AF] hover:text-[#3B82F6] text-sm font-medium rounded-lg hover:bg-[#3B82F6]/10 transition-colors"
  >
    {label}
  </button>
);

export default Header;
