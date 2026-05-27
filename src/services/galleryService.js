import api from './api';

export const galleryService = {
  getAll: (params) => api.get('/gallery', { params }),
  getById: (id) => api.get(`/gallery/${id}`),
  upload: (formData) =>
    api.post('/gallery', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  update: (id, data) => api.patch(`/gallery/${id}`, data),
  delete: (id) => api.delete(`/gallery/${id}`),
  getStats: () => api.get('/gallery/admin/stats'),
};
