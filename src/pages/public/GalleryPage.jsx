import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight, FiDownload } from 'react-icons/fi';
import { galleryService } from '../../services/galleryService';
import MediaCard from '../../components/common/MediaCard';
import Loader, { SkeletonCard } from '../../components/common/Loader';

const CATEGORIES = [
  'All',
  'Wedding Stage',
  'Haldi & Mehndi',
  'Birthday Party',
  'Baby Shower',
  'Anniversary',
  'Reception & Sangeet',
];

const GalleryPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'All');
  const [activeType, setActiveType] = useState('all');
  const [pagination, setPagination] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchMedia = async (page = 1) => {
    setLoading(true);
    try {
      const params = { page, limit: 12 };
      if (activeCategory !== 'All') params.category = activeCategory;
      if (activeType !== 'all') params.mediaType = activeType;

      const res = await galleryService.getAll(params);
      if (page === 1) {
        setMedia(res.data.data.media);
      } else {
        setMedia((prev) => [...prev, ...res.data.data.media]);
      }
      setPagination(res.data.data.pagination);
    } catch {
      setMedia([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia(1);
  }, [activeCategory, activeType]);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    if (cat === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  const handleLoadMore = () => {
    if (pagination && pagination.currentPage < pagination.totalPages) {
      fetchMedia(pagination.currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen pt-32 md:pt-40 pb-20 md:pb-28 px-8 sm:px-12 lg:px-24">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <span className="text-sm font-medium text-gold uppercase tracking-widest">
            Our Portfolio
          </span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-heading mt-4 mb-6">
            Decoration <span className="gradient-text">Gallery</span>
          </h1>
          <p className="text-lg md:text-xl text-slate max-w-2xl mx-auto">
            Browse our collection of stunning decoration projects across all event types.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-4 md:mb-6"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-rose-deep to-rose-medium text-white shadow-lg shadow-rose-deep/20'
                  : 'bg-white text-charcoal/70 hover:bg-blush/50 border border-blush'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Type Filter */}
        <div className="flex justify-center gap-2 mb-6 md:mb-10">
          {[
            { key: 'all', label: 'All Media' },
            { key: 'image', label: 'Photos' },
            { key: 'video', label: 'Videos' },
          ].map((type) => (
            <button
              key={type.key}
              onClick={() => setActiveType(type.key)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                activeType === type.key
                  ? 'bg-charcoal text-white'
                  : 'bg-charcoal/5 text-charcoal/60 hover:bg-charcoal/10'
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {loading && media.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : media.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 md:py-24"
          >
            <span className="text-6xl block mb-4">📸</span>
            <h3 className="text-xl font-semibold text-charcoal mb-2">No media found</h3>
            <p className="text-slate">
              {activeCategory !== 'All'
                ? `No decorations found for "${activeCategory}" yet.`
                : 'Gallery is being prepared. Check back soon!'}
            </p>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-10">
              {media.map((item, i) => (
                <MediaCard
                  key={item._id}
                  item={item}
                  index={i}
                  onClick={setSelectedItem}
                />
              ))}
            </div>

            {/* Load More */}
            {pagination && pagination.currentPage < pagination.totalPages && (
              <div className="text-center mt-8 md:mt-12">
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="px-8 py-3 bg-white border-2 border-rose-deep/20 text-rose-deep rounded-full font-medium hover:bg-rose-deep/5 hover:border-rose-deep/40 transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-charcoal/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="relative max-w-5xl w-full max-h-[90vh] rounded-2xl overflow-hidden bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-charcoal/50 text-white flex items-center justify-center hover:bg-charcoal/70 transition-colors"
              >
                <FiX size={20} />
              </button>

              {selectedItem.mediaType === 'video' ? (
                <video
                  src={selectedItem.mediaUrl}
                  controls
                  autoPlay
                  className="w-full max-h-[75vh] object-contain bg-black"
                />
              ) : (
                <img
                  src={selectedItem.mediaUrl}
                  alt={selectedItem.title}
                  className="w-full max-h-[75vh] object-contain bg-charcoal/5"
                />
              )}

              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="px-3 py-1 text-xs font-medium bg-rose-deep/10 text-rose-deep rounded-full">
                      {selectedItem.category}
                    </span>
                    <h3 className="text-xl font-bold font-heading text-charcoal mt-3">
                      {selectedItem.title}
                    </h3>
                    {selectedItem.description && (
                      <p className="text-sm text-slate mt-2">{selectedItem.description}</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;
