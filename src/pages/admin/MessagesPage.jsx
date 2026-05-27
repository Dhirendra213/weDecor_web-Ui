import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMail,
  FiPhone,
  FiCalendar,
  FiSend,
  FiArrowLeft,
  FiTrash2,
  FiSearch,
  FiInbox,
} from 'react-icons/fi';
import { contactService } from '../../services/contactService';
import toast from 'react-hot-toast';
import Loader from '../../components/common/Loader';

const statusColors = {
  unread: 'bg-rose-deep/20 text-rose-light',
  read: 'bg-blue-500/20 text-blue-400',
  replied: 'bg-emerald-500/20 text-emerald-400',
};

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [replying, setReplying] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState(null);

  const fetchMessages = async (page = 1) => {
    setLoading(true);
    try {
      const params = { page, limit: 20 };
      if (statusFilter) params.status = statusFilter;
      if (search) params.search = search;
      const res = await contactService.getAll(params);
      setMessages(res.data.data.contacts);
      setPagination(res.data.data.pagination);
    } catch {
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [statusFilter]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMessages();
  };

  const handleSelectMessage = async (msg) => {
    setSelectedMessage(msg);
    setReplyText('');

    // Mark as read
    if (msg.status === 'unread') {
      try {
        await contactService.getById(msg._id); // Auto-marks as read
        setMessages(
          messages.map((m) =>
            m._id === msg._id ? { ...m, status: 'read' } : m
          )
        );
      } catch {}
    }
  };

  const handleReply = async () => {
    if (!replyText.trim()) return toast.error('Please write a reply');
    setReplying(true);
    try {
      await contactService.reply(selectedMessage._id, {
        replyMessage: replyText.trim(),
      });
      setMessages(
        messages.map((m) =>
          m._id === selectedMessage._id
            ? { ...m, status: 'replied', adminReply: replyText.trim() }
            : m
        )
      );
      setSelectedMessage({
        ...selectedMessage,
        status: 'replied',
        adminReply: replyText.trim(),
      });
      setReplyText('');
      toast.success('Reply sent via email! 📧');
    } catch {} finally {
      setReplying(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    try {
      await contactService.delete(id);
      setMessages(messages.filter((m) => m._id !== id));
      if (selectedMessage?._id === id) setSelectedMessage(null);
      toast.success('Message deleted');
    } catch {}
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-heading text-white mb-1">
          Messages
        </h1>
        <p className="text-white/50 text-sm">
          View and reply to customer inquiries via email.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 min-h-[600px]">
        {/* Message List */}
        <div className="w-full lg:w-2/5 shrink-0">
          {/* Filters */}
          <div className="flex gap-2 mb-4">
            {['', 'unread', 'read', 'replied'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  statusFilter === status
                    ? 'bg-rose-deep text-white'
                    : 'bg-white/5 text-white/40 hover:text-white/60'
                }`}
              >
                {status || 'All'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSearch} className="relative mb-4">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={14} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search messages..."
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs placeholder:text-white/20 focus:outline-none focus:ring-1 focus:ring-rose-deep/30"
            />
          </form>

          {/* Messages */}
          {loading ? (
            <Loader text="Loading messages..." />
          ) : messages.length === 0 ? (
            <div className="text-center py-16">
              <FiInbox size={40} className="text-white/20 mx-auto mb-3" />
              <p className="text-white/40 text-sm">No messages found</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
              {messages.map((msg) => (
                <motion.button
                  key={msg._id}
                  onClick={() => handleSelectMessage(msg)}
                  className={`w-full text-left p-4 rounded-xl transition-all duration-200 ${
                    selectedMessage?._id === msg._id
                      ? 'bg-rose-deep/10 border border-rose-deep/20'
                      : 'bg-charcoal-light border border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <p
                      className={`text-sm font-medium truncate ${
                        msg.status === 'unread' ? 'text-white' : 'text-white/70'
                      }`}
                    >
                      {msg.status === 'unread' && (
                        <span className="inline-block w-2 h-2 rounded-full bg-rose-deep mr-2" />
                      )}
                      {msg.name}
                    </p>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        statusColors[msg.status]
                      }`}
                    >
                      {msg.status}
                    </span>
                  </div>
                  <p className="text-xs text-white/30 mb-1">{msg.eventType}</p>
                  <p className="text-xs text-white/40 line-clamp-2">{msg.message}</p>
                  <p className="text-[10px] text-white/20 mt-2">
                    {formatDate(msg.createdAt)}
                  </p>
                </motion.button>
              ))}
            </div>
          )}
        </div>

        {/* Message Detail */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {selectedMessage ? (
              <motion.div
                key={selectedMessage._id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-charcoal-light border border-white/5 rounded-2xl p-6 h-full"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <button
                      onClick={() => setSelectedMessage(null)}
                      className="lg:hidden flex items-center gap-1 text-white/40 text-sm mb-3 hover:text-white/60"
                    >
                      <FiArrowLeft size={14} /> Back
                    </button>
                    <h2 className="text-lg font-semibold text-white">
                      {selectedMessage.name}
                    </h2>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-white/40">
                      <span className="flex items-center gap-1">
                        <FiMail size={12} /> {selectedMessage.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiPhone size={12} /> {selectedMessage.phone}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(selectedMessage._id)}
                    className="p-2 rounded-lg hover:bg-danger/10 text-white/30 hover:text-danger transition-colors"
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>

                {/* Details */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <span className="px-3 py-1 rounded-full bg-white/5 text-xs text-white/60">
                    🎉 {selectedMessage.eventType}
                  </span>
                  {selectedMessage.eventDate && (
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 text-xs text-white/60">
                      <FiCalendar size={12} />
                      {new Date(selectedMessage.eventDate).toLocaleDateString('en-IN')}
                    </span>
                  )}
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[selectedMessage.status]}`}>
                    {selectedMessage.status}
                  </span>
                </div>

                {/* Customer Message */}
                <div className="mb-6">
                  <p className="text-xs text-white/30 uppercase tracking-wider mb-2">
                    Customer Message
                  </p>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">
                      {selectedMessage.message}
                    </p>
                    <p className="text-[10px] text-white/20 mt-3">
                      {formatDate(selectedMessage.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Previous Reply */}
                {selectedMessage.adminReply && (
                  <div className="mb-6">
                    <p className="text-xs text-white/30 uppercase tracking-wider mb-2">
                      Your Reply
                    </p>
                    <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                      <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">
                        {selectedMessage.adminReply}
                      </p>
                    </div>
                  </div>
                )}

                {/* Reply Form */}
                {selectedMessage.status !== 'replied' && (
                  <div>
                    <p className="text-xs text-white/30 uppercase tracking-wider mb-2">
                      Reply via Email
                    </p>
                    <textarea
                      rows={4}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write your reply here... This will be sent to the customer's email."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-rose-deep/30 transition-all resize-none"
                    />
                    <button
                      onClick={handleReply}
                      disabled={replying || !replyText.trim()}
                      className="mt-3 inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-rose-deep to-rose-medium text-white rounded-xl text-sm font-medium hover:shadow-lg hover:shadow-rose-deep/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {replying ? (
                        'Sending...'
                      ) : (
                        <>
                          <FiSend size={14} /> Send Reply
                        </>
                      )}
                    </button>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-center h-full rounded-2xl bg-charcoal-light border border-white/5"
              >
                <div className="text-center py-20">
                  <FiInbox size={48} className="text-white/10 mx-auto mb-4" />
                  <p className="text-white/30">Select a message to view details</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
