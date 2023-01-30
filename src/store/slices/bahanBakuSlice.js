import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios/api'
import { toast } from 'react-toastify'

export const getAllBahanBaku = createAsyncThunk(
  'bahanBakuSlice/getAllBahanBaku',
  async (
    { size = '', page = '', search = '', token = '' },
    { rejectWithValue }
  ) => {
    const headers = {
      Authorization: 'Bearer ' + token
    }
    try {
      const response = await axios.get(
        `get-all-bahan-baku?size=${size}&page=${page}&search=${search}`,
        {
          headers: headers
        }
      )
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const addBahanBaku = createAsyncThunk(
  'bahanBakuSlice/addBahanBaku',
  async ({ data, token = '' }, { rejectWithValue }) => {
    const headers = {
      Authorization: 'Bearer ' + token
    }
    try {
      const response = await axios.post(`add-bahan-baku`, data, {
        headers: headers
      })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const editBahanBaku = createAsyncThunk(
    'bahanBakuSlice/editBahanBaku',
    async ({ id, data, token = '' }, { rejectWithValue }) => {
      const headers = {
        Authorization: 'Bearer ' + token
      }
      try {
        const response = await axios.put(`edit-bahan-baku/${id}`, data, {
          headers: headers
        })
        return response.data
      } catch (error) {
        return rejectWithValue(error.response.data)
      }
    }
  )

export const deleteBahanBaku = createAsyncThunk(
  'bahanBakuSlice/deleteBahanBaku',
  async ({ id, token = '' }, { rejectWithValue }) => {
    const headers = {
      Authorization: 'Bearer ' + token
    }
    try {
      const response = await axios.delete(`delete-bahan-baku/${id}`, null, {
        headers: headers
      })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// export const getBarangByKode = createAsyncThunk(
//   'bahanBakuSlice/getBarangByKode',
//   async ({ kode, token = '' }, { rejectWithValue }) => {
//     const headers = {
//       Authorization: 'Bearer ' + token
//     }
//     try {
//       const response = await axios.get(`get-barang-by-kode/${kode}`, {
//         headers: headers
//       })
//       return response.data
//     } catch (error) {
//       return rejectWithValue(error.response.data)
//     }
//   }
// )

const initialState = {
  dataBahanBaku: {
    success: false,
    message: '',
    data: [],
    totalData: 0,
    totalPage: 0,
    limit: 10,
    currentPage: 0,
    isLoading: false
  },
  resBahanBaku: {
    type: '',
    success: false,
    message: '',
    data: null,
    isLoading: false
  }
}

const bahanBakuSlice = createSlice({
  name: 'bahanBakuSlice',
  initialState: initialState,
  reducers: {
    resetResBahanBaku: (state, action) => {
      state.resBahanBaku = {
        ...state.resBahanBaku,
        type: '',
        success: false,
        message: '',
        data: null,
        isLoading: false
      }
    }
  },
  extraReducers: {
    [getAllBahanBaku.pending]: state => {
      state.dataBahanBaku = {
        ...state.dataBahanBaku,
        isLoading: true
      }
    },
    [getAllBahanBaku.fulfilled]: (state, action) => {
      state.dataBahanBaku = {
        ...state.dataBahanBaku,
        success: action.payload.success,
        message: action.payload.message,
        data: action.payload.data.dataItems,
        totalData: action.payload.data.totalItems,
        totalPage: action.payload.data.totalPages,
        limit: action.payload.data.limit,
        currentPage: action.payload.data.currentPage,
        isLoading: false
      }
    },
    [getAllBahanBaku.rejected]: (state, action) => {
      state.dataBahanBaku = {
        ...state.dataBahanBaku,
        success: action.payload.success,
        message: action.payload.message,
        data: [],
        totalData: 0,
        totalPage: 0,
        limit: 10,
        currentPage: 0,
        isLoading: false
      }
    },
    // addBahanBaku
    [addBahanBaku.pending]: state => {
      state.resBahanBaku = {
        ...state.resBahanBaku,
        isLoading: true
      }
    },
    [addBahanBaku.fulfilled]: (state, action) => {
      state.resBahanBaku = {
        ...state.resBahanBaku,
        type: 'tambah',
        success: action.payload.success,
        message: action.payload.message,
        data: action.payload.data,
        isLoading: false
      }
      toast.success(action.payload.message)
    },
    [addBahanBaku.rejected]: (state, action) => {
      state.resBahanBaku = {
        ...state.resBahanBaku,
        type: '',
        success: action.payload.success,
        message: action.payload.message,
        data: action.payload.data,
        isLoading: false
      }
      toast.error(action.payload.message)
    },
    // editBahanBaku
    [editBahanBaku.pending]: state => {
        state.resBahanBaku = {
          ...state.resBahanBaku,
          isLoading: true
        }
      },
      [editBahanBaku.fulfilled]: (state, action) => {
        state.resBahanBaku = {
          ...state.resBahanBaku,
          type: 'edit',
          success: action.payload.success,
          message: action.payload.message,
          data: action.payload.data,
          isLoading: false
        }
        toast.success(action.payload.message)
      },
      [editBahanBaku.rejected]: (state, action) => {
        state.resBahanBaku = {
          ...state.resBahanBaku,
          type: '',
          success: action.payload.success,
          message: action.payload.message,
          data: action.payload.data,
          isLoading: false
        }
        toast.error(action.payload.message)
      },
    // deleteBahanBaku
    [deleteBahanBaku.pending]: state => {
      state.resBahanBaku = {
        ...state.resBahanBaku,
        isLoading: true
      }
    },
    [deleteBahanBaku.fulfilled]: (state, action) => {
      state.resBahanBaku = {
        ...state.resBahanBaku,
        type: 'remove',
        success: action.payload.success,
        message: action.payload.message,
        data: action.payload.data,
        isLoading: false
      }
      toast.success(action.payload.message)
    },
    [deleteBahanBaku.rejected]: (state, action) => {
      state.resBahanBaku = {
        ...state.resBahanBaku,
        type: '',
        success: action.payload.success,
        message: action.payload.message,
        data: action.payload.data,
        isLoading: false
      }
      toast.error(action.payload.message)
    },
    // getBarangByKode
    // [getBarangByKode.pending]: state => {
    //   state.resBahanBaku = {
    //     ...state.resBahanBaku,
    //     isLoading: true
    //   }
    // },
    // [getBarangByKode.fulfilled]: (state, action) => {
    //   state.resBahanBaku = {
    //     ...state.resBahanBaku,
    //     type: 'get-by-kode',
    //     success: action.payload.success,
    //     message: action.payload.message,
    //     data: action.payload.data,
    //     isLoading: false
    //   }
    //   toast.success(action.payload.message)
    // },
    // [getBarangByKode.rejected]: (state, action) => {
    //   state.resBahanBaku = {
    //     ...state.resBahanBaku,
    //     type: '',
    //     success: action.payload.success,
    //     message: action.payload.message,
    //     data: action.payload.data,
    //     isLoading: false
    //   }
    //   toast.error(action.payload.message)
    // }
  }
})

export const { resetResBahanBaku } = bahanBakuSlice.actions

export default bahanBakuSlice.reducer
