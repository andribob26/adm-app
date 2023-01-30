import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios/api'
import { toast } from 'react-toastify'

export const getAllProduk = createAsyncThunk(
  'produkSlice/getAllProduk',
  async (
    { size = '', page = '', search = '', token = '' },
    { rejectWithValue }
  ) => {
    const headers = {
      Authorization: 'Bearer ' + token
    }
    try {
      const response = await axios.get(
        `get-all-produk?size=${size}&page=${page}&search=${search}`,
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

export const addProduk = createAsyncThunk(
  'produkSlice/addProduk',
  async ({ data, token = '' }, { rejectWithValue }) => {
    const headers = {
      Authorization: 'Bearer ' + token
    }
    try {
      const response = await axios.post(`add-produk`, data, {
        headers: headers
      })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

export const editProduk = createAsyncThunk(
    'produkSlice/editProduk',
    async ({ id, data, token = '' }, { rejectWithValue }) => {
      const headers = {
        Authorization: 'Bearer ' + token
      }
      try {
        const response = await axios.put(`edit-produk/${id}`, data, {
          headers: headers
        })
        return response.data
      } catch (error) {
        return rejectWithValue(error.response.data)
      }
    }
  )

export const deleteProduk = createAsyncThunk(
  'produkSlice/deleteProduk',
  async ({ id, token = '' }, { rejectWithValue }) => {
    const headers = {
      Authorization: 'Bearer ' + token
    }
    try {
      const response = await axios.delete(`delete-produk/${id}`, null, {
        headers: headers
      })
      return response.data
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
)

// export const getBarangByKode = createAsyncThunk(
//   'produkSlice/getBarangByKode',
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
  dataProduk: {
    success: false,
    message: '',
    data: [],
    totalData: 0,
    totalPage: 0,
    limit: 10,
    currentPage: 0,
    isLoading: false
  },
  resProduk: {
    type: '',
    success: false,
    message: '',
    data: null,
    isLoading: false
  }
}

const produkSlice = createSlice({
  name: 'produkSlice',
  initialState: initialState,
  reducers: {
    resetResProduk: (state, action) => {
      state.resProduk = {
        ...state.resProduk,
        type: '',
        success: false,
        message: '',
        data: null,
        isLoading: false
      }
    }
  },
  extraReducers: {
    [getAllProduk.pending]: state => {
      state.dataProduk = {
        ...state.dataProduk,
        isLoading: true
      }
    },
    [getAllProduk.fulfilled]: (state, action) => {
      state.dataProduk = {
        ...state.dataProduk,
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
    [getAllProduk.rejected]: (state, action) => {
      state.dataProduk = {
        ...state.dataProduk,
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
    // addProduk
    [addProduk.pending]: state => {
      state.resProduk = {
        ...state.resProduk,
        isLoading: true
      }
    },
    [addProduk.fulfilled]: (state, action) => {
      state.resProduk = {
        ...state.resProduk,
        type: 'tambah',
        success: action.payload.success,
        message: action.payload.message,
        data: action.payload.data,
        isLoading: false
      }
      toast.success(action.payload.message)
    },
    [addProduk.rejected]: (state, action) => {
      state.resProduk = {
        ...state.resProduk,
        type: '',
        success: action.payload.success,
        message: action.payload.message,
        data: action.payload.data,
        isLoading: false
      }
      toast.error(action.payload.message)
    },
    // editProduk
    [editProduk.pending]: state => {
        state.resProduk = {
          ...state.resProduk,
          isLoading: true
        }
      },
      [editProduk.fulfilled]: (state, action) => {
        state.resProduk = {
          ...state.resProduk,
          type: 'edit',
          success: action.payload.success,
          message: action.payload.message,
          data: action.payload.data,
          isLoading: false
        }
        toast.success(action.payload.message)
      },
      [editProduk.rejected]: (state, action) => {
        state.resProduk = {
          ...state.resProduk,
          type: '',
          success: action.payload.success,
          message: action.payload.message,
          data: action.payload.data,
          isLoading: false
        }
        toast.error(action.payload.message)
      },
    // deleteProduk
    [deleteProduk.pending]: state => {
      state.resProduk = {
        ...state.resProduk,
        isLoading: true
      }
    },
    [deleteProduk.fulfilled]: (state, action) => {
      state.resProduk = {
        ...state.resProduk,
        type: 'remove',
        success: action.payload.success,
        message: action.payload.message,
        data: action.payload.data,
        isLoading: false
      }
      toast.success(action.payload.message)
    },
    [deleteProduk.rejected]: (state, action) => {
      state.resProduk = {
        ...state.resProduk,
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
    //   state.resProduk = {
    //     ...state.resProduk,
    //     isLoading: true
    //   }
    // },
    // [getBarangByKode.fulfilled]: (state, action) => {
    //   state.resProduk = {
    //     ...state.resProduk,
    //     type: 'get-by-kode',
    //     success: action.payload.success,
    //     message: action.payload.message,
    //     data: action.payload.data,
    //     isLoading: false
    //   }
    //   toast.success(action.payload.message)
    // },
    // [getBarangByKode.rejected]: (state, action) => {
    //   state.resProduk = {
    //     ...state.resProduk,
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

export const { resetResProduk } = produkSlice.actions

export default produkSlice.reducer
