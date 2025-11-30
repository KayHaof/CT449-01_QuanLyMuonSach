<template>
  <AdminModal :title="editData ? 'Sửa độc giả' : 'Thêm độc giả'" @close="$emit('close')">
    <form @submit.prevent="save">
      <AdminFormGroup label="Mã độc giả">
        <input class="form-control" v-model="form.maDocGia" required />
      </AdminFormGroup>

      <AdminFormGroup label="Họ lót">
        <input class="form-control" v-model="form.hoLot" required />
      </AdminFormGroup>

      <AdminFormGroup label="Tên">
        <input class="form-control" v-model="form.ten" required />
      </AdminFormGroup>

      <AdminFormGroup label="Giới tính">
        <select class="form-control" v-model="form.phai">
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
        </select>
      </AdminFormGroup>

      <AdminFormGroup label="Ngày sinh">
        <input type="date" class="form-control" v-model="form.ngaySinh" />
      </AdminFormGroup>

      <AdminFormGroup label="Địa chỉ">
        <input class="form-control" v-model="form.diaChi" />
      </AdminFormGroup>

      <AdminFormGroup label="Điện thoại">
        <input class="form-control" v-model="form.dienThoai" />
      </AdminFormGroup>

      <button class="btn btn-primary w-100 mt-3">Lưu</button>
    </form>
  </AdminModal>
</template>

<script setup>
import { reactive, watch } from 'vue'
import AdminModal from '@/components/AdminModal.vue'
import AdminFormGroup from '@/components/AdminFormGroup.vue'
import useReaders from '@/composables/useReaders'

const props = defineProps({ editData: Object })
const emit = defineEmits(['close', 'saved'])

const { createReader, updateReader } = useReaders()

const form = reactive({
  maDocGia: '',
  hoLot: '',
  ten: '',
  phai: '',
  ngaySinh: '',
  diaChi: '',
  dienThoai: '',
})

watch(
  () => props.editData,
  (v) => v && Object.assign(form, v),
)

const save = async () => {
  props.editData ? await updateReader(props.editData._id, form) : await createReader(form)

  emit('saved')
  emit('close')
}
</script>
