import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios/api";
import { toast } from "react-toastify";

// export const getAllProduk = createAsyncThunk(
//   'produksiSlice/getAllProduk',
//   async (
//     { size = '', page = '', search = '', token = '' },
//     { rejectWithValue }
//   ) => {
//     const headers = {
//       Authorization: 'Bearer ' + token
//     }
//     try {
//       const response = await axios.get(
//         `get-all-produksi?size=${size}&page=${page}&search=${search}`,
//         {
//           headers: headers
//         }
//       )
//       return response.data
//     } catch (error) {
//       return rejectWithValue(error.response.data)
//     }
//   }
// )

export const addProduksi = createAsyncThunk(
  "produksiSlice/addProduksi",
  async ({ data, token = "" }, { rejectWithValue }) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    try {
      const response = await axios.post(`add-produksi`, data, {
        headers: headers,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// export const editProduk = createAsyncThunk(
//     'produksiSlice/editProduk',
//     async ({ id, data, token = '' }, { rejectWithValue }) => {
//       const headers = {
//         Authorization: 'Bearer ' + token
//       }
//       try {
//         const response = await axios.put(`edit-produksi/${id}`, data, {
//           headers: headers
//         })
//         return response.data
//       } catch (error) {
//         return rejectWithValue(error.response.data)
//       }
//     }
//   )

// export const deleteProduk = createAsyncThunk(
//   'produksiSlice/deleteProduk',
//   async ({ id, token = '' }, { rejectWithValue }) => {
//     const headers = {
//       Authorization: 'Bearer ' + token
//     }
//     try {
//       const response = await axios.delete(`delete-produksi/${id}`, null, {
//         headers: headers
//       })
//       return response.data
//     } catch (error) {
//       return rejectWithValue(error.response.data)
//     }
//   }
// )

// export const getBarangByKode = createAsyncThunk(
//   'produksiSlice/getBarangByKode',
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
  dataProduksi: {
    success: false,
    message: "",
    data: [],
    totalData: 0,
    totalPage: 0,
    limit: 10,
    currentPage: 0,
    isLoading: false,
  },
  resProduksi: {
    type: "",
    success: false,
    message: "",
    data: null,
    isLoading: false,
  },
};

const produksiSlice = createSlice({
  name: "produksiSlice",
  initialState: initialState,
  reducers: {
    resetResProduksi: (state, action) => {
      state.resProduksi = {
        ...state.resProduksi,
        type: "",
        success: false,
        message: "",
        data: null,
        isLoading: false,
      };
    },
  },
  extraReducers: {
    // [getAllProduk.pending]: state => {
    //   state.dataProduksi = {
    //     ...state.dataProduksi,
    //     isLoading: true
    //   }
    // },
    // [getAllProduk.fulfilled]: (state, action) => {
    //   state.dataProduksi = {
    //     ...state.dataProduksi,
    //     success: action.payload.success,
    //     message: action.payload.message,
    //     data: action.payload.data.dataItems,
    //     totalData: action.payload.data.totalItems,
    //     totalPage: action.payload.data.totalPages,
    //     limit: action.payload.data.limit,
    //     currentPage: action.payload.data.currentPage,
    //     isLoading: false
    //   }
    // },
    // [getAllProduk.rejected]: (state, action) => {
    //   state.dataProduksi = {
    //     ...state.dataProduksi,
    //     success: action.payload.success,
    //     message: action.payload.message,
    //     data: [],
    //     totalData: 0,
    //     totalPage: 0,
    //     limit: 10,
    //     currentPage: 0,
    //     isLoading: false
    //   }
    // },
    // addProduksi
    [addProduksi.pending]: (state) => {
      state.resProduksi = {
        ...state.resProduksi,
        isLoading: true,
      };
    },
    [addProduksi.fulfilled]: (state, action) => {
      state.resProduksi = {
        ...state.resProduksi,
        type: "tambah",
        success: action.payload.success,
        message: action.payload.message,
        data: action.payload.data,
        isLoading: false,
      };
      toast.success(action.payload.message);
    },
    [addProduksi.rejected]: (state, action) => {
      state.resProduksi = {
        ...state.resProduksi,
        type: "",
        success: action.payload.success,
        message: action.payload.message,
        data: action.payload.data,
        isLoading: false,
      };
      toast.error(action.payload.message);
    },
    // editProduk
    // [editProduk.pending]: state => {
    //     state.resProduksi = {
    //       ...state.resProduksi,
    //       isLoading: true
    //     }
    //   },
    //   [editProduk.fulfilled]: (state, action) => {
    //     state.resProduksi = {
    //       ...state.resProduksi,
    //       type: 'edit',
    //       success: action.payload.success,
    //       message: action.payload.message,
    //       data: action.payload.data,
    //       isLoading: false
    //     }
    //     toast.success(action.payload.message)
    //   },
    //   [editProduk.rejected]: (state, action) => {
    //     state.resProduksi = {
    //       ...state.resProduksi,
    //       type: '',
    //       success: action.payload.success,
    //       message: action.payload.message,
    //       data: action.payload.data,
    //       isLoading: false
    //     }
    //     toast.error(action.payload.message)
    //   },
    // deleteProduk
    // [deleteProduk.pending]: state => {
    //   state.resProduksi = {
    //     ...state.resProduksi,
    //     isLoading: true
    //   }
    // },
    // [deleteProduk.fulfilled]: (state, action) => {
    //   state.resProduksi = {
    //     ...state.resProduksi,
    //     type: 'remove',
    //     success: action.payload.success,
    //     message: action.payload.message,
    //     data: action.payload.data,
    //     isLoading: false
    //   }
    //   toast.success(action.payload.message)
    // },
    // [deleteProduk.rejected]: (state, action) => {
    //   state.resProduksi = {
    //     ...state.resProduksi,
    //     type: '',
    //     success: action.payload.success,
    //     message: action.payload.message,
    //     data: action.payload.data,
    //     isLoading: false
    //   }
    //   toast.error(action.payload.message)
    // },
    // getBarangByKode
    // [getBarangByKode.pending]: state => {
    //   state.resProduksi = {
    //     ...state.resProduksi,
    //     isLoading: true
    //   }
    // },
    // [getBarangByKode.fulfilled]: (state, action) => {
    //   state.resProduksi = {
    //     ...state.resProduksi,
    //     type: 'get-by-kode',
    //     success: action.payload.success,
    //     message: action.payload.message,
    //     data: action.payload.data,
    //     isLoading: false
    //   }
    //   toast.success(action.payload.message)
    // },
    // [getBarangByKode.rejected]: (state, action) => {
    //   state.resProduksi = {
    //     ...state.resProduksi,
    //     type: '',
    //     success: action.payload.success,
    //     message: action.payload.message,
    //     data: action.payload.data,
    //     isLoading: false
    //   }
    //   toast.error(action.payload.message)
    // }
  },
});

export const { resetResProduksi } = produksiSlice.actions;

export default produksiSlice.reducer;
