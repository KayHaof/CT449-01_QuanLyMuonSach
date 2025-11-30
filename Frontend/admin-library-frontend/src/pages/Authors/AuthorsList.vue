<template>
  <div>
    <div class="d-flex justify-content-between mb-3">
      <h3 class="fw-bold">✍️ Quản lý Tác giả</h3>
      <button class="btn btn-primary" @click="openForm()">+ Thêm tác giả</button>
    </div>

    <AdminTable :columns="columns" :rows="authors" @edit="openForm" @delete="removeAuthor" />

    <AuthorsForm v-if="showForm" :editData="editing" @close="closeForm" @saved="loadAuthors" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AdminTable from '@/components/AdminTable.vue'
import AuthorsForm from './AuthorsForm.vue'
import useAuthors from '@/composables/useAuthors'

const { getAuthors, deleteAuthor } = useAuthors()

const authors = ref([])
const showForm = ref(false)
const editing = ref(null)

const columns = [
  { key: 'maTacGia', label: 'Mã tác giả' },
  { key: 'hoTen', label: 'Họ tên' },
  { key: 'queQuan', label: 'Quê quán' },
]

const loadAuthors = async () => (authors.value = await getAuthors())

const openForm = (row = null) => {
  editing.value = row
  showForm.value = true
}

const closeForm = () => (showForm.value = false)

const removeAuthor = async (row) => {
  if (confirm('Xoá tác giả này?')) {
    await deleteAuthor(row._id)
    loadAuthors()
  }
}

onMounted(loadAuthors)
</script>
