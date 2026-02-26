import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Briefcase, 
  MapPin, 
  Clock, 
  Filter,
  Bookmark,
  ChevronRight,
  Loader2,
  AlertCircle,
  LogOut,
  User,
  BookmarkCheck,
  TrendingUp,
  Zap,
  Star,
  Globe
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const JobSeekerDashboard = () => {
  const navigate = useNavigate();
  const { user, logout, saveJob, unsaveJob } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('home'); // 'home' or 'jobs'
  const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1 });
  const [stats, setStats] = useState({ applications: 0, saved: 0 });

  const fetchJobs = async (search = '', page = 1) => {
    try {
      setLoading(true);
      setError(null);
      const params = { page, limit: 12 };
      if (search) params.search = search;

      const response = await api.get('/jobs', { params });
      if (response.data.success) {
        setJobs(response.data.data);
        setPagination(response.data.pagination);
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('Failed to load jobs. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboardStats = async () => {
    try {
      const [appsRes, savedRes] = await Promise.all([
        api.get('/applications/my-applications'),
        api.get('/jobseeker/saved-jobs')
      ]);

      setStats({
        applications: appsRes.data.success ? appsRes.data.data.length : 0,
        saved: savedRes.data.success ? savedRes.data.data.length : 0
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  useEffect(() => {
    fetchJobs();
    if (user?.role === 'jobseeker') {
      fetchDashboardStats();
    }
  }, [user]);

  const handleSearch = (e) => {
    e.preventDefault();
    setActiveTab('jobs');
    fetchJobs(searchTerm);
  };



  const formatSalary = (salary) => {
    if (!salary || (!salary.min && !salary.max)) return 'Negotiable';
    if (!salary.isVisible) return 'Confidential';
    return `$${(salary.min / 1000).toFixed(0)}k - $${(salary.max / 1000).toFixed(0)}k`;
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'Today';
    return `${diffDays}d ago`;
  };

  return (
    <div className="min-h-screen bg-[#0A1929] text-white">
      {/* Navigation Bar */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
        <div className="flex items-center gap-6 mb-8 border-b border-[#3B82F6]/20 pb-4">
          <button 
            onClick={() => setActiveTab('home')}
            className={`text-sm font-bold transition-all px-4 py-2 rounded-lg ${activeTab === 'home' ? 'bg-[#3B82F6] text-white shadow-lg shadow-[#3B82F6]/10' : 'text-[#9CA3AF] hover:text-white'}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('jobs')}
            className={`text-sm font-bold transition-all px-4 py-2 rounded-lg ${activeTab === 'jobs' ? 'bg-[#3B82F6] text-white shadow-lg shadow-[#3B82F6]/10' : 'text-[#9CA3AF] hover:text-white'}`}
          >
            Browse Jobs
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'home' ? (
            <motion.div key="home" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-10">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card rounded-xl p-8 border-[#3B82F6]/20">
                  <h3 className="text-[#9CA3AF] text-sm font-medium mb-1">Applications</h3>
                  <div className="text-3xl font-bold">{stats.applications}</div>
                  <p className="text-xs text-[#34D399] mt-2">+2 new this week</p>
                </div>
                <div className="glass-card rounded-xl p-8 border-[#3B82F6]/20">
                  <h3 className="text-[#9CA3AF] text-sm font-medium mb-1">Saved Items</h3>
                  <div className="text-3xl font-bold">{stats.saved}</div>
                  <p className="text-xs text-[#9CA3AF] mt-2">Tracked positions</p>
                </div>
                <div className="glass-card rounded-xl p-8 bg-[#3B82F6]/5 border-[#3B82F6]/30">
                  <h3 className="text-white font-bold mb-2 text-sm">Profile Status</h3>
                  <p className="text-xs text-[#9CA3AF] mb-4">Complete your profile to get seen by recruiters.</p>
                  <button onClick={() => navigate('/profile')} className="w-full py-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-bold rounded-lg transition-all text-center">Update Profile</button>
                </div>
              </div>

              {/* Recommended Preview */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Recent Opportunities</h2>
                  <button onClick={() => setActiveTab('jobs')} className="text-sm font-bold text-[#3B82F6] hover:underline flex items-center gap-1">Browse all <ChevronRight size={14} /></button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {jobs.slice(0, 4).map((job) => (
                    <div key={job._id} onClick={() => navigate(`/job/${job._id}`)} className="glass-card rounded-xl p-6 hover:border-[#3B82F6]/40 transition-all cursor-pointer flex gap-5">
                      <div className="w-12 h-12 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center text-[#3B82F6] flex-shrink-0">
                        <Briefcase size={24} />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg mb-1">{job.title}</h4>
                        <p className="text-[#9CA3AF] text-sm mb-3">{job.employer?.name}</p>
                        <div className="flex gap-4 text-xs">
                           <span className="flex items-center gap-1 text-[#9CA3AF]"><MapPin size={12} /> {job.location}</span>
                           <span className="text-[#3B82F6] font-bold">{formatSalary(job.salary)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="jobs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Find Your Next Role</h1>
                <p className="text-[#9CA3AF]">Search across thousands of curated positions</p>
              </div>

              {/* Search */}
              <div className="mb-10 p-6 glass-card rounded-xl">
                <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Role, keyword or company..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-[#1A2B3E] border border-[#3B82F6]/20 rounded-lg text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#3B82F6]"
                    />
                  </div>
                  <button type="submit" className="px-8 py-3 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold rounded-lg transition-all">Search Jobs</button>
                </form>
              </div>

              {/* Results */}
              {loading ? (
                <div className="py-20 text-center"><Loader2 className="w-10 h-10 text-[#3B82F6] animate-spin mx-auto mb-4" /><p className="text-[#9CA3AF]">Loading jobs...</p></div>
              ) : jobs.length === 0 ? (
                <div className="py-20 text-center text-[#9CA3AF]">No jobs found matching your criteria.</div>
              ) : (
                <div className="space-y-4">
                  {jobs.map((job) => (
                    <div key={job._id} onClick={() => navigate(`/job/${job._id}`)} className="glass-card rounded-xl p-6 hover:border-[#3B82F6]/30 transition-all cursor-pointer flex flex-col md:flex-row md:items-center gap-6">
                      <div className="w-14 h-14 rounded-xl bg-[#1A2B3E] border border-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6] flex-shrink-0">
                        <Briefcase size={28} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-white truncate">{job.title}</h3>
                          <span className="px-2 py-0.5 bg-green-500/10 text-green-400 text-[10px] font-bold rounded uppercase">{job.jobType}</span>
                        </div>
                        <p className="text-[#9CA3AF] text-sm mb-4">{job.employer?.name}</p>
                        <div className="flex flex-wrap gap-4 text-xs font-medium text-[#9CA3AF]">
                          <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                          <span className="flex items-center gap-1"><Clock size={12} /> {formatDate(job.createdAt)}</span>
                          <span className="text-[#3B82F6] font-bold">{formatSalary(job.salary)}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button className="p-3 bg-[#3B82F6]/5 hover:bg-[#3B82F6]/10 rounded-lg text-[#9CA3AF] hover:text-[#3B82F6] transition-colors"><Bookmark size={18} /></button>
                        <button className="px-6 py-2.5 bg-[#3B82F6] text-white font-bold rounded-lg text-sm transition-all">Details</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default JobSeekerDashboard;