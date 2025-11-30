<template>
  <AdminModal :title="editData ? 'Sửa phiếu phạt' : 'Tạo phiếu phạt'" @close="$emit('close')">
    <form @submit.prevent="save">
      <AdminFormGroup label="Mã phiếu phạt">
        <input class="form-control" v-model="form.maPhieuPhat" required />
      </AdminFormGroup>

      <AdminFormGroup label="Nhân viên lập (ID)">
        <input class="form-control" v-model="form.maNVLap" required />
      </AdminFormGroup>

      <AdminFormGroup label="Phiếu mượn (ID)">
        <input class="form-control" v-model="form.maMuonSach" required />
      </AdminFormGroup>

      <AdminFormGroup label="Số tiền">
        <input type="number" class="form-control" v-model="form.soTien" required />
      </AdminFormGroup>

      <AdminFormGroup label="Lý do">
        <textarea class="form-control" v-model="form.lyDo"></textarea>
      </AdminFormGroup>

      <AdminFormGroup label="Ngày lập">
        <input type="date" class="form-control" v-model="form.ngayLap" />
      </AdminFormGroup>

      <button class="btn btn-primary w-100 mt-3">Lưu</button>
    </form>
  </AdminModal>
</template>

<script setup>
import { reactive, watch } from 'vue'
import AdminModal from '@/components/AdminModal.vue'
import AdminFormGroup from '@/components/AdminFormGroup.vue'
import useFines from '@/composables/useFines'

const props = defineProps({ editData: Object })
const emit = defineEmits(['close', 'saved'])

const { createFine, updateFine } = useFines()

const form = reactive({
  maPhieuPhat: '',
  maNVLap: '',
  maMuonSach: '',
  soTien: '',
  lyDo: '',
  ngayLap: '',
})

watch(
  () => props.editData,
  (v) => v && Object.assign(form, v),
)

const save = async () => {
  props.editData ? await updateFine(props.editData._id, form) : await createFine(form)

  emit('saved')
  emit('close')
}
</script>
