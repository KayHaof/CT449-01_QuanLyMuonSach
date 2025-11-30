<template>
  <AdminModal :title="editData ? 'Sửa NXB' : 'Thêm NXB'" @close="$emit('close')">
    <form @submit.prevent="save">
      <AdminFormGroup label="Mã NXB">
        <input class="form-control" v-model="form.maNXB" required />
      </AdminFormGroup>

      <AdminFormGroup label="Tên NXB">
        <input class="form-control" v-model="form.tenNXB" required />
      </AdminFormGroup>

      <AdminFormGroup label="Địa chỉ">
        <textarea class="form-control" v-model="form.diaChi"></textarea>
      </AdminFormGroup>

      <button class="btn btn-primary w-100 mt-3">Lưu</button>
    </form>
  </AdminModal>
</template>

<script setup>
import { reactive, watch } from 'vue'
import AdminModal from '@/components/AdminModal.vue'
import AdminFormGroup from '@/components/AdminFormGroup.vue'
import usePublishers from '@/composables/usePublishers'

const props = defineProps({ editData: Object })
const emit = defineEmits(['close', 'saved'])

const { createPublisher, updatePublisher } = usePublishers()

const form = reactive({
  maNXB: '',
  tenNXB: '',
  diaChi: '',
})

watch(
  () => props.editData,
  (v) => v && Object.assign(form, v),
)

const save = async () => {
  props.editData ? await updatePublisher(props.editData._id, form) : await createPublisher(form)

  emit('saved')
  emit('close')
}
</script>
