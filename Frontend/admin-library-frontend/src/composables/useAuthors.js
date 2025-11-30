import api from '@/composables/useApi'

export default function useAuthors() {
  return {
    getAuthors: () => api.get('/authors'),
    getAuthor: (id) => api.get(`/authors/${id}`),
    createAuthor: (d) => api.post('/authors', d),
    updateAuthor: (id, d) => api.put(`/authors/${id}`, d),
    deleteAuthor: (id) => api.delete(`/authors/${id}`),
  }
}
