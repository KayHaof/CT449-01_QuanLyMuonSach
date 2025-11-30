import api from '@/composables/useApi'

export default function useFines() {
  return {
    getFines: () => api.get('/fines'),
    createFine: (d) => api.post('/fines', d),
    updateFine: (id, d) => api.put(`/fines/${id}`, d),
    deleteFine: (id) => api.delete(`/fines/${id}`),
  }
}
