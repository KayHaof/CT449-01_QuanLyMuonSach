<template>
  <div class="admin-sidebar">
    <h3 class="sidebar-title">Admin Panel</h3>

    <ul class="sidebar-menu">
      <li><router-link to="/admin">Dashboard</router-link></li>
      <li><router-link to="/admin/books">Quản lý Sách</router-link></li>
      <li><router-link to="/admin/authors">Tác Giả</router-link></li>
      <li><router-link to="/admin/categories">Thể Loại</router-link></li>
      <li><router-link to="/admin/publishers">Nhà Xuất Bản</router-link></li>
      <li><router-link to="/admin/readers">Độc Giả</router-link></li>
      <li><router-link to="/admin/staffs">Nhân Viên</router-link></li>
      <li><router-link to="/admin/borrows">Phiếu Mượn</router-link></li>
      <li><router-link to="/admin/fines">Phiếu Phạt</router-link></li>
      <li><router-link to="/admin/users">User Hệ Thống</router-link></li>
    </ul>
  </div>
</template>

<style scoped>
.admin-sidebar {
  width: 250px;
  min-height: 100vh;
  padding: 25px 20px;

  /* 🌈 Gradient nền sidebar */
  background: linear-gradient(160deg, #4f46e5 0%, #6d28d9 50%, #4338ca 100%);
  color: #fff;

  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 15px rgba(0, 0, 0, 0.15);
}

.sidebar-title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 25px;
  text-align: center;
}

.sidebar-menu {
  padding: 0;
  margin: 0;
}

.sidebar-menu li {
  list-style: none;
  margin-bottom: 14px;
}

/* 🌟 Link mặc định */
.sidebar-menu a {
  display: block;
  padding: 10px 14px;
  border-radius: 10px;

  text-decoration: none;
  color: #e0e7ff;
  font-size: 15px;
  transition: 0.25s ease;
}

/* ⭐ Hover */
.sidebar-menu a:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  transform: translateX(4px);
}

/* 🔥 Active Route */
.router-link-active {
  background: linear-gradient(90deg, #ffffff33, #ffffff11);
  color: #fff !important;
  font-weight: 600;
  box-shadow: 0 0 10px #ffffff33;
  transform: translateX(6px);
}
</style>
