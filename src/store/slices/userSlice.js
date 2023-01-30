import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../axios/api";
import { toast } from "react-toastify";
export const getAllUser = createAsyncThunk(
  "userSlice/getAllUser",
  async (
    { size = "", page = "", search = "", token = "" },
    { rejectWithValue }
  ) => {
    try {
      const resToken = await axios.get(`refresh-token`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      const response = await axios.get(
        `get-all-user?size=${size}&page=${page}&search=${search}`,
        {
          headers: {
            Authorization: "Bearer " + resToken.data.data.token,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserById = createAsyncThunk(
  "userSlice/getUserById",
  async ({ id, token = "" }, { rejectWithValue }) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    try {
      const response = await axios.get(`get-user-by-id/${id}`, {
        headers: headers,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addUser = createAsyncThunk(
  "userSlice/addUser",
  async ({ data, token = "" }, { rejectWithValue }) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    try {
      const response = await axios.post(`add-user`, data, {
        headers: headers,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "userSlice/deleteUser",
  async ({ id, token = "" }, { rejectWithValue }) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    try {
      const response = await axios.delete(`delete-user/${id}`, null, {
        headers: headers,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "userSlice/resetPassword",
  async ({ id, token = "" }, { rejectWithValue }) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    try {
      const response = await axios.put(`reset-password/${id}`, null, {
        headers: headers,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editUser = createAsyncThunk(
  "userSlice/editUser",
  async ({ id, data, token = "" }, { rejectWithValue }) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    try {
      const response = await axios.put(`edit-user/${id}`, data, {
        headers: headers,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const changePass = createAsyncThunk(
  "userSlice/changePass",
  async ({ id, data, token = "" }, { rejectWithValue }) => {
    const headers = {
      Authorization: "Bearer " + token,
    };
    try {
      const response = await axios.put(`change-password/${id}`, data, {
        headers: headers,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  dataUser: {
    success: false,
    message: "",
    data: [],
    totalData: 0,
    totalPage: 0,
    limit: 10,
    currentPage: 0,
    isLoading: false,
  },
  dataUserById: {
    success: false,
    message: "",
    data: null,
    isLoading: false,
  },
  resUser: {
    type: "",
    success: false,
    message: "",
    data: null,
    isLoading: false,
  },
};

const userSlice = createSlice({
  name: "userSlice",
  initialState: initialState,
  reducers: {
    resetResUser: (state, action) => {
      state.resUser = {
        ...state.resUser,
        type: "",
        success: false,
        message: "",
        data: null,
        isLoading: false,
      };
    },
  },
  extraReducers: {
    // getAllUser
    [getAllUser.pending]: (state) => {
      state.dataUser = {
        ...state.dataUser,
        isLoading: true,
      };
    },
    [getAllUser.fulfilled]: (state, action) => {
    
      state.dataUser = {
        ...state.dataUser,
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
    [getAllUser.rejected]: (state, action) => {
      state.dataUser = {
        ...state.dataUser,
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
    // addUser
    [addUser.pending]: (state) => {
      state.resUser = {
        ...state.resUser,
        isLoading: true,
      };
    },
    [addUser.fulfilled]: (state, action) => {
      state.resUser = {
        ...state.resUser,
        type: "tambah",
        success: action.payload.success,
        message: action.payload.message,
        data: action.payload.data,
        isLoading: false,
      };
      toast.success(action.payload.message);
    },
    [addUser.rejected]: (state, action) => {
      state.resUser = {
        ...state.resUser,
        type: "",
        success: action.payload.success,
        message: action.payload.message,
        data: action.payload.data,
        isLoading: false,
      };
      toast.error(action.payload.message);
    },
    // deleteUser
    [deleteUser.pending]: (state) => {
      state.resUser = {
        ...state.resUser,
        isLoading: true,
      };
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.resUser = {
        ...state.resUser,
        type: "remove",
        success: action.payload.success,
        message: action.payload.message,
        data: action.payload.data,
        isLoading: false,
      };
      toast.success(action.payload.message);
    },
    [deleteUser.rejected]: (state, action) => {
      state.resUser = {
        ...state.resUser,
        type: "",
        success: action.payload.success,
        message: action.payload.message,
        data: action.payload.data,
        isLoading: false,
      };
      toast.error(action.payload.message);
    },
    // getUserById
    [getUserById.pending]: (state) => {
      state.dataUserById = {
        ...state.dataUserById,
        isLoading: true,
      };
    },
    [getUserById.fulfilled]: (state, action) => {
      state.dataUserById = {
        ...state.dataUserById,
        success: action.payload.success,
        message: action.payload.message,
        data: action.payload.data,
        isLoading: false,
      };
    },
    [getUserById.rejected]: (state, action) => {
      state.dataUserById = {
        ...state.dataUserById,
        success: action.payload.success,
        message: action.payload.message,
        data: null,
        isLoading: false,
      };
    },
    // resetPassword
    [resetPassword.pending]: (state) => {
      state.resUser = {
        ...state.resUser,
        isLoading: true,
      };
    },
    [resetPassword.fulfilled]: (state, action) => {
      state.resUser = {
        ...state.resUser,
        type: "reset",
        success: action.payload.success,
        message: action.payload.message,
        data: action.payload.data,
        isLoading: false,
      };
      toast.success(action.payload.message);
    },
    [resetPassword.rejected]: (state, action) => {
      state.resUser = {
        ...state.resUser,
        type: "",
        success: action.payload.success,
        message: action.payload.message,
        data: action.payload.data,
        isLoading: false,
      };
      toast.error(action.payload.message);
    },
    // editUser
    [editUser.pending]: (state) => {
      state.resUser = {
        ...state.resUser,
        isLoading: true,
      };
    },
    [editUser.fulfilled]: (state, action) => {
      state.resUser = {
        ...state.resUser,
        type: "edit-user",
        success: action.payload.success,
        message: action.payload.message,
        data: action.payload.data,
        isLoading: false,
      };
      toast.success(action.payload.message);
    },
    [editUser.rejected]: (state, action) => {
      state.resUser = {
        ...state.resUser,
        type: "",
        success: action.payload.success,
        message: action.payload.message,
        data: action.payload.data,
        isLoading: false,
      };
      toast.error(action.payload.message);
    },
    // changePass
    [changePass.pending]: (state) => {
      state.resUser = {
        ...state.resUser,
        isLoading: true,
      };
    },
    [changePass.fulfilled]: (state, action) => {
      state.resUser = {
        ...state.resUser,
        type: "change-pass",
        success: action.payload.success,
        message: action.payload.message,
        data: action.payload.data,
        isLoading: false,
      };
      toast.success(action.payload.message);
    },
    [changePass.rejected]: (state, action) => {
      state.resUser = {
        ...state.resUser,
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

export const { resetResUser } = userSlice.actions;

export default userSlice.reducer;
