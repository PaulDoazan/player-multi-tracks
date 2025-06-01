import { defineStore } from 'pinia'

export const usePlayPauseStore = defineStore('playPause', {
  state: () => ({
    isPlaying: false
  }),
  actions: {
    togglePlay() {
      this.isPlaying = !this.isPlaying
    },
    setPlaying(status) {
      this.isPlaying = status
    }
  }
}) 