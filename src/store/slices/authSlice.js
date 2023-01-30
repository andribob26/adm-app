import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios/api'
import { toast } from 'react-toastify'
export const logIn = createAsyncThunk(
  'authSlice/logIn',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`login`, data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const logOut = createAsyncThunk(
  'authSlice/logOut',
  async (data = null, { rejectWithValue }) => {
    try {
      const response = await axios.get(`logout`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const getSession = createAsyncThunk(
  'authSlice/getSession',
  async (data = null, { rejectWithValue }) => {
    try {
      const response = await axios.get(`get-session`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const refreshToken = createAsyncThunk(
  'authSlice/refreshToken',
  async ({ token = '' }, { rejectWithValue }) => {
    const headers = {
      Authorization: 'Bearer ' + token
    }
    try {
      const response = await axios.get(`refresh-token`, {
        headers: headers
      })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

const initialState = {
  dataLogin: {
    success: false,
    message: '',
    data: null,
    isLoading: false
  },
  dataLogout: {
    success: false,
    message: '',
    isLoading: false
  },
  dataSession: {
    success: false,
    message: '',
    data: null,
    isLoading: false
  },
  dataRefreshToken: {
    success: false,
    message: '',
    data: null,
    isLoading: false
  }
}

const authSlice = createSlice({
  name: 'authSlice',
  initialState: initialState,
  reducers: {
    resetDataLogin: state => {
      state.dataLogin = {
        ...state.dataLogin,
        success: false,
        message: '',
        data: null,
        isLoading: false
      }
    },
    resetDataLogout: state => {
      state.dataLogout = {
        ...state.dataLogout,
        success: false,
        message: '',
        isLoading: false
      }
    }
  },
  extraReducers: {
    // logIn
    [logIn.pending]: state => {
      state.dataLogin = {
        ...state.dataLogin,
        isLoading: true
      }
    },
    [logIn.fulfilled]: (state, action) => {
      localStorage.setItem('role', action.payload.data.role)
      state.dataLogin = {
        ...state.dataLogin,
        success: action.payload.success,
        message: action.payload.message,
        data: action.payload.data,
        isLoading: false
      }
    },
    [logIn.rejected]: (state, action) => {
      state.dataLogin = {
        ...state.dataLogin,
        success: action.payload.success,
        message: action.payload.message,
        data: action.payload.data,
        isLoading: false
      }
      toast.error(action.payload.message)
    },
    // logOut
    [logOut.pending]: state => {
      state.dataLogout = {
        ...state.dataLogout,
        isLoading: true
      }
    },
    [logOut.fulfilled]: (state, action) => {
      state.dataLogout = {
        ...state.dataLogout,
        success: action.payload.success,
        message: action.payload.message,
        isLoading: false
      }
    },
    [logOut.rejected]: (state, action) => {
      state.dataLogout = {
        ...state.dataLogout,
        success: action.payload.success,
        message: action.payload.message,
        isLoading: false
      }
    },
    // getSession
    [getSession.pending]: state => {
      state.dataSession = {
        ...state.dataSession,
        isLoading: true
      }
    },
    [getSession.fulfilled]: (state, action) => {
      state.dataSession = {
        ...state.dataSession,
        success: action.payload.success,
        message: action.payload.message,
        data: action.payload.data,
        isLoading: false
      }
    },
    [getSession.rejected]: (state, action) => {
      state.dataSession = {
        ...state.dataSession,
        success: action.payload.success,
        message: action.payload.message,
        data: action.payload.data,
        isLoading: false
      }
    },
    // refreshToken
    [refreshToken.pending]: state => {
      state.dataRefreshToken = {
        ...state.dataRefreshToken,
        isLoading: true
      }
    },
    [refreshToken.fulfilled]: (state, action) => {
      state.dataRefreshToken = {
        ...state.dataRefreshToken,
        success: action.payload.success,
        message: action.payload.message,
        data: action.payload.data,
        isLoading: false
      }
    },
    [refreshToken.rejected]: (state, action) => {
      state.dataRefreshToken = {
        ...state.dataRefreshToken,
        success: action.payload.success,
        message: action.payload.message,
        data: action.payload.data,
        isLoading: false
      }
    }
  }
})
export const { resetDataLogin, resetDataLogout } = authSlice.actions

export default authSlice.reducer
