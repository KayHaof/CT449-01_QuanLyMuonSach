<template>
  <div>
    <div class="d-flex justify-content-between mb-3">
      <h3 class="fw-bold">👤 Quản lý Độc giả</h3>
      <button class="btn btn-primary" @click="openForm()">+ Thêm độc giả</button>
    </div>

    <AdminTable :columns="columns" :rows="readers" @edit="openForm" @delete="removeReader" />

    <ReadersForm v-if="showForm" :editData="editing" @close="closeForm" @saved="loadReaders" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AdminTable from '@/components/AdminTable.vue'
import ReadersForm from './ReadersForm.vue'
import useReaders from '@/composables/useReaders'

const { getReaders, deleteReader } = useReaders()

const readers = ref([])
const showForm = ref(false)
const editing = ref(null)

const columns = [
  { key: 'maDocGia', label: 'Mã ĐG' },
  { key: 'hoLot', label: 'Họ lót' },
  { key: 'ten', label: 'Tên' },
  { key: 'dienThoai', label: 'Điện thoại' },
]

const loadReaders = async () => (readers.value = await getReaders())

const openForm = (row = null) => {
  editing.value = row
  showForm.value = true
}
const closeForm = () => (showForm.value = false)

const removeReader = async (row) => {
  if (confirm('Xoá độc giả này?')) {
    await deleteReader(row._id)
    loadReaders()
  }
}

onMounted(loadReaders)
</script>
