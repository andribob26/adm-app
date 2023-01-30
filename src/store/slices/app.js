import {createSlice } from '@reduxjs/toolkit'


const initialState = {
  app: {
    title: '',
    subTitle: ''
  }
}

const appSlice = createSlice({
  name: 'appSlice',
  initialState: initialState,
  reducers: {
    setAuth: (state, action) => {
      state.dataSignIn.auth = action.payload
    }
  },
})
export const { setAuth } = appSlice.actions

export default appSlice.reducer
