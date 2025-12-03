<template>
  <div v-if="stats.overdue > 0" class="overdue-banner">
    <i class="fa-solid fa-triangle-exclamation"></i>
    Bạn đang có {{ stats.overdue }} sách trễ hạn. Tổng tiền phạt:
    <b>{{ totalFine.toLocaleString('vi-VN') }}đ</b>
  </div>

  <div class="borrow-history-container">
    <!-- Header -->
    <div class="history-header gradient-bg">
      <div class="header-content">
        <div class="header-info">
          <h1 class="header-title">Lịch Sử Mượn Sách</h1>
          <p class="header-subtitle">Quản lý và xem tất cả sách đã mượn</p>
        </div>

        <div class="stats-cards">
          <div class="stat-card">
            <i class="fa-regular fa-hourglass-half"></i>
            <div class="stat-info">
              <span class="stat-label">Đang đăng ký mượn</span>
              <span class="stat-value">{{ stats.waiting }}</span>
            </div>
          </div>

          <div class="stat-card">
            <i class="fa-solid fa-clock"></i>
            <div class="stat-info">
              <span class="stat-label">Đang mượn</span>
              <span class="stat-value">{{ stats.active }}</span>
            </div>
          </div>

          <div class="stat-card">
            <i class="fa-solid fa-circle-check"></i>
            <div class="stat-info">
              <span class="stat-label">Đã trả</span>
              <span class="stat-value">{{ stats.returned }}</span>
            </div>
          </div>

          <div class="stat-card">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <div class="stat-info">
              <span class="stat-label">Trễ hạn</span>
              <span class="stat-value">{{ stats.overdue }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Search & Filter -->
    <div class="search-filter-section">
      <div class="container-fluid">
        <div class="row g-3 align-items-end">
          <div class="col-md-6">
            <label class="form-label">Tìm kiếm sách</label>
            <div class="input-group search-input">
              <i class="fa-solid fa-magnifying-glass"></i>
              <input
                v-model="searchQuery"
                type="text"
                class="form-control"
                placeholder="Tìm theo tên sách ..."
                @input="applyFilters"
              />
            </div>
          </div>

          <div class="col-md-3">
            <label class="form-label">Trạng thái</label>
            <select v-model="selectedStatus" class="form-select" @change="applyFilters">
              <option value="">Tất cả</option>
              <option value="dang_ky_muon">Đang đăng ký mượn</option>
              <option value="dang_muon">Đang mượn</option>
              <option value="da_tra">Đã trả</option>
              <option value="tre_han">Trễ hạn</option>
            </select>
          </div>

          <div class="col-md-3">
            <button class="btn btn-outline-secondary w-100" @click="resetFilters">
              <i class="fa-solid fa-rotate-right"></i> Đặt lại
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="books-table-section">
      <div class="container-fluid">
        <div class="table-responsive">
          <table class="table books-table">
            <thead>
              <tr>
                <th>Sách</th>
                <th>Ngày mượn</th>
                <th>Hạn trả</th>
                <th>Trạng thái</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="item in paginated" :key="item._id" class="book-row">
                <td class="ps-3">
                  <div class="book-info">
                    <img :src="getImage(item.maSach.biaSach)" class="book-thumbnail" />
                    <div class="book-details">
                      <p class="book-title">{{ item.maSach.tenSach }}</p>
                    </div>
                  </div>
                </td>

                <td>{{ formatDate(item.ngayMuon) }}</td>
                <td>{{ getDueDate(item.ngayMuon) }}</td>

                <td>
                  <span class="status-badge" :class="'status-' + item.trangThai">
                    <i
                      v-if="item.trangThai === 'dang_muon' || item.trangThai === 'dang_ky_muon'"
                      class="fa-solid fa-clock"
                    ></i>
                    <i v-if="item.trangThai === 'da_tra'" class="fa-solid fa-circle-check"></i>
                    <i
                      v-if="item.trangThai === 'tre_han'"
                      class="fa-solid fa-triangle-exclamation"
                    ></i>

                    {{ statusText(item.trangThai) }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          <div v-if="paginated.length === 0" class="empty-state">
            <i class="fa-regular fa-folder-open"></i>
            <p>Không có dữ liệu phù hợp</p>
          </div>
        </div>

        <Pagination
          :currentPage="currentPage"
          :itemsPerPage="itemsPerPage"
          :totalItems="filtered.length"
          @page-change="currentPage = $event"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import Pagination from '@/components/Shared/Pagination.vue'
import { useBorrows } from '@/composables/useBorrows'

const {
  stats,
  paginated,
  filtered,
  searchQuery,
  selectedStatus,
  currentPage,
  itemsPerPage,

  applyFilters,
  resetFilters,

  getImage,
  formatDate,
  statusText,
  getDueDate,
  totalFine,
} = useBorrows()
</script>

<style scoped>
.borrow-history-container {
  min-height: 100vh;
  background: #f8f9fa;
}

.gradient-bg {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem 2rem;
  margin-bottom: 2rem;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
}

.header-info {
  margin-bottom: 2rem;
}

.header-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
}

.header-subtitle {
  font-size: 1rem;
  opacity: 0.9;
  margin: 0.5rem 0 0 0;
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.15);
  padding: 1.5rem;
  border-radius: 0.75rem;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.stat-card:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: translateY(-2px);
}

.stat-card i {
  font-size: 2rem;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.9;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: 700;
}

.search-filter-section {
  max-width: 1200px;
  margin: -2rem auto 2rem;
  padding: 0 2rem;
  position: relative;
  z-index: 10;
}

.search-input {
  position: relative;
}

.search-input i {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #667eea;
  z-index: 10;
}

.search-input .form-control {
  padding-left: 2.5rem;
  border: 2px solid #e9ecef;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
}

.search-input .form-control:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
}

.books-table {
  margin-bottom: 0;
}

.books-table th,
.books-table td {
  padding: 1.1rem 1rem;
  vertical-align: middle;
  border-top: 1px solid #f1f3f5;
}

/* Cột 2, 3, 4: canh giữa */
.books-table th:nth-child(2),
.books-table th:nth-child(3),
.books-table th:nth-child(4),
.books-table td:nth-child(2),
.books-table td:nth-child(3),
.books-table td:nth-child(4) {
  text-align: center;
}

/* Hàng mượn sách */
.book-row:hover {
  background: #f8f9fa;
}

.book-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.books-table-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem 2rem;
}

.table-responsive {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  margin-bottom: 2rem;
}

.books-table thead {
  background: #f8f9fa;
  border-bottom: 2px solid #e9ecef;
}

.books-table th {
  font-weight: 600;
  color: #495057;
  padding: 1rem;
  font-size: 0.95rem;
}

.book-row:hover {
  background: #f8f9fa;
}

.book-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.book-thumbnail {
  width: 40px;
  height: 50px;
  border-radius: 0.375rem;
  object-fit: cover;
}

.book-title {
  font-weight: 600;
  color: #212529;
  margin: 0;
  font-size: 0.95rem;
}

.status-badge {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.9rem;
  font-weight: 500;
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
}

.status-dang_muon {
  background: #d1ecf1;
  color: #0c5460;
}

.status-dang_ky_muon {
  background: #d1ecf1;
  color: #0c5460;
}

.status-da_tra {
  background: #d4edda;
  color: #155724;
}

.status-tre_han {
  background: #f8d7da;
  color: #721c24;
}

.empty-state {
  text-align: center;
  padding: 3rem 2rem;
  color: #6c757d;
}

.empty-state i {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.overdue-banner {
  background: #ffe5e5; /* đỏ nhạt */
  color: #b00020; /* đỏ tươi cảnh báo */
  padding: 1.25rem 1.75rem;
  border-left: 6px solid #ff4d4d; /* viền đỏ */
  font-weight: 600;
  margin: 1.5rem auto;
  max-width: 1200px;
  border-radius: 10px;

  display: flex;
  align-items: center;
  gap: 1rem;

  box-shadow: 0 4px 12px rgba(255, 0, 0, 0.15); /* bóng đỏ nhẹ */
  animation: fadeIn 0.4s ease-out;
}

.overdue-banner i {
  font-size: 1.8rem;
  color: #d10000; /* đỏ đậm */
}

.overdue-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.overdue-text span {
  font-size: 1rem;
}

.overdue-text b {
  color: #d10000;
  font-weight: 700;
}

/* Hiệu ứng fade-in */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
