import React from 'react';
import { motion } from "framer-motion";
import { Search, Briefcase, ArrowRight, Sparkles, Building2, Users, TrendingUp } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const Hero = () => {
    const { isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    const handleFindJobs = () => navigate('/find-jobs');
    const handlePostJob = () => navigate('/post-job');

    const stats = [
        { icon: Users, label: "Job Seekers", value: "2.4M+", color: "text-blue-400" },
        { icon: Building2, label: "Enterprises", value: "50K+", color: "text-purple-400" },
        { icon: TrendingUp, label: "Success Rate", value: "98%", color: "text-green-400" }
    ];

    return (
        <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#0A1929]">
            {/* Background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-64 h-64 bg-[#3B82F6]/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#1E40AF]/10 rounded-full blur-3xl animate-pulse delay-700"></div>
                <div 
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, #3B82F6 1px, transparent 0)',
                        backgroundSize: '40px 40px'
                    }}
                ></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
                <div className="text-center max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 mb-8"
                    >
                        <Sparkles className="w-4 h-4 text-[#3B82F6]" />
                        <span className="text-sm font-medium text-[#3B82F6]">Trusted by Global Enterprises</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl lg:text-7xl font-bold text-white mb-8 leading-[1.1]"
                    >
                        Find the Career You <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#60A5FA]">
                            Truly Deserve
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-xl text-[#9CA3AF] mb-12 max-w-2xl mx-auto leading-relaxed"
                    >
                        Connecting world-class talent with industry-leading companies. Browse thousands of job openings and find your fit today.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        {(!isAuthenticated || user?.role === 'jobseeker') && (
                            <button
                                onClick={handleFindJobs}
                                className="btn-primary"
                            >
                                <Search className="w-5 h-5" />
                                Find Your Job
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        )}
                        {(!isAuthenticated || user?.role === 'employer') && (
                            <button
                                onClick={handlePostJob}
                                className="px-8 py-3 bg-[#1A2B3E] backdrop-blur-none border border-[#3B82F6]/20 text-white font-semibold rounded-xl hover:bg-[#0A1929] transition-all"
                            >
                                <Briefcase className="w-5 h-5 inline mr-2" />
                                For Employers
                            </button>
                        )}
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="grid grid-cols-3 gap-8 mt-20 p-8 glass-card"
                    >
                        {stats.map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className={`text-3xl font-bold mb-1 ${stat.color}`}>{stat.value}</div>
                                <div className="text-sm text-[#9CA3AF] font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;