<template>
  <AdminModal :title="editData ? 'Sửa phiếu mượn' : 'Tạo phiếu mượn'" @close="$emit('close')">
    <form @submit.prevent="save">
      <AdminFormGroup label="Mã phiếu mượn">
        <input class="form-control" v-model="form.maMuon" required />
      </AdminFormGroup>

      <AdminFormGroup label="Độc giả (ID)">
        <input class="form-control" v-model="form.maDocGia" required />
      </AdminFormGroup>

      <AdminFormGroup label="Sách (ID)">
        <input class="form-control" v-model="form.maSach" required />
      </AdminFormGroup>

      <AdminFormGroup label="Ngày mượn">
        <input type="date" class="form-control" v-model="form.ngayMuon" />
      </AdminFormGroup>

      <AdminFormGroup label="Ngày trả">
        <input type="date" class="form-control" v-model="form.ngayTra" />
      </AdminFormGroup>

      <AdminFormGroup label="Trạng thái">
        <select class="form-control" v-model="form.trangThai">
          <option value="dang_muon">Đang mượn</option>
          <option value="da_tra">Đã trả</option>
          <option value="tre_han">Trễ hạn</option>
        </select>
      </AdminFormGroup>

      <button class="btn btn-primary w-100 mt-3">Lưu</button>
    </form>
  </AdminModal>
</template>

<script setup>
import { reactive, watch } from 'vue'
import AdminModal from '@/components/AdminModal.vue'
import AdminFormGroup from '@/components/AdminFormGroup.vue'
import useBorrows from '@/composables/useBorrows'

const props = defineProps({ editData: Object })
const emit = defineEmits(['close', 'saved'])

const { createBorrow, updateBorrow } = useBorrows()

const form = reactive({
  maMuon: '',
  maDocGia: '',
  maSach: '',
  ngayMuon: '',
  ngayTra: '',
  trangThai: 'dang_muon',
})

watch(
  () => props.editData,
  (v) => v && Object.assign(form, v),
)

const save = async () => {
  props.editData ? await updateBorrow(props.editData._id, form) : await createBorrow(form)

  emit('saved')
  emit('close')
}
</script>
