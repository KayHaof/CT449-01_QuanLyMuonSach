<template>
  <div>
    <div class="d-flex justify-content-between mb-3">
      <h3 class="fw-bold">🛂 Tài khoản hệ thống</h3>
      <button class="btn btn-primary" @click="openForm()">+ Thêm tài khoản</button>
    </div>

    <AdminTable :columns="columns" :rows="users" @edit="openForm" @delete="removeUser" />

    <UsersForm v-if="showForm" :editData="editing" @close="closeForm" @saved="loadUsers" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AdminTable from '@/components/AdminTable.vue'
import UsersForm from './UsersForm.vue'
import useUsers from '@/composables/useUsers'

const { getUsers, deleteUser } = useUsers()

const users = ref([])
const showForm = ref(false)
const editing = ref(null)

const columns = [
  { key: 'maND', label: 'Mã ND' },
  { key: 'tenDangNhap', label: 'Tên đăng nhập' },
  { key: 'vaiTro', label: 'Vai trò' },
]

const loadUsers = async () => (users.value = await getUsers())

const openForm = (row = null) => {
  editing.value = row
  showForm.value = true
}
const closeForm = () => (showForm.value = false)

const removeUser = async (row) => {
  if (confirm('Xoá tài khoản này?')) {
    await deleteUser(row._id)
    loadUsers()
  }
}

onMounted(loadUsers)
</script>
