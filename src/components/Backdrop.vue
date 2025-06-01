<template>
  <div :class="['color-backdrop', isPlaying ? 'playing' : 'idle']" :style="{ background: activeColor }" />
</template>

<script setup>
import { watch, onMounted } from 'vue'

const props = defineProps({
  activeColor: {
    type: String,
    required: true
  },
  trackIndex: {
    type: [String, Number],
    required: true
  },
  isPlaying: {
    type: Boolean,
    required: true
  }
})

onMounted(() => {
  document.documentElement.style.setProperty('--active-color', props.activeColor)
})

watch(() => props.trackIndex, () => {
  document.documentElement.style.setProperty('--active-color', props.activeColor)
})
</script>

<style scoped>
.color-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  transition: background 0.5s ease;
}

.playing {
  animation: colorChange 20s infinite alternate;
}

.idle {
  animation: none;
}

@keyframes colorChange {
  0% {
    filter: brightness(100%);
  }
  100% {
    filter: brightness(150%);
  }
}
</style> 