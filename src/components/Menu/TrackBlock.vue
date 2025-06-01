<template>
  <div class="trackBlock">
    <div class="infos">
      <img :src="data.album.cover_small" :alt="data.title_short" />
      <div class="infos-text">
        <div class="info-title">{{ data.title_short }}</div>
        <div class="info-artist-name">{{ data.artist.name }}</div>
      </div>
    </div>
    <div class="trackBlock-buttons">
      <button class="add-button" @click="addTrack" title="Add track">
        <i class="fas fa-plus-circle fa-lg"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useSelectionStore } from '@/stores/selection'
import { usePlayPauseStore } from '@/stores/playPause'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const selectionStore = useSelectionStore()
const playPauseStore = usePlayPauseStore()

const addTrack = () => {
  const track = {
    id: props.data.id,
    title: props.data.title,
    title_short: props.data.title_short,
    artist: {
      name: props.data.artist.name
    },
    album: {
      cover_small: props.data.album.cover_small,
      cover_medium: props.data.album.cover_medium
    },
    preview: props.data.preview,
    color: getRandomColor()
  }
  
  selectionStore.addTrack(track)
  playPauseStore.setPlaying(false)
}

const getRandomColor = () => {
  const colors = [
    '#00aeb0', // Teal
    '#ffb77a', // Orange
    '#8aba9f', // Green
    '#e2804a', // Red
    '#6ea875', // Forest Green
    '#5fa7d0', // Blue
    '#e7d14f'  // Yellow
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}
</script>

<style scoped>
.trackBlock {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  margin-bottom: 10px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.trackBlock:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background: rgba(255, 255, 255, 0.15);
}

.infos {
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
}

.infos img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
  border-radius: 5px;
  object-fit: cover;
}

.infos-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.info-title {
  font-weight: bold;
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: white;
}

.info-artist-name {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.trackBlock-buttons {
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.add-button {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--active-color, #4CAF50);
  padding: 5px;
  transition: transform 0.2s ease;
}

.add-button:hover {
  transform: scale(1.1);
}
</style> 