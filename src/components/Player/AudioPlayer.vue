<template>
  <div class="audio-player">
    <div class="track-info">
      <img
        v-if="selectionStore.tracks.length"
        class="artwork"
        :src="selectionStore.tracks[0].album.cover_medium"
        :alt="`track artwork for ${selectionStore.tracks[0].title} by ${selectionStore.tracks[0].artist.name}`"
      />
      <h2 class="title">Songs</h2>
      <h3 class="artist">Artists</h3>
      <AudioControls />
      <TracksContainer />
    </div>
    <Backdrop
      v-if="selectionStore.tracks.length"
      track-index="0"
      :active-color="selectionStore.tracks[0].color"
      :is-playing="playPauseStore.isPlaying"
    />
  </div>
</template>

<script setup>
import { usePlayPauseStore } from '@/stores/playPause'
import { useSelectionStore } from '@/stores/selection'
import AudioControls from './AudioControls.vue'
import TracksContainer from './TracksContainer.vue'
import Backdrop from '../Backdrop.vue'

const playPauseStore = usePlayPauseStore()
const selectionStore = useSelectionStore()
</script>

<style scoped>
.audio-player {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.track-info {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 420px;
  width: 100%;
}

.artwork {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  margin-bottom: 20px;
  object-fit: cover;
}

.title {
  font-size: 2rem;
  margin-bottom: 10px;
  color: var(--white);
}

.artist {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: var(--white);
  opacity: 0.7;
}
</style> 