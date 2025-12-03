<template>
  <nav class="navbar navbar-expand-lg navbar-main shadow-sm">
    <div class="container">
      <!-- LOGO -->
      <router-link to="/" class="navbar-brand d-flex align-items-center fw-bold">
        <i class="fa-solid fa-book-open-reader me-2 fs-4"></i>
        Library System
      </router-link>

      <!-- TOGGLER -->
      <button
        class="navbar-toggler border-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <i class="fa-solid fa-bars text-white fs-4"></i>
      </button>

      <!-- MENU -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto align-items-center gap-lg-3">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Trang chủ</router-link>
          </li>

          <li class="nav-item">
            <router-link to="/borrow-history" class="nav-link">Lịch sử mượn</router-link>
          </li>

          <!-- USER DROPDOWN -->
          <li class="nav-item dropdown ms-lg-3">
            <a
              class="nav-link user-toggle d-flex align-items-center"
              href="#"
              data-bs-toggle="dropdown"
            >
              <img v-if="user" :src="userAvatar" class="user-avatar me-2" />

              <i v-else class="fa-solid fa-circle-user fs-4 me-2"></i>

              <span class="fw-semibold">{{ user ? user.tenDangNhap : 'Tài khoản' }}</span>

              <i class="fa-solid fa-chevron-down ms-2 small opacity-75"></i>
            </a>

            <ul class="dropdown-menu dropdown-menu-end shadow">
              <!-- Nếu chưa đăng nhập -->
              <template v-if="!user">
                <li>
                  <router-link class="dropdown-item" to="/auth/login">
                    <i class="fa-solid fa-right-to-bracket me-2 text-primary"></i> Đăng nhập
                  </router-link>
                </li>
                <li>
                  <router-link class="dropdown-item" to="/auth/register">
                    <i class="fa-solid fa-user-plus me-2 text-success"></i> Đăng ký
                  </router-link>
                </li>
              </template>

              <!-- Nếu đã đăng nhập -->
              <template v-else>
                <li>
                  <router-link class="dropdown-item" to="/profile">
                    <i class="fa-solid fa-id-card me-2 text-primary"></i> Hồ sơ của tôi
                  </router-link>
                </li>

                <li><hr class="dropdown-divider" /></li>

                <li>
                  <button class="dropdown-item text-danger" @click="handleLogout">
                    <i class="fa-solid fa-right-from-bracket me-2"></i> Đăng xuất
                  </button>
                </li>
              </template>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const user = ref(null)

onMounted(() => {
  const storedUser = localStorage.getItem('user')
  if (storedUser) user.value = JSON.parse(storedUser)
})

const userAvatar = computed(
  () => user.value?.avatar || 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png',
)

const handleLogout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('accessToken')
    user.value = null
    router.push('/auth/login')
}
</script>
<style scoped>
/* NAVBAR BACKGROUND */
.navbar-main {
  background: linear-gradient(135deg, #4b6cb7, #182848);
  padding: 0.8rem 0;
}

/* BRAND */
.navbar-brand {
  color: #ffffff !important;
  font-size: 1.35rem;
  letter-spacing: 0.5px;
}

/* LINKS */
.nav-link {
  color: rgba(255, 255, 255, 0.85) !important;
  font-weight: 500;
  transition: 0.25s ease-in-out;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #ffffff !important;
  transform: translateY(-1px);
}

/* USER AVATAR */
.user-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.7);
}

/* USER DROPDOWN */
.user-toggle {
  cursor: pointer;
  color: white !important;
}

.dropdown-menu {
  border-radius: 10px;
  padding: 0.5rem 0;
}

.dropdown-item {
  padding: 0.55rem 1rem;
  font-size: 0.95rem;
  transition: background 0.2s;
}

.dropdown-item:hover {
  background: #f2f4f7;
}

.dropdown-item i {
  width: 18px;
}

/* TOGGLER */
.navbar-toggler {
  outline: none;
  border: none;
}
</style>
