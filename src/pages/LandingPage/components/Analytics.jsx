import React from 'react';
import { motion } from "framer-motion";
import { 
  BarChart3, TrendingUp, Users, Briefcase, 
  Clock, Award, ArrowUp, ArrowDown, 
  PieChart, Activity, Sparkles, Eye,
  Download, Calendar, Filter
} from "lucide-react";

const Analytics = () => {
  const stats = [
    {
      icon: Users,
      label: "Total Applicants",
      value: "24,521",
      change: "+12.5%",
      trend: "up",
      color: "from-blue-400 to-[#2563EB]"
    },
    {
      icon: Briefcase,
      label: "Active Jobs",
      value: "156",
      change: "+8.2%",
      trend: "up",
      color: "from-purple-400 to-purple-600"
    },
    {
      icon: Eye,
      label: "Profile Views",
      value: "89,234",
      change: "+23.1%",
      trend: "up",
      color: "from-green-400 to-green-600"
    },
    {
      icon: Clock,
      label: "Avg. Time to Hire",
      value: "12 days",
      change: "-2.5%",
      trend: "down",
      color: "from-orange-400 to-orange-600"
    }
  ];

  const jobStats = [
    { role: "Software Engineer", applicants: 345, hired: 12, rate: "3.5%" },
    { role: "Product Manager", applicants: 123, hired: 8, rate: "6.5%" },
    { role: "UX Designer", applicants: 234, hired: 15, rate: "6.4%" },
    { role: "Marketing Specialist", applicants: 167, hired: 10, rate: "6.0%" },
    { role: "Sales Representative", applicants: 278, hired: 18, rate: "6.5%" }
  ];

  const recentActivities = [
    { action: "New application received", role: "Frontend Developer", time: "5 min ago", icon: Users },
    { action: "Job posted successfully", role: "Backend Engineer", time: "2 hours ago", icon: Briefcase },
    { action: "Interview scheduled", role: "Product Designer", time: "5 hours ago", icon: Clock },
    { action: "Candidate hired", role: "DevOps Engineer", time: "1 day ago", icon: Award }
  ];

  return (
    <section className="relative bg-[#0A1929] py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#3B82F6]/5 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-96 bg-gradient-to-t from-[#3B82F6]/5 to-transparent"></div>
        
        {/* Animated circles */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#3B82F6]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#1E40AF]/5 rounded-full blur-3xl animate-pulse delay-700"></div>
        
        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #3B82F6 1px, transparent 0)',
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 mb-6">
            <Activity className="w-4 h-4 text-[#3B82F6]" />
            <span className="text-sm font-medium text-[#3B82F6]">Analytics & Insights</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Data-Driven{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#60A5FA]">
              Hiring Decisions
            </span>
          </h2>
          
          <p className="text-lg text-[#9CA3AF]">
            Track your hiring performance, analyze trends, and make informed decisions with our comprehensive analytics dashboard.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-[#1A2B3E] backdrop-blur-none rounded-2xl p-6 border border-[#3B82F6]/20 hover:border-[#3B82F6]/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} p-0.5`}>
                    <div className="w-full h-full bg-[#0A1929] rounded-xl flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {stat.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                    {stat.change}
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-[#9CA3AF]">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Charts Section */}
        {/* <div className="grid lg:grid-cols-3 gap-6 mb-12"> */}
          {/* Main Chart */}
          {/* <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-[#1A2B3E] backdrop-blur-none rounded-2xl p-6 border border-[#3B82F6]/20"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#3B82F6]/10 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-[#3B82F6]" />
                </div>
                <h3 className="text-lg font-semibold text-white">Application Trends</h3>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-[#3B82F6]/10 rounded-lg transition-colors">
                  <Filter className="w-4 h-4 text-[#9CA3AF]" />
                </button>
                <button className="p-2 hover:bg-[#3B82F6]/10 rounded-lg transition-colors">
                  <Download className="w-4 h-4 text-[#9CA3AF]" />
                </button>
              </div>
            </div> */}

            {/* Simple Bar Chart Representation */}
            {/* <div className="space-y-4">
              {jobStats.map((job, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white">{job.role}</span>
                    <span className="text-[#9CA3AF]">{job.applicants} applicants</span>
                  </div>
                  <div className="relative h-2 bg-[#1A2B3E] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(job.hired / job.applicants) * 100}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] rounded-full"
                    ></motion.div>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-[#3B82F6]">{job.hired} hired</span>
                    <span className="text-[#9CA3AF]">{job.rate} hire rate</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div> */}

          {/* Pie Chart Section */}
          {/* <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-[#1A2B3E] backdrop-blur-none rounded-2xl p-6 border border-[#3B82F6]/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-[#3B82F6]/10 rounded-lg">
                <PieChart className="w-5 h-5 text-[#3B82F6]" />
              </div>
              <h3 className="text-lg font-semibold text-white">Hiring Sources</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white">Direct Applications</span>
                <span className="text-[#3B82F6] font-semibold">45%</span>
              </div>
              <div className="w-full h-2 bg-[#1A2B3E] rounded-full overflow-hidden">
                <div className="w-[45%] h-full bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] rounded-full"></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-white">Referrals</span>
                <span className="text-[#3B82F6] font-semibold">25%</span>
              </div>
              <div className="w-full h-2 bg-[#1A2B3E] rounded-full overflow-hidden">
                <div className="w-[25%] h-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] rounded-full"></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-white">Social Media</span>
                <span className="text-[#3B82F6] font-semibold">18%</span>
              </div>
              <div className="w-full h-2 bg-[#1A2B3E] rounded-full overflow-hidden">
                <div className="w-[18%] h-full bg-gradient-to-r from-[#EC4899] to-[#F472B6] rounded-full"></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-white">Job Boards</span>
                <span className="text-[#3B82F6] font-semibold">12%</span>
              </div>
              <div className="w-full h-2 bg-[#1A2B3E] rounded-full overflow-hidden">
                <div className="w-[12%] h-full bg-gradient-to-r from-[#10B981] to-[#34D399] rounded-full"></div>
              </div>
            </div>
          </motion.div>
        </div> */}

        {/* Recent Activity */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-[#1A2B3E] backdrop-blur-none rounded-2xl p-6 border border-[#3B82F6]/20"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#3B82F6]/10 rounded-lg">
                <Activity className="w-5 h-5 text-[#3B82F6]" />
              </div>
              <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
            </div>
            <button className="text-sm text-[#3B82F6] hover:text-[#60A5FA] transition-colors">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {recentActivities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#3B82F6]/5 transition-colors"
                >
                  <div className="p-2 bg-[#3B82F6]/10 rounded-lg">
                    <Icon className="w-4 h-4 text-[#3B82F6]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm">
                      {activity.action}{' '}
                      <span className="text-[#3B82F6] font-medium">{activity.role}</span>
                    </p>
                    <p className="text-xs text-[#9CA3AF]">{activity.time}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div> */}
      </div>

      {/* Bottom wave effect */}
      {/* <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
          <path fill="#0A1929" fillOpacity="1" d="M0,192L48,197.3C96,203,192,213,288,208C384,203,480,181,576,181.3C672,181,768,203,864,208C960,213,1056,203,1152,186.7C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div> */}
    </section>
  );
};

export default Analytics;