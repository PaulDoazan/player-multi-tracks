<template>
  <div class="tracks-container">
    <ul>
      <li v-for="track in selectionStore.tracks" :key="track.id">
        <Track :track="track" />
      </li>
    </ul>
    <div v-if="selectionStore.tracks.length" class="input-container">
      <div class="eye-container" @click="toggleTrackDescription">
        <i :class="[
          'far',
          selectionStore.tracksDescriptionVisible ? 'fa-eye' : 'fa-eye-slash',
          'fa-2x'
        ]"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSelectionStore } from '@/stores/selection'
import Track from './Track.vue'

const selectionStore = useSelectionStore()

const toggleTrackDescription = () => {
  selectionStore.setTracksDescriptionVisible(!selectionStore.tracksDescriptionVisible)
}
</script>

<style scoped>
.tracks-container {
  width: 100%;
  margin-top: 2rem;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.input-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.eye-container {
  cursor: pointer;
  padding: 10px;
  color: var(--white);
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.eye-container:hover {
  opacity: 1;
}
</style> 