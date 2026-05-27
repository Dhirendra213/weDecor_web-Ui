import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-charcoal text-white/80">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌸</span>
              <span className="text-2xl font-bold font-heading text-white">
                weDecore
              </span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              Making every moment beautiful with our exquisite flower decorations
              for weddings, birthdays, and all your special celebrations.
            </p>
            <div className="flex gap-3">
              {[FiInstagram, FiFacebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-rose-deep transition-colors duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 font-heading text-lg">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'Gallery', path: '/gallery' },
                { name: 'About Us', path: '/about' },
                { name: 'Contact', path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/60 hover:text-gold transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4 font-heading text-lg">
              Our Services
            </h3>
            <ul className="space-y-3">
              {[
                'Wedding Stage',
                'Haldi & Mehndi',
                'Birthday Party',
                'Baby Shower',
                'Anniversary',
                'Reception & Sangeet',
              ].map((service) => (
                <li key={service}>
                  <Link
                    to={`/gallery?category=${encodeURIComponent(service)}`}
                    className="text-sm text-white/60 hover:text-gold transition-colors duration-200"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4 font-heading text-lg">
              Get In Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FiPhone className="mt-1 text-gold shrink-0" size={16} />
                <span className="text-sm text-white/60">+91 7482 812 387</span>
              </li>
              <li className="flex items-start gap-3">
                <FiMail className="mt-1 text-gold shrink-0" size={16} />
                <span className="text-sm text-white/60">dkflower2026@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <FiMapPin className="mt-1 text-gold shrink-0" size={16} />
                <span className="text-sm text-white/60">
                  Your City, India
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} weDecore. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            Made with 🌸 for beautiful celebrations
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
