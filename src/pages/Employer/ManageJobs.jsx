import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { 
  Briefcase, 
  Users, 
  Eye, 
  Edit2, 
  Trash2,
  ChevronDown,
  Search,
  AlertCircle,
  Loader2
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';

const ManageJobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1 });

  const fetchJobs = async (page = 1) => {
    try {
      setLoading(true);
      const params = { page, limit: 10 };
      if (filter !== 'all') params.status = filter;
      
      const response = await api.get('/employer/jobs', { params });
      if (response.data.success) {
        setJobs(response.data.data);
        setPagination(response.data.pagination);
      }
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setError('Failed to load your job postings.');
      toast.error('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [filter]);

  const handleDeleteJob = async (jobId) => {
    if (!window.confirm('Are you sure you want to delete this job posting?')) return;
    
    try {
      const response = await api.delete(`/jobs/${jobId}`);
      if (response.data.success) {
        toast.success('Job deleted successfully');
        setJobs(jobs.filter(job => job._id !== jobId));
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete job');
    }
  };

  const filteredJobs = jobs.filter(job => {
    if (searchTerm && !job.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'text-green-400 bg-green-500/20';
      case 'paused': return 'text-yellow-400 bg-yellow-500/20';
      case 'expired': return 'text-red-400 bg-red-500/20';
      default: return 'text-[#9CA3AF] bg-[#3B82F6]/10';
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1929] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Manage Your Jobs</h1>
            <p className="text-[#9CA3AF]">Track, edit, and monitor your active postings</p>
          </div>
          <button
            onClick={() => navigate('/post-job')}
            className="px-6 py-3 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold rounded-xl transition-all shadow-lg shadow-[#3B82F6]/10 flex items-center gap-2"
          >
            <Briefcase className="w-5 h-5" />
            Post New Job
          </button>
        </motion.div>

        {/* Filters & Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#9CA3AF] w-5 h-5" />
            <input
              type="text"
              placeholder="Search by job title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#1A2B3E] backdrop-blur-none border border-[#3B82F6]/20 rounded-xl text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#3B82F6] transition-all"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'active', 'paused', 'expired'].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-2 rounded-xl text-sm font-bold capitalize transition-all ${
                  filter === s 
                    ? 'bg-[#3B82F6] text-white' 
                    : 'bg-[#1A2B3E] text-[#9CA3AF] border border-[#3B82F6]/20 hover:border-[#3B82F6]/40'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Jobs Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl overflow-hidden border border-[#3B82F6]/20"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#3B82F6]/5 border-b border-[#3B82F6]/20 text-[#3B82F6] text-xs font-bold uppercase tracking-wider">
                  <th className="py-5 px-6">Position</th>
                  <th className="py-5 px-6">Stats</th>
                  <th className="py-5 px-6">Status</th>
                  <th className="py-5 px-6">Posted On</th>
                  <th className="py-5 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#3B82F6]/10">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="py-20 text-center">
                      <Loader2 className="w-10 h-10 text-[#3B82F6] animate-spin mx-auto mb-4" />
                      <p className="text-[#9CA3AF]">Fetching your jobs...</p>
                    </td>
                  </tr>
                ) : filteredJobs.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-20 text-center">
                      <AlertCircle className="w-10 h-10 text-[#9CA3AF] mx-auto mb-4" />
                      <p className="text-[#9CA3AF]">No jobs found matching your criteria.</p>
                    </td>
                  </tr>
                ) : (
                  filteredJobs.map((job) => (
                    <tr key={job._id} className="hover:bg-[#3B82F6]/5 transition-colors group">
                      <td className="py-5 px-6">
                        <div>
                          <p className="text-white font-bold group-hover:text-[#3B82F6] transition-colors">{job.title}</p>
                          <p className="text-xs text-[#9CA3AF]">{job.location} • {job.jobType}</p>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                        <div className="flex gap-4">
                          <div className="text-center">
                             <p className="text-sm font-bold text-white">{job.applicationCount || 0}</p>
                             <p className="text-[10px] text-[#9CA3AF] uppercase">Applicants</p>
                          </div>
                          <div className="text-center">
                             <p className="text-sm font-bold text-white">{job.viewCount || 0}</p>
                             <p className="text-[10px] text-[#9CA3AF] uppercase">Views</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-5 px-6">
                         <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusColor(job.status)}`}>
                            {job.status}
                         </span>
                      </td>
                      <td className="py-5 px-6">
                        <p className="text-xs text-white">{new Date(job.createdAt).toLocaleDateString()}</p>
                        <p className="text-[10px] text-[#9CA3AF] uppercase">posted</p>
                      </td>
                      <td className="py-5 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => navigate(`/job/${job._id}`)}
                            className="p-2 bg-[#3B82F6]/10 text-[#3B82F6] rounded-lg hover:bg-[#3B82F6] hover:text-white transition-all"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => navigate(`/applicants/${job._id}`)}
                            className="p-2 bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500 hover:text-white transition-all flex items-center gap-1.5"
                            title="View Applicants"
                          >
                            <Users className="w-4 h-4" />
                            <span className="text-xs font-bold">{job.applicationCount || 0}</span>
                          </button>
                          <button 
                            onClick={() => navigate(`/edit-job/${job._id}`)}
                            className="p-2 bg-purple-500/10 text-purple-400 rounded-lg hover:bg-purple-500 hover:text-white transition-all"
                            title="Edit Job"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteJob(job._id)}
                            className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                            title="Delete Job"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => fetchJobs(page)}
                className={`w-10 h-10 rounded-xl font-bold transition-all ${
                  pagination.page === page 
                    ? 'bg-[#3B82F6] text-white shadow-lg shadow-[#3B82F6]/10' 
                    : 'bg-[#1A2B3E] text-[#9CA3AF] hover:border-[#3B82F6]/40 border border-transparent'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageJobs;