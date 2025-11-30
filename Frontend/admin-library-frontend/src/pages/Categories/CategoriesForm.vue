<template>
  <AdminModal :title="editData ? 'Sửa thể loại' : 'Thêm thể loại'" @close="$emit('close')">
    <form @submit.prevent="save">
      <AdminFormGroup label="Mã thể loại">
        <input class="form-control" v-model="form.maLoai" required />
      </AdminFormGroup>

      <AdminFormGroup label="Tên thể loại">
        <input class="form-control" v-model="form.tenLoai" required />
      </AdminFormGroup>

      <AdminFormGroup label="Mô tả">
        <textarea class="form-control" v-model="form.moTa"></textarea>
      </AdminFormGroup>

      <button class="btn btn-primary w-100 mt-3">Lưu</button>
    </form>
  </AdminModal>
</template>

<script setup>
import { reactive, watch } from 'vue'
import AdminModal from '@/components/AdminModal.vue'
import AdminFormGroup from '@/components/AdminFormGroup.vue'
import useCategories from '@/composables/useCategories'

const props = defineProps({ editData: Object })
const emit = defineEmits(['close', 'saved'])

const { createCategory, updateCategory } = useCategories()

const form = reactive({
  maLoai: '',
  tenLoai: '',
  moTa: '',
})

watch(
  () => props.editData,
  (v) => v && Object.assign(form, v),
)

const save = async () => {
  props.editData ? await updateCategory(props.editData._id, form) : await createCategory(form)

  emit('saved')
  emit('close')
}
</script>
