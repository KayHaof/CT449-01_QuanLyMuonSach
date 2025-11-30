import api from '@/composables/useApi'

export default function useBorrows() {
  return {
    getBorrows: () => api.get('/borrows'),
    createBorrow: (d) => api.post('/borrows', d),
    updateBorrow: (id, d) => api.put(`/borrows/${id}`, d),
    deleteBorrow: (id) => api.delete(`/borrows/${id}`),
  }
}
