import { ref, computed } from 'vue'
import axios from 'axios'

export function useBookService() {
  /* =======================================================
   *  STATE BOOKS
   * =======================================================*/
  const allBooks = ref([])

  const newestBooks = ref([])
  const suggestionBooks = ref([])

  const searchResults = ref([])

  // ⭐ Chi tiết sách
  const bookDetail = ref(null)
  const loadingBookDetail = ref(false)
  const errorBookDetail = ref(null)

  /* =======================================================
   *  LOAD TẤT CẢ SÁCH CHO HOME + SEARCH
   * =======================================================*/
  const loadHomeBooks = async () => {
    try {
      const res = await axios.get('/api/books')
      const books = Array.isArray(res.data) ? res.data : []

      allBooks.value = books

      // === NEWEST ===
      const sorted = [...books].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      newestBooks.value = sorted.slice(0, 4)

      // === SUGGESTION: random ===
      suggestionBooks.value = [...books].sort(() => 0.5 - Math.random()).slice(0, 4)
    } catch (err) {
      console.error('Lỗi load sách:', err)
    }
  }

  /* =======================================================
   *  SEARCH LOCAL TRONG FE
   * =======================================================*/
  const searchBooks = (keyword) => {
    if (!keyword || keyword.trim() === '') {
      searchResults.value = []
      return
    }

    const lower = keyword.toLowerCase()

    searchResults.value = allBooks.value.filter((book) => {
      return (
        book.tenSach.toLowerCase().includes(lower) ||
        book.maNhaXuatBan?.tenNXB.toLowerCase().includes(lower) ||
        book.maPhanLoai?.tenLoai.toLowerCase().includes(lower) ||
        book.maTacGia.some((tg) => tg.hoTen.toLowerCase().includes(lower))
      )
    })
  }

  /* =======================================================
   *  LẤY CHI TIẾT SÁCH
   * =======================================================*/
  const getBookById = async (id) => {
    loadingBookDetail.value = true
    bookDetail.value = null
    errorBookDetail.value = null

    try {
      const res = await axios.get(`/api/books/${id}`)
      bookDetail.value = res.data
    } catch (err) {
      console.error('Lỗi lấy chi tiết sách:', err)
      errorBookDetail.value = 'Không thể tải chi tiết sách.'
    } finally {
      loadingBookDetail.value = false
    }
  }

  /* =======================================================
   *  CHECK MƯỢN + MƯỢN SÁCH
   * =======================================================*/
  const checkBorrowStatus = async (maDocGia, maSach) => {
    try {
      const res = await axios.get('/api/borrows', {
        params: { maDocGia, maSach },
      })

      const isBorrowed = res.data.some((b) => {
        const sachId = b.maSach?._id || b.maSach
        return sachId == maSach && b.trangThai === 'dang_muon'
      })

      return isBorrowed
    } catch (err) {
      console.error('Lỗi kiểm tra mượn:', err)
      return false
    }
  }

  const countActiveBorrows = async (readerId) => {
    return await axios.get(`/api/borrows/count/${readerId}`)
  }

  const borrowBook = async (maDocGia, maSach) => {
    try {
      const payload = {
        maMuon: 'MS' + Date.now(),
        maDocGia,
        maSach,
        ngayMuon: new Date(),
        trangThai: 'dang_ky_muon',
      }

      const res = await axios.post('/api/borrows', payload)
      return res.data
    } catch (err) {
      console.error('Lỗi mượn sách:', err)
      throw err
    }
  }

  /* =======================================================
   *  UPDATE SỐ LƯỢNG SAU KHI MƯỢN
   * =======================================================*/
  const updateBookQuantity = async (bookId, newQuantity) => {
    try {
      const res = await axios.put(`/api/books/${bookId}`, {
        soQuyen: newQuantity,
      })
      return res.data
    } catch (err) {
      console.error('Lỗi cập nhật số lượng:', err)
      throw err
    }
  }

  /* =======================================================
   *  FILTER + SORT + PAGINATION CHO TRANG LIST SÁCH
   * =======================================================*/
  const searchQuery = ref('')
  const selectedCategory = ref('')
  const sortBy = ref('recent')

  const currentPage = ref(1)
  const itemsPerPage = 10

  const categories = ref([])

  const loadCategories = async () => {
    const res = await axios.get('/api/categories')
    categories.value = res.data
  }

  const filteredBooks = computed(() => {
    let result = [...allBooks.value]

    // Search
    if (searchQuery.value) {
      const q = searchQuery.value.toLowerCase()
      result = result.filter(
        (b) =>
          b.tenSach.toLowerCase().includes(q) ||
          b.maTacGia.some((tg) => tg.hoTen.toLowerCase().includes(q)),
      )
    }

    // Category
    if (selectedCategory.value) {
      result = result.filter((b) => b.maPhanLoai?.tenLoai === selectedCategory.value)
    }

    // Sort
    if (sortBy.value === 'name-asc') {
      result.sort((a, b) => a.tenSach.localeCompare(b.tenSach, 'vi'))
    } else if (sortBy.value === 'name-desc') {
      result.sort((a, b) => b.tenSach.localeCompare(a.tenSach, 'vi'))
    } else if (sortBy.value === 'price-asc') {
      result.sort((a, b) => a.donGia - b.donGia)
    } else if (sortBy.value === 'price-desc') {
      result.sort((a, b) => b.donGia - a.donGia)
    }

    return result
  })

  const paginatedBooks = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    return filteredBooks.value.slice(start, start + itemsPerPage)
  })

  const totalBooks = computed(() => filteredBooks.value.length)

  return {
    // ALL
    allBooks,

    // HOME
    newestBooks,
    suggestionBooks,
    loadHomeBooks,

    // SEARCH
    searchResults,
    searchBooks,

    // DETAIL
    bookDetail,
    loadingBookDetail,
    errorBookDetail,
    getBookById,

    // BORROW
    checkBorrowStatus,
    borrowBook,
    updateBookQuantity,
    countActiveBorrows,

    // LIST PAGE
    searchQuery,
    selectedCategory,
    sortBy,
    currentPage,
    itemsPerPage,
    filteredBooks,
    paginatedBooks,
    totalBooks,

    categories,
    loadCategories,
  }
}
