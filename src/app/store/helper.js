
// Generic Redux store file
import { createSlice } from '@reduxjs/toolkit'

export const helperFunctions = createSlice({
  name: 'counter',
  initialState: {
    value: 0,

  },
  reducers: {
    addFunc: (state) => {
      state.value += 1
    },
    minusFunc: (state) => {
      state.value -= 1
    },
    addByAmount: (state, action) => {
      state.value += action.payload 
    }
  }
})
export const { addFunc, minusFunc, addByAmount } = counterSlice.actions

export default counterSlice.reducer