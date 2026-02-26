import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign,
  Building2,
  Users,
  Calendar,
  CheckCircle2,
  Bookmark,
  Share2,
  ArrowLeft,
  Globe,
  Zap,
  ShieldCheck,
  Award
} from "lucide-react";
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const JobDetails = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/jobs/${jobId}`);
        if (response.data.success) {
          setJob(response.data.data);
        }
      } catch (err) {
        console.error('Fetch error:', err);
        toast.error('Failed to load job details');
        navigate('/find-jobs');
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [jobId]);

  const handleApply = async () => {
    try {
      setApplying(true);
      const response = await api.post(`/applications/${job._id}`);
      if (response.data.success) {
        toast.success('Application submitted successfully!');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to apply for this job');
    } finally {
      setApplying(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0A1929] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#3B82F6]/20 border-t-[#3B82F6] rounded-full animate-spin"></div>
    </div>
  );

  if (!job) return (
    <div className="min-h-screen bg-[#0A1929] text-white flex flex-col items-center justify-center gap-4">
      <p className="text-xl">Job not found</p>
      <button onClick={() => navigate('/find-jobs')} className="btn-primary">Go Back</button>
    </div>
  );

  const formatSalary = (salary) => {
    if (!salary || (!salary.min && !salary.max)) return 'Negotiable';
    return `$${salary.min.toLocaleString()} - $${salary.max.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-[#0A1929] text-white pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Navigation */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#9CA3AF] hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back to Jobs</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Job Content */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-8">
              <div className="flex flex-col md:flex-row gap-6 md:items-center">
                <div className="w-16 h-16 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center text-[#3B82F6]">
                  <Briefcase className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 bg-[#3B82F6]/10 text-[#3B82F6] text-xs font-bold rounded uppercase">{job.jobType}</span>
                    <span className="text-[#9CA3AF] text-xs font-medium">Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                  </div>
                  <h1 className="text-3xl font-bold text-white mb-1">{job.title}</h1>
                  <p className="text-[#3B82F6] font-semibold flex items-center gap-2">
                    <Building2 className="w-4 h-4" /> {job.employer?.name}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-[#3B82F6]/20">
                <div>
                  <p className="text-xs text-[#9CA3AF] mb-1">Location</p>
                  <p className="text-sm font-bold flex items-center gap-1 text-white"><MapPin className="w-3 h-3" /> {job.location}</p>
                </div>
                <div>
                  <p className="text-xs text-[#9CA3AF] mb-1">Salary</p>
                  <p className="text-sm font-bold text-[#34D399]">{formatSalary(job.salary)}</p>
                </div>
                <div>
                  <p className="text-xs text-[#9CA3AF] mb-1">Experience</p>
                  <p className="text-sm font-bold text-white">{job.experienceLevel || 'Mid-Level'}</p>
                </div>
                <div>
                  <p className="text-xs text-[#9CA3AF] mb-1">Category</p>
                  <p className="text-sm font-bold text-white">{job.category}</p>
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-xl p-8 space-y-8">
              <section>
                <h3 className="text-lg font-bold text-white mb-4">About the Role</h3>
                <p className="text-[#9CA3AF] leading-relaxed whitespace-pre-line">{job.description}</p>
              </section>

              <div className="grid md:grid-cols-2 gap-8">
                <section>
                  <h3 className="text-lg font-bold text-white mb-4">Responsibilities</h3>
                  <ul className="space-y-3">
                    {job.responsibilities?.map((item, i) => (
                      <li key={i} className="flex gap-3 text-sm text-[#9CA3AF]">
                        <CheckCircle2 className="w-4 h-4 text-[#3B82F6] flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
                <section>
                  <h3 className="text-lg font-bold text-white mb-4">Requirements</h3>
                  <ul className="space-y-3">
                    {job.requirements?.map((item, i) => (
                      <li key={i} className="flex gap-3 text-sm text-[#9CA3AF]">
                        <CheckCircle2 className="w-4 h-4 text-[#3B82F6] flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              <section>
                <h3 className="text-lg font-bold text-white mb-4">Skills & Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {job.skills?.map((skill, i) => (
                    <span key={i} className="px-3 py-1.5 bg-[#3B82F6]/10 border border-[#3B82F6]/20 rounded-lg text-sm font-medium text-white hover:border-[#3B82F6] transition-all">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            </motion.div>
          </div>

          {/* Right Column: Actions */}
          <div className="space-y-6">
            <div className="glass-card rounded-xl p-8 sticky top-28">
              <h3 className="text-lg font-bold mb-6">Apply for this position</h3>
              <div className="space-y-4">
                <button 
                  onClick={handleApply}
                  disabled={applying}
                  className="w-full py-4 bg-gradient-to-r from-[#3B82F6] to-[#1A2B3E] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
                >
                  {applying ? 'Submitting...' : 'Apply Now'}
                </button>
                <button className="w-full py-4 border border-[#3B82F6]/20 text-white font-bold rounded-xl hover:bg-[#3B82F6]/10 transition-all flex items-center justify-center gap-2 text-sm">
                  <Bookmark className="w-4 h-4" /> Save Job
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-[#3B82F6]/20">
                <p className="text-xs text-[#9CA3AF] mb-4 text-center">Interested? Apply before the deadline.</p>
                <div className="flex justify-center gap-4">
                  <button className="text-[#9CA3AF] hover:text-white transition-colors"><Share2 className="w-4 h-4" /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;