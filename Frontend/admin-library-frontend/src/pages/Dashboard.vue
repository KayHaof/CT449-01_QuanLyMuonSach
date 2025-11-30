<template>
  <div>
    <h2 class="fw-bold mb-4">📊 Dashboard</h2>

    <!-- Stats cards -->
    <div class="row g-4 mb-4">
      <AdminCardStat
        v-for="stat in stats"
        :key="stat.title"
        :title="stat.title"
        :value="stat.value"
        :icon="stat.icon"
        :color="stat.color"
      />
    </div>

    <!-- Recent Borrow -->
    <div class="card p-3 shadow-sm rounded-4">
      <h5 class="fw-bold mb-3">🕒 Lịch sử mượn gần đây</h5>

      <table class="table table-striped">
        <thead>
          <tr>
            <th>Độc giả</th>
            <th>Sách</th>
            <th>Ngày mượn</th>
            <th>Trạng thái</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in recentBorrows" :key="item._id">
            <td>{{ fullName(item.maDocGia) }}</td>
            <td>{{ item.maSach?.tenSach }}</td>
            <td>{{ format(item.ngayMuon) }}</td>
            <td>
              <span class="badge bg-success" v-if="item.trangThai === 'dang_muon'">Đang mượn</span>
              <span class="badge bg-secondary" v-else-if="item.trangThai === 'da_tra'">Đã trả</span>
              <span class="badge bg-danger" v-else>Trễ hạn</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AdminCardStat from '@/components/AdminCardStat.vue'
import useBooks from '@/composables/useBooks'
import useReaders from '@/composables/useReaders'
import useBorrows from '@/composables/useBorrows'
import useFines from '@/composables/useFines'

const { getBooks } = useBooks()
const { getReaders } = useReaders()
const { getBorrows } = useBorrows()
const { getFines } = useFines()

const stats = ref([])
const recentBorrows = ref([])

const format = (d) => new Date(d).toLocaleDateString('vi-VN')
const fullName = (r) => (r ? `${r.hoLot} ${r.ten}` : '')

onMounted(async () => {
  const [books, readers, borrows, fines] = await Promise.all([
    getBooks(),
    getReaders(),
    getBorrows(),
    getFines(),
  ])

  stats.value = [
    { title: 'Sách', value: books.length, icon: 'fa fa-book', color: '#EEF2FF' },
    { title: 'Độc giả', value: readers.length, icon: 'fa fa-user', color: '#FFE4E6' },
    {
      title: 'Đang mượn',
      value: borrows.filter((b) => b.trangThai === 'dang_muon').length,
      icon: 'fa fa-book-open',
      color: '#E0F2FE',
    },
    { title: 'Phiếu phạt', value: fines.length, icon: 'fa fa-warning', color: '#FEF3C7' },
  ]

  recentBorrows.value = borrows.slice(-5).reverse()
})
</script>
