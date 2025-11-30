<template>
  <div class="col-md-3">
    <div class="card shadow-sm border-0 p-3 rounded-4">
      <div class="d-flex align-items-center">
        <div class="icon-box me-3" :style="{ background: color }">
          <i :class="icon"></i>
        </div>
        <div>
          <h4 class="fw-bold mb-0">{{ value }}</h4>
          <small class="text-muted">{{ title }}</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  value: Number,
  icon: String,
  color: String,
})
</script>

<style scoped>
.icon-box {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}
</style>
