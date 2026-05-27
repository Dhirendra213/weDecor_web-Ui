import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-gold/80 via-rose-deep to-charcoal">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-7xl block mb-6">💐</span>
              <h2 className="text-4xl font-bold font-heading mb-4">
                Join weDecor
              </h2>
              <p className="text-white/70 text-lg max-w-sm mx-auto">
                Create an account to explore our stunning decoration gallery and connect with us for your events.
              </p>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute top-24 right-16 text-4xl opacity-30"
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          🌹
        </motion.div>
        <motion.div
          className="absolute bottom-28 left-12 text-5xl opacity-20"
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          🌺
        </motion.div>
      </div>

      {/* Right - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-ivory">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="flex items-center gap-2 mb-8">
            <span className="text-2xl">🌸</span>
            <span className="text-2xl font-bold font-heading gradient-text">
              weDecor
            </span>
          </Link>

          <h1 className="text-3xl font-bold font-heading text-charcoal mb-2">
            Create Account
          </h1>
          <p className="text-slate mb-8">
            Join us to explore beautiful decorations for your celebrations.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate" size={18} />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-blush bg-white text-charcoal text-sm placeholder:text-slate/50 focus:outline-none focus:ring-2 focus:ring-rose-deep/20 focus:border-rose-deep/30 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">Email</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate" size={18} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-blush bg-white text-charcoal text-sm placeholder:text-slate/50 focus:outline-none focus:ring-2 focus:ring-rose-deep/20 focus:border-rose-deep/30 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-charcoal mb-2">Password</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate" size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full pl-12 pr-12 py-3 rounded-xl border border-blush bg-white text-charcoal text-sm placeholder:text-slate/50 focus:outline-none focus:ring-2 focus:ring-rose-deep/20 focus:border-rose-deep/30 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate hover:text-charcoal transition-colors"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-rose-deep to-rose-medium text-white rounded-xl font-medium hover:shadow-lg hover:shadow-rose-deep/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-slate mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-rose-deep font-medium hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
