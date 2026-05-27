import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiTrash2, FiEdit2, FiSearch, FiPlay, FiX, FiCheck } from 'react-icons/fi';
import { galleryService } from '../../services/galleryService';
import toast from 'react-hot-toast';
import Loader from '../../components/common/Loader';

const CATEGORIES = [
  'All',
  'Wedding Stage',
  'Haldi & Mehndi',
  'Birthday Party',
  'Baby Shower',
  'Anniversary',
  'Reception & Sangeet',
];

const ManageGalleryPage = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [pagination, setPagination] = useState(null);

  const fetchMedia = async (page = 1) => {
    setLoading(true);
    try {
      const params = { page, limit: 20 };
      if (activeCategory !== 'All') params.category = activeCategory;
      if (search) params.search = search;
      const res = await galleryService.getAll(params);
      setMedia(res.data.data.media);
      setPagination(res.data.data.pagination);
    } catch {
      setMedia([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [activeCategory]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMedia();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    try {
      await galleryService.delete(id);
      setMedia(media.filter((m) => m._id !== id));
      toast.success('Media deleted successfully');
    } catch {}
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setEditTitle(item.title);
  };

  const handleSaveEdit = async (id) => {
    try {
      await galleryService.update(id, { title: editTitle });
      setMedia(media.map((m) => (m._id === id ? { ...m, title: editTitle } : m)));
      setEditingId(null);
      toast.success('Updated successfully');
    } catch {}
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-heading text-white mb-1">
          Manage Gallery
        </h1>
        <p className="text-white/50 text-sm">
          View, edit, and delete your uploaded decoration media.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <form onSubmit={handleSearch} className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title..."
            className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-rose-deep/30 transition-all"
          />
        </form>

        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-rose-deep text-white'
                  : 'bg-white/5 text-white/40 hover:text-white/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Table/Grid */}
      {loading ? (
        <Loader text="Loading gallery..." />
      ) : media.length === 0 ? (
        <div className="text-center py-20">
          <span className="text-5xl block mb-3">📸</span>
          <p className="text-white/40">No media found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence>
            {media.map((item) => (
              <motion.div
                key={item._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-charcoal-light border border-white/5 rounded-xl overflow-hidden group"
              >
                {/* Thumbnail */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.mediaType === 'video' ? item.thumbnailUrl : item.mediaUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  {item.mediaType === 'video' && (
                    <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center">
                      <FiPlay size={12} className="text-white ml-0.5" />
                    </div>
                  )}
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-0.5 text-[10px] font-medium bg-black/50 text-white rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-3">
                  {editingId === item._id ? (
                    <div className="flex items-center gap-2">
                      <input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="flex-1 px-2 py-1 rounded bg-white/5 border border-white/10 text-white text-xs focus:outline-none"
                        autoFocus
                      />
                      <button
                        onClick={() => handleSaveEdit(item._id)}
                        className="text-success hover:text-success/80"
                      >
                        <FiCheck size={16} />
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="text-white/30 hover:text-white/60"
                      >
                        <FiX size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-white/80 truncate flex-1">{item.title}</p>
                      <div className="flex items-center gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-1.5 rounded-lg hover:bg-white/10 text-white/40 hover:text-white transition-colors"
                        >
                          <FiEdit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-1.5 rounded-lg hover:bg-danger/10 text-white/40 hover:text-danger transition-colors"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: pagination.totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => fetchMedia(i + 1)}
              className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
                pagination.currentPage === i + 1
                  ? 'bg-rose-deep text-white'
                  : 'bg-white/5 text-white/40 hover:bg-white/10'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageGalleryPage;
