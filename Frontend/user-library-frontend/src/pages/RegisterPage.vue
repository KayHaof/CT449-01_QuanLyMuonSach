<template>
  <div class="register-bg">
    <div class="register-wrapper">
      <div class="register-card shadow-lg">
        <div class="text-center mb-4">
          <img src="/logo.jpg" alt="Library Logo" class="register-logo" />
          <h1 class="card-title">Đăng Ký Tài Khoản</h1>
          <p class="text-muted">Quản Lý Mượn Sách - Hệ Thống Thư Viện</p>
        </div>

        <div v-if="errorMessage" class="alert alert-danger alert-dismissible fade show">
          <i class="fa-solid fa-circle-exclamation me-2"></i>
          {{ errorMessage }}
          <button type="button" class="btn-close" @click="errorMessage = ''"></button>
        </div>

        <form @submit.prevent="handleRegister">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Họ lót</label>
              <input type="text" class="form-control" v-model="registerData.hoLot" required />
            </div>

            <div class="col-md-6 mb-3">
              <label class="form-label">Tên</label>
              <input type="text" class="form-control" v-model="registerData.ten" required />
            </div>
          </div>

          <div class="row">
            <div class="col-md-6 mb-3">
              <label class="form-label">Ngày sinh</label>
              <input type="date" class="form-control" v-model="registerData.ngaySinh" required />
            </div>

            <div class="col-md-6 mb-3">
              <label class="form-label">Giới tính</label>
              <select class="form-select" v-model="registerData.phai" required>
                <option value="" disabled>-- Chọn giới tính --</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
            </div>
          </div>

          <div class="mb-3">
            <label class="form-label">Địa chỉ</label>
            <input type="text" class="form-control" v-model="registerData.diaChi" required />
          </div>

          <div class="mb-3">
            <label class="form-label">Số điện thoại</label>
            <input type="text" class="form-control" v-model="registerData.dienThoai" required />
          </div>

          <div class="mb-3">
            <label class="form-label">Tên đăng nhập</label>
            <input type="text" class="form-control" v-model="registerData.tenDangNhap" required />
          </div>

          <div class="mb-3">
            <label class="form-label">Mật khẩu</label>
            <div class="input-group">
              <input
                :type="showPassword ? 'text' : 'password'"
                class="form-control"
                v-model="registerData.matKhau"
                required
              />
              <button
                type="button"
                class="btn btn-outline-secondary"
                @click="showPassword = !showPassword"
              >
                <i :class="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
              </button>
            </div>
          </div>

          <button type="submit" class="btn btn-register w-100 fw-semibold">
            <span v-if="!isLoading">Đăng ký</span>
            <span v-else>
              <span class="spinner-border spinner-border-sm me-2"></span>
              Đang xử lý...
            </span>
          </button>
        </form>

        <div class="auth-divider"><span>Hoặc</span></div>

        <p class="text-center text-muted">
          Đã có tài khoản?
          <router-link to="/auth/login" class="signup-link">Đăng nhập ngay</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuth } from '../composables/useAuth'
const { registerData, showPassword, isLoading, errorMessage, handleRegister } = useAuth()
</script>

<style scoped src="../assets/css/register.css"></style>
