import React, { useLayoutEffect, useEffect, useState } from "react";
import { MdViewAgenda, MdSportsRugby } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { getAllBahanBaku } from "../store/slices/bahanBakuSlice";
import { getAllProduk } from "../store/slices/produkSlice";
import CurrencyFormat from "react-currency-format";

const Dasboard = () => {
  const [totBahanBaku, setTotBahanBaku] = useState(0);
  const [totProduk, setTotProduk] = useState(0);
  const dispatch = useDispatch();
  const dataProduk = useSelector((state) => state.produkSlice.dataProduk);
  const dataBahanBaku = useSelector(
    (state) => state.bahanBakuSlice.dataBahanBaku
  );
  const dataSession = useSelector((state) => state.authSlice.dataSession);

  useLayoutEffect(() => {
    dispatch(getAllBahanBaku({ token: dataSession.data?.token }));
    dispatch(getAllProduk({ token: dataSession.data?.token }));
  }, []);

  useEffect(() => {
    let sum = 0;
    dataBahanBaku.data.forEach((e) => {
      sum += parseInt(e.stok);
    });
    setTotBahanBaku(sum);
  }, [dataBahanBaku.data]);

  useEffect(() => {
    let sum = 0;
    dataProduk.data.forEach((e) => {
      sum += parseInt(e.stok);
    });
    setTotProduk(sum);
  }, [dataProduk.data]);
  return (
    <div>
      <div className="tw-flex tw-flex-col md:tw-flex-row tw-gap-6 ">
        <div className="md:tw-w-1/2 tw-bg-white tw-rounded-lg tw-shadow tw-py-2 tw-px-6 tw-divide-y tw-divide-gray-300">
          <div className="tw-flex tw-justify-between tw-items-center mb-3">
            <div className="tw-text-gray-700">
              <h1 className="tw-text-lg tw-font-bold ">Bahan Buku</h1>
              <p className="tw-text-4xl tw-font-bold">
                <CurrencyFormat
                  value={totBahanBaku}
                  displayType={"text"}
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  suffix={" Kg"}
                />
              </p>
            </div>
            <MdSportsRugby size={32} />
          </div>
        </div>
        <div className="md:tw-w-1/2 tw-bg-white tw-rounded-lg tw-shadow tw-py-2 tw-px-6 tw-divide-y tw-divide-gray-300">
          <div className="tw-flex tw-justify-between tw-items-center mb-3">
            <div className="tw-text-gray-700">
              <h1 className="tw-text-lg tw-font-bold">Produk</h1>
              <p className="tw-text-4xl tw-font-bold">
                <CurrencyFormat
                  value={totProduk}
                  displayType={"text"}
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  suffix={" Kg"}
                />
              </p>
            </div>
            <MdViewAgenda size={32} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dasboard;
