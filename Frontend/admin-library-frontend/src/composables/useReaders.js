import api from '@/composables/useApi'

export default function useReaders() {
  return {
    getReaders: () => api.get('/readers'),
    createReader: (d) => api.post('/readers', d),
    updateReader: (id, d) => api.put(`/readers/${id}`, d),
    deleteReader: (id) => api.delete(`/readers/${id}`),
  }
}
