<template>
  <div>
    <div class="d-flex justify-content-between mb-3">
      <h3 class="fw-bold">⚠️ Phiếu phạt</h3>
      <button class="btn btn-primary" @click="openForm()">+ Tạo phiếu phạt</button>
    </div>

    <AdminTable :columns="columns" :rows="fines" @edit="openForm" @delete="removeFine" />

    <FinesForm v-if="showForm" :editData="editing" @close="closeForm" @saved="loadFines" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AdminTable from '@/components/AdminTable.vue'
import FinesForm from './FinesForm.vue'
import useFines from '@/composables/useFines'

const { getFines, deleteFine } = useFines()

const fines = ref([])
const showForm = ref(false)
const editing = ref(null)

const columns = [
  { key: 'maPhieuPhat', label: 'Mã phiếu' },
  { key: 'soTien', label: 'Số tiền' },
  { key: 'lyDo', label: 'Lý do' },
  { key: 'ngayLap', label: 'Ngày lập' },
]

const loadFines = async () => (fines.value = await getFines())

const openForm = (row = null) => {
  editing.value = row
  showForm.value = true
}
const closeForm = () => (showForm.value = false)

const removeFine = async (row) => {
  if (confirm('Xoá phiếu phạt này?')) {
    await deleteFine(row._id)
    loadFines()
  }
}

onMounted(loadFines)
</script>
