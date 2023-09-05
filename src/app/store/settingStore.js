// Generic Redux store file
import { createSlice } from '@reduxjs/toolkit'
import { zip, unzip } from './helperFunctions/zip'
import { organizeCardPositions } from './helperFunctions/organizeCardPositions'
import { groupCenter } from './helperFunctions/groupCardsCenter'
import { configureYoutubeId } from './helperFunctions/configureYoutubeId'

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
    backgroundColor: {rgb:{r:255,g:255,b:255}},
    backgroundType: 'gradient',
    styleSettings: {
      backgroundColor: 'rgba(255,255,255,1)'
    },
    // Project Swapping
    projects: [],
    cacheName: cacheHome,
  },
  reducers: {
    // State Swapping
    deleteState: (state, action) => {
      // Delete and Update State
      let toDelete = window.confirm("Are you sure you want to delete this project");
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
      // Ask user for project name
      let projectName = window.prompt("Enter Project Name");

      // Check Name
      if(projectName === '' || projectName === null) {
        alert('Invalide Project Name')
        return
      }
      // Check if user already has project
      else if(window.localStorage.getItem(cachePrefix + projectName) !== null || projectName.toLowerCase() === 'home') {
        alert('Project Already Exists')
        return
      }

      // Push new State
      action.payload = projectName
      state.projects.push(projectName)
      
      // Saving Config
      window.localStorage.setItem(cacheConfig, zip(JSON.stringify({
        currProject: projectName,
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
      // Get Config
      let configData = window.localStorage.getItem(cacheConfig)
      let currProject
      // Already have data
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
          // Clean WindowType
          currData.currentWindows = currData.currentWindows.filter(item => item.windowType !== "delete");
          // Update States
          for(let i=0;i<keys.length;i++) {
            if(keys[i] !== 'projects' && keys[i] !== 'cacheName') {
              state[keys[i]] = currData[keys[i]]
            }
          }
        }
        state.cacheName = cacheName
      }
      // Data Initalization
      else {
        window.localStorage.setItem(cacheConfig, zip(JSON.stringify({
          currProject: "home",
          projects: []
        })))
      }
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
    updateWindowData: (state, action) => {
      state.currentWindows[action.payload.idx].data = action.payload.data
      // Update Cache
      window.localStorage.setItem(state.cacheName, zip(JSON.stringify(state)))
    },
    updateAnyWindowDataTypeAndCache: (state, action)=> {
      console.log(action.payload.idx, action.payload.dataType,action.payload.data)
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
        state.currentWindows[action.payload].windowAnimation = "hidden"
      }

      // Update Cache
      window.localStorage.setItem(state.cacheName, zip(JSON.stringify(state)))
    },
    // Card Animations
    organizeCards: (state) => {
      // Organize Card Animation Position
      state.currentWindows = organizeCardPositions(state.currentWindows)

      // Update Cache
      window.localStorage.setItem(state.cacheName, zip(JSON.stringify(state)))
    },
    groupCardsCenter: (state) => {
      state.currentWindows = groupCenter(state.currentWindows)

      // Update Cache
      window.localStorage.setItem(state.cacheName, zip(JSON.stringify(state)))
    },
    updateBackgroundColor: (state, action) => {
      state.backgroundColor = action.payload
      state.styleSettings = {
        backgroundColor: `rgba(${action.payload.rgb.r},${action.payload.rgb.g},${action.payload.rgb.b}, ${action.payload.rgb.a})`
      }
      // Update Cache
      window.localStorage.setItem(state.cacheName, zip(JSON.stringify(state)))
    },
    updateBackgroundType: (state, action) => {
      state.backgroundType = action.payload
      // Update Cache
      window.localStorage.setItem(state.cacheName, zip(JSON.stringify(state)))
    },
    // Youtube URL
    setDisplayUrl: (state, action)=>{
      state.displayUrl = action.payload
    },
    updateYoutubeUrl: (state) => {
      // Configure Youtube Video Id
      state.youtubeUrl = configureYoutubeId(state.displayUrl)
    },
  }
})

export const { 
  // CONFIGURE BACKGROUND
  setDisplayUrl
  , updateYoutubeUrl
  , updateBackgroundType
  , updateBackgroundColor

  // CARD MANIPULATION
  , organizeCards
  , groupCardsCenter

  // STATE MANAGEMENT
  , initalizeData
  , addState
  , swapState
  , deleteState

  // CARD MANAGEMENT
  , addWindow 
  , deleteWindow
  , onWindowHoverEnter
  , onWindowHoverExit
  
  // CONTENT MANAGEMENT
  , updateWindowTitle
  , updateWindowData
  , updateAnyWindowDataTypeAndCache
  , updateAnyWindowDataType
} = settings.actions

export default settings.reducer