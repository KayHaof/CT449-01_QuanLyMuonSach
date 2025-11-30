<template>
  <div>
    <div class="d-flex justify-content-between mb-3">
      <h3 class="fw-bold">📂 Quản lý Thể loại</h3>
      <button class="btn btn-primary" @click="openForm()">+ Thêm thể loại</button>
    </div>

    <AdminTable :columns="columns" :rows="categories" @edit="openForm" @delete="removeCategory" />

    <CategoriesForm
      v-if="showForm"
      :editData="editing"
      @close="closeForm"
      @saved="loadCategories"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AdminTable from '@/components/AdminTable.vue'
import CategoriesForm from './CategoriesForm.vue'
import useCategories from '@/composables/useCategories'

const { getCategories, deleteCategory } = useCategories()

const categories = ref([])
const showForm = ref(false)
const editing = ref(null)

const columns = [
  { key: 'maLoai', label: 'Mã loại' },
  { key: 'tenLoai', label: 'Tên loại' },
]

const loadCategories = async () => (categories.value = await getCategories())

const openForm = (row = null) => {
  editing.value = row
  showForm.value = true
}

const closeForm = () => (showForm.value = false)

const removeCategory = async (row) => {
  if (confirm('Bạn chắc chắn muốn xoá?')) {
    await deleteCategory(row._id)
    loadCategories()
  }
}

onMounted(loadCategories)
</script>
