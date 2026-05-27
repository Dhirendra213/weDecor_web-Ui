import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiStar, FiHeart, FiCamera } from 'react-icons/fi';
import { galleryService } from '../../services/galleryService';
import MediaCard from '../../components/common/MediaCard';

const categories = [
  { name: 'Wedding Stage', icon: '💒', desc: 'Grand & elegant stage setups' },
  { name: 'Haldi & Mehndi', icon: '🌿', desc: 'Vibrant traditional decor' },
  { name: 'Birthday Party', icon: '🎂', desc: 'Fun & colorful celebrations' },
  { name: 'Baby Shower', icon: '🍼', desc: 'Soft & adorable themes' },
  { name: 'Anniversary', icon: '💝', desc: 'Romantic & memorable setups' },
  { name: 'Reception & Sangeet', icon: '🎉', desc: 'Dazzling party vibes' },
];

const stats = [
  { number: '100+', label: 'Events Decorated' },
  { number: '15+', label: 'Design Themes' },
  { number: '100%', label: 'Happy Clients' },
  { number: '10+', label: 'Years Experience' },
];

const HomePage = () => {
  const [featuredMedia, setFeaturedMedia] = useState([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await galleryService.getAll({ limit: 6 });
        setFeaturedMedia(res.data.data.media);
      } catch (err) {
        console.log('Gallery not loaded yet');
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div>
      {/* ─── Hero Section ─────────────────────────────────────── */}
      <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-deep/10 via-blush/40 to-gold/10" />
        <div className="absolute top-20 right-[-10%] sm:right-10 w-48 sm:w-72 h-48 sm:h-72 bg-rose-deep/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-[-10%] sm:left-10 w-64 sm:w-96 h-64 sm:h-96 bg-gold/10 rounded-full blur-3xl" />

        {/* Floating decorations */}
        <motion.div
          className="absolute top-32 right-[10%] sm:right-[20%] text-4xl sm:text-5xl"
          animate={{ y: [-10, 10, -10], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          🌺
        </motion.div>
        <motion.div
          className="absolute bottom-40 left-[5%] sm:left-[15%] text-3xl sm:text-4xl"
          animate={{ y: [10, -10, 10], rotate: [0, -5, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        >
          🌸
        </motion.div>
        <motion.div
          className="absolute top-48 left-[5%] sm:left-[10%] text-2xl sm:text-3xl"
          animate={{ y: [-8, 8, -8] }}
          transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        >
          🌷
        </motion.div>

        <div className="relative w-full max-w-[1400px] mx-auto px-8 sm:px-12 lg:px-24 py-24 md:py-32 lg:py-40">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-deep/10 text-rose-deep text-sm font-medium mb-6">
                <FiStar size={14} /> Premium Decoration Services
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold font-heading leading-tight mb-6"
            >
              Making Every{' '}
              <span className="gradient-text">Moment</span>{' '}
              Beautiful
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-slate max-w-2xl mb-10 leading-relaxed"
            >
              Transform your celebrations with our exquisite flower decorations.
              From dreamy weddings to vibrant birthdays — we bring your vision to life.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/gallery"
                className="inline-flex items-center gap-3 px-10 py-4 md:px-12 md:py-5 text-white bg-gradient-to-r from-rose-deep to-rose-medium rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-rose-deep/30 transition-all duration-300 hover:-translate-y-1"
              >
                Explore Gallery <FiArrowRight size={20} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 px-10 py-4 md:px-12 md:py-5 text-rose-deep bg-white border-2 border-rose-deep/20 rounded-full font-semibold text-lg hover:border-rose-deep/50 hover:bg-rose-deep/5 transition-all duration-300 hover:-translate-y-1"
              >
                Book Now <FiHeart size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Stats Section ────────────────────────────────────── */}
      <section className="relative -mt-24 z-10 max-w-[1200px] mx-auto px-8 sm:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-6 sm:p-8 shadow-xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl font-bold gradient-text font-heading">
                  {stat.number}
                </p>
                <p className="text-sm text-slate mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── Services Section ─────────────────────────────────── */}
      <section className="py-20 md:py-28 lg:py-32 px-8 sm:px-12 lg:px-24">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <span className="text-sm font-medium text-gold uppercase tracking-widest">
              What We Offer
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold font-heading mt-3 mb-4">
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="text-slate max-w-2xl mx-auto">
              Every celebration deserves to be extraordinary. Explore our range of decoration
              services crafted with love and precision.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  to={`/gallery?category=${encodeURIComponent(cat.name)}`}
                  className="block p-8 sm:p-10 rounded-3xl bg-white border border-blush/50 hover:border-rose-deep/30 hover:shadow-2xl hover:shadow-rose-deep/10 transition-all duration-500 group hover:-translate-y-2"
                >
                  <span className="text-5xl block mb-6 group-hover:scale-110 transition-transform duration-300">
                    {cat.icon}
                  </span>
                  <h3 className="text-lg font-semibold font-heading text-charcoal group-hover:text-rose-deep transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-slate mt-2">{cat.desc}</p>
                  <span className="inline-flex items-center gap-1 text-sm text-rose-deep font-medium mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore <FiArrowRight size={14} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured Gallery ─────────────────────────────────── */}
      {featuredMedia.length > 0 && (
        <section className="py-20 md:py-28 lg:py-32 px-8 sm:px-12 lg:px-24 bg-gradient-to-b from-blush/30 to-ivory">
          <div className="max-w-[1400px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10 md:mb-16"
            >
              <span className="text-sm font-medium text-gold uppercase tracking-widest">
                Our Work
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold font-heading mt-3 mb-4">
                Featured <span className="gradient-text">Gallery</span>
              </h2>
              <p className="text-slate max-w-2xl mx-auto">
                A glimpse into our recent decoration projects — each one crafted with passion.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mt-16">
              {featuredMedia.map((item, i) => (
                <MediaCard key={item._id} item={item} index={i} />
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-8 md:mt-12"
            >
              <Link
                to="/gallery"
                className="inline-flex items-center gap-2 px-8 py-3.5 text-white bg-gradient-to-r from-rose-deep to-rose-medium rounded-full font-medium hover:shadow-xl hover:shadow-rose-deep/25 transition-all duration-300 hover:-translate-y-0.5"
              >
                <FiCamera size={18} />
                View Full Gallery
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* ─── CTA Section ──────────────────────────────────────── */}
      <section className="py-20 md:py-28 lg:py-32 px-8 sm:px-12 lg:px-24">
        <div className="max-w-[1200px] mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-rose-deep via-rose-medium to-charcoal p-12 sm:p-16 lg:p-24 text-center shadow-2xl shadow-rose-deep/20"
          >
            <div className="absolute top-6 left-8 text-4xl opacity-20">🌺</div>
            <div className="absolute bottom-6 right-8 text-4xl opacity-20">🌸</div>
            <div className="absolute top-1/2 left-4 text-3xl opacity-10">✨</div>

            <h2 className="text-3xl sm:text-4xl font-bold font-heading text-white mb-4">
              Ready to Transform Your Event?
            </h2>
            <p className="text-white/80 max-w-xl mx-auto mb-8">
              Share your vision with us and let's create something truly magical
              together. From concept to execution, we've got you covered.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-10 py-4 text-rose-deep bg-white border-2 border-rose-deep/20 rounded-full font-semibold text-lg hover:border-rose-deep/50 hover:bg-rose-deep/5 transition-all duration-300 hover:-translate-y-1"
            >
              Get a Free Consultation <FiArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
