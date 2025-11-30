<template>
  <div>
    <div class="d-flex justify-content-between mb-3">
      <h3 class="fw-bold">🏢 Nhà xuất bản</h3>
      <button class="btn btn-primary" @click="openForm()">+ Thêm NXB</button>
    </div>

    <AdminTable :columns="columns" :rows="publishers" @edit="openForm" @delete="removePublisher" />

    <PublishersForm
      v-if="showForm"
      :editData="editing"
      @close="closeForm"
      @saved="loadPublishers"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AdminTable from '@/components/AdminTable.vue'
import PublishersForm from './PublishersForm.vue'
import usePublishers from '@/composables/usePublishers'

const { getPublishers, deletePublisher } = usePublishers()

const publishers = ref([])
const showForm = ref(false)
const editing = ref(null)

const columns = [
  { key: 'maNXB', label: 'Mã NXB' },
  { key: 'tenNXB', label: 'Tên NXB' },
]

const loadPublishers = async () => (publishers.value = await getPublishers())

const openForm = (row = null) => {
  editing.value = row
  showForm.value = true
}
const closeForm = () => (showForm.value = false)

const removePublisher = async (row) => {
  if (confirm('Xoá nhà xuất bản này?')) {
    await deletePublisher(row._id)
    loadPublishers()
  }
}

onMounted(loadPublishers)
</script>
