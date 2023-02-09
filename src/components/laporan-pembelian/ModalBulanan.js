import React, { useState, useEffect, useRef } from "react";
import { SiMicrosoftexcel } from "react-icons/si";
import moment from "moment";
import * as Yup from "yup";
import "yup-phone-lite";
import { useFormik } from "formik";
import {
  getAllPembelianRange,
  resetDataRange,
} from "../../store/slices/pembelianSlice";
import { useDispatch, useSelector } from "react-redux";
import CurrencyFormat from "react-currency-format";
import { useDownloadExcel } from "react-export-table-to-excel";

const ModalBulanan = ({ token }) => {
  const tableRef = useRef(null);
  const [totBulanan, setTotBulanan] = useState(0);
  const dispatch = useDispatch();
  const dataByRange = useSelector((state) => state.pembelianSlice.dataByRange);
  const formik = useFormik({
    initialValues: {
      start: "",
      end: "",
    },
    validationSchema: Yup.object({
      start: Yup.string().required("tidak boleh kosong"),
      end: Yup.string().required("tidak boleh kosong"),
    }),
    onSubmit: (values) => {
      dispatch(
        getAllPembelianRange({
          start: values.start,
          end: values.end,
          token: token,
        })
      );
    },
  });

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: `Laporan Pembelian ${formik.values.start} sampai ${formik.values.end}`,
    sheet: `${formik.values.start} sampai ${formik.values.end}`,
  });

  useEffect(() => {
    let sum = 0;
    dataByRange.data.forEach((e) => {
      sum += parseInt(e.totalHarga);
    });
    setTotBulanan(sum);
  }, [dataByRange.data]);

  return (
    <React.Fragment>
      <div
        className="modal fade tw-fixed tw-top-0 tw-left-0 tw-hidden tw-w-full tw-h-full tw-outline-none tw-overflow-x-hidden tw-overflow-y-auto"
        id="bulanan"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="detail"
        aria-hidden="true"
      >
        <div className="modal-dialog tw-modal-xl tw-modal-dialog-scrollable tw-relative tw-w-auto tw-pointer-events-none">
          <div className="modal-content tw-border-none tw-shadow-lg tw-relative tw-flex tw-flex-col tw-w-full tw-pointer-events-auto tw-bg-white tw-bg-clip-padding tw-rounded tw-outline-none tw-text-current">
            <div className="modal-header tw-flex tw-flex-shrink-0 tw-items-center tw-justify-between tw-py-2 tw-px-6 tw-border-b tw-border-gray-200 tw-rounded-t">
              <h5
                className="tw-text-base tw-font-bold tw-leading-normal tw-text-gray-800"
                id="exampleModalLabel"
              >
                Laporan Bulanan
              </h5>
              <button
                onClick={() => {
                  setTimeout(() => {
                    formik.resetForm();
                  }, 150);
                  dispatch(resetDataRange());
                }}
                type="button"
                className="tw-btn-close tw-box-content tw-w-4 tw-h-4 tw-p-1 tw-text-black tw-border-none tw-rounded-none tw-opacity-50 focus:tw-shadow-none focus:tw-outline-none focus:tw-opacity-100 hover:tw-text-black hover:tw-opacity-75 hover:tw-no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body tw-relative tw-py-2 tw-px-6">
              {/* //content */}
              <div className="tw-flex tw-flex-col lg:tw-flex-row lg:tw-items-center tw-mb-2 tw-gap-2 tw-justify-between">
                <div className="tw-relative tw-flex tw-flex-col lg:tw-flex-row lg:tw-items-center tw-gap-2">
                  <div className="tw-relative">
                    <input
                      onChange={formik.handleChange}
                      value={formik.values.start}
                      id="start"
                      type="month"
                      className="tw-form-control tw-block tw-w-full tw-px-2 tw-py-1 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
                      placeholder="Awal"
                    />
                  </div>
                  <div className="tw-relative">
                    <input
                      onChange={formik.handleChange}
                      value={formik.values.end}
                      id="end"
                      type="month"
                      className="tw-form-control tw-block tw-w-full tw-px-2 tw-py-1 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
                      placeholder="Akhir"
                    />
                  </div>
                  <button
                    onClick={formik.handleSubmit}
                    type="button"
                    className="tw-w-full tw-justify-center hover:tw-bg-sky-700 tw-flex tw-items-center tw-px-6 tw-py-2 tw-bg-sky-600 tw-text-white tw-font-bold tw-text-xs tw-rounded tw-duration-150 tw-ease-in-out"
                  >
                    {dataByRange.isLoading ? (
                      <div
                        className="spinner-border animate-spin tw-inline-block tw-w-4 tw-h-4 tw-border-2 tw-rounded-full tw-mr-2"
                        role="status"
                      >
                        <span className="tw-visually-hidden">Loading...</span>
                      </div>
                    ) : (
                      <p>Cari</p>
                    )}
                  </button>
                </div>
                <button
                  onClick={onDownload}
                  type="button"
                  className="tw-flex tw-items-center tw-justify-center hover:tw-bg-green-600 tw-px-3 tw-py-2 tw-bg-green-500 hover:tw-shadow-md tw-text-white tw-font-bold tw-text-xs tw-rounded tw-duration-300 tw-ease-in-out"
                >
                  <SiMicrosoftexcel size={16} />
                  <span className="tw-ml-1">Export</span>
                </button>
              </div>
              <div className="tw-overflow-x-auto">
                <table ref={tableRef} className="tw-w-full tw-relative">
                  <thead className="tw-bg-white tw-border-b-2">
                    <tr>
                      <th
                        scope="tw-col"
                        className="tw-border tw-text-xs tw-font-bold tw-px-6 tw-py-2 tw-text-left"
                      >
                        No
                      </th>
                      <th
                        scope="tw-col"
                        className="tw-border tw-text-xs tw-font-bold tw-px-6 tw-py-2 tw-text-left"
                      >
                        No Nota
                      </th>
                      <th
                        scope="tw-col"
                        className="tw-border tw-text-xs tw-font-bold tw-px-6 tw-py-2 tw-text-left"
                      >
                        Pemasok
                      </th>
                      <th
                        scope="tw-col"
                        className="tw-border tw-text-xs tw-font-bold tw-px-6 tw-py-2 tw-text-left"
                      >
                        Alamat
                      </th>
                      <th
                        scope="tw-col"
                        className="tw-border tw-text-xs tw-font-bold tw-px-6 tw-py-2 tw-text-left"
                      >
                        Total Harga
                      </th>
                      <th
                        scope="tw-col"
                        className="tw-border tw-text-xs tw-font-bold tw-px-6 tw-py-2 tw-text-left"
                      >
                        Tanggal
                      </th>
                    </tr>
                  </thead>
                  <tbody className="tw-bg-white tw-border-b-2">
                    {dataByRange.data.length > 0 ? (
                      dataByRange.data.map((item, i) => {
                        return (
                          <tr key={i}>
                            <td className="tw-border tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12">
                              {i + 1}
                            </td>
                            <td className="tw-border tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12">
                              {item.no}
                            </td>
                            <td className="tw-border tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12">
                              {item.pemasok}
                            </td>
                            <td className="tw-border tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12">
                              {item.alamat}
                            </td>
                            <td className="tw-border tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12 tw-text-right">
                              <CurrencyFormat
                                value={item.totalHarga}
                                displayType={"text"}
                                thousandSeparator={"."}
                                decimalSeparator={","}
                                prefix={"Rp."}
                                suffix={",-"}
                              />
                            </td>
                            <td className="tw-border tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12 tw-text-right">
                              {moment(item.createdAt).format("M/DD/YYYY")}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr className="tw-border-b hover:tw-bg-sky-100">
                        <td
                          colSpan={9}
                          className="tw-border tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12"
                        >
                          Tidak ada data
                        </td>
                      </tr>
                    )}
                    {dataByRange.data.length > 0 && (
                      <tr className="tw-border hover:tw-bg-sky-100">
                        <td className="tw-border tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12"></td>
                        <td className="tw-border tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12"></td>
                        <td className="tw-border tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12"></td>
                        <th className="tw-border tw-text-xs tw-font-bold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12">
                          Total Harga Bulanan
                        </th>
                        <td className="tw-border tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12 tw-text-right">
                          <CurrencyFormat
                            value={totBulanan}
                            displayType={"text"}
                            thousandSeparator={"."}
                            decimalSeparator={","}
                            prefix={"Rp."}
                            suffix={",-"}
                          />
                        </td>
                        <td className="tw-border tw-text-xs tw-font-bold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12"></td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="modal-footer tw-flex tw-flex-shrink-0 tw-flex-wrap tw-items-center tw-justify-end tw-py-2 tw-px-6 tw-border-t tw-border-gray-200 tw-rounded-b-md"></div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ModalBulanan;
