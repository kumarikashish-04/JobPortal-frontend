import React from 'react';
import { motion } from "framer-motion";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  Bookmark, 
  X,
  ChevronRight
} from "lucide-react";
import { useNavigate } from 'react-router-dom';

const SavedJobs = () => {
  const navigate = useNavigate();

  const savedJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA (Remote)",
      salary: "$120k - $150k",
      type: "Full-time",
      savedDate: "2 days ago"
    },
    {
      id: 2,
      title: "UX/UI Designer",
      company: "Creative Studio",
      location: "New York, NY (Hybrid)",
      salary: "$90k - $120k",
      type: "Full-time",
      savedDate: "3 days ago"
    },
    {
      id: 3,
      title: "Backend Engineer",
      company: "Cloud Systems",
      location: "Remote",
      salary: "$130k - $160k",
      type: "Full-time",
      savedDate: "5 days ago"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A1929] pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Saved Jobs</h1>
          <p className="text-[#9CA3AF]">You have {savedJobs.length} saved jobs</p>
        </motion.div>

        {/* Saved Jobs List */}
        <div className="space-y-4">
          {savedJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#1A2B3E] backdrop-blur-none border border-[#3B82F6]/20 rounded-xl p-6 hover:border-[#3B82F6]/40 transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#3B82F6] to-[#1A2B3E] rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">{job.title}</h3>
                  <p className="text-[#9CA3AF] text-sm mb-2">{job.company}</p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-[#9CA3AF]">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" /> {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" /> Saved {job.savedDate}
                    </span>
                    <span className="text-[#3B82F6]">{job.salary}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {/* Handle remove */}}
                    className="p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-[#9CA3AF] hover:text-red-500" />
                  </button>
                  <button
                    onClick={() => navigate(`/job/${job.id}`)}
                    className="p-2 hover:bg-[#3B82F6]/10 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-[#9CA3AF] hover:text-[#3B82F6]" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {savedJobs.length === 0 && (
          <div className="text-center py-12">
            <Bookmark className="w-16 h-16 text-[#9CA3AF] mx-auto mb-4" />
            <h3 className="text-xl text-white mb-2">No saved jobs yet</h3>
            <p className="text-[#9CA3AF] mb-6">Start saving jobs you're interested in</p>
            <button
              onClick={() => navigate('/find-jobs')}
              className="px-6 py-3 bg-gradient-to-r from-[#3B82F6] to-[#1A2B3E] text-white rounded-xl"
            >
              Browse Jobs
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;