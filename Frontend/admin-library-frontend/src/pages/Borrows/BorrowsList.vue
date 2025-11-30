<template>
  <div>
    <div class="d-flex justify-content-between mb-3">
      <h3 class="fw-bold">📖 Phiếu mượn</h3>
      <button class="btn btn-primary" @click="openForm()">+ Tạo phiếu mượn</button>
    </div>

    <AdminTable :columns="columns" :rows="borrows" @edit="openForm" @delete="removeBorrow" />

    <BorrowsForm v-if="showForm" :editData="editing" @close="closeForm" @saved="loadBorrows" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AdminTable from '@/components/AdminTable.vue'
import BorrowsForm from './BorrowsForm.vue'
import useBorrows from '@/composables/useBorrows'

const { getBorrows, deleteBorrow } = useBorrows()

const borrows = ref([])
const showForm = ref(false)
const editing = ref(null)

const columns = [
  { key: 'maMuon', label: 'Mã mượn' },
  { key: 'ngayMuon', label: 'Ngày mượn' },
  { key: 'ngayTra', label: 'Ngày trả' },
  { key: 'trangThai', label: 'Trạng thái' },
]

const loadBorrows = async () => (borrows.value = await getBorrows())

const openForm = (row = null) => {
  editing.value = row
  showForm.value = true
}
const closeForm = () => (showForm.value = false)

const removeBorrow = async (row) => {
  if (confirm('Xoá phiếu mượn này?')) {
    await deleteBorrow(row._id)
    loadBorrows()
  }
}

onMounted(loadBorrows)
</script>
