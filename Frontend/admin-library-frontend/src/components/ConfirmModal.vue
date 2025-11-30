<template>
  <div class="confirm-backdrop" @click.self="$emit('close')">
    <div class="confirm-box">
      <h4 class="title">{{ title }}</h4>
      <p class="message">{{ message }}</p>

      <div class="actions">
        <button class="btn-cancel" @click="$emit('close')">Hủy</button>

        <button class="btn-delete" @click="$emit('confirm')">
          <i class="bi bi-trash"></i> Xóa
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Xác nhận xóa',
  },
  message: {
    type: String,
    default: 'Bạn có chắc chắn muốn xóa mục này?',
  },
})

defineEmits(['close', 'confirm'])
</script>

<style scoped>
.confirm-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.confirm-box {
  background: #fff;
  border-radius: 14px;
  padding: 24px;
  width: 90%;
  max-width: 420px;
  text-align: center;
  box-shadow: 0 6px 22px rgba(0, 0, 0, 0.18);
  animation: fadeIn 0.2s ease;
}

.title {
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 12px;
}

.message {
  font-size: 15px;
  color: #555;
  margin-bottom: 24px;
}

/* BUTTONS */
.actions {
  display: flex;
  justify-content: center;
  gap: 12px;
}

.btn-cancel {
  padding: 10px 18px;
  background: #ddd;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s;
}

.btn-cancel:hover {
  background: #c8c8c8;
}

.btn-delete {
  padding: 10px 18px;
  background: #ff4d4f;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: 0.2s;
}

.btn-delete:hover {
  filter: brightness(1.1);
}

/* Animation */
@keyframes fadeIn {
  from {
    transform: scale(0.96);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>
