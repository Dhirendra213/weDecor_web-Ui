import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiUploadCloud, FiX, FiCheck, FiImage, FiVideo } from 'react-icons/fi';
import { galleryService } from '../../services/galleryService';
import toast from 'react-hot-toast';

const CATEGORIES = [
  'Wedding Stage',
  'Haldi & Mehndi',
  'Birthday Party',
  'Baby Shower',
  'Anniversary',
  'Reception & Sangeet',
];

const UploadMediaPage = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;

    const isImage = selectedFile.type.startsWith('image/');
    const isVideo = selectedFile.type.startsWith('video/');

    if (!isImage && !isVideo) {
      toast.error('Only image and video files are allowed');
      return;
    }

    setFile(selectedFile);

    if (isImage) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null); // Video preview handled differently
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files?.[0];
    handleFile(droppedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return toast.error('Please select a file');
    if (!title.trim()) return toast.error('Title is required');
    if (!category) return toast.error('Category is required');

    const formData = new FormData();
    formData.append('media', file);
    formData.append('title', title.trim());
    formData.append('description', description.trim());
    formData.append('category', category);

    setUploading(true);
    try {
      await galleryService.upload(formData);
      toast.success('Media uploaded successfully! 🎉');

      // Reset form
      setFile(null);
      setPreview(null);
      setTitle('');
      setDescription('');
      setCategory('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      // Error handled by interceptor
    } finally {
      setUploading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold font-heading text-white mb-1">
          Upload Media
        </h1>
        <p className="text-white/50 text-sm">
          Add new images or videos to your decoration gallery.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        {/* Drop Zone */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 ${
            dragActive
              ? 'border-rose-deep bg-rose-deep/5'
              : file
              ? 'border-success/50 bg-success/5'
              : 'border-white/10 bg-white/2 hover:border-white/20'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            onChange={(e) => handleFile(e.target.files?.[0])}
            className="hidden"
          />

          {file ? (
            <div className="space-y-4">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full max-h-64 object-contain rounded-lg mx-auto"
                />
              ) : (
                <div className="w-20 h-20 rounded-xl bg-purple-500/10 flex items-center justify-center mx-auto">
                  <FiVideo size={32} className="text-purple-400" />
                </div>
              )}
              <div className="flex items-center justify-center gap-2 text-white/60">
                <FiCheck size={16} className="text-success" />
                <span className="text-sm">{file.name}</span>
                <span className="text-xs text-white/30">
                  ({(file.size / 1024 / 1024).toFixed(1)} MB)
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  clearFile();
                }}
                className="inline-flex items-center gap-1 text-xs text-danger hover:underline"
              >
                <FiX size={14} /> Remove
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center mx-auto">
                <FiUploadCloud size={28} className="text-white/40" />
              </div>
              <div>
                <p className="text-white/70 font-medium">
                  Drag & drop your file here
                </p>
                <p className="text-sm text-white/30 mt-1">
                  or click to browse • Images (JPG, PNG, WebP) • Videos (MP4, MOV) • Max 100MB
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Form Fields */}
        <div className="mt-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Grand Wedding Stage with White Roses"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-rose-deep/30 focus:border-rose-deep/30 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of the decoration..."
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-rose-deep/30 focus:border-rose-deep/30 transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">Category *</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                    category === cat
                      ? 'bg-rose-deep text-white'
                      : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={uploading || !file}
          whileTap={{ scale: 0.98 }}
          className="mt-8 w-full py-3.5 bg-gradient-to-r from-rose-deep to-rose-medium text-white rounded-xl font-medium hover:shadow-lg hover:shadow-rose-deep/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {uploading ? (
            <>
              <motion.div
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
              Uploading...
            </>
          ) : (
            <>
              <FiUploadCloud size={18} />
              Upload Media
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
};

export default UploadMediaPage;
