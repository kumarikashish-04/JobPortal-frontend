import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase,
  Calendar,
  Download,
  ChevronLeft,
  ChevronRight,
  Star,
  Loader2,
  AlertCircle,
  ArrowLeft
} from "lucide-react";
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';

const ApplicationView = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [job, setJob] = useState(null);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const url = selectedStatus === 'all' 
        ? `/applications/job/${jobId}` 
        : `/applications/job/${jobId}?status=${selectedStatus}`;
      const response = await api.get(url);
      if (response.data.success) {
        setApplicants(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching applications:', err);
      toast.error('Failed to load applicants');
    } finally {
      setLoading(false);
    }
  };

  const fetchJobDetails = async () => {
    try {
      const response = await api.get(`/jobs/${jobId}`);
      if (response.data.success) {
        setJob(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching job details:', err);
    }
  };

  useEffect(() => {
    if (jobId) {
      fetchApplications();
      fetchJobDetails();
    }
  }, [jobId, selectedStatus]);

  const updateStatus = async (appId, status) => {
    try {
      const response = await api.put(`/applications/${appId}/status`, { status });
      if (response.data.success) {
        toast.success(`Status updated to ${status}`);
        fetchApplications();
      }
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'text-yellow-400 bg-yellow-500/20';
      case 'reviewed': return 'text-blue-400 bg-[#3B82F6]/20';
      case 'shortlisted': return 'text-purple-400 bg-purple-500/20';
      case 'rejected': return 'text-red-400 bg-red-500/20';
      case 'hired': return 'text-green-400 bg-green-500/20';
      default: return 'text-[#9CA3AF] bg-[#3B82F6]/10';
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1929] pt-28 pb-12 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <button
          onClick={() => navigate('/manage-jobs')}
          className="flex items-center gap-2 text-[#9CA3AF] hover:text-white mb-8 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1" />
          <span className="text-sm font-medium">Back to My Jobs</span>
        </button>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Applicants for <span className="text-[#3B82F6]">{job?.title || "Role"}</span>
              </h1>
              <p className="text-[#9CA3AF] flex items-center gap-2">
                <MapPin className="w-4 h-4" /> {job?.location} • {applicants.length} total candidates
              </p>
            </div>
            <div className="flex gap-2">
              {['all', 'pending', 'reviewed', 'shortlisted', 'rejected', 'hired'].map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedStatus(s)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all border ${
                    selectedStatus === s 
                      ? 'bg-[#3B82F6] border-[#3B82F6] text-white' 
                      : 'bg-[#1A2B3E] border-[#3B82F6]/20 text-[#9CA3AF] hover:text-white'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Content */}
        {loading ? (
          <div className="py-20 text-center">
            <Loader2 className="w-12 h-12 text-[#3B82F6] animate-spin mx-auto mb-4" />
            <p className="text-[#9CA3AF] font-medium">Loading candidate profiles...</p>
          </div>
        ) : applicants.length === 0 ? (
          <div className="py-20 text-center glass-card rounded-3xl p-12">
            <div className="w-16 h-16 bg-[#1A2B3E] rounded-full flex items-center justify-center mx-auto mb-4">
               <AlertCircle className="w-8 h-8 text-[#9CA3AF]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Applicants Found</h3>
            <p className="text-[#9CA3AF]">There are currently no candidates for this role with the selected status.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {applicants.map((app, index) => (
              <motion.div
                key={app._id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="glass-card rounded-2xl p-6 border-white/5 bg-[#1A2B3E]/[0.02] hover:bg-[#1A2B3E]/[0.04] transition-all group"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Photo Section */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#1A2B3E] flex items-center justify-center text-2xl font-bold shadow-lg shadow-[#3B82F6]/10">
                      {app.jobSeeker?.name?.[0] || 'C'}
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#3B82F6] transition-colors">{app.jobSeeker?.name}</h3>
                        <div className="flex flex-wrap gap-4 text-sm text-[#9CA3AF]">
                           <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> {app.jobSeeker?.email}</span>
                           <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Applied {new Date(app.appliedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <select 
                          value={app.status}
                          onChange={(e) => updateStatus(app._id, e.target.value)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider outline-none border border-transparent transition-all cursor-pointer ${getStatusColor(app.status)}`}
                        >
                          {['pending', 'reviewed', 'shortlisted', 'rejected', 'hired'].map(st => (
                            <option key={st} value={st} className="bg-[#111]">{st}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Cover Letter Snapshot */}
                    {app.coverLetter && (
                      <div className="mb-6 p-4 rounded-xl bg-[#1A2B3E]/[0.03] border border-white/5">
                        <p className="text-[10px] uppercase font-bold text-[#555] mb-2 tracking-widest">Cover Letter Note</p>
                        <p className="text-sm text-[#9CA3AF] line-clamp-2 italic">"{app.coverLetter}"</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                      {app.resume?.url ? (
                        <a 
                          href={app.resume.url} 
                          target="_blank" 
                          rel="noreferrer"
                          className="px-6 py-2.5 bg-[#3B82F6] text-white text-sm font-bold rounded-xl flex items-center gap-2 hover:bg-[#2563EB] transition-all shadow-lg shadow-[#3B82F6]/10"
                        >
                          <Download className="w-4 h-4" /> View Resume
                        </a>
                      ) : (
                        <span className="px-6 py-2.5 bg-[#1A2B3E] text-[#555] text-sm font-bold rounded-xl border border-white/5 cursor-not-allowed">
                          No Resume
                        </span>
                      )}
                      <button className="p-2.5 bg-[#1A2B3E] border border-[#3B82F6]/20 rounded-xl text-[#9CA3AF] hover:text-white transition-all shadow-sm">
                        <Star className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationView;