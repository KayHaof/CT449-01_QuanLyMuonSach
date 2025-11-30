<template>
  <div class="table-wrapper">
    <table class="admin-table">
      <thead>
        <tr>
          <th v-for="c in columns" :key="c.key">{{ c.label }}</th>
          <th class="text-end">Hành động</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="r in rows" :key="r._id">
          <td v-for="c in columns" :key="c.key">{{ r[c.key] }}</td>

          <td class="text-end action-col">
            <button class="btn-edit" @click="$emit('edit', r)">Sửa</button>
            <button class="btn-delete" @click="$emit('delete', r)">Xoá</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  columns: Array,
  rows: Array,
})
</script>

<style scoped>
/* ========= TABLE WRAPPER ========= */
.table-wrapper {
  background: white;
  border-radius: 14px;
  padding: 0;
  overflow: hidden;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.08);
}

/* ========= TABLE ========= */
.admin-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 15px;
}

/* ========= TABLE HEAD ========= */
.admin-table thead tr {
  background: linear-gradient(135deg, #7b5cff, #b06bff);
  color: white;
}

.admin-table th {
  padding: 14px 16px;
  text-align: left;
  font-weight: 600;
  font-size: 14.5px;
}

/* ========= TABLE BODY ========= */
.admin-table td {
  padding: 14px 16px;
  border-bottom: 1px solid #f1e8ff;
}

/* hover row effect */
.admin-table tbody tr:hover {
  background: #f5f0ff;
  transition: 0.2s ease;
}

/* ========= ACTION BUTTONS ========= */

.action-col {
  white-space: nowrap;
}

/* Sửa */
.btn-edit {
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 14px;
  border: none;
  background: linear-gradient(135deg, #6d4dff, #a359ff);
  color: white;
  margin-right: 6px;
  cursor: pointer;
  transition: 0.2s ease;
}

.btn-edit:hover {
  filter: brightness(1.1);
}

/* Xóa */
.btn-delete {
  padding: 6px 14px;
  border-radius: 8px;
  font-size: 14px;
  border: none;
  background: #ff4d4f;
  color: white;
  cursor: pointer;
  transition: 0.2s ease;
}

.btn-delete:hover {
  filter: brightness(1.1);
}
</style>
