import api from '@/composables/useApi'

export default function useStaffs() {
  return {
    getStaffs: () => api.get('/staffs'),
    createStaff: (d) => api.post('/staffs', d),
    updateStaff: (id, d) => api.put(`/staffs/${id}`, d),
    deleteStaff: (id) => api.delete(`/staffs/${id}`),
  }
}
