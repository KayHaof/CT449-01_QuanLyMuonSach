<template>
  <nav aria-label="Page navigation" class="d-flex justify-content-center mt-5 mb-4">
    <ul class="pagination">
      <!-- Previous Button -->
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <button
          class="page-link pagination-btn"
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1"
          aria-label="Previous page"
        >
          <i class="bi bi-chevron-left"></i> Trước
        </button>
      </li>

      <!-- Page Numbers -->
      <li
        v-for="page in visiblePages"
        :key="page === '...' ? `ellipsis-${Math.random()}` : page"
        class="page-item"
        :class="{ active: page === currentPage }"
      >
        <button
          v-if="page !== '...'"
          class="page-link pagination-btn"
          @click="changePage(page)"
          :aria-current="page === currentPage ? 'page' : null"
        >
          {{ page }}
        </button>
        <span v-else class="page-link pagination-ellipsis">...</span>
      </li>

      <!-- Next Button -->
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <button
          class="page-link pagination-btn"
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          aria-label="Next page"
        >
          Sau <i class="bi bi-chevron-right"></i>
        </button>
      </li>
    </ul>
  </nav>

  <!-- Page Info -->
  <div class="text-center text-muted small mb-4">
    Trang {{ currentPage }} của {{ totalPages }} (Tổng cộng: {{ totalItems }} mục)
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    default: 1,
  },
  totalItems: {
    type: Number,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    default: 10,
  },
})

const emit = defineEmits(['page-change'])

const localCurrentPage = ref(props.currentPage)

const totalPages = computed(() => Math.ceil(props.totalItems / props.itemsPerPage))

const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 5
  const half = Math.floor(maxVisible / 2)

  if (totalPages.value <= maxVisible) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i)
    }
  } else {
    // Always show first page
    pages.push(1)

    // Calculate start and end of middle section
    let start = Math.max(2, localCurrentPage.value - half)
    let end = Math.min(totalPages.value - 1, localCurrentPage.value + half)

    // Adjust if near the start
    if (localCurrentPage.value <= half + 1) {
      end = maxVisible - 1
    }

    // Adjust if near the end
    if (localCurrentPage.value >= totalPages.value - half) {
      start = totalPages.value - maxVisible + 2
    }

    // Add ellipsis before middle section if needed
    if (start > 2) {
      pages.push('...')
    }

    // Add middle section
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    // Add ellipsis after middle section if needed
    if (end < totalPages.value - 1) {
      pages.push('...')
    }

    // Always show last page
    pages.push(totalPages.value)
  }

  return pages
})

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value && page !== localCurrentPage.value) {
    localCurrentPage.value = page
    emit('page-change', page)
  }
}
</script>

<style scoped>
.pagination {
  gap: 0.5rem;
  flex-wrap: wrap;
}

.page-link {
  border: 2px solid #667eea;
  color: #667eea;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
}

.page-link:hover:not(:disabled) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.page-link:disabled {
  border-color: #ccc;
  color: #ccc;
  cursor: not-allowed;
  opacity: 0.5;
}

.page-item.active .page-link {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  border-color: #667eea;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.pagination-btn {
  background: transparent;
  border: 2px solid #667eea;
}

.pagination-ellipsis {
  border: none;
  color: #999;
  padding: 0.5rem 0.5rem;
  cursor: default;
}

/* Responsive pagination */
@media (max-width: 576px) {
  .page-link {
    padding: 0.4rem 0.6rem;
    font-size: 0.85rem;
  }
}
</style>
