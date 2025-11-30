<template>
  <AdminModal :title="editData ? 'Sửa nhân viên' : 'Thêm nhân viên'" @close="$emit('close')">
    <form @submit.prevent="save">
      <AdminFormGroup label="Mã nhân viên">
        <input class="form-control" v-model="form.maNV" required />
      </AdminFormGroup>

      <AdminFormGroup label="Họ tên">
        <input class="form-control" v-model="form.hoTenNV" required />
      </AdminFormGroup>

      <AdminFormGroup label="Chức vụ">
        <input class="form-control" v-model="form.chucVu" />
      </AdminFormGroup>

      <AdminFormGroup label="Địa chỉ">
        <input class="form-control" v-model="form.diaChi" />
      </AdminFormGroup>

      <AdminFormGroup label="Số điện thoại">
        <input class="form-control" v-model="form.soDienThoai" />
      </AdminFormGroup>

      <button class="btn btn-primary w-100 mt-3">Lưu</button>
    </form>
  </AdminModal>
</template>

<script setup>
import { reactive, watch } from 'vue'
import AdminModal from '@/components/AdminModal.vue'
import AdminFormGroup from '@/components/AdminFormGroup.vue'
import useStaffs from '@/composables/useStaffs'

const props = defineProps({ editData: Object })
const emit = defineEmits(['close', 'saved'])

const { createStaff, updateStaff } = useStaffs()

const form = reactive({
  maNV: '',
  hoTenNV: '',
  chucVu: '',
  diaChi: '',
  soDienThoai: '',
})

watch(
  () => props.editData,
  (v) => v && Object.assign(form, v),
)

const save = async () => {
  props.editData ? await updateStaff(props.editData._id, form) : await createStaff(form)

  emit('saved')
  emit('close')
}
</script>
