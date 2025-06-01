<template>
  <div
    :class="[
      'toggle-button',
      menuStore.isOpen ? 'background-green' : 'background-blue'
    ]"
    @click="handleClick"
  >
    <template v-if="menuStore.isOpen">
      <div>
        <span class="list-badge">{{ selectionStore.tracks.length }}</span>
        <div class="icon-toggle-container">
          <i class="fas fa-list-ul fa-2x"></i>
        </div>
      </div>
    </template>
    <template v-else>
      <i class="fas fa-search fa-2x"></i>
    </template>
  </div>
</template>

<script setup>
import { useMenuStore } from '@/stores/menu'
import { useSelectionStore } from '@/stores/selection'

const menuStore = useMenuStore()
const selectionStore = useSelectionStore()

const handleClick = () => {
  menuStore.toggleMenu()
}
</script>

<style scoped>
.toggle-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: white;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.background-green {
  background-color: #4CAF50;
}

.background-blue {
  background-color: #2196F3;
}

.list-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: white;
  color: #4CAF50;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
}

.icon-toggle-container {
  position: relative;
}

.toggle-button:hover {
  transform: scale(1.1);
}
</style> 