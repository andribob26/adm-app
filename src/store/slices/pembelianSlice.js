import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios/api";
import { toast } from "react-toastify";

export const getAllPembelian = createAsyncThunk(
  "pembelianSlice/getAllPembelian",
  async (
    { size = "", page = "", search = "", token = "" },
    { rejectWithValue }
  ) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    try {
      const response = await axios.get(
        `get-all-pembelian?size=${size}&page=${page}&search=${search}`,
        {
          headers: headers,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addPembelian = createAsyncThunk(
  "pembelianSlice/addPembelian",
  async ({ data, token = "" }, { rejectWithValue }) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    try {
      const response = await axios.post(`add-pembelian`, data, {
        headers: headers,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllPembelianRange = createAsyncThunk(
  "pengirimanSlice/getAllPembelianRange",
  async ({ start = "", end = "", token = "" }, { rejectWithValue }) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    try {
      const response = await axios.get(
        `get-all-pembelian-by-range?start=${start}&end=${end}`,
        {
          headers: headers,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// export const editKategori = createAsyncThunk(
//   'pembelianSlice/editKategori',
//   async ({ id, data, token = '' }, { rejectWithValue }) => {
//     const headers = {
//       Authorization: 'Bearer ' + token
//     }
//     try {
//       const response = await axios.put(`edit-pembelian/${id}`, data, {
//         headers: headers
//       })
//       return response.data
//     } catch (error) {
//       return rejectWithValue(error.response.data)
//     }
//   }
// )

// export const deleteKategori = createAsyncThunk(
//   'pembelianSlice/deleteKategori',
//   async ({ id, token = '' }, { rejectWithValue }) => {
//     const headers = {
//       Authorization: 'Bearer ' + token
//     }
//     try {
//       const response = await axios.delete(`delete-pembelian/${id}`, null, {
//         headers: headers
//       })
//       return response.data
//     } catch (error) {
//       return rejectWithValue(error.response.data)
//     }
//   }
// )

const initialState = {
  dataByRange: {
    success: false,
    message: "",
    data: [],
    totalData: 0,
    totalPage: 0,
    limit: 10,
    currentPage: 0,
    isLoading: false,
  },
  dataPembelian: {
    success: false,
    message: "",
    data: [],
    totalData: 0,
    totalPage: 0,
    limit: 10,
    currentPage: 0,
    isLoading: false,
  },
  resPembelian: {
    type: "",
    success: false,
    message: "",
    data: null,
    isLoading: false,
  },
};

const pembelianSlice = createSlice({
  name: "pembelianSlice",
  initialState: initialState,
  reducers: {
    resetResPembelian: (state, action) => {
      state.resPembelian = {
        ...state.resPembelian,
        type: "",
        success: false,
        message: "",
        data: null,
        isLoading: false,
      };
    },
    resetDataRange: (state, action) => {
      state.dataByRange = {
        ...state.dataByRange,
        success: false,
        message: "",
        data: [],
        totalData: 0,
        totalPage: 0,
        limit: 10,
        currentPage: 0,
        isLoading: false,
      };
    },
  },
  extraReducers: {
    [getAllPembelian.pending]: (state) => {
      state.dataPembelian = {
        ...state.dataPembelian,
        isLoading: true,
      };
    },
    [getAllPembelian.fulfilled]: (state, action) => {
      state.dataPembelian = {
        ...state.dataPembelian,
        success: action.payload.success,
        message: action.payload.message,
        data: action.payload.data.dataItems,
        totalData: action.payload.data.totalItems,
        totalPage: action.payload.data.totalPages,
        limit: action.payload.data.limit,
        currentPage: action.payload.data.currentPage,
        isLoading: false,
      };
    },
    [getAllPembelian.rejected]: (state, action) => {
      state.dataPembelian = {
        ...state.dataPembelian,
        success: action.payload.success,
        message: action.payload.message,
        data: [],
        totalData: 0,
        totalPage: 0,
        limit: 10,
        currentPage: 0,
        isLoading: false,
      };
    },
    //getAllPembelianRange
    [getAllPembelianRange.pending]: (state) => {
      state.dataByRange = {
        ...state.dataByRange,
        isLoading: true,
      };
    },
    [getAllPembelianRange.fulfilled]: (state, action) => {
      state.dataByRange = {
        ...state.dataByRange,
        success: action.payload.success,
        message: action.payload.message,
        data: action.payload.data.dataItems,
        totalData: action.payload.data.totalItems,
        totalPage: action.payload.data.totalPages,
        limit: action.payload.data.limit,
        currentPage: action.payload.data.currentPage,
        isLoading: false,
      };
    },
    [getAllPembelianRange.rejected]: (state, action) => {
      state.dataByRange = {
        ...state.dataByRange,
        success: action.payload.success,
        message: action.payload.message,
        data: [],
        totalData: 0,
        totalPage: 0,
        limit: 10,
        currentPage: 0,
        isLoading: false,
      };
    },
    // addPembelian
    [addPembelian.pending]: (state) => {
      state.resPembelian = {
        ...state.resPembelian,
        isLoading: true,
      };
    },
    [addPembelian.fulfilled]: (state, action) => {
      state.resPembelian = {
        ...state.resPembelian,
        type: "tambah",
        success: action.payload.success,
        message: action.payload.message,
        data: action.payload.data,
        isLoading: false,
      };
      toast.success(action.payload.message);
    },
    [addPembelian.rejected]: (state, action) => {
      state.resPembelian = {
        ...state.resPembelian,
        type: "",
        success: action.payload.success,
        message: action.payload.message,
        data: action.payload.data,
        isLoading: false,
      };
      toast.error(action.payload.message);
    },
    // editKategori
    // [editKategori.pending]: state => {
    //   state.resPembelian = {
    //     ...state.resPembelian,
    //     isLoading: true
    //   }
    // },
    // [editKategori.fulfilled]: (state, action) => {
    //   state.resPembelian = {
    //     ...state.resPembelian,
    //     type: 'edit',
    //     success: action.payload.success,
    //     message: action.payload.message,
    //     data: action.payload.data,
    //     isLoading: false
    //   }
    //   toast.success(action.payload.message)
    // },
    // [editKategori.rejected]: (state, action) => {
    //   state.resPembelian = {
    //     ...state.resPembelian,
    //     type: '',
    //     success: action.payload.success,
    //     message: action.payload.message,
    //     data: action.payload.data,
    //     isLoading: false
    //   }
    //   toast.error(action.payload.message)
    // },
    // // deleteKategori
    // [deleteKategori.pending]: state => {
    //   state.resPembelian = {
    //     ...state.resPembelian,
    //     isLoading: true
    //   }
    // },
    // [deleteKategori.fulfilled]: (state, action) => {
    //   state.resPembelian = {
    //     ...state.resPembelian,
    //     type: 'remove',
    //     success: action.payload.success,
    //     message: action.payload.message,
    //     data: action.payload.data,
    //     isLoading: false
    //   }
    //   toast.success(action.payload.message)
    // },
    // [deleteKategori.rejected]: (state, action) => {
    //   state.resPembelian = {
    //     ...state.resPembelian,
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

export const { resetResPembelian, resetDataRange } = pembelianSlice.actions;

export default pembelianSlice.reducer;
