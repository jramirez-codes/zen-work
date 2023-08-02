// Generic Redux store file
import { createSlice } from '@reduxjs/toolkit'

export const settings = createSlice({
  name: 'settings',
  initialState: {
    displayUrl: "https://www.youtube.com/embed/vemLEwjIxow",
    youtubeUrl: "https://www.youtube.com/embed/vemLEwjIxow",
    currentWindows: [],
    currentLayers: [],
    backgroundOpacity: 1,
    backgroundType: 'gradient',
    styleSettings: {
      backgroundColor: 'rgba(255,255,255,1)',
      marginRight: 0
    },
  },
  reducers: {
    // Youtube URL
    setDisplayUrl: (state, action)=>{
      state.displayUrl = action.payload
    },
    updateYoutubeUrl: (state) => {
      state.youtubeUrl = state.displayUrl
    },
    // Window Manipulation
    onWindowHoverEnter: (state, action) => {
      state.currentLayers[action.payload] = true
    },
    onWindowHoverExit: (state, action) => {
      state.currentLayers[action.payload] = false
    },
    addWindow: (state, action) => {
      state.currentWindows.push(action.payload)
      state.currentLayers.push(true)
    },
    deleteWindow: (state, action)=> {
      // Delete the last on from the window list
      if(action.payload === state.currentWindows.length - 1) {
        state.currentWindows.pop()
        state.currentLayers.pop()
        while(state.currentWindows[state.currentWindows.length - 1] === 'delete') {
          state.currentWindows.pop()
          state.currentLayers.pop()
        }
      }
      // If window is not the last one, hide window
      else {
        state.currentWindows[action.payload] = 'delete'
      }
    },
    // UI Settings
    updateOpacity: (state, action) => {
      state.backgroundOpacity = action.payload
      state.styleSettings = {
        backgroundColor: 'rgba(255,255,255, '+action.payload+')'
      }
    },
    updateBackgroundColor: (state, action) => {
      state.styleSettings = {
        backgroundColor: 'rgba(255,255,255, '+state.backgroundOpacity+')'
      } 
    },
    updateBackgroundType: (state, action) => {
      state.backgroundType = action.payload
    },
  }
})
export const { 
  setDisplayUrl, 
  updateYoutubeUrl, 
  addWindow, 
  updateOpacity, 
  deleteWindow,
  onWindowHoverEnter,
  onWindowHoverExit,
  updateBackgroundType
} = settings.actions

export default settings.reducer