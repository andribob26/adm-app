import React, { useState, useLayoutEffect, useEffect } from "react";
import ModalCari from "../components/pembelian/ModalCari";
import { useDispatch, useSelector } from "react-redux";
import CurrencyFormat from "react-currency-format";
import { MdDelete } from "react-icons/md";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import {
  addPembelian,
  resetResPembelian,
  getAllPembelian,
} from "../store/slices/pembelianSlice";

const Pembelian = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [kodeU, setKodeU] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataSession = useSelector((state) => state.authSlice.dataSession);
  const resPembelian = useSelector(
    (state) => state.pembelianSlice.resPembelian
  );
  const dataPembelian = useSelector(
    (state) => state.pembelianSlice.dataPembelian
  );

  const formik = useFormik({
    initialValues: {
      no: "",
      detailPembelian: [],
      totalHarga: "",
      pemasok: "",
      alamat: "",
      nama: dataSession.data.nama,
    },
    validationSchema: Yup.object({
      detailPembelian: Yup.array().min(1, "Barang tidak boleh kosong"),
      totalHarga: Yup.number().required("Total tidak boleh kosong"),
      pemasok: Yup.string().required("Pemasok tidak boleh kosong"),
      alamat: Yup.string().required("Alamat tidak boleh kosong"),
    }),
    onSubmit: (values) => {
      setIsLoading(true);
      dispatch(addPembelian({ data: values, token: dataSession.data?.token }));
    },
  });

  const addToList = (item) => {
    if (hasMatchId(formik.values.detailPembelian, item.id)) {
      const i = formik.values.detailPembelian.findIndex((itm) => {
        return itm.id === item.id;
      });
      let newArr = [...formik.values.detailPembelian];
      newArr[i].qty = newArr[i].qty + 0;
      newArr[i].harga = 0;
      newArr[i].subTotal = newArr[i].qty * 0;

      formik.setValues((val) => ({
        ...val,
        detailPembelian: newArr,
      }));
    } else {
      formik.setValues((val) => ({
        ...val,
        detailPembelian: val.detailPembelian.concat({
          ...item,
          qty: 0,
          harga: 0,
          subTotal: 0,
        }),
      }));
    }
  };

  const deleteList = (item, status) => {
    const i = formik.values.detailPembelian.findIndex((itm) => {
      return itm.id === item.id;
    });
    if (status === "all") {
      formik.setValues((val) => ({
        ...val,
        detailPembelian: [
          ...val.detailPembelian.slice(0, i),
          ...val.detailPembelian.slice(i + 1, val.detailPembelian.length),
        ],
      }));
    } else {
      if (hasMatchId(formik.values.detailPembelian, item.id)) {
        let newArr = [...formik.values.detailPembelian];
        newArr[i].qty = newArr[i].qty - 1;
        newArr[i].subTotal = newArr[i].qty * item.harga;

        formik.setValues((val) => ({
          ...val,
          detailPembelian: newArr,
        }));

        if (formik.values.detailPembelian[i].qty < 1) {
          formik.setValues((val) => ({
            ...val,
            detailPembelian: [
              ...val.detailPembelian.slice(0, i),
              ...val.detailPembelian.slice(i + 1, val.detailPembelian.length),
            ],
          }));
        }
      }
    }
  };

  const hasMatchId = (arr, id) => {
    return arr.some((el) => el.id === id);
  };

  const showModalHandler = (type, item = null) => {
    let elModal = null;

    switch (type) {
      case "bahanBaku":
        elModal = document.querySelector(`#${type}`);
        break;

      default:
        break;
    }
    if (elModal !== null) {
      const modal = window.Modal.getOrCreateInstance(elModal);
      modal.show();
    }
  };

  const tabelHead = [
    { title: "No" },
    { title: "Nama" },
    { title: "Harga" },
    { title: "Kg" },
    { title: "Sub Total" },
    { title: "Aksi" },
  ];

  useEffect(() => {
    let sum = 0;
    formik.values.detailPembelian.forEach((e) => {
      sum += parseInt(e.subTotal);
    });
    formik.setValues((val) => ({
      ...val,
      totalHarga: sum,
    }));
  }, [formik.values.detailPembelian]);

  useEffect(() => {
    if (resPembelian.success) {
      dispatch(resetResPembelian());
      setIsLoading(false);
      navigate("/laporan-pembelian", { replace: true });
    }
  }, [resPembelian.success]);

  useLayoutEffect(() => {
    dispatch(getAllPembelian({ token: dataSession.data?.token }));
  }, []);

  useEffect(() => {
    const newString = parseInt(dataPembelian.totalData) + 1;
    const ans = ("0000" + newString).slice(-4);
    setKodeU(ans);
    formik.setValues((val) => ({
      ...val,
      no: `${new Date().getFullYear()}/N/${kodeU}`,
    }));
  }, [dataPembelian]);

  return (
    <>
      <div className="tw-bg-white tw-py-2 tw-px-6 tw-rounded-lg tw-shadow">
        <div className="tw-flex tw-items-center tw-mb-2 tw-gap-2 tw-justify-between tw-relative">
          <div className="tw-relative tw-flex tw-w-full md:tw-w-96 tw-items-center">
            <span className="tw-text-xs tw-font-bold tw-text-gray-700 tw-mr-2">
              No
            </span>
            <input
              disabled={true}
              value={formik.values.no}
              type="text"
              className="tw-form-control tw-bg-gray-50 tw-block tw-w-full tw-px-2 tw-py-1 tw-text-sm tw-font-semibold  tw-text-gray-400 tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
              id="no"
            />
          </div>
          <div className="tw-relative tw-flex tw-items-center tw-gap-2">
            <button
              onClick={() => {
                showModalHandler("bahanBaku");
              }}
              type="button"
              className="hover:tw-bg-sky-700 tw-flex tw-items-center tw-px-6 tw-py-2 tw-bg-sky-600 tw-text-white tw-font-bold tw-text-xs tw-rounded tw-duration-150 tw-ease-in-out"
            >
              Cari
            </button>
          </div>
        </div>
        <div className="tw-overflow-x-auto">
          <table className="tw-w-full tw-relative">
            <thead className="tw-bg-white tw-border-b-2 tw-border-t">
              <tr>
                {tabelHead.map((item, i) => (
                  <th
                    key={i}
                    scope="tw-col"
                    className="tw-text-xs tw-font-bold tw-px-6 tw-py-2 tw-text-left"
                  >
                    {item.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {formik.values.detailPembelian.length > 0 ? (
                formik.values.detailPembelian.map((item, i) => (
                  <tr key={i} className="tw-border-b hover:tw-bg-sky-100">
                    <td className="tw-border tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12">
                      {i + 1}
                    </td>
                    <td className="tw-border tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12">
                      {item.nama}
                    </td>
                    <td className="tw-border tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12 tw-text-right">
                      <CurrencyFormat
                        thousandSeparator={"."}
                        decimalSeparator={","}
                        prefix={"Rp."}
                        onValueChange={(values) => {
                          let newArr = [...formik.values.detailPembelian];
                          if (values.value > 0) {
                            newArr[i].harga = parseInt(values.value);
                            newArr[i].subTotal =
                              parseInt(values.value) * item.qty;

                            formik.setValues((val) => ({
                              ...val,
                              detailPembelian: newArr,
                            }));
                          } else {
                            newArr[i].harga = 0;
                            newArr[i].subTotal = 0;

                            formik.setValues((val) => ({
                              ...val,
                              detailPembelian: newArr,
                            }));
                          }
                        }}
                        value={item.harga}
                        className="tw-text-right tw-block tw-w-20 tw-px-2 tw-py-1 tw-text-xs tw-font-semibold  tw-text-gray-700 tw-bg-transparent tw-bg-clip-padding tw-border-b-2 tw-border-dotted tw-border-gray-700 tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-transparent focus:tw-border-sky-600 focus:tw-outline-none"
                        id="harga"
                        placeholder="Harga"
                      />
                    </td>
                    <td className="tw-border tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12 tw-text-right">
                      <CurrencyFormat
                        thousandSeparator={"."}
                        decimalSeparator={","}
                        onValueChange={(values) => {
                          if (values.value > 0) {
                            let newArr = [...formik.values.detailPembelian];
                            newArr[i].qty = parseInt(values.value);
                            newArr[i].subTotal =
                              parseInt(values.value) * item.harga;

                            formik.setValues((val) => ({
                              ...val,
                              detailPembelian: newArr,
                            }));
                          } else {
                            let newArr = [...formik.values.detailPembelian];
                            newArr[i].qty = 0;
                            newArr[i].subTotal = item.harga;

                            formik.setValues((val) => ({
                              ...val,
                              detailPembelian: newArr,
                            }));
                          }
                        }}
                        value={item.qty}
                        className="tw-text-right tw-block tw-w-20 tw-px-2 tw-py-1 tw-text-xs tw-font-semibold  tw-text-gray-700 tw-bg-transparent tw-bg-clip-padding tw-border-b-2 tw-border-dotted tw-border-gray-700 tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-transparent focus:tw-border-sky-600 focus:tw-outline-none"
                        id="qty"
                        placeholder="Qty"
                      />
                      {/* <input
                        value={item.qty}
                        onChange={(e) => {
                          const result = e.target.value.replace(/\D/g, "");
                          if (result.length > 0) {
                            
                          } else {
                            let newArr = [...formik.values.detailPembelian];
                            newArr[i].qty = "";
                            newArr[i].subTotal = item.harga;

                            formik.setValues((val) => ({
                              ...val,
                              detailPembelian: newArr,
                            }));
                          }
                        }}
                        onBlur={() => {
                          if (item.qty === "") {
                            let newArr = [...formik.values.detailPembelian];
                            newArr[i].qty = 1;
                            newArr[i].subTotal = item.harga;

                            formik.setValues((val) => ({
                              ...val,
                              detailPembelian: newArr,
                            }));
                          }
                        }}
                        type="text"
                        className="tw-text-right tw-block tw-w-20 tw-px-2 tw-py-1 tw-text-xs tw-font-semibold  tw-text-gray-700 tw-bg-transparent tw-bg-clip-padding tw-border-b-2 tw-border-dotted tw-border-gray-700 tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-transparent focus:tw-border-sky-600 focus:tw-outline-none"
                        placeholder="Qty"
                      /> */}
                    </td>
                    <td className="tw-border tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12 tw-text-right">
                      <CurrencyFormat
                        value={item.subTotal}
                        displayType={"text"}
                        thousandSeparator={"."}
                        decimalSeparator={","}
                        prefix={"Rp."}
                        className="tw-px-2"
                      />
                    </td>
                    <td className="tw-border tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12">
                      <div className="tw-flex tw-gap-2 tw-items-center tw-w-full">
                        <button
                          onClick={() => {
                            deleteList(item, "all");
                          }}
                          className="hover:tw-text-gray-500 tw-transition tw-duration-300 tw-ease-in-out"
                          title="Hapus"
                        >
                          <MdDelete size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="tw-border-b hover:tw-bg-sky-100">
                  <td
                    colSpan={8}
                    className="tw-border tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12"
                  >
                    {formik.touched.detailPembelian &&
                    formik.errors.detailPembelian ? (
                      <p className="tw-text-red-500 tw-text-xs">
                        {formik.errors.detailPembelian}
                      </p>
                    ) : (
                      <p>Tida ada data</p>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="tw-mt-2">
          <div className="form-group mb-2">
            <label
              htmlFor="exampleInputEmail2"
              className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700"
            >
              Nama Pemasok
            </label>
            <div className="tw-relative">
              <input
                onChange={formik.handleChange}
                value={formik.values.pemasok}
                type="text"
                className="tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
                id="pemasok"
                placeholder="Nama Pemasok"
              />
              {formik.touched.pemasok && formik.errors.pemasok && (
                <p className="tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs">
                  {formik.errors.pemasok}
                </p>
              )}
            </div>
          </div>
          <div className="form-group mb-2">
            <label
              htmlFor="exampleInputEmail2"
              className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700"
            >
              Alamat
            </label>
            <div className="tw-relative">
              <input
                onChange={formik.handleChange}
                value={formik.values.alamat}
                type="text"
                className="tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
                id="alamat"
                placeholder="Alamat"
              />
              {formik.touched.alamat && formik.errors.alamat && (
                <p className="tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs">
                  {formik.errors.alamat}
                </p>
              )}
            </div>
          </div>
          {/* <div className="tw-relative tw-flex tw-w-full md:tw-w-96 tw-items-center">
            <span className="tw-text-xs tw-font-bold tw-text-gray-700 tw-mr-2">
              Pemasok
            </span>
            <input
              type="text"
              className="tw-form-control tw-block tw-w-full tw-px-2 tw-py-1 tw-text-sm tw-font-semibold  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
              placeholder="Pemasok"
            />
          </div>
          <div className="tw-relative tw-flex tw-w-full md:tw-w-96 tw-items-center">
            <span className="tw-text-xs tw-font-bold tw-text-gray-700 tw-mr-2">
              Alamat
            </span>
            <input
              type="text"
              className="tw-form-control tw-block tw-w-full tw-px-2 tw-py-1 tw-text-sm tw-font-semibold  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
              placeholder="Pemasok"
            />
          </div> */}
        </div>

        <div className="tw-mt-2 tw-flex tw-justify-end">
          <button
            onClick={formik.handleSubmit}
            type="button"
            className="hover:tw-bg-sky-700 tw-flex tw-items-center tw-px-6 tw-py-2 tw-bg-sky-600 tw-text-white tw-font-bold tw-text-xs tw-rounded tw-duration-150 tw-ease-in-out"
          >
            {isLoading && (
              <div
                className="spinner-border animate-spin tw-inline-block tw-w-4 tw-h-4 tw-border-2 tw-rounded-full tw-mr-2"
                role="status"
              >
                <span className="tw-visually-hidden">Loading...</span>
              </div>
            )}
            Simpan
          </button>
        </div>
      </div>
      {/* </div> */}
      <ModalCari
        hasMatchId={hasMatchId}
        token={dataSession.data?.token}
        addToList={addToList}
        deleteList={deleteList}
        detailPembelian={formik.values.detailPembelian}
      />
    </>
  );
};

export default Pembelian;
