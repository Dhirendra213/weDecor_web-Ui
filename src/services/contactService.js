import api from './api';

export const contactService = {
  submit: (data) => api.post('/contact', data),
  getAll: (params) => api.get('/contact', { params }),
  getById: (id) => api.get(`/contact/${id}`),
  reply: (id, data) => api.patch(`/contact/${id}/reply`, data),
  updateStatus: (id, data) => api.patch(`/contact/${id}/status`, data),
  delete: (id) => api.delete(`/contact/${id}`),
  getStats: () => api.get('/contact/stats'),
};
