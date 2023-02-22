import React, { useState, useLayoutEffect, useEffect } from "react";
import ModalCari from "../components/pengiriman/ModalCari";
import { useDispatch, useSelector } from "react-redux";
import CurrencyFormat from "react-currency-format";
import { MdDelete } from "react-icons/md";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import {
  getAllPengiriman,
  addPengiriman,
  resetResPengiriman,
} from "../store/slices/pengirimanSlice";

const Pengiriman = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [kodeU, setKodeU] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataSession = useSelector((state) => state.authSlice.dataSession);
  const dataPengiriman = useSelector(
    (state) => state.pengirimanSlice.dataPengiriman
  );
  const resPengiriman = useSelector(
    (state) => state.pengirimanSlice.resPengiriman
  );

  const formik = useFormik({
    initialValues: {
      no: "",
      detailPengiriman: [],
      totalHarga: 0,
      noPolisi: "",
      nama: dataSession.data.nama,
    },
    validationSchema: Yup.object({
      detailPengiriman: Yup.array().min(1, "Barang tidak boleh kosong"),
      totalHarga: Yup.number().required("Total tidak boleh kosong"),
      noPolisi: Yup.string().required("No Polisi tidak boleh kosong"),
    }),
    onSubmit: (values) => {
      setIsLoading(true);
      dispatch(addPengiriman({ data: values, token: dataSession.data?.token }));
    },
  });

  const addToList = (item) => {
    if (hasMatchId(formik.values.detailPengiriman, item.id)) {
      const i = formik.values.detailPengiriman.findIndex((itm) => {
        return itm.id === item.id;
      });
      let newArr = [...formik.values.detailPengiriman];
      newArr[i].qty = newArr[i].qty + 0;
      newArr[i].harga = 0;
      newArr[i].subTotal = newArr[i].qty * 0;

      formik.setValues((val) => ({
        ...val,
        detailPengiriman: newArr,
      }));
    } else {
      formik.setValues((val) => ({
        ...val,
        detailPengiriman: val.detailPengiriman.concat({
          ...item,
          karung: 0,
          qty: 0,
          harga: 0,
          subTotal: 0,
        }),
      }));
    }
  };

  const deleteList = (item, status) => {
    const i = formik.values.detailPengiriman.findIndex((itm) => {
      return itm.id === item.id;
    });
    if (status === "all") {
      formik.setValues((val) => ({
        ...val,
        detailPengiriman: [
          ...val.detailPengiriman.slice(0, i),
          ...val.detailPengiriman.slice(i + 1, val.detailPengiriman.length),
        ],
      }));
    } else {
      if (hasMatchId(formik.values.detailPengiriman, item.id)) {
        let newArr = [...formik.values.detailPengiriman];
        newArr[i].qty = newArr[i].qty - 1;
        newArr[i].subTotal = newArr[i].qty * item.harga;

        formik.setValues((val) => ({
          ...val,
          detailPengiriman: newArr,
        }));

        if (formik.values.detailPengiriman[i].qty < 1) {
          formik.setValues((val) => ({
            ...val,
            detailPengiriman: [
              ...val.detailPengiriman.slice(0, i),
              ...val.detailPengiriman.slice(i + 1, val.detailPengiriman.length),
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
      case "produk":
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
    { title: "karung" },
    { title: "kg" },
    { title: "Aksi" },
  ];

  useEffect(() => {
    let sum = 0;
    formik.values.detailPengiriman.forEach((e) => {
      sum += parseInt(e.subTotal);
    });
    formik.setValues((val) => ({
      ...val,
      totalHarga: sum,
    }));
  }, [formik.values.detailPengiriman]);

  useEffect(() => {
    if (resPengiriman.success) {
      dispatch(resetResPengiriman());
      setIsLoading(false);
      navigate("/laporan-pengiriman", { replace: true });
    }
  }, [resPengiriman.success]);

  useLayoutEffect(() => {
    dispatch(getAllPengiriman({ token: dataSession.data?.token }));
  }, []);

  useEffect(() => {
    const newString = parseInt(dataPengiriman.totalData) + 1;
    const ans = ("0000" + newString).slice(-4);
    setKodeU(ans);

    formik.setValues((val) => ({
      ...val,
      no: `${new Date().getFullYear()}/SJ/${kodeU}`,
    }));
  }, [dataPengiriman]);

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
                showModalHandler("produk");
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
              {formik.values.detailPengiriman.length > 0 ? (
                formik.values.detailPengiriman.map((item, i) => (
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
                        onValueChange={(values) => {
                          let newArr = [...formik.values.detailPengiriman];
                          if (values.value > 0) {
                            if (
                              parseInt(values.value * 50) >
                              formik.values.detailPengiriman[i].stok
                            ) {
                              newArr[i].qty = parseInt(
                                Math.floor(
                                  formik.values.detailPengiriman[i].stok / 50
                                ) * 50
                              );
                              newArr[i].karung = parseInt(
                                Math.floor(
                                  formik.values.detailPengiriman[i].stok / 50
                                )
                              );
                              formik.setValues((val) => ({
                                ...val,
                                detailPengiriman: newArr,
                              }));
                            } else {
                              newArr[i].qty = parseInt(values.value * 50);
                              newArr[i].karung = parseInt(values.value);
                              formik.setValues((val) => ({
                                ...val,
                                detailPengiriman: newArr,
                              }));
                            }
                          } else {
                            let newArr = [...formik.values.detailPengiriman];
                            newArr[i].qty = 0;
                            newArr[i].karung = 0;

                            formik.setValues((val) => ({
                              ...val,
                              detailPengiriman: newArr,
                            }));
                          }
                        }}
                        value={item.karung}
                        id="karung"
                        placeholder="Karung"
                        className="tw-text-right tw-block tw-w-20 tw-px-2 tw-py-1 tw-text-xs tw-font-semibold  tw-text-gray-700 tw-bg-transparent tw-bg-clip-padding tw-border-b-2 tw-border-dotted tw-border-gray-700 tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-transparent focus:tw-border-sky-600 focus:tw-outline-none"
                      />
                    </td>
                    <td className="tw-border tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12 tw-text-right">
                      <CurrencyFormat
                        value={item.qty}
                        displayType={"text"}
                        thousandSeparator={"."}
                        decimalSeparator={","}
                        id="qty"
                        placeholder="Qty"
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
                    {formik.touched.detailPengiriman &&
                    formik.errors.detailPengiriman ? (
                      <p className="tw-text-red-500 tw-text-xs">
                        {formik.errors.detailPengiriman}
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
              No Polisi
            </label>
            <div className="tw-relative">
              <input
                onChange={formik.handleChange}
                value={formik.values.noPolisi.toUpperCase()}
                type="text"
                className="tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
                id="noPolisi"
                placeholder="No Polisi"
              />
              {formik.touched.noPolisi && formik.errors.noPolisi && (
                <p className="tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs">
                  {formik.errors.noPolisi}
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
                class="tw-inline-block tw-h-4 tw-w-4 tw-animate-spin tw-rounded-full tw-border-[3px] tw-border-solid tw-border-current tw-border-r-transparent tw-align-[-0.125em] tw-motion-reduce:animate-[spin_1.5s_linear_infinite] tw-mr-2"
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
      {/* </div> */}
      <ModalCari
        hasMatchId={hasMatchId}
        token={dataSession.data?.token}
        addToList={addToList}
        deleteList={deleteList}
        detailPengiriman={formik.values.detailPengiriman}
      />
    </>
  );
};

export default Pengiriman;
