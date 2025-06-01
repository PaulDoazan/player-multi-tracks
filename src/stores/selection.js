import { defineStore } from 'pinia'
import { tracks } from '@/tracks'

export const useSelectionStore = defineStore('selection', {
  state: () => ({
    selectedTrack: null,
    tracks: tracks,
    tracksDescriptionVisible: false
  }),
  actions: {
    setSelectedTrack(track) {
      this.selectedTrack = track
    },
    setTracks(tracks) {
      this.tracks = tracks
    },
    setTracksDescriptionVisible(visible) {
      this.tracksDescriptionVisible = visible
    },
    addTrack(track) {
      if (!this.tracks.find(t => t.id === track.id)) {
        this.tracks.push(track)
      }
    },
    removeTrack(track) {
      const index = this.tracks.findIndex(t => t.id === track.id)
      if (index !== -1) {
        this.tracks.splice(index, 1)
      }
    }
  }
}) 