import { ref, onMounted } from 'vue'
import { useApiService } from '@/services/apiService'

export function useFines(userBorrowIds) {
  const { getFines } = useApiService()
  const totalFine = ref(0)

  const fetchFines = async () => {
    try {
      const fines = await getFines()

      // Lọc ra phiếu phạt của những borrow thuộc user
      const userFines = fines.filter((f) => userBorrowIds.value.includes(f.maMuonSach?._id))

      // Tính tổng tiền
      totalFine.value = userFines.reduce((sum, f) => sum + (f.soTien || 0), 0)
    } catch (err) {
      console.error('Lỗi tải phiếu phạt:', err)
    }
  }

  onMounted(fetchFines)

  return { totalFine, fetchFines }
}
