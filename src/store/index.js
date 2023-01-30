import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import userSlice from "./slices/userSlice";
import bahanBakuSlice from "./slices/bahanBakuSlice";
import pembelianSlice from "./slices/pembelianSlice";
import produkSlice from "./slices/produkSlice";
import produksiSlice from "./slices/produksiSlice";
import pengirimanSlice from "./slices/pengirimanSlice";

const reducer = combineReducers({
  authSlice,
  userSlice,
  bahanBakuSlice,
  pembelianSlice,
  produkSlice,
  produksiSlice,
  pengirimanSlice,
});

const store = configureStore({
  reducer,
});

export default store;
