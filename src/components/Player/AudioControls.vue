<template>
  <div :class="['audio-controls', { 'btn-disabled': !selectionStore.selectedTrack }]">
    <button
      v-if="playPauseStore.isPlaying"
      type="button"
      class="pause"
      @click="playPauseStore.setPlaying(false)"
      aria-label="Pause"
    >
      <PauseIcon />
    </button>
    <button
      v-else
      type="button"
      class="play"
      @click="playPauseStore.setPlaying(true)"
      aria-label="Play"
    >
      <PlayIcon />
    </button>
  </div>
</template>

<script setup>
import { usePlayPauseStore } from '@/stores/playPause'
import { useSelectionStore } from '@/stores/selection'
import PlayIcon from '@/components/icons/PlayIcon.vue'
import PauseIcon from '@/components/icons/PauseIcon.vue'

const playPauseStore = usePlayPauseStore()
const selectionStore = useSelectionStore()
</script>

<style scoped>
.audio-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
}

.btn-disabled {
  opacity: 0.5;
  pointer-events: none;
}

button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
}

button:hover {
  opacity: 0.8;
}

.play, .pause {
  width: 50px;
  height: 50px;
}
</style> 