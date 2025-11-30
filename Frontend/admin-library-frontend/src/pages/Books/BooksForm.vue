<template>
  <AdminModal :title="editData ? 'Sửa sách' : 'Thêm sách'" @close="$emit('close')">
    <form @submit.prevent="save">
      <AdminFormGroup label="Mã sách">
        <input class="form-control" v-model="form.maSach" required />
      </AdminFormGroup>

      <AdminFormGroup label="Tên sách">
        <input class="form-control" v-model="form.tenSach" required />
      </AdminFormGroup>

      <AdminFormGroup label="Đơn giá">
        <input type="number" class="form-control" v-model="form.donGia" />
      </AdminFormGroup>

      <AdminFormGroup label="Số quyển">
        <input type="number" class="form-control" v-model="form.soQuyen" />
      </AdminFormGroup>

      <AdminFormGroup label="Năm xuất bản">
        <input type="number" class="form-control" v-model="form.namXuatBan" />
      </AdminFormGroup>

      <AdminFormGroup label="Ảnh bìa (URL)">
        <input class="form-control" v-model="form.biaSach" />
      </AdminFormGroup>

      <!-- Nhà Xuất Bản -->
      <AdminFormGroup label="Nhà xuất bản">
        <select class="form-select" v-model="form.maNhaXuatBan">
          <option disabled value="">-- Chọn NXB --</option>
          <option v-for="p in publishers" :key="p._id" :value="p._id">
            {{ p.tenNXB }}
          </option>
        </select>
      </AdminFormGroup>

      <!-- Thể Loại -->
      <AdminFormGroup label="Thể loại">
        <select class="form-select" v-model="form.maPhanLoai">
          <option disabled value="">-- Chọn thể loại --</option>
          <option v-for="c in categories" :key="c._id" :value="c._id">
            {{ c.tenLoai }}
          </option>
        </select>
      </AdminFormGroup>

      <AdminFormGroup label="Tác giả" data-full>
        <select class="form-select author-select" v-model="form.maTacGia" multiple>
          <option v-for="a in authors" :key="a._id" :value="a._id">
            {{ a.hoTen }}
          </option>
        </select>
      </AdminFormGroup>

      <button class="btn btn-primary w-100 mt-3">Lưu</button>
    </form>
  </AdminModal>
</template>

<script setup>
import { reactive, watch, ref, onMounted } from 'vue'
import AdminModal from '../../components/AdminModal.vue'
import AdminFormGroup from '../../components/AdminFormGroup.vue'

import useBooks from '@/composables/useBooks'
import usePublishers from '@/composables/usePublishers'
import useCategories from '@/composables/useCategories'
import useAuthors from '@/composables/useAuthors'

const props = defineProps({ editData: Object })
const emit = defineEmits(['close', 'saved'])

const { createBook, updateBook } = useBooks()
const { getPublishers } = usePublishers()
const { getCategories } = useCategories()
const { getAuthors } = useAuthors()

// Data lists
const publishers = ref([])
const categories = ref([])
const authors = ref([])

// Default form
const defaultForm = {
  maSach: '',
  tenSach: '',
  donGia: '',
  soQuyen: '',
  namXuatBan: '',
  biaSach: '',
  maNhaXuatBan: '',
  maPhanLoai: '',
  maTacGia: [],
}

const form = reactive({ ...defaultForm })

// Load dropdowns
onMounted(async () => {
  publishers.value = await getPublishers()
  categories.value = await getCategories()
  authors.value = await getAuthors()
})

// Load edit data
watch(
  () => props.editData,
  (v) => {
    Object.assign(form, defaultForm)
    if (v) {
      form.maSach = v.maSach
      form.tenSach = v.tenSach
      form.donGia = v.donGia
      form.soQuyen = v.soQuyen
      form.namXuatBan = v.namXuatBan
      form.biaSach = v.biaSach

      form.maNhaXuatBan = v.maNhaXuatBan?._id
      form.maPhanLoai = v.maPhanLoai?._id
      form.maTacGia = v.maTacGia?.map((a) => a._id) || []
    }
  },
  { immediate: true },
)

import { toast } from '@/utils/toast'

const save = async () => {
  try {
    if (props.editData) {
      await updateBook(props.editData._id, form)

      toast.success('Cập nhật sách thành công!')
    } else {
      await createBook(form)

      toast.success('Thêm sách thành công!')
    }

    emit('saved')
    emit('close')
  } catch (err) {
    toast.error('Lưu sách thất bại. Vui lòng thử lại!')
    console.error(err)
  }
}
</script>
<style scoped>
/* --------------- LAYOUT CHUNG --------------- */
form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 22px 28px;
  padding: 10px 4px;
}

form > *[data-full] {
  grid-column: 1 / -1;
}

/* --------------- FORM GROUP --------------- */
.admin-form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.admin-form-group label {
  font-weight: 600;
  color: #222;
  font-size: 15px;
}

/* --------------- INPUT & SELECT --------------- */
input.form-control,
select.form-select {
  border-radius: 12px;
  padding: 12px 16px;
  border: 1px solid #ccc;
  font-size: 15px;
  background: #fafafa;
  transition: 0.25s ease;
}

input.form-control:hover,
select.form-select:hover {
  border-color: #a38bff;
}

input.form-control:focus,
select.form-select:focus {
  background: #fff;
  border-color: transparent;
  outline: 0;
  box-shadow: 0 0 0 2px rgba(123, 92, 255, 0.35);
}

/* --------------- MULTI SELECT (TÁC GIẢ) --------------- */
.author-select {
  height: auto !important;
  min-height: 50px;
  max-height: 160px;
  padding: 10px 14px;
  border-radius: 12px;
  background: #fafafa;
  overflow-y: auto;
}

.author-select option {
  padding: 6px;
  border-bottom: 1px solid #f3f3f3;
}

.author-select::-webkit-scrollbar {
  width: 6px;
}

.author-select::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #7b5cff, #b06bff);
  border-radius: 6px;
}

/* hover gradient mạnh hơn */
.author-select::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #6d4dff, #a359ff);
}

/* --------------- NÚT LƯU (GRADIENT) --------------- */
button.btn-primary {
  grid-column: 1 / -1;
  padding: 14px;
  margin-top: 10px;
  border-radius: 12px;
  font-size: 17px;
  font-weight: 600;
  border: none;

  background: linear-gradient(135deg, #7b5cff, #b06bff);
  color: white;
  transition: 0.25s ease;
}

button.btn-primary:hover {
  filter: brightness(1.08);
}

button.btn-primary:active {
  filter: brightness(0.95);
}

/* --------------- RESPONSIVE --------------- */
@media (max-width: 768px) {
  form {
    grid-template-columns: 1fr;
  }
}
</style>
