import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend, FiPhone, FiMail, FiMapPin, FiCheck } from 'react-icons/fi';
import { contactService } from '../../services/contactService';
import toast from 'react-hot-toast';

const EVENT_TYPES = [
  'Wedding Stage',
  'Haldi & Mehndi',
  'Birthday Party',
  'Baby Shower',
  'Anniversary',
  'Reception & Sangeet',
  'Other',
];

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await contactService.submit(formData);
      setSubmitted(true);
      toast.success('Message sent successfully! 🌸');
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        eventDate: '',
        message: '',
      });
    } catch (err) {
      // Error handled by API interceptor
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 md:pt-40 pb-20 md:pb-28 px-8 sm:px-12 lg:px-24">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="text-sm font-medium text-gold uppercase tracking-widest">
            Get In Touch
          </span>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-heading mt-4 mb-6">
            Contact <span className="gradient-text">Us</span>
          </h1>
          <p className="text-lg md:text-xl text-slate max-w-2xl mx-auto">
            Tell us about your dream event and we'll make it happen.
            Fill out the form below and we'll get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl p-12 shadow-sm border border-blush/50 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                  <FiCheck size={36} className="text-success" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-charcoal mb-3">
                  Message Sent! 🌸
                </h3>
                <p className="text-slate mb-6">
                  Thank you for reaching out. Our team will get back to you within 24 hours
                  with a personalized response for your event.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 text-rose-deep border-2 border-rose-deep/20 rounded-full font-medium hover:bg-rose-deep/5 transition-colors"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-blush/50"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Aditya kumar"
                      className="w-full px-6 py-4 rounded-2xl border border-blush bg-ivory/50 text-charcoal text-lg placeholder:text-slate/50 focus:outline-none focus:ring-2 focus:ring-rose-deep/20 focus:border-rose-deep/30 transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="aditya@example.com"
                      className="w-full px-6 py-4 rounded-2xl border border-blush bg-ivory/50 text-charcoal text-lg placeholder:text-slate/50 focus:outline-none focus:ring-2 focus:ring-rose-deep/20 focus:border-rose-deep/30 transition-all"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91"
                      className="w-full px-6 py-4 rounded-2xl border border-blush bg-ivory/50 text-charcoal text-lg placeholder:text-slate/50 focus:outline-none focus:ring-2 focus:ring-rose-deep/20 focus:border-rose-deep/30 transition-all"
                    />
                  </div>

                  {/* Event Type */}
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Event Type *
                    </label>
                    <select
                      name="eventType"
                      required
                      value={formData.eventType}
                      onChange={handleChange}
                      className="w-full px-6 py-4 rounded-2xl border border-blush bg-ivory/50 text-charcoal text-lg focus:outline-none focus:ring-2 focus:ring-rose-deep/20 focus:border-rose-deep/30 transition-all appearance-none"
                    >
                      <option value="">Select event type</option>
                      {EVENT_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Event Date */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Event Date (optional)
                    </label>
                    <input
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleChange}
                      className="w-full px-6 py-4 rounded-2xl border border-blush bg-ivory/50 text-charcoal text-lg focus:outline-none focus:ring-2 focus:ring-rose-deep/20 focus:border-rose-deep/30 transition-all"
                    />
                  </div>

                  {/* Message */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-charcoal mb-2">
                      Your Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your dream event, theme preferences, budget range, or any specific requirements..."
                      className="w-full px-6 py-4 rounded-2xl border border-blush bg-ivory/50 text-charcoal text-lg placeholder:text-slate/50 focus:outline-none focus:ring-2 focus:ring-rose-deep/20 focus:border-rose-deep/30 transition-all resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-6 py-5 bg-gradient-to-r from-rose-deep to-rose-medium text-white rounded-2xl font-bold text-lg hover:shadow-2xl hover:shadow-rose-deep/30 transition-all duration-300 disabled:opacity-50 flex justify-center items-center gap-3 hover:-translate-y-1"
                >
                  {loading ? 'Sending...' : (
                    <>Send Message <FiSend size={22} /></>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Info Cards */}
            <div className="bg-charcoal text-white rounded-[2rem] p-10 sm:p-12 shadow-2xl overflow-hidden relative">
              <h3 className="text-xl font-bold font-heading mb-6">
                Contact Information
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <FiPhone size={18} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                    <p className="font-medium">+91 7482 812 387</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <FiMail size={18} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                    <p className="font-medium">dkflower2026@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                    <FiMapPin size={18} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
                    <p className="font-medium">Your City, India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-blush/50">
              <h3 className="text-lg font-bold font-heading text-charcoal mb-3">
                Working Hours
              </h3>
              <div className="space-y-2 text-sm text-slate">
                <div className="flex justify-between">
                  <span>Monday - Saturday</span>
                  <span className="font-medium text-charcoal">9:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-medium text-charcoal">10:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>

            <div className="bg-gold/10 rounded-2xl p-6 sm:p-8 border border-gold/20">
              <p className="text-sm text-charcoal">
                <span className="font-semibold">Quick Response:</span>{' '}
                We typically respond to all inquiries within 24 hours. For urgent
                requirements, please call us directly.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
