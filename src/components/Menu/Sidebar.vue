<template>
  <div v-if="menuStore.isOpen" class="menu-container">
    <div class="top-menu-container">
      <div class="searchbar-container">
        <div class="searchbar">
          <input
            class="search-input"
            type="search"
            id="name"
            name="name"
            placeholder="search..."
            v-model="searchQuery"
            @input="handleSearch"
          />
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="loading">
      Loading...
    </div>

    <ul v-else-if="searchResults.length">
      <li v-for="track in searchResults" :key="track.id">
        <TrackBlock :data="track" />
      </li>
    </ul>

    <div v-else-if="searchQuery" class="no-results">
      No results found
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useMenuStore } from '@/stores/menu'
import { useDeezer } from '@/composables/useDeezer'
import TrackBlock from './TrackBlock.vue'

const menuStore = useMenuStore()
const { searchTracks } = useDeezer()

const searchQuery = ref('')
const searchResults = ref([])
const isLoading = ref(false)
let searchTimeout = null

const handleSearch = async () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }

  if (!searchQuery.value.trim()) {
    searchResults.value = []
    return
  }

  isLoading.value = true
  searchTimeout = setTimeout(async () => {
    try {
      searchResults.value = await searchTracks(searchQuery.value)
    } catch (error) {
      console.error('Search error:', error)
      searchResults.value = []
    } finally {
      isLoading.value = false
    }
  }, 300)
}

watch(() => menuStore.isOpen, (isOpen) => {
  if (!isOpen) {
    searchQuery.value = ''
    searchResults.value = []
  }
})
</script>

<style scoped>
.menu-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 420px;
  height: 100vh;
  background: #1E3F5A;
  z-index: 1000;
  overflow-y: auto;
  padding: 20px;
  color: white;
}

.top-menu-container {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.searchbar-container {
  width: 100%;
  max-width: 400px;
}

.searchbar {
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  font-size: 16px;
  color: white;
  background: rgba(255, 255, 255, 0.1);
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.search-input:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.4);
  background: rgba(255, 255, 255, 0.15);
}

.loading,
.no-results {
  text-align: center;
  padding: 20px;
  color: rgba(255, 255, 255, 0.7);
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 10px;
}
</style> 