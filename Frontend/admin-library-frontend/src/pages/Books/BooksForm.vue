<template>
  <AdminModal :title="editData ? 'Sửa sách' : 'Thêm sách'" @close="$emit('close')">
    <form @submit.prevent="save" class="book-form">
      <AdminFormGroup label="Mã sách">
        <input class="form-control styled-input" v-model="form.maSach" required />
      </AdminFormGroup>

      <AdminFormGroup label="Tên sách">
        <input class="form-control styled-input" v-model="form.tenSach" required />
      </AdminFormGroup>

      <div class="row">
        <div class="col-md-6">
          <AdminFormGroup label="Đơn giá">
            <input type="number" class="form-control styled-input" v-model="form.donGia" />
          </AdminFormGroup>
        </div>

        <div class="col-md-6">
          <AdminFormGroup label="Số quyển">
            <input type="number" class="form-control styled-input" v-model="form.soQuyen" />
          </AdminFormGroup>
        </div>
      </div>

      <AdminFormGroup label="Năm xuất bản">
        <input type="number" class="form-control styled-input" v-model="form.namXuatBan" />
      </AdminFormGroup>

      <AdminFormGroup label="Ảnh bìa">
        <input
          type="file"
          class="form-control styled-input"
          accept="image/*"
          @change="onImageChange"
        />

        <div v-if="previewImage" class="img-preview-wrapper">
          <img :src="getImageUrl(previewImage)" class="img-preview" />
        </div>
      </AdminFormGroup>

      <AdminFormGroup label="Nhà xuất bản">
        <div class="select-row">
          <select class="form-select styled-input" v-model="form.maNhaXuatBan">
            <option disabled value="">-- Chọn NXB --</option>
            <option v-for="p in publishers" :key="p._id" :value="p._id">
              {{ p.tenNXB }}
            </option>
          </select>
          <button type="button" class="btn-add">+</button>
        </div>
      </AdminFormGroup>

      <AdminFormGroup label="Thể loại">
        <div class="select-row">
          <select class="form-select styled-input" v-model="form.maPhanLoai">
            <option disabled value="">-- Chọn thể loại --</option>
            <option v-for="c in categories" :key="c._id" :value="c._id">
              {{ c.tenLoai }}
            </option>
          </select>
          <button type="button" class="btn-add" @click="showCategoryForm = true">+</button>
        </div>
      </AdminFormGroup>

      <AdminFormGroup label="Tác giả" data-full>
        <div class="select-row align-items-start">
          <div class="author-checkbox-list">
            <div v-for="a in authors" :key="a._id" class="form-check mb-1">
              <input
                class="form-check-input"
                type="checkbox"
                :value="a._id"
                v-model="form.maTacGia"
                :id="'author-' + a._id"
              />
              <label class="form-check-label" :for="'author-' + a._id">
                {{ a.hoTen }}
              </label>
            </div>
          </div>

          <button type="button" class="btn-add" @click="showAuthorForm = true">+</button>
        </div>
      </AdminFormGroup>

      <button class="btn-submit w-100 mt-3">Lưu sách</button>
    </form>

    <AdminModal v-if="showPublisherForm" title="Thêm NXB" @close="closePublisher">
      <PublishersForm @saved="afterAddPublisher" @close="closePublisher" />
    </AdminModal>

    <AdminModal v-if="showCategoryForm" title="Thêm thể loại" @close="closeCategory">
      <CategoriesForm @saved="afterAddCategory" @close="closeCategory" />
    </AdminModal>

    <AdminModal v-if="showAuthorForm" title="Thêm tác giả" @close="closeAuthor">
      <AuthorsForm @saved="afterAddAuthor" @close="closeAuthor" />
    </AdminModal>
  </AdminModal>
</template>

<script setup>
import { reactive, watch, ref, onMounted } from 'vue'

import AdminModal from '../../components/AdminModal.vue'
import AdminFormGroup from '../../components/AdminFormGroup.vue'
import PublishersForm from '../Publishers/PublishersForm.vue'
import CategoriesForm from '../Categories/CategoriesForm.vue'
import AuthorsForm from '../Authors/AuthorsForm.vue'

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

const publishers = ref([])
const categories = ref([])
const authors = ref([])

const showPublisherForm = ref(false)
const showCategoryForm = ref(false)
const showAuthorForm = ref(false)

const previewImage = ref(null)
const selectedImage = ref(null)

const onImageChange = (e) => {
  const file = e.target.files[0]
  selectedImage.value = file
  if (file) previewImage.value = URL.createObjectURL(file)
}

const BE_URL = 'http://localhost:8080'

const getImageUrl = (path) => {
  if (!path) return '/no-image.jpg'
  return `${BE_URL}${path}`
}

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

onMounted(async () => {
  publishers.value = await getPublishers()
  categories.value = await getCategories()
  authors.value = await getAuthors()
})

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

      previewImage.value = v.biaSach
    }
  },
  { immediate: true },
)

import { toast } from '@/utils/toast'

const afterAddPublisher = async () => {
  publishers.value = await getPublishers()
  showPublisherForm.value = false
}

const afterAddCategory = async () => {
  categories.value = await getCategories()
  showCategoryForm.value = false
}

const afterAddAuthor = async () => {
  authors.value = await getAuthors()
  showAuthorForm.value = false
}

const closePublisher = () => (showPublisherForm.value = false)
const closeCategory = () => (showCategoryForm.value = false)
const closeAuthor = () => (showAuthorForm.value = false)

const save = async () => {
  try {
    const fd = new FormData()

    fd.append('maSach', form.maSach)
    fd.append('tenSach', form.tenSach)
    fd.append('donGia', form.donGia)
    fd.append('soQuyen', form.soQuyen)
    fd.append('namXuatBan', form.namXuatBan)
    fd.append('maNhaXuatBan', form.maNhaXuatBan)
    fd.append('maPhanLoai', form.maPhanLoai)

    fd.append('maTacGia', JSON.stringify(form.maTacGia))

    // ảnh upload
    if (selectedImage.value) {
      fd.append('biaSach', selectedImage.value)
    } else if (form.biaSach) {
      fd.append('biaSach', form.biaSach)
    }

    if (props.editData) {
      await updateBook(props.editData._id, fd)
      toast.success('Cập nhật sách thành công!')
    } else {
      await createBook(fd)
      toast.success('Thêm sách thành công!')
    }

    emit('saved')
    emit('close')
  } catch (err) {
    console.error(err)
    toast.error('Lưu sách thất bại!')
  }
}
</script>

<style scoped>
.book-form {
  padding: 10px 2px;
}

.styled-input {
  border: 1.5px solid #c8b6ff;
  border-radius: 10px;
  padding: 10px 14px;
  transition: 0.25s;
}

.styled-input:focus {
  border-color: #7b5cff;
  box-shadow: 0 0 6px rgba(123, 92, 255, 0.35);
}

.btn-add {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, #7b5cff, #5ac8fa);
  color: white;
  font-size: 20px;
  cursor: pointer;
  transition: 0.25s;
}

.btn-add:hover {
  transform: scale(1.07);
  box-shadow: 0 4px 10px rgba(123, 92, 255, 0.4);
}

.author-checkbox-list {
  flex: 1;
  border: 1px solid #c8b6ff;
  border-radius: 10px;
  padding: 8px 12px;
  max-height: 180px;
  overflow-y: auto;
  background: #ffffff;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.06);
}

.select-row {
  display: flex;
  align-items: center;
  gap: 10px;
}

.img-preview-wrapper {
  margin-top: 10px;
  padding: 6px;
  border-radius: 12px;
  border: 1px solid #c8b6ff;
  background: #faf7ff;
}

.img-preview {
  max-height: 160px;
  border-radius: 8px;
}

.btn-submit {
  background: linear-gradient(135deg, #7b5cff, #5ac8fa);
  border: none;
  padding: 12px;
  font-size: 17px;
  font-weight: 600;
  border-radius: 10px;
  color: white;
  transition: 0.25s;
}

.btn-submit:hover {
  opacity: 0.9;
  box-shadow: 0 4px 14px rgba(123, 92, 255, 0.4);
}
</style>
