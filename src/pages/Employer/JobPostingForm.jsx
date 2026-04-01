import React, { useState } from 'react';
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  X, 
  Briefcase, 
  MapPin, 
  DollarSign, 
  FileText, 
  ListChecks, 
  Zap,
  Globe,
  Settings
} from "lucide-react";
import api from '../../services/api';
import toast from 'react-hot-toast';

const JobPostingForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    jobType: 'full-time',
    experienceLevel: 'mid',
    category: 'Technology',
    salary: {
      min: '',
      max: '',
      currency: 'USD',
      isVisible: true
    },
    description: '',
    requirements: '',
    responsibilities: '',
    skills: '',
    applicationDeadline: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleToggleSalary = () => {
    setFormData(prev => ({
      ...prev,
      salary: { ...prev.salary, isVisible: !prev.salary.isVisible }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const processedData = {
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()).filter(s => s !== ''),
        requirements: formData.requirements.split('\n').map(r => r.trim()).filter(r => r !== ''),
        responsibilities: formData.responsibilities.split('\n').map(r => r.trim()).filter(r => r !== ''),
        salary: {
            ...formData.salary,
            min: Number(formData.salary.min),
            max: Number(formData.salary.max)
        }
      };

      const response = await api.post('/jobs', processedData);

      if (response.data.success) {
        toast.success('Job position published successfully!');
        navigate('/employer-dashboard');
      }
    } catch (err) {
      console.error('Job error:', err);
      toast.error(err.response?.data?.message || 'Failed to publish job posting');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1929] text-white pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-[#0A1929] rounded-lg transition-colors">
              <ArrowLeft className="w-6 h-6 text-[#9CA3AF]" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white">Post New Job</h1>
              <p className="text-[#9CA3AF]">Fill in the details for your Aspire Map listing</p>
            </div>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section: Basic Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-8">
             <div className="flex items-center gap-2 mb-6">
                <Briefcase className="w-5 h-5 text-[#3B82F6]" />
                <h2 className="text-lg font-bold">Job Basics</h2>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-[#9CA3AF] mb-1.5">Job Title</label>
                    <input
                        type="text"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g. Senior Frontend Developer"
                        className="w-full px-4 py-3 bg-[#1A2B3E] border border-[#3B82F6]/20 rounded-lg text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#3B82F6] transition-colors"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#9CA3AF] mb-1.5">Location</label>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                        <input
                            type="text"
                            name="location"
                            required
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="San Francisco / Remote"
                            className="w-full pl-10 pr-4 py-3 bg-[#1A2B3E] border border-[#3B82F6]/20 rounded-lg text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#3B82F6] transition-colors"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#9CA3AF] mb-1.5">Employment Type</label>
                    <select
                        name="jobType"
                        value={formData.jobType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#1A2B3E] border border-[#3B82F6]/20 rounded-lg text-white focus:outline-none focus:border-[#3B82F6] transition-colors"
                    >
                        <option value="full-time">Full-Time</option>
                        <option value="part-time">Part-Time</option>
                        <option value="contract">Contract</option>
                        <option value="internship">Internship</option>
                        <option value="remote">Remote</option>
                        <option value="hybrid">Hybrid</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#9CA3AF] mb-1.5">Experience Level</label>
                    <select
                        name="experienceLevel"
                        value={formData.experienceLevel}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#1A2B3E] border border-[#3B82F6]/20 rounded-lg text-white focus:outline-none focus:border-[#3B82F6] transition-colors"
                    >
                        <option value="entry">Entry Level</option>
                        <option value="mid">Mid Level</option>
                        <option value="senior">Senior Level</option>
                        <option value="lead">Lead</option>
                        <option value="executive">Executive</option>
                    </select>
                </div>
             </div>
          </motion.div>

          {/* Section: Compensation */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-xl p-8">
             <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-[#3B82F6]" />
                    <h2 className="text-lg font-bold">Salary Range</h2>
                </div>
                <button type="button" onClick={handleToggleSalary} className="text-xs font-bold text-[#3B82F6] hover:underline">
                    {formData.salary.isVisible ? 'Visible to public' : 'Hidden from public'}
                </button>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                   <label className="block text-sm font-medium text-[#9CA3AF] mb-1.5">Minimum ($)</label>
                   <input
                        type="number"
                        name="salary.min"
                        value={formData.salary.min}
                        onChange={handleChange}
                        placeholder="50000"
                        className="w-full px-4 py-3 bg-[#1A2B3E] border border-[#3B82F6]/20 rounded-lg text-white focus:outline-none focus:border-[#3B82F6]"
                    />
                </div>
                <div>
                   <label className="block text-sm font-medium text-[#9CA3AF] mb-1.5">Maximum ($)</label>
                   <input
                        type="number"
                        name="salary.max"
                        value={formData.salary.max}
                        onChange={handleChange}
                        placeholder="100000"
                        className="w-full px-4 py-3 bg-[#1A2B3E] border border-[#3B82F6]/20 rounded-lg text-white focus:outline-none focus:border-[#3B82F6]"
                    />
                </div>
                <div>
                   <label className="block text-sm font-medium text-[#9CA3AF] mb-1.5">Currency</label>
                   <select name="salary.currency" value={formData.salary.currency} onChange={handleChange} className="w-full px-4 py-3 bg-[#1A2B3E] border border-[#3B82F6]/20 rounded-lg text-white focus:outline-none focus:border-[#3B82F6]">
                       <option value="USD">USD</option>
                       <option value="INR">INR</option>
                       <option value="EUR">EUR</option>
                   </select>
                </div>
             </div>
          </motion.div>

          {/* Section: Details */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-xl p-8">
             <div className="flex items-center gap-2 mb-6">
                <FileText className="w-5 h-5 text-[#3B82F6]" />
                <h2 className="text-lg font-bold">Role Description</h2>
             </div>

             <div className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-[#9CA3AF] mb-1.5">Job Description</label>
                    <textarea
                        name="description"
                        required
                        value={formData.description}
                        onChange={handleChange}
                        rows="5"
                        className="w-full px-4 py-3 bg-[#1A2B3E] border border-[#3B82F6]/20 rounded-lg text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#3B82F6] transition-colors"
                        placeholder="Describe the role and your company..."
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-[#9CA3AF] mb-1.5">Requirements (one per line)</label>
                        <textarea
                            name="requirements"
                            required
                            value={formData.requirements}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-4 py-3 bg-[#1A2B3E] border border-[#3B82F6]/20 rounded-lg text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#3B82F6]"
                            placeholder="e.g. 5+ years React exp"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#9CA3AF] mb-1.5">Responsibilities (one per line)</label>
                        <textarea
                            name="responsibilities"
                            required
                            value={formData.responsibilities}
                            onChange={handleChange}
                            rows="4"
                            className="w-full px-4 py-3 bg-[#1A2B3E] border border-[#3B82F6]/20 rounded-lg text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#3B82F6]"
                            placeholder="e.g. Mentor juniors"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-[#9CA3AF] mb-1.5">Required Skills (comma separated)</label>
                    <input
                        type="text"
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#1A2B3E] border border-[#3B82F6]/20 rounded-lg text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#3B82F6]"
                        placeholder="React, Node.js, TypeScript"
                    />
                </div>
             </div>
          </motion.div>

          {/* Footer Actions */}
          <div className="flex gap-4 pt-6">
             <button
                type="submit"
                disabled={loading}
                className="flex-1 py-4 bg-gradient-to-r from-[#3B82F6] to-[#1A2B3E] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
             >
                {loading ? 'Publishing...' : 'Publish Job Posting'}
             </button>
             <button
                type="button"
                onClick={() => navigate('/employer-dashboard')}
                className="px-8 py-4 bg-[#1A2B3E] border border-[#3B82F6]/20 hover:bg-[#0A1929] text-white font-bold rounded-xl transition-all"
             >
                Cancel
             </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobPostingForm;