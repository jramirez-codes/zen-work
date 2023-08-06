// Generic Redux store file
import { createSlice } from '@reduxjs/toolkit'
import { zip, unzip } from './helperFunctions/zip'
import { organizeCardPositions } from './helperFunctions/organizeCardPositions'
// WINDOW DATA TYPE
// Ex. {windowType: STRING, title: STRING, data: ANY}
const cacheHome = 'my-zen-work-home'
const cachePrefix = 'my-zen-work-'
const cacheConfig = 'zen-work-config'

function createCleanState(state, action) {
  // Load New Clean State
  state.currentWindows = []
  state.currentLayers = []
  state.displayUrl = "https://www.youtube.com/embed/vemLEwjIxow"
  state.youtubeUrl = "https://www.youtube.com/embed/vemLEwjIxow"
  state.backgroundOpacity = 1
  state.backgroundType = 'gradient'
  state.styleSettings = {
    backgroundColor: 'rgba(255,255,255,1)',
    marginRight: 0
  }
  state.cacheName = cachePrefix + action.payload
}

export const settings = createSlice({
  name: 'settings',
  initialState: {
    // Window Controls
    currentWindows: [],
    currentLayers: [],
    // Card Settings
    displayUrl: "https://www.youtube.com/embed/vemLEwjIxow",
    youtubeUrl: "https://www.youtube.com/embed/vemLEwjIxow",
    backgroundOpacity: 1,
    backgroundType: 'gradient',
    styleSettings: {
      backgroundColor: 'rgba(255,255,255,1)',
      marginRight: 0
    },
    // Project Swapping
    projects: [],
    cacheName: cacheHome,
  },
  reducers: {
    // State Swapping
    deleteState: (state, action) => {
      // Delete and Update State
      let toDelete = window.confirm("Are you sure you want to delete "+action.payload);
      if (toDelete) {
        createCleanState(state, {payload:'home'})
        localStorage.removeItem(state.cacheName = cachePrefix + action.payload);

        // Get Config
        let configData = window.localStorage.getItem(cacheConfig)
        let projects
        if(configData !== null && configData !== "") {
          configData = JSON.parse(unzip(configData))
          projects = configData.projects
          projects.splice(projects.indexOf(action.payload), 1)
  
          // Update Config
          window.localStorage.setItem(cacheConfig, zip(JSON.stringify({
            currProject: 'home',
            projects: projects
          })))

          // Update Project States
          state.projects = projects
          state.cacheName = cacheHome

          // Load Home State
          let newState = window.localStorage.getItem(cacheHome)
          // Update Local States
          if(newState !== null && newState !== "") {
            newState = JSON.parse(unzip(newState))
            let keys = Object.keys(newState);
            for(let i=0;i<keys.length;i++) {
              if(keys[i] !== 'projects' && keys[i] !== 'cacheName') {
                state[keys[i]] = newState[keys[i]]
              }
            }
          }
        }
      }
    },
    addState: (state, action) => {
      // Stupid things for project name
      let projectName = window.prompt("Enter Project Name");
      if(projectName === '') {
        return
      }
      action.payload = projectName
      
      // Push new State
      state.projects.push(action.payload)
      
      // Saving Config
      window.localStorage.setItem(cacheConfig, zip(JSON.stringify({
        currProject: action.payload,
        projects: state.projects
      })))
      
      // Load New Clean State
      createCleanState(state, action)

    },
    swapState: (state, action) => {
      let newCacheState = cachePrefix + action.payload

      // Save Old State
      window.localStorage.setItem(state.cacheName, zip(JSON.stringify(state)))
      
      // Saving Config
      window.localStorage.setItem(cacheConfig, zip(JSON.stringify({
        currProject: action.payload,
        projects: state.projects
      })))

      // Get Cache of new State
      let newState = window.localStorage.getItem(newCacheState)
      // Update Local States
      if(newState !== null && newState !== "") {
        newState = JSON.parse(unzip(newState))
        let keys = Object.keys(newState);
        for(let i=0;i<keys.length;i++) {
          if(keys[i] !== 'projects' && keys[i] !== 'cacheName') {
            state[keys[i]] = newState[keys[i]]
          }
        }
      }
      state.cacheName = newCacheState
    },
    // Inital Window Load
    initalizeData:(state) => {
      if(window === undefined) {
        return 
      }

      // Get Config
      let configData = window.localStorage.getItem(cacheConfig)
      let currProject
      if(configData !== null && configData !== "") {
        configData = JSON.parse(unzip(configData))
        state.projects = configData.projects
        currProject = configData.currProject

        // Get State Data
        let cacheName = cachePrefix+currProject
        let currData = window.localStorage.getItem(cacheName)
        if(currData !== null && currData !== "") {
          currData = JSON.parse(unzip(currData))
          let keys = Object.keys(currData);
          // Update States
          for(let i=0;i<keys.length;i++) {
            if(keys[i] !== 'projects' && keys[i] !== 'cacheName') {
              state[keys[i]] = currData[keys[i]]
            }
          }
          // console.log(currData)
        }
        state.cacheName = cacheName
      }
      else {
        window.localStorage.setItem(cacheConfig, zip(JSON.stringify({
          currProject: "home",
          projects: []
        })))
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
        data: [],
        windowPosition: {x:window.innerWidth/2,y:window.innerHeight/2},
        windowSize: {h:0,w:0},
        windowAnimation: "hidden"
      })
      state.currentLayers.push(true)
    },
    updateCurrWindowPosition:(state, action) => {
      state.currentWindows[action.payload.idx].windowPosition = action.payload.data
      // // console.log(action.payload.data)
      // Update Cache
      window.localStorage.setItem(state.cacheName, zip(JSON.stringify(state)))
    },
    updateWindowData: (state, action) => {
      state.currentWindows[action.payload.idx].data = action.payload.data
      // Update Cache
      window.localStorage.setItem(state.cacheName, zip(JSON.stringify(state)))
    },
    updateAnyWindowDataTypeAndCache: (state, action)=> {
      state.currentWindows[action.payload.idx][action.payload.dataType] = action.payload.data
      // Update Cache
      window.localStorage.setItem(state.cacheName, zip(JSON.stringify(state)))
    },
    updateAnyWindowDataType: (state, action)=> {
      state.currentWindows[action.payload.idx][action.payload.dataType] = action.payload.data
    },
    updateWindowTitle: (state, action) => {
      state.currentWindows[action.payload.idx].title = action.payload.data
      // Update Cache
      window.localStorage.setItem(state.cacheName, zip(JSON.stringify(state)))
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
        state.currentWindows[action.payload].windowPosition = {x:0,  y:0}
        state.currentWindows[action.payload].windowSize = {h:0,w:0}
      }
      // Update Cache
      window.localStorage.setItem(state.cacheName, zip(JSON.stringify(state)))
    },
    organizeCards: (state) => {
      // Get Data Postion Using Cache
      let currData = window.localStorage.getItem(state.cacheName)
      if(currData === null) {
        return
      }
      currData = JSON.parse(unzip(currData)).currentWindows
      
      // Organize Card Animation Position
      currData = organizeCardPositions(currData)
      // console.log(currData)
      // Update States
      for(let i=0; i < currData.length-1; i++) {
        state.currentWindows[i].windowAnimation = {
          x:currData[i].windowPosition.x - window.innerWidth/2,
          y:currData[i].windowPosition.y - window.innerHeight /2,
          transition: {duration: 1}
        }
      }
    },
    // UI Settings
    updateOpacity: (state, action) => {
      state.backgroundOpacity = action.payload
      state.styleSettings = {
        backgroundColor: 'rgba(255,255,255, '+action.payload+')'
      }
      // Update Cache
      window.localStorage.setItem(state.cacheName, zip(JSON.stringify(state)))
    },
    updateBackgroundColor: (state, action) => {
      state.styleSettings = {
        backgroundColor: 'rgba(255,255,255, '+state.backgroundOpacity+')'
      }
      // Update Cache
      window.localStorage.setItem(state.cacheName, zip(JSON.stringify(state)))
    },
    updateBackgroundType: (state, action) => {
      state.backgroundType = action.payload
      // Update Cache
      window.localStorage.setItem(state.cacheName, zip(JSON.stringify(state)))
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
  , updateCurrWindowPosition
  , updateAnyWindowDataTypeAndCache
  , updateAnyWindowDataType
  , organizeCards
  , addState
  , swapState
  , deleteState
} = settings.actions

export default settings.reducer