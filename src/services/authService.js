import api from './api';

export const authService = {
  login: async (email, password) => {
    const response = await api.post('/v1/admin/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('admin_token', response.data.token);
      localStorage.setItem('admin_user', JSON.stringify(response.data.admin));
    }
    return response.data;
  },

  logout: async () => {
    await api.post('/v1/admin/logout');
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
  },

  getMe: async () => {
    const response = await api.get('/v1/admin/me');
    return response.data;
  },
};
