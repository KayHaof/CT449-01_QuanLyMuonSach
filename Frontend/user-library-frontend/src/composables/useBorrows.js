import { ref, computed, onMounted } from 'vue'
import { useApiService } from '@/services/apiService' // dùng apiService.js

export function useBorrows() {
  const { getBorrowHistory } = useApiService() // gọi API qua service

  const borrows = ref([])
  const filtered = ref([])

  const searchQuery = ref('')
  const selectedStatus = ref('')

  const currentPage = ref(1)
  const itemsPerPage = 10

  const stats = ref({
    waiting: 0,
    active: 0,
    returned: 0,
    overdue: 0,
  })

  // ============================
  //  FETCH DATA
  // ============================
  const fetchBorrows = async () => {
    try {
      const res = await getBorrowHistory() // dùng apiService
      borrows.value = res.data

      console.log('Borrow data:', res.data)

      computeStats()
      filtered.value = borrows.value
    } catch (err) {
      console.error('Lỗi tải dữ liệu mượn sách:', err)
    }
  }

  onMounted(fetchBorrows)

  // ============================
  //  STATS
  // ============================
  const computeStats = () => {
    stats.value.waiting = borrows.value.filter((b) => b.trangThai === 'dang_ky_muon').length
    stats.value.active = borrows.value.filter((b) => b.trangThai === 'dang_muon').length
    stats.value.returned = borrows.value.filter((b) => b.trangThai === 'da_tra').length
    stats.value.overdue = borrows.value.filter((b) => b.trangThai === 'tre_han').length
  }

  // ============================
  //  FILTER
  // ============================
  const applyFilters = () => {
    currentPage.value = 1

    filtered.value = borrows.value.filter((item) => {
      const matchesSearch =
        item.maSach.tenSach.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.maSach.maTacGia?.some((a) =>
          a.hoTen.toLowerCase().includes(searchQuery.value.toLowerCase()),
        )

      const matchesStatus = !selectedStatus.value || item.trangThai === selectedStatus.value

      return matchesSearch && matchesStatus
    })
  }

  const resetFilters = () => {
    searchQuery.value = ''
    selectedStatus.value = ''
    filtered.value = borrows.value
  }

  // ============================
  //  PAGINATION
  // ============================
  const paginated = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    return filtered.value.slice(start, start + itemsPerPage)
  })

  // ============================
  //  HELPERS
  // ============================
  const formatDate = (date) => {
    if (!date) return '-'
    return new Date(date).toLocaleDateString('vi-VN')
  }

  const getImage = (file) => {
    return `http://localhost:8080${file}` // đổi đúng cổng BE
  }

  const statusText = (s) =>
    ({
      dang_ky_muon: 'Đang đăng ký mượn',
      dang_muon: 'Đang mượn',
      da_tra: 'Đã trả',
      tre_han: 'Trễ hạn',
    })[s]

    const getDueDate = (date) => {
      if (!date) return '-'
      const d = new Date(date)
      d.setDate(d.getDate() + 14)
      return d.toLocaleDateString('vi-VN')
    }


  return {
    // data
    borrows,
    filtered,
    stats,
    paginated,

    // states
    searchQuery,
    selectedStatus,
    currentPage,
    itemsPerPage,

    // methods
    fetchBorrows,
    applyFilters,
    resetFilters,

    // helpers
    getImage,
    formatDate,
    statusText,
    getDueDate
  }
}
