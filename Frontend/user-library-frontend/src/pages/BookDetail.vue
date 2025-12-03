<template>
  <!-- Khi có dữ liệu -->
  <div class="book-detail-wrapper" v-if="bookDetail">
    <div class="container py-3">
      <router-link to="/" class="btn btn-outline-primary mb-4 ms-3">
        <i class="fa-solid fa-chevron-left"></i> Quay lại
      </router-link>

      <div class="row g-4">
        <!-- LEFT -->
        <div class="col-lg-4">
          <div class="book-cover-container">
            <img :src="getImageUrl(bookDetail.biaSach)" alt="Bìa sách" class="book-cover-image" />
          </div>

          <!-- NÚT MƯỢN SÁCH / HẾT SÁCH -->
          <div class="mt-4">
            <button
              v-if="bookDetail.soQuyen > 0"
              class="btn btn-primary btn-lg w-100 borrow-btn"
              @click="handleBorrow"
            >
              <i class="fa-solid fa-book-open-reader"></i> Mượn sách
            </button>

            <button v-else class="btn btn-secondary btn-lg w-100 out-of-stock-btn" disabled>
              <i class="fa-solid fa-circle-xmark"></i> Hiện tại đã hết sách
            </button>
          </div>
        </div>

        <!-- RIGHT -->
        <div class="col-lg-8">
          <div class="book-info-container">
            <span class="category-badge">
              {{ bookDetail.maPhanLoai.tenLoai }}
            </span>

            <h1 class="book-title mt-3">{{ bookDetail.tenSach }}</h1>

            <!-- DETAILS -->
            <div class="book-details mt-2">
              <h3 class="section-title">Thông tin chi tiết</h3>

              <div class="details-table">
                <div class="detail-row">
                  <div class="detail-label">Thể loại:</div>
                  <div class="detail-value">{{ bookDetail.maPhanLoai.tenLoai }}</div>
                </div>

                <div class="detail-row">
                  <div class="detail-label">Nhà xuất bản:</div>
                  <div class="detail-value">{{ bookDetail.maNhaXuatBan.tenNXB }}</div>
                </div>

                <div class="detail-row">
                  <div class="detail-label">Năm xuất bản:</div>
                  <div class="detail-value">{{ bookDetail.namXuatBan }}</div>
                </div>

                <div class="detail-row">
                  <div class="detail-label">Tác giả:</div>
                  <div class="detail-value">
                    <span v-for="(tg, i) in bookDetail.maTacGia" :key="tg._id">
                      {{ tg.hoTen }}<span v-if="i < bookDetail.maTacGia.length - 1">, </span>
                    </span>
                  </div>
                </div>

                <div class="detail-row">
                  <div class="detail-label">SL sẵn có:</div>
                  <div class="detail-value">{{ bookDetail.soQuyen }} cuốn</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Loading -->
  <div v-else class="text-center py-5">
    <div class="spinner-border text-primary"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useBookService } from '@/composables/useBooks'
import { toast } from '@/utils/toast'

const route = useRoute()
const {
  bookDetail,
  getBookById,
  checkBorrowStatus,
  borrowBook,
  updateBookQuantity,
  countActiveBorrows,
} = useBookService()

const user = JSON.parse(localStorage.getItem('user') || '{}')

// =================== HANDLE BORROW ===================
const handleBorrow = async () => {
  if (!user?.refId) {
    toast.warning('Bạn cần đăng nhập để mượn sách')
    return
  }

  // ❗ RÀNG BUỘC: Hết sách => Không cho mượn
  if (bookDetail.value.soQuyen <= 0) {
    toast.error('Sách này hiện đã hết, không thể mượn!')
    return
  }

  const isBorrowed = await checkBorrowStatus(user.refId, bookDetail.value._id)

  if (isBorrowed) {
    toast.error('Bạn đã mượn cuốn này và chưa trả. Không thể mượn thêm!')
    return
  }

  // 0. Lấy số sách đang mượn
  const result = await countActiveBorrows(user.refId)
  const currentBorrows = result.data.count

  if (currentBorrows >= 3) {
    toast.error('Bạn chỉ được mượn tối đa 3 cuốn sách cùng lúc!')
    return
  }

  try {
    // 1. Ghi phiếu mượn
    await borrowBook(user.refId, bookDetail.value._id)

    // 2. Trừ số lượng sách
    const updatedQty = bookDetail.value.soQuyen - 1
    await updateBookQuantity(bookDetail.value._id, updatedQty)
    bookDetail.value.soQuyen = updatedQty

    toast.success('Đăng ký mượn sách thành công!')
  } catch (err) {
    toast.error('Lỗi khi đăng ký mượn sách!')
  }
}

// =================== LOAD DATA ===================
onMounted(() => {
  getBookById(route.params.id)
})

// =================== HÌNH ẢNH ===================
const BE_URL = 'http://localhost:8080'
const getImageUrl = (path) => (path ? `${BE_URL}${path}` : '/no-image.jpg')
</script>

<style scoped>
.book-detail-wrapper {
  background: linear-gradient(135deg, #f5f7fa 0%, #f0f0f5 100%);
  min-height: 100vh;
}

/* COVER */
.book-cover-container {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
}

.book-cover-image {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 12px;
}

/* BADGE */
.category-badge {
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
}

/* TITLE */
.book-title {
  font-size: 32px;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.3;
  margin-top: 16px;
}

/* DETAILS */
.book-details {
  background: white;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
}

.section-title {
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 16px;
}

.details-table {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.detail-row {
  display: grid;
  grid-template-columns: 150px 1fr;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-label {
  font-weight: 600;
  color: #666;
  font-size: 14px;
}

.detail-value {
  color: #333;
  font-size: 15px;
}

/* BUTTONS */
.borrow-btn {
  background: linear-gradient(135deg, #667eea, #764ba2);
  border: none;
  font-size: 18px;
  padding: 14px;
  border-radius: 12px;
  transition: 0.2s;
}

.borrow-btn:hover {
  opacity: 0.9;
}

.out-of-stock-btn {
  background: #ccc;
  color: #555;
  border: none;
  font-size: 18px;
  padding: 14px;
  border-radius: 12px;
  cursor: not-allowed;
}

/* MOBILE */
@media (max-width: 768px) {
  .book-title {
    font-size: 24px;
  }

  .detail-row {
    grid-template-columns: 100px 1fr;
  }
}
</style>
