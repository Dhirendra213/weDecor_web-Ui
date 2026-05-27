import { motion } from 'framer-motion';

const Loader = ({ fullScreen = false, text = 'Loading...' }) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <motion.div
          className="w-12 h-12 rounded-full border-4 border-blush"
          style={{ borderTopColor: '#8B2252' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <motion.span
          className="absolute inset-0 flex items-center justify-center text-lg"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          🌸
        </motion.span>
      </div>
      <p className="text-sm text-slate font-medium">{text}</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-ivory/80 backdrop-blur-sm z-50 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return <div className="flex items-center justify-center py-20">{content}</div>;
};

export const SkeletonCard = () => (
  <div className="rounded-2xl overflow-hidden bg-white shadow-sm">
    <div className="skeleton h-56 w-full" />
    <div className="p-4 space-y-3">
      <div className="skeleton h-4 w-3/4" />
      <div className="skeleton h-3 w-1/2" />
    </div>
  </div>
);

export default Loader;
