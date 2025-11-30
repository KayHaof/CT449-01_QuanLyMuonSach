import api from '@/composables/useApi'

export default function usePublishers() {
  return {
    getPublishers: () => api.get('/publishers'),
    createPublisher: (d) => api.post('/publishers', d),
    updatePublisher: (id, d) => api.put(`/publishers/${id}`, d),
    deletePublisher: (id) => api.delete(`/publishers/${id}`),
  }
}
