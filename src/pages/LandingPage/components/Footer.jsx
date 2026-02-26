import React from 'react';
import { motion } from "framer-motion";
import { 
  Briefcase, 
  Heart, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  Github,
  ArrowUp,
  Sparkles
} from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = {
    platform: [
      { label: "Find Jobs", href: "/find-jobs" },
      { label: "For Employers", href: "/for-employers" },
      { label: "Pricing", href: "/pricing" },
      { label: "Features", href: "/features" },
      { label: "Analytics", href: "/analytics" }
    ],
    resources: [
      { label: "Blog", href: "/blog" },
      { label: "Career Guides", href: "/guides" },
      { label: "Help Center", href: "/help" },
      { label: "Support", href: "/support" },
      { label: "FAQ", href: "/faq" }
    ],
    company: [
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
      { label: "Partners", href: "/partners" }
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "GDPR", href: "/gdpr" },
      { label: "Security", href: "/security" }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Github, href: "https://github.com", label: "GitHub" }
  ];

  const contactInfo = [
    { icon: Mail, info: "support@jobportal.com", href: "mailto:support@jobportal.com" },
    { icon: Phone, info: "+1 (555) 123-4567", href: "tel:+15551234567" },
    { icon: MapPin, info: "San Francisco, CA 94105", href: "#" }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#1A2B3E] to-[#0A1929] border-t border-[#3B82F6]/20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#3B82F6]/5 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-96 bg-gradient-to-t from-[#3B82F6]/5 to-transparent"></div>
        
        {/* Animated circles */}
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-[#3B82F6]/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-20 right-10 w-80 h-80 bg-[#1E40AF]/5 rounded-full blur-3xl animate-pulse delay-700"></div>
        
        {/* Grid overlay */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #3B82F6 1px, transparent 0)',
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>

      {/* Scroll to top button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        onClick={scrollToTop}
        className="absolute -top-5 right-10 z-10 p-3 bg-gradient-to-r from-[#3B82F6] to-[#1A2B3E] text-white rounded-full shadow-lg shadow-[#3B82F6]/10 hover:shadow-[#3B82F6]/40 transition-all duration-300 hover:scale-110"
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3B82F6] to-[#1A2B3E] flex items-center justify-center shadow-lg">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Job<span className="text-[#3B82F6]">Portal</span>
              </span>
            </div>
            
            <p className="text-[#9CA3AF] text-sm leading-relaxed mb-6">
              Connecting talented professionals with innovative companies worldwide. 
              Your career journey starts here.
            </p>

            {/* Contact Info */}
            {/* <div className="space-y-3">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-center gap-2 text-sm text-[#9CA3AF] hover:text-[#3B82F6] transition-colors duration-200 group"
                  >
                    <div className="p-1 bg-[#3B82F6]/10 rounded-lg group-hover:bg-[#3B82F6]/20 transition-colors">
                      <Icon className="w-3 h-3 text-[#3B82F6]" />
                    </div>
                    {item.info}
                  </a>
                );
              })}
            </div> */}

            {/* Trust Badge */}
            {/* <div className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20">
              <Sparkles className="w-3 h-3 text-[#3B82F6]" />
              <span className="text-xs text-[#3B82F6]">Trusted by 50K+ companies</span>
            </div>*/}
          </motion.div>

          {/* Quick Links */}
          {/* {Object.entries(footerLinks).map(([category, links], index) => ( */}
            {/* <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white font-semibold capitalize mb-4">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-sm text-[#9CA3AF] hover:text-[#3B82F6] transition-colors duration-200 relative group"
                    >
                      {link.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-[#3B82F6] to-[#60A5FA] group-hover:w-full transition-all duration-300"></span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div> */}
          {/* ))} */}
        </div>

        {/* Newsletter Section */}
       

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-[#3B82F6]/20"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <p className="text-sm text-[#9CA3AF] text-center lg:text-left">
              © {new Date().getFullYear()} JobPortal. All rights reserved. Made with{' '}
              <Heart className="inline w-3 h-3 text-red-500 fill-red-500" /> by JobPortal Team
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-[#1A2B3E] border border-[#3B82F6]/20 border border-[#3B82F6]/20 rounded-lg hover:bg-[#3B82F6]/10 hover:border-[#3B82F6]/40 transition-all duration-200 group"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#3B82F6] transition-colors duration-200" />
                  </motion.a>
                );
              })}
            </div>

            {/* Language Selector */}
            <select className="px-3 py-2 bg-[#1A2B3E] border border-[#3B82F6]/20 border border-[#3B82F6]/20 rounded-lg text-sm text-[#9CA3AF] focus:outline-none focus:border-[#3B82F6] transition-colors duration-200">
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;