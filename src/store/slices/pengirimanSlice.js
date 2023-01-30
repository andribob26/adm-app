import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios/api";
import { toast } from "react-toastify";

export const getAllPengiriman = createAsyncThunk(
  "pengirimanSlice/getAllPengiriman",
  async (
    { size = "", page = "", search = "", token = "" },
    { rejectWithValue }
  ) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    try {
      const response = await axios.get(
        `get-all-pengiriman?size=${size}&page=${page}&search=${search}`,
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

export const getAllPengirimanRange = createAsyncThunk(
  "pengirimanSlice/getAllPengirimanRange",
  async ({ start = "", end = "", token = "" }, { rejectWithValue }) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    try {
      const response = await axios.get(
        `get-all-pengiriman-by-range?start=${start}&end=${end}`,
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

export const addPengiriman = createAsyncThunk(
  "pengirimanSlice/addPengiriman",
  async ({ data, token = "" }, { rejectWithValue }) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    try {
      const response = await axios.post(`add-pengiriman`, data, {
        headers: headers,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const penyesuaianPengiriman = createAsyncThunk(
  "pengirimanSlice/penyesuaianPengiriman",
  async ({ id, data, token = "" }, { rejectWithValue }) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    try {
      const response = await axios.put(`penyesuaian-pengiriman/${id}`, data, {
        headers: headers,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// export const deleteKategori = createAsyncThunk(
//   'pengirimanSlice/deleteKategori',
//   async ({ id, token = '' }, { rejectWithValue }) => {
//     const headers = {
//       Authorization: 'Bearer ' + token
//     }
//     try {
//       const response = await axios.delete(`delete-pengiriman/${id}`, null, {
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
  dataPengiriman: {
    success: false,
    message: "",
    data: [],
    totalData: 0,
    totalPage: 0,
    limit: 10,
    currentPage: 0,
    isLoading: false,
  },
  resPengiriman: {
    type: "",
    success: false,
    message: "",
    data: null,
    isLoading: false,
  },
};

const pengirimanSlice = createSlice({
  name: "pengirimanSlice",
  initialState: initialState,
  reducers: {
    resetResPengiriman: (state, action) => {
      state.resPengiriman = {
        ...state.resPengiriman,
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
    [getAllPengiriman.pending]: (state) => {
      state.dataPengiriman = {
        ...state.dataPengiriman,
        isLoading: true,
      };
    },
    [getAllPengiriman.fulfilled]: (state, action) => {
      state.dataPengiriman = {
        ...state.dataPengiriman,
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
    [getAllPengiriman.rejected]: (state, action) => {
      state.dataPengiriman = {
        ...state.dataPengiriman,
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
    //getAllPengirimanRange
    [getAllPengirimanRange.pending]: (state) => {
      state.dataByRange = {
        ...state.dataByRange,
        isLoading: true,
      };
    },
    [getAllPengirimanRange.fulfilled]: (state, action) => {
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
    [getAllPengirimanRange.rejected]: (state, action) => {
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
    // addPengiriman
    [addPengiriman.pending]: (state) => {
      state.resPengiriman = {
        ...state.resPengiriman,
        isLoading: true,
      };
    },
    [addPengiriman.fulfilled]: (state, action) => {
      state.resPengiriman = {
        ...state.resPengiriman,
        type: "tambah",
        success: action.payload.success,
        message: action.payload.message,
        data: action.payload.data,
        isLoading: false,
      };
      toast.success(action.payload.message);
    },
    [addPengiriman.rejected]: (state, action) => {
      state.resPengiriman = {
        ...state.resPengiriman,
        type: "",
        success: action.payload.success,
        message: action.payload.message,
        data: action.payload.data,
        isLoading: false,
      };
      toast.error(action.payload.message);
    },
    // penyesuaianPengiriman
    [penyesuaianPengiriman.pending]: (state) => {
      state.resPengiriman = {
        ...state.resPengiriman,
        isLoading: true,
      };
    },
    [penyesuaianPengiriman.fulfilled]: (state, action) => {
      state.resPengiriman = {
        ...state.resPengiriman,
        type: "edit",
        success: action.payload.success,
        message: action.payload.message,
        data: action.payload.data,
        isLoading: false,
      };
      toast.success(action.payload.message);
    },
    [penyesuaianPengiriman.rejected]: (state, action) => {
      state.resPengiriman = {
        ...state.resPengiriman,
        type: "",
        success: action.payload.success,
        message: action.payload.message,
        data: action.payload.data,
        isLoading: false,
      };
      toast.error(action.payload.message);
    },
  },
});

export const { resetResPengiriman, resetDataRange } = pengirimanSlice.actions;

export default pengirimanSlice.reducer;
