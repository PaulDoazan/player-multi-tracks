import { createRouter, createWebHistory } from 'vue-router'
import AudioPlayer from '@/components/Player/AudioPlayer.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: AudioPlayer
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 