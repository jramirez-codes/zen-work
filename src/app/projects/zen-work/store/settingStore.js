// Generic Redux store file
import { createSlice } from '@reduxjs/toolkit'
import { zip, unzip } from './helperFunctions/zip'
// WINDOW DATA TYPE
// Ex. {windowType: STRING, title: STRING, data: ANY}
const cacheName = 'my-zen-work'

// MAYBE COMPRESS THE STATE
// var compressed = compress(string)
// var decompressed = LZString.decompressFromBase64(compressed)

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
    // Inital Window Load
    initalizeData:(state) => {
      let currData = window.localStorage.getItem(cacheName)
      if(currData !== null) {
        currData = JSON.parse(unzip(currData))

        let keys = Object.keys(currData);
        // Update States
        for(let i=0;i<keys.length;i++) {
          state[keys[i]] = currData[keys[i]]
        }
      }
    },
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
      state.currentWindows.push({
        windowType: action.payload,
        title: action.payload.charAt(0).toUpperCase() + action.payload.slice(1),
        data: []
      })
      state.currentLayers.push(true)
    },
    updateWindowData: (state, action) => {
      state.currentWindows[action.payload.idx].data = action.payload.data
      // Update Cache
      window.localStorage.setItem(cacheName, zip(JSON.stringify(state)))
    },
    updateWindowTitle: (state, action) => {
      state.currentWindows[action.payload.idx].title = action.payload.data
      // Update Cache
      window.localStorage.setItem(cacheName, zip(JSON.stringify(state)))
    },
    deleteWindow: (state, action)=> {
      // Delete the last on from the window list
      if(action.payload === state.currentWindows.length - 1) {
        state.currentWindows.pop()
        state.currentLayers.pop()
        while(state.currentWindows[state.currentWindows.length - 1] !== undefined && state.currentWindows[state.currentWindows.length - 1].windowType === 'delete') {
          state.currentWindows.pop()
          state.currentLayers.pop()
        }
      }
      // If window is not the last one, hide window
      else {
        state.currentWindows[action.payload].windowType = 'delete'
        state.currentWindows[action.payload].title = ''
        state.currentWindows[action.payload].data = [] 
      }
    },
    // UI Settings
    updateOpacity: (state, action) => {
      state.backgroundOpacity = action.payload
      state.styleSettings = {
        backgroundColor: 'rgba(255,255,255, '+action.payload+')'
      }
      // Update Cache
      window.localStorage.setItem(cacheName, zip(JSON.stringify(state)))
    },
    updateBackgroundColor: (state, action) => {
      state.styleSettings = {
        backgroundColor: 'rgba(255,255,255, '+state.backgroundOpacity+')'
      } 
    },
    updateBackgroundType: (state, action) => {
      state.backgroundType = action.payload
      // Update Cache
      window.localStorage.setItem(cacheName, zip(JSON.stringify(state)))
    },
  }
})
export const { 
  setDisplayUrl
  , updateYoutubeUrl
  , addWindow 
  , updateOpacity 
  , deleteWindow
  , onWindowHoverEnter
  , onWindowHoverExit
  , updateBackgroundType
  , updateWindowData
  , updateWindowTitle
  , initalizeData
} = settings.actions

export default settings.reducer