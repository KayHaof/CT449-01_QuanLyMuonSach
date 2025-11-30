<template>
  <header class="admin-header d-flex justify-content-between align-items-center">
    <h4 class="fw-bold">Trang quản trị</h4>

    <div class="d-flex align-items-center gap-3">
      <input type="text" placeholder="Tìm kiếm..." class="form-control w-50" />

      <div class="admin-avatar">A</div>
    </div>
  </header>
</template>

<style scoped>
.admin-header {
  background: white;
  padding: 16px 20px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 6%);
}
.admin-avatar {
  width: 40px;
  height: 40px;
  background: #4f46e5;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  color: white;
  align-items: center;
}
</style>
