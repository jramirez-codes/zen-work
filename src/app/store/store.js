import { configureStore } from '@reduxjs/toolkit'
import settings from './settingStore'
export default configureStore({
  reducer: {
    settings: settings
  },
})