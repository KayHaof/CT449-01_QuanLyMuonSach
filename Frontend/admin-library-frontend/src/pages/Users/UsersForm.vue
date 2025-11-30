<template>
  <AdminModal :title="editData ? 'Sửa tài khoản' : 'Thêm tài khoản'" @close="$emit('close')">
    <form @submit.prevent="save">
      <AdminFormGroup label="Mã người dùng">
        <input class="form-control" v-model="form.maND" required />
      </AdminFormGroup>

      <AdminFormGroup label="Tên đăng nhập">
        <input class="form-control" v-model="form.tenDangNhap" required />
      </AdminFormGroup>

      <AdminFormGroup label="Mật khẩu">
        <input class="form-control" v-model="form.matKhau" required />
      </AdminFormGroup>

      <AdminFormGroup label="Vai trò">
        <select class="form-control" v-model="form.vaiTro">
          <option value="DocGia">Độc giả</option>
          <option value="NhanVien">Nhân viên</option>
          <option value="Admin">Admin</option>
        </select>
      </AdminFormGroup>

      <AdminFormGroup label="refId (ID liên kết)">
        <input class="form-control" v-model="form.refId" />
      </AdminFormGroup>

      <button class="btn btn-primary w-100 mt-3">Lưu</button>
    </form>
  </AdminModal>
</template>

<script setup>
import { reactive, watch } from 'vue'
import AdminModal from '@/components/AdminModal.vue'
import AdminFormGroup from '@/components/AdminFormGroup.vue'
import useUsers from '@/composables/useUsers'

const props = defineProps({ editData: Object })
const emit = defineEmits(['close', 'saved'])

const { createUser, updateUser } = useUsers()

const form = reactive({
  maND: '',
  tenDangNhap: '',
  matKhau: '',
  vaiTro: 'DocGia',
  refId: '',
})

watch(
  () => props.editData,
  (v) => v && Object.assign(form, v),
)

const save = async () => {
  props.editData ? await updateUser(props.editData._id, form) : await createUser(form)

  emit('saved')
  emit('close')
}
</script>
