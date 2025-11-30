<template>
  <div class="admin-layout d-flex">
    <AdminSidebar />

    <div class="admin-content flex-grow-1">
      <AdminHeader />

      <main class="p-4">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import AdminSidebar from '@/components/AdminSidebar.vue'
import AdminHeader from '@/components/AdminHeader.vue'
</script>

<style src="@/assets/css/admin.css"></style>
