import api from '@/composables/useApi'

export default function useCategories() {
  return {
    getCategories: () => api.get('/categories'),
    createCategory: (d) => api.post('/categories', d),
    updateCategory: (id, d) => api.put(`/categories/${id}`, d),
    deleteCategory: (id) => api.delete(`/categories/${id}`),
  }
}
