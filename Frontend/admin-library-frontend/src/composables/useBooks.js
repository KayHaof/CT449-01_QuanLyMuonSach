import api from '@/composables/useApi'

export default function useBooks() {
  const getBooks = () => api.get('/books')
  const getBook = (id) => api.get(`/books/${id}`)
  const createBook = (data) => api.post('/books', data)
  const updateBook = (id, data) => api.put(`/books/${id}`, data)
  const deleteBook = (id) => api.delete(`/books/${id}`)

  return { getBooks, getBook, createBook, updateBook, deleteBook }
}
