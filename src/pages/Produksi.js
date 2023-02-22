import React, { useState, useLayoutEffect, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CurrencyFormat from "react-currency-format";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { addProduksi, resetResProduksi } from "../store/slices/produksiSlice";
import { getAllBahanBaku } from "../store/slices/bahanBakuSlice";
import { getAllProduk } from "../store/slices/produkSlice";

const Produksi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [maxQty, setMaxQty] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataSession = useSelector((state) => state.authSlice.dataSession);
  const dataBahanBaku = useSelector(
    (state) => state.bahanBakuSlice.dataBahanBaku
  );
  const dataProduk = useSelector((state) => state.produkSlice.dataProduk);
  const resProduksi = useSelector((state) => state.produksiSlice.resProduksi);

  const formik = useFormik({
    initialValues: {
      idBahanBaku: "",
      qtyBahanBaku: 0,
      idProduk: "",
      qtyProduk: 0,
    },
    validationSchema: Yup.object({
      idBahanBaku: Yup.string().required("Gabah tidak boleh kosong"),
      qtyBahanBaku: Yup.number()
        .required("jumlah tidak boleh kosong")
        .min(1, "jumlah tidak boleh kosong")
        .max(maxQty, "Stok tidak mencukupi!"),
      idProduk: Yup.string().required("Beras tidak boleh kosong"),
      qtyProduk: Yup.number()
        .required("Jumlah tidak boleh kosong")
        .min(1, "jumlah tidak boleh kosong"),
    }),
    onSubmit: (values) => {
      setIsLoading(true);
      dispatch(addProduksi({ data: values, token: dataSession.data?.token }));
    },
  });

  useLayoutEffect(() => {
    dispatch(getAllBahanBaku({ token: dataSession.data?.token }));
    dispatch(getAllProduk({ token: dataSession.data?.token }));
  }, []);

  useEffect(() => {
    if (resProduksi.success) {
      dispatch(resetResProduksi());
      setIsLoading(false);
      navigate("/produk", { replace: true });
    }
  }, [resProduksi.success]);

  useEffect(() => {
    const filterBahanBaku = dataBahanBaku.data.filter((el) => {
      return formik.values.idBahanBaku === el.id;
    });

    if (filterBahanBaku[0]?.nama !== undefined) {
      setMaxQty(filterBahanBaku[0].stok);
    }
  }, [formik.values.idBahanBaku]);

  return (
    <>
      <div className="tw-bg-white tw-py-2 tw-px-6 tw-rounded-lg tw-shadow">
        <div className="tw-mt-2">
          <div className="flex tw-gap-6">
            <div className="tw-form-group tw-mb-2 tw-w-1/2 tw-relative">
              <label
                htmlFor="exampleInputEmail2"
                className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700"
              >
                Bahan Baku
              </label>
              <select
                onChange={formik.handleChange}
                value={formik.values.idBahanBaku}
                className="tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-blue-600 focus:tw-outline-none"
                aria-label="Default select example"
                id="idBahanBaku"
              >
                <option value="" disabled>
                  Pilih
                </option>
                {dataBahanBaku.data.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      {item.nama}
                    </option>
                  );
                })}
              </select>
              {formik.touched.idBahanBaku && formik.errors.idBahanBaku && (
                <p className="tw-absolute tw-text-red-500 tw-top-4 tw-right-0 tw-m-0 tw-text-xs">
                  {formik.errors.idBahanBaku}
                </p>
              )}
            </div>
            <div className="tw-form-group tw-mb-2 tw-w-1/2 tw-relative">
              <label
                htmlFor="exampleInputEmail2"
                className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700"
              >
                <CurrencyFormat
                  value={maxQty}
                  displayType={"text"}
                  thousandSeparator={"."}
                  decimalSeparator={","}
                />{" "}
                Kg
              </label>
              <CurrencyFormat
                thousandSeparator={"."}
                decimalSeparator={","}
                onValueChange={(values) => {
                  if (values.value) {
                    formik.setValues((val) => ({
                      ...val,
                      qtyBahanBaku: parseInt(values.value),
                    }));
                  } else {
                    formik.setValues((val) => ({
                      ...val,
                      qtyBahanBaku: 0,
                    }));
                  }
                }}
                value={formik.values.qtyBahanBaku}
                className="tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
                id="qtyBahanBaku"
                placeholder="Kg"
              />

              {formik.touched.qtyBahanBaku && formik.errors.qtyBahanBaku && (
                <p className="tw-absolute tw-text-red-500 tw-top-4 tw-right-0 tw-m-0 tw-text-xs">
                  {formik.errors.qtyBahanBaku}
                </p>
              )}
            </div>
          </div>
          <div className="flex tw-gap-6">
            <div className="tw-form-group tw-mb-2 tw-w-1/2 tw-relative">
              <label
                htmlFor="exampleInputEmail2"
                className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700"
              >
                Produk
              </label>
              <select
                onChange={formik.handleChange}
                value={formik.values.idProduk}
                className="tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-blue-600 focus:tw-outline-none"
                aria-label="Default select example"
                id="idProduk"
              >
                <option value="" disabled>
                  Pilih
                </option>
                {dataProduk.data.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      {item.nama}
                    </option>
                  );
                })}
              </select>
              {formik.touched.idProduk && formik.errors.idProduk && (
                <p className="tw-absolute tw-text-red-500 tw-top-4 tw-right-0 tw-m-0 tw-text-xs">
                  {formik.errors.idProduk}
                </p>
              )}
            </div>
            <div className="tw-form-group tw-mb-2 tw-w-1/2 tw-relative">
              <label
                htmlFor="exampleInputEmail2"
                className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700"
              >
                Kg
              </label>
              <CurrencyFormat
                thousandSeparator={"."}
                decimalSeparator={","}
                onValueChange={(values) => {
                  if (values.value) {
                    formik.setValues((val) => ({
                      ...val,
                      qtyProduk: parseInt(values.value),
                    }));
                  } else {
                    formik.setValues((val) => ({
                      ...val,
                      qtyProduk: 0,
                    }));
                  }
                }}
                value={formik.values.qtyProduk}
                className="tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
                id="qtyProduk"
                placeholder="Karung"
              />
              {formik.touched.qtyProduk && formik.errors.qtyProduk && (
                <p className="tw-absolute tw-text-red-500 tw-top-4 tw-right-0 tw-m-0 tw-text-xs">
                  {formik.errors.qtyProduk}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="tw-mt-2 tw-flex tw-justify-end">
          <button
            onClick={formik.handleSubmit}
            type="button"
            className="hover:tw-bg-sky-700 tw-flex tw-items-center tw-px-6 tw-py-2 tw-bg-sky-600 tw-text-white tw-font-bold tw-text-xs tw-rounded tw-duration-150 tw-ease-in-out"
          >
            {isLoading && (
              <div
                class="tw-inline-block tw-h-5 tw-w-5 tw-animate-spin tw-rounded-full tw-border-[3px] tw-border-solid tw-border-current tw-border-r-transparent tw-align-[-0.125em] tw-motion-reduce:animate-[spin_1.5s_linear_infinite] tw-mr-2"
                role="status"
              >
                <span class="!tw-absolute !-tw-m-px !tw-h-px !tw-w-px !tw-overflow-hidden !tw-whitespace-nowrap !tw-border-0 !tw-p-0 !tw-[clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
            )}
            Simpan
          </button>
        </div>
      </div>
    </>
  );
};

export default Produksi;
