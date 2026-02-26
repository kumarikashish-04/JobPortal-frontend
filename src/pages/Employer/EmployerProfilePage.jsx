import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Globe,
  Users,
  Calendar,
  Edit2,
  Save,
  Camera,
  Layers,
  Sparkles,
  Link,
  Target,
  Heart
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const EmployerProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    companyName: "",
    industry: "",
    size: "",
    location: "",
    website: "",
    description: "",
    founded: "",
    mission: "",
    culture: "",
    benefits: []
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await api.get('/employer/profile');
        if (response.data.success) {
          setProfile(response.data.data);
        }
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      const response = await api.put('/employer/profile', profile);
      if (response.data.success) {
        toast.success('Company profile updated');
        setIsEditing(false);
      }
    } catch (err) {
      toast.error('Update failed');
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#1A2B3E] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#3B82F6]/20 border-t-[#3B82F6] rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A1929] text-white pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
           <div>
              <h1 className="text-3xl font-bold text-white">Company Profile</h1>
              <p className="text-[#9CA3AF]">Manage your brand and mission for the portal</p>
           </div>
           <button
             onClick={() => isEditing ? handleSave() : setIsEditing(true)}
             className="px-4 py-2 bg-[#3B82F6] hover:bg-[#2563EB] rounded-lg text-sm font-bold transition-all flex items-center gap-2"
           >
             {isEditing ? <Save size={16} /> : <Edit2 size={16} />}
             {isEditing ? 'Save Changes' : 'Edit Profile'}
           </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-8">
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                 <div className="relative">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#3B82F6] to-[#1A2B3E] flex items-center justify-center shadow-lg">
                       <Building2 className="w-12 h-12 text-white" />
                    </div>
                 </div>
                 
                 <div className="flex-1">
                    {isEditing ? (
                        <input
                           className="w-full px-4 py-2 bg-[#1A2B3E] border border-[#3B82F6]/20 rounded-lg text-2xl font-bold text-white mb-3"
                           value={profile.companyName}
                           onChange={(e) => setProfile({...profile, companyName: e.target.value})}
                        />
                    ) : (
                        <h2 className="text-3xl font-bold text-white mb-1">{profile.companyName || "Your Company"}</h2>
                    )}
                    
                    <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
                        <span className="px-3 py-1 bg-[#3B82F6]/10 rounded-full text-xs font-bold text-[#3B82F6] border border-[#3B82F6]/20">{profile.industry || "General Industry"}</span>
                        <span className="px-3 py-1 bg-[#3B82F6]/10 rounded-full text-xs font-bold text-[#3B82F6] border border-[#3B82F6]/20">{profile.size || "Scale Undisclosed"}</span>
                    </div>
                 </div>
              </div>
            </motion.div>

            <section className="glass-card rounded-xl p-8">
               <h3 className="text-lg font-bold text-white mb-4">Company Overview</h3>
               {isEditing ? (
                   <textarea
                    className="w-full px-4 py-3 bg-[#1A2B3E] border border-[#3B82F6]/20 rounded-lg text-white resize-none"
                    rows="6"
                    value={profile.description}
                    onChange={(e) => setProfile({...profile, description: e.target.value})}
                   />
               ) : (
                   <p className="text-[#9CA3AF] leading-relaxed">{profile.description || "Tell us about your company..."}</p>
               )}
            </section>

            <div className="grid md:grid-cols-2 gap-6">
                <section className="glass-card rounded-xl p-8">
                   <h3 className="text-sm font-bold uppercase text-[#3B82F6] mb-4">Our Mission</h3>
                   {isEditing ? (
                       <textarea className="w-full p-3 bg-[#1A2B3E] border border-[#3B82F6]/20 rounded-lg text-sm text-white" value={profile.mission} onChange={(e) => setProfile({...profile, mission: e.target.value})} />
                   ) : (
                       <p className="text-[#9CA3AF] text-sm italic">"{profile.mission || "Define your mission statement..."}"</p>
                   )}
                </section>
                <section className="glass-card rounded-xl p-8">
                   <h3 className="text-sm font-bold uppercase text-[#3B82F6] mb-4">Core Values</h3>
                   {isEditing ? (
                       <textarea className="w-full p-3 bg-[#1A2B3E] border border-[#3B82F6]/20 rounded-lg text-sm text-white" value={profile.culture} onChange={(e) => setProfile({...profile, culture: e.target.value})} />
                   ) : (
                       <p className="text-[#9CA3AF] text-sm">{profile.culture || "What drives your workplace culture?"}</p>
                   )}
                </section>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
             <div className="glass-card rounded-xl p-8">
                <h3 className="text-sm font-bold uppercase text-[#3B82F6] mb-6">Details</h3>
                
                <div className="space-y-4 text-sm">
                   <div className="flex flex-col gap-1">
                      <span className="text-[#9CA3AF] text-[10px] uppercase font-bold tracking-wider">Website</span>
                      {isEditing ? (
                          <input className="w-full p-2 bg-[#1A2B3E] border border-[#3B82F6]/20 rounded-lg text-xs" value={profile.website} onChange={(e) => setProfile({...profile, website: e.target.value})} />
                      ) : (
                          <a href={profile.website} className="font-bold text-[#3B82F6] hover:underline block truncate">{profile.website || "Not set"}</a>
                      )}
                   </div>

                   <div className="flex flex-col gap-1 pt-4 border-t border-[#3B82F6]/20">
                      <span className="text-[#9CA3AF] text-[10px] uppercase font-bold tracking-wider">Headquarters</span>
                      {isEditing ? (
                          <input className="w-full p-2 bg-[#1A2B3E] border border-[#3B82F6]/20 rounded-lg text-xs" value={profile.location} onChange={(e) => setProfile({...profile, location: e.target.value})} />
                      ) : (
                          <p className="font-bold">{profile.location || "Not set"}</p>
                      )}
                   </div>

                   <div className="flex flex-col gap-1 pt-4 border-t border-[#3B82F6]/20">
                      <span className="text-[#9CA3AF] text-[10px] uppercase font-bold tracking-wider">Founded</span>
                      {isEditing ? (
                          <input className="w-full p-2 bg-[#1A2B3E] border border-[#3B82F6]/20 rounded-lg text-xs" value={profile.founded} onChange={(e) => setProfile({...profile, founded: e.target.value})} />
                      ) : (
                          <p className="font-bold">{profile.founded || "Not set"}</p>
                      )}
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerProfilePage;