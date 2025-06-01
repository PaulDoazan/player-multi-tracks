import { ref } from 'vue'

const isInitialized = ref(false)
const isInitializing = ref(false)

export function useDeezer() {
  const initializeDeezer = () => {
    return new Promise((resolve, reject) => {
      if (isInitialized.value) {
        resolve(window.DZ)
        return
      }

      if (isInitializing.value) {
        const checkInterval = setInterval(() => {
          if (isInitialized.value) {
            clearInterval(checkInterval)
            resolve(window.DZ)
          }
        }, 100)
        return
      }

      isInitializing.value = true

      window.dzAsyncInit = function() {
        window.DZ.init({
          appId: '492982',
          channelUrl: 'https://pauldoazan.github.io/player-multi-tracks/'
        })
        isInitialized.value = true
        isInitializing.value = false
        resolve(window.DZ)
      }

      const script = document.createElement('script')
      script.src = 'https://e-cdns-files.dzcdn.net/js/min/dz.js'
      script.async = true
      script.onerror = () => {
        isInitializing.value = false
        reject(new Error('Failed to load Deezer SDK'))
      }
      document.getElementById('dz-root').appendChild(script)
    })
  }

  const searchTracks = async (query) => {
    try {
      const DZ = await initializeDeezer()
      return new Promise((resolve, reject) => {
        DZ.api('/search?q=' + encodeURIComponent(query), (response) => {
          if (response.error) {
            reject(new Error(response.error.message))
          } else {
            resolve(response.data)
          }
        })
      })
    } catch (error) {
      console.error('Error searching tracks:', error)
      return []
    }
  }

  return {
    initializeDeezer,
    searchTracks
  }
} 