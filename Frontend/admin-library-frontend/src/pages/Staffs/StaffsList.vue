<template>
  <div>
    <div class="d-flex justify-content-between mb-3">
      <h3 class="fw-bold">🧑‍💼 Nhân viên</h3>
      <button class="btn btn-primary" @click="openForm()">+ Thêm nhân viên</button>
    </div>

    <AdminTable :columns="columns" :rows="staffs" @edit="openForm" @delete="removeStaff" />

    <StaffsForm v-if="showForm" :editData="editing" @close="closeForm" @saved="loadStaffs" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AdminTable from '@/components/AdminTable.vue'
import StaffsForm from './StaffsForm.vue'
import useStaffs from '@/composables/useStaffs'

const { getStaffs, deleteStaff } = useStaffs()

const staffs = ref([])
const showForm = ref(false)
const editing = ref(null)

const columns = [
  { key: 'maNV', label: 'Mã NV' },
  { key: 'hoTenNV', label: 'Họ tên' },
  { key: 'chucVu', label: 'Chức vụ' },
  { key: 'soDienThoai', label: 'Điện thoại' },
]

const loadStaffs = async () => (staffs.value = await getStaffs())

const openForm = (row = null) => {
  editing.value = row
  showForm.value = true
}
const closeForm = () => (showForm.value = false)

const removeStaff = async (row) => {
  if (confirm('Xoá nhân viên này?')) {
    await deleteStaff(row._id)
    loadStaffs()
  }
}

onMounted(loadStaffs)
</script>
