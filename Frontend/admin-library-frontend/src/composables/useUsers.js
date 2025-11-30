import api from '@/composables/useApi'

export default function useUsers() {
  return {
    getUsers: () => api.get('/users'),
    createUser: (d) => api.post('/users', d),
    updateUser: (id, d) => api.put(`/users/${id}`, d),
    deleteUser: (id) => api.delete(`/users/${id}`),
    changePassword: (data) => api.put(`/users/change-password`, data),
  }
}
