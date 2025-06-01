<template>
  <div class="input-container" :style="{ opacity: displayOpacity }">
    <div v-if="selectionStore.tracksDescriptionVisible" class="track-description">
      <span><strong>{{ track.title_short }}</strong> / </span>
      <span class="description-artist-name">{{ track.artist.name }}</span>
    </div>

    <input
      type="range"
      :value="progressStore.currentTime"
      step="1"
      min="0"
      :max="duration"
      class="input-progress"
      @input="handleChange"
      @mousedown="handleDown"
      @mouseup="handleUp"
      :style="{
        background: trackStyling,
        display: displayDescription,
        width: displayWidth
      }"
    />
    <TrackLevelControl :audio="audio" />
    <div class="trash" @click="handleDelete">
      <i class="fas fa-minus-circle fa-lg"></i>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, onUnmounted } from 'vue'
import { usePlayPauseStore } from '@/stores/playPause'
import { useProgressStore } from '@/stores/progress'
import { useSelectionStore } from '@/stores/selection'
import TrackLevelControl from './TrackLevelControl.vue'

const props = defineProps({
  track: {
    type: Object,
    required: true
  }
})

const playPauseStore = usePlayPauseStore()
const progressStore = useProgressStore()
const selectionStore = useSelectionStore()

const audio = ref(null)
const displayDescription = ref('none')
const displayWidth = ref('0%')
const displayOpacity = ref('0')
const intervalRef = ref(null)
const duration = 31

const currentPercentage = computed(() => {
  return duration ? `${(progressStore.currentTime / duration) * 100}%` : '0%'
})

const trackStyling = computed(() => {
  return `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage.value}, var(--white)), color-stop(${currentPercentage.value}, var(--active-color)))`
})

const startTimer = () => {
  clearInterval(intervalRef.value)
  intervalRef.value = setInterval(() => {
    if (audio.value.ended) {
      playPauseStore.setPlaying(false)
      audio.value.currentTime = 0
    }
    progressStore.setCurrentTime(audio.value.currentTime)
  }, 1000)
}

const handleDown = (event) => {
  progressStore.setCurrentTime(event.target.value)
  playPauseStore.setPlaying(false)
}

const handleChange = (event) => {
  progressStore.setCurrentTime(event.target.value)
}

const handleUp = (event) => {
  progressStore.setCurrentTime(event.target.value)
  progressStore.setDuration(event.target.value)
}

const handleDelete = () => {
  playPauseStore.setPlaying(false)
  selectionStore.removeTrack(props.track)
  clearInterval(intervalRef.value)
  audio.value.src = null
}

onMounted(() => {
  audio.value = new Audio(props.track.preview)
  displayDescription.value = duration ? 'inline-block' : 'none'
  displayOpacity.value = 1
  displayWidth.value = '95%'
})

watch(() => playPauseStore.isPlaying, (isPlaying) => {
  if (audio.value) {
    isPlaying ? audio.value.play() : audio.value.pause()

    if (props.track === selectionStore.tracks[0]) {
      isPlaying ? startTimer() : clearInterval(intervalRef.value)
    }
  }
})

watch(() => progressStore.duration, (newTime) => {
  if (audio.value) {
    audio.value.currentTime = progressStore.currentTime
  }
})

onUnmounted(() => {
  clearInterval(intervalRef.value)
})
</script>

<style scoped>
.input-container {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.track-description {
  margin-right: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--white);
}

.description-artist-name {
  color: var(--white);
  opacity: 0.7;
}

.input-progress {
  flex: 1;
  height: 5px;
  -webkit-appearance: none;
  background: var(--active-color);
  border-radius: 5px;
  outline: none;
}

.input-progress::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: var(--white);
  cursor: pointer;
}

.trash {
  margin-left: 10px;
  cursor: pointer;
  color: var(--white);
  opacity: 0.7;
}

.trash:hover {
  opacity: 1;
}
</style> 