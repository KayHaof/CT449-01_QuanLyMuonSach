<template>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal-box">
      <div class="modal-header sticky-header mt-3 ms-3">
        <h5 class="title ">{{ title }}</h5>
        <button class="btn-close me-3" @click="$emit('close')"></button>
      </div>

      <div class="modal-body scroll-area">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({ title: String })
</script>

<style scoped>
/* BACKDROP */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 40px;
  z-index: 9999;
  overflow: hidden;
}

/* HỘP MODAL */
.modal-box {
  background: #fff;
  width: 90%;
  max-width: 850px; /* ⭐ rộng đẹp hơn */
  max-height: 85vh;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
}

/* HEADER */
.sticky-header {
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 10;
  padding-bottom: 12px;
  border-bottom: 1px solid #ddd;
}

.title {
  font-size: 20px;
  font-weight: 600;
}

/* BODY CUỘN */
.scroll-area {
  overflow-y: auto;
  padding: 20px;

  /* làm scrollbar đẹp */
  scrollbar-width: thin;
}

.scroll-area::-webkit-scrollbar {
  width: 6px;
}

.scroll-area::-webkit-scrollbar-thumb {
  background: #bfbfbf;
  border-radius: 4px;
}

.scroll-area::-webkit-scrollbar-thumb:hover {
  background: #a5a5a5;
}
</style>
