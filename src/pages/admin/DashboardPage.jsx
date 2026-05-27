import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiImage, FiVideo, FiMessageSquare, FiUpload, FiTrendingUp } from 'react-icons/fi';
import { galleryService } from '../../services/galleryService';
import { contactService } from '../../services/contactService';

const DashboardPage = () => {
  const [galleryStats, setGalleryStats] = useState(null);
  const [contactStats, setContactStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [gRes, cRes] = await Promise.all([
          galleryService.getStats(),
          contactService.getStats(),
        ]);
        setGalleryStats(gRes.data.data);
        setContactStats(cRes.data.data);
      } catch (err) {
        console.log('Stats not available yet');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Images',
      value: galleryStats?.totalImages || 0,
      icon: FiImage,
      color: 'from-blue-500 to-blue-600',
      bg: 'bg-blue-500/10',
    },
    {
      title: 'Total Videos',
      value: galleryStats?.totalVideos || 0,
      icon: FiVideo,
      color: 'from-purple-500 to-purple-600',
      bg: 'bg-purple-500/10',
    },
    {
      title: 'Unread Messages',
      value: contactStats?.unread || 0,
      icon: FiMessageSquare,
      color: 'from-rose-deep to-rose-medium',
      bg: 'bg-rose-deep/10',
    },
    {
      title: 'Total Inquiries',
      value: contactStats?.total || 0,
      icon: FiTrendingUp,
      color: 'from-emerald-500 to-emerald-600',
      bg: 'bg-emerald-500/10',
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-heading text-white mb-1">
          Dashboard
        </h1>
        <p className="text-white/50 text-sm">
          Welcome back! Here's what's happening with your decoration business.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {statCards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-charcoal-light border border-white/5 rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center`}>
                <card.icon size={22} className="text-white/80" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white">{loading ? '—' : card.value}</p>
            <p className="text-sm text-white/40 mt-1">{card.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        <Link
          to="/admin/upload"
          className="flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-rose-deep to-rose-medium text-white hover:shadow-lg hover:shadow-rose-deep/20 transition-all group"
        >
          <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <FiUpload size={22} />
          </div>
          <div>
            <p className="font-semibold text-lg">Upload Media</p>
            <p className="text-white/70 text-sm">Add new images or videos to gallery</p>
          </div>
        </Link>

        <Link
          to="/admin/messages"
          className="flex items-center gap-4 p-6 rounded-2xl bg-charcoal-light border border-white/5 text-white hover:border-white/10 transition-all group"
        >
          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
            <FiMessageSquare size={22} />
          </div>
          <div>
            <p className="font-semibold text-lg">View Messages</p>
            <p className="text-white/40 text-sm">
              {contactStats?.unread
                ? `${contactStats.unread} unread message(s)`
                : 'No new messages'}
            </p>
          </div>
        </Link>
      </div>

      {/* Category Breakdown */}
      {galleryStats?.categoryStats?.length > 0 && (
        <div className="bg-charcoal-light border border-white/5 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Gallery by Category</h2>
          <div className="space-y-3">
            {galleryStats.categoryStats.map((cat) => {
              const percentage = Math.round(
                (cat.count / (galleryStats.totalMedia || 1)) * 100
              );
              return (
                <div key={cat._id} className="flex items-center gap-4">
                  <span className="text-sm text-white/60 w-40 truncate">{cat._id}</span>
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-rose-deep to-gold rounded-full"
                    />
                  </div>
                  <span className="text-sm text-white/40 w-12 text-right">{cat.count}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
