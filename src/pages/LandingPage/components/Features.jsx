import React from 'react';
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { employerFeatures, jobSeekerFeatures } from '../../Utils/data';

const Features = () => {
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
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 mb-6">
            <Sparkles className="w-4 h-4 text-[#3B82F6]" />
            <span className="text-sm font-medium text-[#3B82F6]">Powerful Features</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Everything You Need to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#60A5FA]">
              Succeed
            </span>
          </h2>
          
          <p className="text-lg text-[#9CA3AF]">
            Whether you're looking for your next opportunity or the perfect candidate,
            we have the tools and features to make it happen.
          </p>
        </motion.div>

        {/* Job Seeker Features */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl font-bold text-white mb-3">
              For <span className="text-[#3B82F6]">Job Seekers</span>
            </h3>
            <p className="text-[#9CA3AF] max-w-2xl mx-auto">
              Everything you need to find your dream job and advance your career
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobSeekerFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group relative bg-[#1A2B3E] backdrop-blur-none rounded-2xl p-8 border border-[#3B82F6]/20 hover:border-[#3B82F6]/30 transition-all duration-300"
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#3B82F6]/0 via-[#3B82F6]/5 to-[#3B82F6]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} p-0.5 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="w-full h-full bg-[#0A1929] rounded-xl flex items-center justify-center">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  
                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-[#3B82F6] transition-colors duration-300">
                    {feature.title}
                  </h4>
                  
                  <p className="text-[#9CA3AF] leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Hover arrow */}
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="absolute bottom-8 right-8"
                  >
                    <ArrowRight className="w-5 h-5 text-[#3B82F6]" />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Employer Features */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="text-3xl font-bold text-white mb-3">
              For <span className="text-[#3B82F6]">Employers</span>
            </h3>
            <p className="text-[#9CA3AF] max-w-2xl mx-auto">
              Powerful tools to help you find and hire the best talent efficiently
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {employerFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group relative bg-[#1A2B3E] backdrop-blur-none rounded-2xl p-8 border border-[#3B82F6]/20 hover:border-[#3B82F6]/30 transition-all duration-300"
                >
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#3B82F6]/0 via-[#3B82F6]/5 to-[#3B82F6]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.color} p-0.5 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="w-full h-full bg-[#0A1929] rounded-xl flex items-center justify-center">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  
                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-[#3B82F6] transition-colors duration-300">
                    {feature.title}
                  </h4>
                  
                  <p className="text-[#9CA3AF] leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Hover arrow */}
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="absolute bottom-8 right-8"
                  >
                    <ArrowRight className="w-5 h-5 text-[#3B82F6]" />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 mb-6">
            <span className="text-sm font-medium text-[#3B82F6]">Ready to get started?</span>
          </div>
          
          <h3 className="text-3xl font-bold text-white mb-4">
            Join thousands of professionals and companies
          </h3>
          
          <p className="text-[#9CA3AF] mb-8 max-w-2xl mx-auto">
            Start your journey today and discover how our platform can help you achieve your goals
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="group flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#3B82F6] to-[#1A2B3E] text-white font-semibold rounded-xl shadow-lg shadow-[#3B82F6]/10 hover:shadow-[#3B82F6]/40 transition-all duration-300"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-transparent border-2 border-[#3B82F6]/30 text-white font-semibold rounded-xl hover:bg-[#3B82F6]/10 hover:border-[#3B82F6] transition-all duration-300"
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
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

export default Features;