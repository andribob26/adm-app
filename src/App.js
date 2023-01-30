import { useLayoutEffect, useEffect, useState } from "react";
import hasRole from "./utils/hasRole";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getSession } from "./store/slices/authSlice";
import { getUserById } from "./store/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dasboard from "./pages/Dasboard";
import ManagementUser from "./pages/ManagementUser";
import BahanBaku from "./pages/BahanBaku";
import Pembelian from "./pages/Pembelian";
import Produksi from "./pages/Produksi";
import Pengiriman from "./pages/Pengiriman";
import LaporanPembelian from "./pages/LaporanPembelian";
import LaporanPengiriman from "./pages/LaporanPengiriman";
import Produk from "./pages/Produk";

function App() {
  const dispatch = useDispatch();
  const dataSession = useSelector((state) => state.authSlice.dataSession);
  const [load, setLoad] = useState(false);
  useLayoutEffect(() => {
    dispatch(getSession());
    setTimeout(() => {
      setLoad(true);
    }, 300);
  }, []);

  useEffect(() => {
    if (dataSession.data !== null) {
      localStorage.setItem("role", dataSession.data.role);
      dispatch(
        getUserById({ id: dataSession.data.id, token: dataSession.data.token })
      );
    }
  }, [dataSession.data]);

  return (
    load && (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Dasboard />} />
            {hasRole(localStorage.getItem("role"), ["Pemilik"]) && (
              <Route path="management-user" element={<ManagementUser />} />
            )}
            {hasRole(localStorage.getItem("role"), ["Sekretaris"]) && (
              <Route path="bahan-baku" element={<BahanBaku />} />
            )}
            {hasRole(localStorage.getItem("role"), ["Sekretaris"]) && (
              <Route path="produk" element={<Produk />} />
            )}
            {hasRole(localStorage.getItem("role"), ["Sekretaris"]) && (
              <Route path="produksi" element={<Produksi />} />
            )}
            {hasRole(localStorage.getItem("role"), ["Bag.Pembelian"]) && (
              <Route path="pembelian" element={<Pembelian />} />
            )}
            {hasRole(localStorage.getItem("role"), ["Sekretaris"]) && (
              <Route path="pengiriman" element={<Pengiriman />} />
            )}
            {hasRole(localStorage.getItem("role"), [
              "Pemilik",
              "Sekretaris",
              "Bag.Pembelian",
            ]) && (
              <Route path="laporan-pembelian" element={<LaporanPembelian />} />
            )}
            {hasRole(localStorage.getItem("role"), [
              "Pemilik",
              "Sekretaris",
            ]) && (
              <Route
                path="laporan-pengiriman"
                element={<LaporanPengiriman />}
              />
            )}
          </Route>
        </Routes>
      </BrowserRouter>
    )
  );
}

export default App;
