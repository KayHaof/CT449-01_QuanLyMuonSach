import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
  }),

  actions: {
    setUser(data) {
      this.user = data
      localStorage.setItem('user', JSON.stringify(data))
    },

    logout() {
      this.user = null
      localStorage.removeItem('user')
    },
  },
})
