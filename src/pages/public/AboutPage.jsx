import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiHeart, FiStar, FiUsers, FiAward, FiArrowRight } from 'react-icons/fi';

const values = [
  {
    icon: FiHeart,
    title: 'Passion for Beauty',
    desc: 'Every petal, every ribbon is placed with love and an eye for perfection.',
  },
  {
    icon: FiStar,
    title: 'Quality First',
    desc: 'We source only the freshest flowers and finest materials for your events.',
  },
  {
    icon: FiUsers,
    title: 'Personal Touch',
    desc: 'Your vision is unique. We listen, customize, and deliver exactly what you dream.',
  },
  {
    icon: FiAward,
    title: 'Trusted by Many',
    desc: 'Hundreds of happy clients trust us to make their celebrations magical.',
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen pt-28 md:pt-32 pb-16">
      {/* Hero */}
      <section className="relative py-12 md:py-16 lg:py-20 px-6 sm:px-10 lg:px-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-deep/5 via-blush/30 to-gold/5" />
        <div className="absolute top-10 right-[-10%] sm:right-20 w-48 sm:w-64 h-48 sm:h-64 bg-rose-deep/10 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-medium text-gold uppercase tracking-widest"
          >
            Our Story
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading mt-3 mb-6"
          >
            About <span className="gradient-text">weDecor</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate max-w-2xl mx-auto leading-relaxed"
          >
            Born from a passion for flowers and a love for celebrations, weDecor
            is your partner in creating unforgettable moments through stunning
            event decorations.
          </motion.p>
        </div>
      </section>

      {/* Story */}
      <section className="py-12 md:py-16 lg:py-20 px-6 sm:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-rose-deep/20 to-gold/20 flex items-center justify-center text-8xl">
                  💐
                </div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center text-white font-bold text-xl font-heading shadow-xl">
                  <div className="text-center">
                    <p className="text-2xl">10+</p>
                    <p className="text-xs">Years</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm font-medium text-gold uppercase tracking-widest">
                Who We Are
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading mt-3 mb-6">
                Crafting Dreams Into <span className="gradient-text">Reality</span>
              </h2>
              <div className="space-y-4 text-slate leading-relaxed">
                <p>
                  At weDecor, we believe that every celebration tells a story. Our
                  journey began with a simple idea — to transform ordinary spaces
                  into extraordinary experiences through the timeless beauty of flowers.
                </p>
                <p>
                  From intimate birthday celebrations to grand wedding ceremonies,
                  our team of creative decorators works tirelessly to ensure every
                  detail is perfect. We specialize in bespoke flower arrangements,
                  thematic decorations, and complete event styling.
                </p>
                <p>
                  What sets us apart is our commitment to understanding your vision
                  and translating it into reality. Every event is unique, and so is
                  our approach. We bring together creativity, quality materials, and
                  years of expertise to make your special day truly magical.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 md:py-16 lg:py-20 px-6 sm:px-10 lg:px-16 bg-gradient-to-b from-blush/30 to-ivory">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <span className="text-sm font-medium text-gold uppercase tracking-widest">
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold font-heading mt-3">
              Our <span className="gradient-text">Values</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-5 p-6 sm:p-8 rounded-2xl bg-white border border-blush/50 hover:shadow-lg hover:border-rose-deep/10 transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-rose-deep to-gold flex items-center justify-center text-white shrink-0">
                  <value.icon size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold font-heading text-charcoal mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-slate leading-relaxed">{value.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 lg:py-20 px-6 sm:px-10 lg:px-16">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold font-heading mb-4">
              Let's Create Something <span className="gradient-text">Beautiful</span>
            </h2>
            <p className="text-slate mb-8 max-w-xl mx-auto">
              Have an upcoming event? We'd love to be part of your celebration.
              Reach out to us and let's start planning together.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 text-white bg-gradient-to-r from-rose-deep to-rose-medium rounded-full font-medium hover:shadow-xl hover:shadow-rose-deep/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              Contact Us <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
