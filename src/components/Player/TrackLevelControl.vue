<template>
  <div class="control-box">
    <div class="volume-control">
      <div
        class="speaker"
        :style="{ color: volume > 0 ? volumeOn : volumeOff }"
        @click="toggleVolume"
      >
        <i class="fas fa-volume-off fa-lg"></i>
      </div>
      <div class="bars">
        <span
          class="bar"
          :style="{ background: volume > 0 ? volumeOn : volumeOff }"
        ></span>
        <span
          class="bar"
          :style="{ background: volume > 20 ? volumeOn : volumeOff }"
        ></span>
        <span
          class="bar"
          :style="{ background: volume > 40 ? volumeOn : volumeOff }"
        ></span>
        <span
          class="bar"
          :style="{ background: volume > 60 ? volumeOn : volumeOff }"
        ></span>
        <span
          class="bar"
          :style="{ background: volume > 80 ? volumeOn : volumeOff }"
        ></span>
        <input
          type="range"
          class="level-input"
          min="0"
          max="100"
          step="20"
          :value="volume"
          @input="handleChange"
          @mousedown="handleChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  audio: {
    type: Object,
    required: true
  }
})

const volume = ref(20)
const volumeOn = 'white'
const volumeOff = '#777'

const handleChange = (event) => {
  volume.value = event.target.value
}

const toggleVolume = () => {
  volume.value = volume.value ? 0 : 100
}

watch(volume, (newVolume) => {
  if (props.audio) {
    props.audio.volume = newVolume / 100
  }
})

watch(() => props.audio, (newAudio) => {
  if (newAudio) {
    newAudio.volume = volume.value / 100
  }
})
</script>

<style scoped>
.control-box {
  margin: 0 10px;
}

.volume-control {
  display: flex;
  align-items: center;
}

.speaker {
  cursor: pointer;
  margin-right: 5px;
}

.bars {
  position: relative;
  width: 100px;
  height: 20px;
  display: flex;
  align-items: center;
}

.bar {
  flex: 1;
  height: 3px;
  margin: 0 1px;
  background: #777;
}

.level-input {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
</style> 