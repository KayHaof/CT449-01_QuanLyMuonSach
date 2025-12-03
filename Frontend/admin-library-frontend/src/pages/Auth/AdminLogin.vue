<template>
  <div class="auth-container admin-auth">
    <div class="auth-card">
      <h1 class="auth-title">Đăng Nhập Quản Trị</h1>
      <p class="auth-subtitle">Dành cho Nhân viên & Admin</p>

      <form @submit.prevent="handleLogin" class="mt-4">
        <div class="mb-3">
          <label class="auth-label">Tên đăng nhập</label>
          <input type="text" class="auth-input" v-model="adminData.tenDangNhap" required />
        </div>

        <div class="mb-4">
          <label class="auth-label">Mật khẩu</label>

          <div class="auth-input-group">
            <input
              :type="showPassword ? 'text' : 'password'"
              class="auth-input"
              v-model="adminData.matKhau"
              required
            />

            <button type="button" class="toggle-password" @click="showPassword = !showPassword">
              <i :class="showPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'"></i>
            </button>
          </div>
        </div>

        <button type="submit" class="auth-btn w-100">
          <span v-if="!isLoading">
            <i class="fa-solid fa-right-to-bracket me-2"></i>
            Đăng Nhập
          </span>
          <span v-else>
            <span class="spinner-border spinner-border-sm me-2"></span> Đang xử lý...
          </span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '../../composables/useApi'
import { useRouter } from 'vue-router'
import { toast } from '@/utils/toast' // ⭐ kiểu object: toast.success(), toast.error()

const router = useRouter()

const adminData = ref({
  tenDangNhap: '',
  matKhau: '',
})

const showPassword = ref(false)
const isLoading = ref(false)

const handleLogin = async () => {
  try {
    isLoading.value = true

    const res = await api.post('/auth/login', {
      tenDangNhap: adminData.value.tenDangNhap,
      matKhau: adminData.value.matKhau,
    })

    if (!res.user) {
      toast.error('Sai thông tin đăng nhập!')
      return
    }

    // ❗ Kiểm tra vai trò (Admin / NhanVien)
    if (res.user.vaiTro !== 'Admin' && res.user.vaiTro !== 'NhanVien') {
      toast.warning('Bạn không có quyền truy cập hệ thống quản trị!')
      return
    }

    localStorage.setItem('user', JSON.stringify(res.user))

    toast.success('Đăng nhập thành công!')
    router.push('/admin')
  } catch (err) {
    toast.error(err.response?.data?.message || 'Đăng nhập thất bại')
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped src="../../assets/css/login.css"></style>

<style scoped>
.admin-auth {
  background: linear-gradient(135deg, #1e293b, #0f172a);
}

.auth-card {
  border-top: 4px solid #00c3ff;
}
</style>
