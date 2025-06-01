import { defineStore } from 'pinia'

export const useProgressStore = defineStore('progress', {
  state: () => ({
    currentTime: 0,
    duration: 0
  }),
  actions: {
    setCurrentTime(time) {
      this.currentTime = time
    },
    setDuration(duration) {
      this.duration = duration
    }
  }
}) 