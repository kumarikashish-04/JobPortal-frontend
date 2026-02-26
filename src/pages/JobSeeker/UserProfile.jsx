import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase,
  GraduationCap,
  Award,
  Edit2,
  Save,
  X,
  Camera,
  Globe
} from "lucide-react";
import api from '../../services/api';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const UserProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    headline: "",
    experience: [],
    education: [],
    skills: [],
    bio: "",
    resume: { url: "", filename: "" }
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await api.get('/jobseeker/profile');
        if (response.data.success) {
          const profileData = response.data.data;
          setProfile({
            ...profileData,
            name: profileData.user?.name || user?.name || "",
            email: profileData.user?.email || user?.email || ""
          });
        }
      } catch (err) {
        console.error('Profile fetch error:', err);
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  const handleSave = async () => {
    try {
      const response = await api.put('/jobseeker/profile', profile);
      if (response.data.success) {
        toast.success('Profile updated successfully');
        setIsEditing(false);
        // We might want to refresh the global user context if the name changed
      }
    } catch (err) {
      toast.error('Failed to update profile');
    }
  };

  const addSkill = (skill) => {
    if (skill && !profile.skills.includes(skill)) {
      setProfile({ ...profile, skills: [...profile.skills, skill] });
    }
  };

  const removeSkill = (skill) => {
    setProfile({ ...profile, skills: profile.skills.filter(s => s !== skill) });
  };

  if (loading) return (
    <div className="min-h-screen bg-[#0A1929] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#3B82F6]/20 border-t-[#3B82F6] rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A1929] text-white pt-24 pb-12">
      <div className="max-w-5xl mx-auto px-4">
        {/* Profile Header Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-8 mb-8 relative">
          <div className="absolute top-6 right-6">
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className="px-4 py-2 bg-[#3B82F6] hover:bg-[#2563EB] rounded-lg text-sm font-bold transition-all flex items-center gap-2"
            >
              {isEditing ? <Save size={16} /> : <Edit2 size={16} />}
              {isEditing ? 'Save Profile' : 'Edit Profile'}
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#1A2B3E] flex items-center justify-center text-3xl font-bold shadow-lg">
                {profile.name?.[0] || user?.name?.[0]}
              </div>
            </div>
            
            <div className="text-center md:text-left flex-1 w-full">
               {isEditing ? (
                 <div className="space-y-3 mb-4">
                   <div>
                     <label className="text-xs text-[#9CA3AF] uppercase font-bold mb-1 block">Full Name</label>
                     <input 
                      className="w-full max-w-sm px-3 py-2 bg-[#1A2B3E] border border-[#3B82F6]/20 rounded-lg text-white font-semibold focus:border-[#3B82F6] outline-none" 
                      value={profile.name}
                      placeholder="Your Name"
                      onChange={(e) => setProfile({...profile, name: e.target.value})}
                     />
                   </div>
                   <div>
                     <label className="text-xs text-[#9CA3AF] uppercase font-bold mb-1 block">Headline</label>
                     <input 
                      className="w-full max-w-sm px-3 py-2 bg-[#1A2B3E] border border-[#3B82F6]/20 rounded-lg text-[#3B82F6] font-semibold focus:border-[#3B82F6] outline-none" 
                      value={profile.headline}
                      placeholder="e.g. Full Stack Developer"
                      onChange={(e) => setProfile({...profile, headline: e.target.value})}
                     />
                   </div>
                 </div>
               ) : (
                 <>
                   <h1 className="text-3xl font-bold text-white mb-2">{profile.name || user?.name}</h1>
                   <p className="text-[#3B82F6] font-semibold text-lg">{profile.headline || "Job Seeker"}</p>
                 </>
               )}
               <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 text-[#9CA3AF] text-sm">
                  <span className="flex items-center gap-2"><Mail size={14} /> {profile.email || user?.email}</span>
                  <span className="flex items-center gap-2"><MapPin size={14} /> {profile.location || 'Location Not Set'}</span>
               </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6">
            {/* Bio Section */}
            <section className="glass-card rounded-xl p-8">
               <h2 className="text-lg font-bold text-white mb-4">About Me</h2>
               {isEditing ? (
                   <textarea
                    className="w-full px-4 py-3 bg-[#1A2B3E] border border-[#3B82F6]/20 rounded-lg text-white resize-none"
                    rows="4"
                    value={profile.bio}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                   />
               ) : (
                   <p className="text-[#9CA3AF] leading-relaxed">{profile.bio || "Write something about yourself..."}</p>
               )}
            </section>

            {/* Skills Section */}
            <section className="glass-card rounded-xl p-8">
               <h2 className="text-lg font-bold text-white mb-4">Skills & Expertise</h2>
               <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, i) => (
                    <div key={i} className="px-3 py-1.5 bg-[#3B82F6]/10 border border-[#3B82F6]/20 rounded-lg flex items-center gap-2 text-sm font-medium text-white">
                       {skill}
                       {isEditing && (
                           <X size={12} className="text-red-400 cursor-pointer" onClick={() => removeSkill(skill)} />
                       )}
                    </div>
                  ))}
                  {isEditing && (
                      <input 
                        className="px-3 py-1.5 bg-[#1A2B3E] border border-[#3B82F6]/20 rounded-lg text-sm text-white focus:outline-none focus:border-[#3B82F6]"
                        placeholder="Add skill..." 
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                addSkill(e.target.value);
                                e.target.value = '';
                            }
                        }}
                      />
                  )}
               </div>
            </section>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Experience Placeholder */}
                <section className="glass-card rounded-xl p-8">
                   <h2 className="text-lg font-bold text-white mb-4">Experience</h2>
                   <p className="text-sm text-[#9CA3AF]">Document your professional journey</p>
                </section>


            </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;