<template>
  <div class="app">
    <router-view></router-view>
    <Sidebar />
    <ToggleButton />
  </div>
</template>

<script setup>
import Sidebar from '@/components/Menu/Sidebar.vue'
import ToggleButton from '@/components/Menu/ToggleButton.vue'
</script>

<style>
.app {
  width: 100%;
  min-height: 100vh;
  background: var(--soft-green);
  color: var(--white);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  transition: background 0.4s ease;
}

:root {
  --active-color: var(--green);
}
</style> 