<template>
  <div class="mb-3">
    <label class="form-label fw-semibold">{{ label }}</label>
    <slot />
  </div>
</template>

<script setup>
defineProps({ label: String })
</script>
