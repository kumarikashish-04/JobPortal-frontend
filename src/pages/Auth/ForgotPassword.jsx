import React, { useState } from 'react';
import { motion } from "framer-motion";
import { 
  Mail, 
  Lock, 
  HelpCircle, 
  CheckCircle,
  ArrowLeft,
  Shield,
  Key
} from "lucide-react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { getSecurityQuestions, verifyAnswers, resetPassword } = useAuth();
  
  // Steps: 1=Email, 2=Security Questions, 3=New Password, 4=Success
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState(['', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Step 1: Submit Email
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const result = await getSecurityQuestions(email);
      
      if (result.success) {
        setQuestions(result.questions);
        setStep(2);
      } else {
        setError(result.error || 'User not found');
      }
    } catch (error) {
      setError('Failed to verify email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify Security Answers
  const handleVerifyAnswers = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate answers
    if (!answers[0].trim() || !answers[1].trim()) {
      setError('Please answer both security questions');
      setLoading(false);
      return;
    }

    try {
      const result = await verifyAnswers(email, answers[0], answers[1]);
      
      if (result.success) {
        setStep(3);
      } else {
        setError(result.error || 'Incorrect answers');
      }
    } catch (error) {
      setError('Failed to verify answers. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate password
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const result = await resetPassword(email, newPassword);
      
      if (result.success) {
        setStep(4);
        setSuccess('Password reset successful!');
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        setError(result.error || 'Failed to reset password');
      }
    } catch (error) {
      setError('Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Go back to previous step
  const goBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setError('');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1929] flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1A2B3E] backdrop-blur-none border border-[#3B82F6]/20 rounded-2xl p-8 w-full max-w-md"
      >
        {/* Back Button */}
        <button
          onClick={goBack}
          className="flex items-center gap-2 text-[#9CA3AF] hover:text-[#3B82F6] mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#3B82F6]/10 mb-4">
            {step === 1 && <Mail className="w-8 h-8 text-[#3B82F6]" />}
            {step === 2 && <HelpCircle className="w-8 h-8 text-[#3B82F6]" />}
            {step === 3 && <Key className="w-8 h-8 text-[#3B82F6]" />}
            {step === 4 && <CheckCircle className="w-8 h-8 text-green-500" />}
          </div>
          
          <h2 className="text-2xl font-bold text-white mb-2">
            {step === 1 && "Forgot Password?"}
            {step === 2 && "Security Questions"}
            {step === 3 && "Create New Password"}
            {step === 4 && "Password Reset!"}
          </h2>
          
          <p className="text-[#9CA3AF] text-sm">
            {step === 1 && "Enter your email to get started"}
            {step === 2 && "Answer your security questions"}
            {step === 3 && "Enter your new password"}
            {step === 4 && "Your password has been reset successfully"}
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= s 
                  ? step > s 
                    ? 'bg-green-500 text-white' 
                    : 'bg-[#3B82F6] text-white'
                  : 'bg-[#1A2B3E] text-[#9CA3AF] border border-[#3B82F6]/20'
              }`}>
                {step > s ? <CheckCircle className="w-4 h-4" /> : s}
              </div>
              {s < 4 && (
                <div className={`w-12 h-0.5 mx-1 ${
                  step > s ? 'bg-[#3B82F6]' : 'bg-[#3B82F6]/20'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Error/Success Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400 text-sm">
            {success}
          </div>
        )}

        {/* Step 1: Email Form */}
        {step === 1 && (
          <form onSubmit={handleEmailSubmit}>
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-[#1A2B3E] border border-[#3B82F6]/20 rounded-xl text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#3B82F6]"
                  placeholder="Enter your email"
                  required
                  disabled={loading}
                />
              </div>
              <p className="text-xs text-[#9CA3AF] mt-2">
                We'll send security questions to verify your identity
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || !email}
              className="w-full py-3 bg-gradient-to-r from-[#3B82F6] to-[#1A2B3E] text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : 'Continue'}
            </button>
          </form>
        )}

        {/* Step 2: Security Questions */}
        {step === 2 && questions.length > 0 && (
          <form onSubmit={handleVerifyAnswers}>
            <div className="space-y-4 mb-6">
              <div className="p-4 bg-[#3B82F6]/5 rounded-lg border border-[#3B82F6]/20 mb-4">
                <p className="text-sm text-[#9CA3AF]">
                  <Shield className="inline w-4 h-4 mr-1 text-[#3B82F6]" />
                  Answer the following security questions to verify your identity
                </p>
              </div>

              {/* Question 1 */}
              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                  Question 1: <span className="text-white">{questions[0]}</span>
                </label>
                <input
                  type="text"
                  value={answers[0]}
                  onChange={(e) => {
                    const newAnswers = [...answers];
                    newAnswers[0] = e.target.value;
                    setAnswers(newAnswers);
                  }}
                  className="w-full px-4 py-3 bg-[#1A2B3E] border border-[#3B82F6]/20 rounded-xl text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#3B82F6]"
                  placeholder="Your answer"
                  required
                  disabled={loading}
                />
              </div>

              {/* Question 2 */}
              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                  Question 2: <span className="text-white">{questions[1]}</span>
                </label>
                <input
                  type="text"
                  value={answers[1]}
                  onChange={(e) => {
                    const newAnswers = [...answers];
                    newAnswers[1] = e.target.value;
                    setAnswers(newAnswers);
                  }}
                  className="w-full px-4 py-3 bg-[#1A2B3E] border border-[#3B82F6]/20 rounded-xl text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#3B82F6]"
                  placeholder="Your answer"
                  required
                  disabled={loading}
                />
              </div>

              <p className="text-xs text-[#9CA3AF] mt-2">
                Answers are case-insensitive (capitalization doesn't matter)
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || !answers[0] || !answers[1]}
              className="w-full py-3 bg-gradient-to-r from-[#3B82F6] to-[#1A2B3E] text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Verifying...' : 'Verify Answers'}
            </button>
          </form>
        )}

        {/* Step 3: New Password */}
        {step === 3 && (
          <form onSubmit={handleResetPassword}>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#1A2B3E] border border-[#3B82F6]/20 rounded-xl text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#3B82F6]"
                    placeholder="Enter new password"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#9CA3AF] mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-[#1A2B3E] border border-[#3B82F6]/20 rounded-xl text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#3B82F6]"
                    placeholder="Confirm new password"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="bg-[#3B82F6]/5 p-3 rounded-lg">
                <p className="text-xs text-[#9CA3AF]">Password must:</p>
                <ul className="text-xs text-[#9CA3AF] list-disc list-inside mt-1">
                  <li className={newPassword.length >= 6 ? 'text-green-400' : ''}>
                    Be at least 6 characters
                  </li>
                  <li className={newPassword === confirmPassword && newPassword ? 'text-green-400' : ''}>
                    Match the confirmation
                  </li>
                </ul>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !newPassword || !confirmPassword || newPassword !== confirmPassword}
              className="w-full py-3 bg-gradient-to-r from-[#3B82F6] to-[#1A2B3E] text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
          </form>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="text-center">
            <div className="mb-6">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl text-white font-semibold mb-2">
                Password Reset Successful!
              </h3>
              <p className="text-[#9CA3AF] text-sm mb-4">
                Your password has been changed successfully.
                You'll be redirected to the login page in a few seconds.
              </p>
            </div>

            <button
              onClick={() => navigate('/login')}
              className="w-full py-3 bg-gradient-to-r from-[#3B82F6] to-[#1A2B3E] text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Go to Login
            </button>
          </div>
        )}

        {/* Back to Login Link */}
        {step < 4 && (
          <div className="text-center mt-6">
            <button
              onClick={() => navigate('/login')}
              className="text-sm text-[#3B82F6] hover:text-[#60A5FA] transition-colors"
            >
              ← Back to Login
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ForgotPassword;