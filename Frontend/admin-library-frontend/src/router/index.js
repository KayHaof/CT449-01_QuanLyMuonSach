import { createRouter, createWebHistory } from 'vue-router'

// =============================
// ADMIN LAYOUT
// =============================
import AdminLayout from '../layouts/AdminLayout.vue'

// =============================
// ADMIN PAGES
// =============================
import Dashboard from '../pages/Dashboard.vue'

import BooksList from '../pages/Books/BooksList.vue'
import BooksForm from '../pages/Books/BooksForm.vue'

import AuthorsList from '../pages/Authors/AuthorsList.vue'
import AuthorsForm from '../pages/Authors/AuthorsForm.vue'

import CategoriesList from '../pages/Categories/CategoriesList.vue'
import CategoriesForm from '../pages/Categories/CategoriesForm.vue'

import PublishersList from '../pages/Publishers/PublishersList.vue'
import PublishersForm from '../pages/Publishers/PublishersForm.vue'

import ReadersList from '../pages/Readers/ReadersList.vue'
import ReadersForm from '../pages/Readers/ReadersForm.vue'

import StaffsList from '../pages/Staffs/StaffsList.vue'
import StaffsForm from '../pages/Staffs/StaffsForm.vue'

import BorrowsList from '../pages/Borrows/BorrowsList.vue'
import BorrowsForm from '../pages/Borrows/BorrowsForm.vue'

import FinesList from '../pages/Fines/FinesList.vue'
import FinesForm from '../pages/Fines/FinesForm.vue'

import UsersList from '../pages/Users/UsersList.vue'
import UsersForm from '../pages/Users/UsersForm.vue'

// =============================
// ROUTES
// =============================
const routes = [
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      // Dashboard
      {
        path: '',
        name: 'Dashboard',
        component: Dashboard,
      },

      // BOOKS
      { path: 'books', name: 'BooksList', component: BooksList },
      { path: 'books/create', name: 'BooksCreate', component: BooksForm },
      { path: 'books/edit/:id', name: 'BooksEdit', component: BooksForm, props: true },

      // AUTHORS
      { path: 'authors', name: 'AuthorsList', component: AuthorsList },
      { path: 'authors/create', name: 'AuthorsCreate', component: AuthorsForm },
      { path: 'authors/edit/:id', name: 'AuthorsEdit', component: AuthorsForm, props: true },

      // CATEGORIES
      { path: 'categories', name: 'CategoriesList', component: CategoriesList },
      { path: 'categories/create', name: 'CategoriesCreate', component: CategoriesForm },
      {
        path: 'categories/edit/:id',
        name: 'CategoriesEdit',
        component: CategoriesForm,
        props: true,
      },

      // PUBLISHERS
      { path: 'publishers', name: 'PublishersList', component: PublishersList },
      { path: 'publishers/create', name: 'PublishersCreate', component: PublishersForm },
      {
        path: 'publishers/edit/:id',
        name: 'PublishersEdit',
        component: PublishersForm,
        props: true,
      },

      // READERS
      { path: 'readers', name: 'ReadersList', component: ReadersList },
      { path: 'readers/create', name: 'ReadersCreate', component: ReadersForm },
      { path: 'readers/edit/:id', name: 'ReadersEdit', component: ReadersForm, props: true },

      // STAFFS
      { path: 'staffs', name: 'StaffsList', component: StaffsList },
      { path: 'staffs/create', name: 'StaffsCreate', component: StaffsForm },
      { path: 'staffs/edit/:id', name: 'StaffsEdit', component: StaffsForm, props: true },

      // BORROWS
      { path: 'borrows', name: 'BorrowsList', component: BorrowsList },
      { path: 'borrows/create', name: 'BorrowsCreate', component: BorrowsForm },
      { path: 'borrows/edit/:id', name: 'BorrowsEdit', component: BorrowsForm, props: true },

      // FINES
      { path: 'fines', name: 'FinesList', component: FinesList },
      { path: 'fines/create', name: 'FinesCreate', component: FinesForm },
      { path: 'fines/edit/:id', name: 'FinesEdit', component: FinesForm, props: true },

      // USERS
      { path: 'users', name: 'UsersList', component: UsersList },
      { path: 'users/create', name: 'UsersCreate', component: UsersForm },
      { path: 'users/edit/:id', name: 'UsersEdit', component: UsersForm, props: true },
    ],
  },

  // =============================
  // 404 → redirect admin
  // =============================
  {
    path: '/:pathMatch(.*)*',
    redirect: '/admin',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
