import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, 
  Users, 
  Eye, 
  Clock,
  TrendingUp,
  ArrowRight,
  Plus,
  Search,
  CheckCircle2,
  MoreVertical,
  Calendar,
  LayoutDashboard,
  UserCircle,
  LogOut
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import toast from 'react-hot-toast';

const EmployerDashBoard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    activeJobs: 0,
    totalApplicants: 0,
    views: 0,
    hired: 0
  });
  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [jobsRes] = await Promise.all([
          api.get('/employer/jobs')
        ]);

        if (jobsRes.data.success) {
          const jobs = jobsRes.data.data;
          setRecentJobs(jobs.slice(0, 5));
          setStats(prev => ({
            ...prev,
            activeJobs: jobs.filter(j => j.status === 'active').length,
            views: jobs.reduce((acc, curr) => acc + (curr.viewCount || 0), 0),
            totalApplicants: jobs.reduce((acc, curr) => acc + (curr.applicationCount || 0), 0)
          }));
        }
      } catch (err) {
        console.error('Dash error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statConfig = [
    { label: 'Active Postings', value: stats.activeJobs, icon: Briefcase, color: 'text-blue-400' },
    { label: 'Total Applicants', value: stats.totalApplicants, icon: Users, color: 'text-purple-400' },
    { label: 'Job Impressions', value: stats.views, icon: Eye, color: 'text-green-400' },
    { label: 'Avg. Match Rate', value: '78%', icon: TrendingUp, color: 'text-orange-400' }
  ];

  return (
    <div className="min-h-screen bg-[#0A1929] text-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back, {user?.name.split(' ')[0]}</h1>
          <p className="text-[#9CA3AF]">Your recruitment overview at a glance</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statConfig.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-xl p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg bg-[#3B82F6]/10`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-xs text-[#34D399] font-bold">+12%</div>
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-xs text-[#9CA3AF] uppercase font-bold tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">Recent Job Postings</h2>
                <button onClick={() => navigate('/manage-jobs')} className="text-xs font-bold text-[#3B82F6] hover:underline">View All</button>
              </div>

              {loading ? (
                <div className="py-10 text-center text-[#9CA3AF]">Loading jobs...</div>
              ) : recentJobs.length === 0 ? (
                <div className="py-10 text-center text-[#9CA3AF]">No active postings</div>
              ) : (
                <div className="space-y-4">
                  {recentJobs.map((job) => (
                    <div key={job._id} className="flex items-center gap-4 p-4 rounded-xl border border-[#3B82F6]/20 hover:bg-[#3B82F6]/5 transition-all">
                      <div className="w-10 h-10 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center text-[#3B82F6]">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold">{job.title}</h4>
                        <p className="text-xs text-[#9CA3AF]">{job.location} • {job.jobType}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold">{job.applicationCount || 0}</p>
                        <p className="text-[10px] text-[#9CA3AF] uppercase">Applicants</p>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${job.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                        {job.status}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-card rounded-xl p-6">
               <h3 className="text-sm font-bold uppercase mb-4 text-[#3B82F6]">Quick Actions</h3>
               <div className="space-y-3">
                  <button onClick={() => navigate('/post-job')} className="w-full py-3 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-bold rounded-lg transition-all">+ Post New Position</button>
                  <button onClick={() => navigate('/manage-jobs')} className="w-full py-3 bg-[#1A2B3E] border border-[#3B82F6]/20 hover:bg-[#0A1929] text-white text-xs font-bold rounded-lg transition-all">Manage Existing Jobs</button>
               </div>
            </div>

            <div className="glass-card rounded-xl p-6">
               <h3 className="text-sm font-bold uppercase mb-4 flex items-center gap-2">
                 <Calendar className="w-4 h-4 text-[#3B82F6]" /> Activity Log
               </h3>
               <div className="space-y-4">
                 {[1, 2, 3].map((_, i) => (
                    <div key={i} className="flex gap-3 text-xs">
                       <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] mt-1.5"></div>
                       <div>
                          <p className="text-white font-medium">New application for Senior Developer</p>
                          <p className="text-[#9CA3AF]">2 hours ago</p>
                       </div>
                    </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployerDashBoard;