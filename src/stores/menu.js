import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    isOpen: false
  }),
  actions: {
    toggleMenu() {
      this.isOpen = !this.isOpen
    },
    setMenuOpen(status) {
      this.isOpen = status
    }
  }
}) 