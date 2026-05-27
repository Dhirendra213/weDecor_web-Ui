import { motion } from 'framer-motion';
import { FiPlay, FiEye } from 'react-icons/fi';

const MediaCard = ({ item, onClick, index = 0 }) => {
  const isVideo = item.mediaType === 'video';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onClick={() => onClick?.(item)}
      className="group relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer hover:-translate-y-1"
    >
      {/* Media */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={isVideo ? item.thumbnailUrl : item.mediaUrl}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Video Icon */}
        {isVideo && (
          <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
            <FiPlay size={14} className="text-rose-deep ml-0.5" />
          </div>
        )}

        {/* Hover Eye Icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
            <FiEye size={20} className="text-rose-deep" />
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 text-xs font-medium bg-white/90 backdrop-blur-sm text-rose-deep rounded-full">
            {item.category}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-charcoal line-clamp-1 group-hover:text-rose-deep transition-colors">
          {item.title}
        </h3>
        {item.description && (
          <p className="text-xs text-slate mt-1 line-clamp-2">{item.description}</p>
        )}
      </div>
    </motion.div>
  );
};

export default MediaCard;
