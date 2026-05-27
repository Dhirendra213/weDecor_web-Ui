import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { FiUser, FiMail, FiShield, FiClock, FiSettings, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 bg-ivory">
      <div className="max-w-5xl mx-auto">

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-white rounded-3xl overflow-hidden shadow-sm border border-blush/50 mb-10"
        >
          {/* Banner */}
          <div className="h-32 sm:h-56 bg-gradient-to-r from-rose-deep via-rose-medium to-gold opacity-90"></div>

          <div className="px-6 py-6 sm:px-10 pb-8">
            <div className="relative flex flex-col sm:flex-row sm:justify-between items-start sm:items-end gap-4 -mt-16 sm:-mt-24 mb-6">
              {/* Avatar */}
              <div className="w-32 h-32 sm:w-48 sm:h-48 rounded-full border-[6px] border-white bg-charcoal flex items-center justify-center text-5xl sm:text-7xl font-bold text-white shadow-xl z-10 shrink-0">
                {user.name?.[0]?.toUpperCase()}
              </div>

            </div>

            <div>
              <h1 className="text-3xl font-bold font-heading text-charcoal">{user.name}</h1>
              <p className="text-slate flex items-center gap-2 mt-1">
                <FiMail className="text-rose-deep" /> {user.email}
              </p>

              <div className="flex gap-3 mt-4">
                <span className="px-4 py-1.5 bg-blush text-charcoal rounded-full text-sm font-medium flex items-center gap-2">
                  <FiShield size={14} className="text-gold" />
                  {user.role === 'admin' ? 'Administrator' : 'Customer'}
                </span>
                <span className="px-4 py-1.5 bg-blush text-charcoal rounded-full text-sm font-medium flex items-center gap-2">
                  <FiClock size={14} className="text-gold" />
                  Joined {new Date(user.createdAt || Date.now()).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Profile Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-1 space-y-2"
          >
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-blush/50">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'overview'
                  ? 'bg-rose-deep/10 text-rose-deep'
                  : 'text-charcoal/70 hover:bg-blush/50'
                  }`}
              >
                <FiUser size={18} />
                Account Overview
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all mt-2 ${activeTab === 'settings'
                  ? 'bg-rose-deep/10 text-rose-deep'
                  : 'text-charcoal/70 hover:bg-blush/50'
                  }`}
              >
                <FiSettings size={18} />
                Account Settings
              </button>
            </div>
          </motion.div>

          {/* Main Content Area */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 mb-8"
          >
            {activeTab === 'overview' && (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-blush/50">
                <h2 className="text-2xl font-bold font-heading text-charcoal mb-6">Personal Information</h2>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
                    <div>
                      <label className="text-sm text-slate mb-1 block">Full Name</label>
                      <p className="font-medium text-charcoal">{user.name}</p>
                    </div>
                    <div>
                      <label className="text-sm text-slate mb-1 block">Email Address</label>
                      <p className="font-medium text-charcoal">{user.email}</p>
                    </div>
                  </div>

                  <hr className="border-blush/50" />

                  <div className="mt-4">
                    <h3 className="text-lg font-bold font-heading text-charcoal mb-4">Account Security</h3>
                    <p className="text-sm text-slate">
                      Your account is currently secured with email and password authentication.
                      Please ensure you use a strong password to protect your account.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-blush/50">
                <h2 className="text-2xl font-bold font-heading text-charcoal mb-6">Update Profile</h2>
                <p className="text-slate mb-6">
                  Currently, account details cannot be updated from the web interface. Please contact the administrator if you need to change your email or password.
                </p>
                <div className="p-4 bg-blush rounded-xl border border-gold/20 flex gap-4 items-start">
                  <div className="mt-1">
                    <FiMail className="text-gold" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal">Need help?</h4>
                    <p className="text-sm text-slate">Email us at <span className="text-rose-deep"><a href="mailto:dkflower2026@gmail.com">dkflower2026@gmail.com</a></span> to request account modifications.</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
