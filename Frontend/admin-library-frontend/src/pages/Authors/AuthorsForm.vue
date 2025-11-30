<template>
  <AdminModal :title="editData ? 'Sửa tác giả' : 'Thêm tác giả'" @close="$emit('close')">
    <form @submit.prevent="save">
      <AdminFormGroup label="Mã tác giả">
        <input class="form-control" v-model="form.maTacGia" required />
      </AdminFormGroup>

      <AdminFormGroup label="Họ tên">
        <input class="form-control" v-model="form.hoTen" required />
      </AdminFormGroup>

      <AdminFormGroup label="Ngày sinh">
        <input type="date" class="form-control" v-model="form.ngaySinh" />
      </AdminFormGroup>

      <AdminFormGroup label="Quê quán">
        <input class="form-control" v-model="form.queQuan" />
      </AdminFormGroup>

      <button class="btn btn-primary w-100 mt-3">Lưu</button>
    </form>
  </AdminModal>
</template>

<script setup>
import { reactive, watch } from 'vue'
import AdminModal from '@/components/AdminModal.vue'
import AdminFormGroup from '@/components/AdminFormGroup.vue'
import useAuthors from '@/composables/useAuthors'

const props = defineProps({ editData: Object })
const emit = defineEmits(['close', 'saved'])

const { createAuthor, updateAuthor } = useAuthors()

// ⚡ Default form
const defaultForm = {
  maTacGia: '',
  hoTen: '',
  ngaySinh: '',
  queQuan: '',
}

// ⚡ Reactive form
const form = reactive({ ...defaultForm })

// 📌 Format date về YYYY-MM-DD
function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toISOString().split('T')[0]
}

// 🔥 Khi mở form hoặc thay đổi editData → load dữ liệu hoặc reset
watch(
  () => props.editData,
  (v) => {
    Object.assign(form, defaultForm) // reset form trước

    if (v) {
      form.maTacGia = v.maTacGia
      form.hoTen = v.hoTen
      form.ngaySinh = formatDate(v.ngaySinh)
      form.queQuan = v.queQuan
    }
  },
  { immediate: true },
)

// 💾 Save
const save = async () => {
  if (props.editData) {
    await updateAuthor(props.editData._id, form)
  } else {
    await createAuthor(form)
  }

  emit('saved')
  emit('close')
}
</script>
