import React, { useState, useEffect } from "react";
import CurrencyFormat from "react-currency-format";
import * as Yup from "yup";
import "yup-phone-lite";
import { useFormik } from "formik";
import {
  penyesuaianPengiriman,
  getAllPengiriman,
  resetResPengiriman,
} from "../../store/slices/pengirimanSlice";
import { useDispatch, useSelector } from "react-redux";

const ModalEdit = ({ valAksi, token }) => {
  const [errorHarga, setErrorHarga] = useState(false);
  const dispatch = useDispatch();
  const resPengiriman = useSelector(
    (state) => state.pengirimanSlice.resPengiriman
  );
  const formik = useFormik({
    initialValues: {
      produks: [],
      pembeli: "",
    },
    validationSchema: Yup.object({
      pembeli: Yup.string().required("Pembeli tidak boleh kosong"),
    }),
    onSubmit: (values) => {
      if (values.produks.some((el) => el.harga === 0)) {
        setErrorHarga(true);
      } else {
        setErrorHarga(false);

        dispatch(
          penyesuaianPengiriman({ id: valAksi.id, data: values, token: token })
        );
      }
      // dispatch(editBahanBaku({ id: valAksi.id, data: values, token: token }));
    },
  });

  useEffect(() => {
    formik.setValues((values) => ({
      ...values,
      produks: valAksi?.detailPengiriman,
    }));
  }, [valAksi]);

  useEffect(() => {
    if (resPengiriman.success) {
      if (resPengiriman.type === "edit") {
        const modal = window.Modal.getInstance(document.querySelector("#edit"));
        modal.hide();
        formik.resetForm();
        dispatch(getAllPengiriman({ token: token }));
        dispatch(resetResPengiriman());
      }
    }
  }, [resPengiriman.success]);

  return (
    <React.Fragment>
      <div
        className="modal fade tw-fixed tw-top-0 tw-left-0 tw-hidden tw-w-full tw-h-full tw-outline-none tw-overflow-x-hidden tw-overflow-y-auto"
        id="edit"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="edit"
        aria-hidden="true"
      >
        <div className="modal-dialog tw-modal-lg tw-modal-dialog-scrollable tw-relative tw-w-auto tw-pointer-events-none">
          <div className="modal-content tw-border-none tw-shadow-lg tw-relative tw-flex tw-flex-col tw-w-full tw-pointer-events-auto tw-bg-white tw-bg-clip-padding tw-rounded tw-outline-none tw-text-current">
            <div className="modal-header tw-flex tw-flex-shrink-0 tw-items-center tw-justify-between tw-py-2 tw-px-6 tw-border-b tw-border-gray-200 tw-rounded-t">
              <h5
                className="tw-text-base tw-font-bold tw-leading-normal tw-text-gray-800"
                id="exampleModalLabel"
              >
                Penyesuaian Harga
              </h5>
              <button
                onClick={() => {
                  setTimeout(() => {
                    formik.resetForm();
                    setErrorHarga(false);
                  }, 150);
                }}
                type="button"
                className="tw-btn-close tw-box-content tw-w-4 tw-h-4 tw-p-1 tw-text-black tw-border-none tw-rounded-none tw-opacity-50 focus:tw-shadow-none focus:tw-outline-none focus:tw-opacity-100 hover:tw-text-black hover:tw-opacity-75 hover:tw-no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body tw-relative tw-py-2 tw-px-6">
              {/* //content */}
              <div className="md:tw-flex tw-items-center tw-overflow-x-auto">
                <table className="tw-w-full">
                  <tbody>
                    <tr>
                      <td className="tw-text-sm tw-text-gray-900 tw-font-bold tw-px-6 tw-py-2 tw-whitespace-nowrap tw-w-1/3">
                        Pembeli
                      </td>
                      <td className="tw-text-sm tw-text-gray-900 tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-nowrap tw-w-2/3">
                        <input
                          onChange={formik.handleChange}
                          value={formik.values.pembeli}
                          type="text"
                          className="tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
                          id="pembeli"
                          placeholder="Pembeli"
                        />
                        {formik.touched.pembeli && formik.errors.pembeli && (
                          <p className="tw-absolute tw-text-red-500 tw-top-0 tw-right-[50px] tw-m-0 tw-text-xs">
                            {formik.errors.pembeli}
                          </p>
                        )}
                      </td>
                    </tr>
                    {valAksi.detailPengiriman.map((item, index) => {
                      if (formik.values.produks.length > 0) {
                        return (
                          <tr key={index}>
                            <td className="tw-text-sm tw-text-gray-900 tw-font-bold tw-px-6 tw-py-2 tw-whitespace-nowrap tw-w-1/3">
                              {item.nama}
                            </td>
                            <td className="tw-text-sm tw-text-gray-900 tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-nowrap tw-w-2/3">
                              <CurrencyFormat
                                thousandSeparator={"."}
                                decimalSeparator={","}
                                prefix={"Rp."}
                                onValueChange={(values) => {
                                  if (values.value > 0) {
                                    setErrorHarga(false);
                                    let arrNew = [...formik.values.produks];

                                    arrNew[index] = {
                                      id: item.id,
                                      harga: parseInt(values.value),
                                    };

                                    formik.setValues((val) => ({
                                      ...val,
                                      produks: arrNew,
                                    }));
                                  } else {
                                    setErrorHarga(true);
                                    let arrNew = [...formik.values.produks];
                                    arrNew[index] = {
                                      id: item.id,
                                      harga: 0,
                                    };

                                    formik.setValues((val) => ({
                                      ...val,
                                      produks: arrNew,
                                    }));
                                  }
                                }}
                                value={formik.values.produks[index].harga}
                                className="tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
                                id={`produks${index}.harga`}
                                placeholder="Harga"
                              />
                            </td>
                          </tr>
                        );
                      }
                    })}

                    {/* <tr className="tw-border-b">
                      <td className="tw-text-sm tw-text-gray-900 tw-font-bold tw-px-6 tw-py-2 tw-whitespace-nowrap tw-w-1/3">
                        Total Harga
                      </td>
                      <td className="tw-text-sm tw-text-gray-900 tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-nowrap tw-w-2/3">
                        <CurrencyFormat
                          value={valAksi.totalHarga}
                          displayType={"text"}
                          thousandSeparator={"."}
                          decimalSeparator={","}
                          prefix={"Rp."}
                          suffix={",-"}
                        />
                      </td>
                    </tr> */}
                  </tbody>
                </table>
                {errorHarga && (
                  <p className="tw-absolute tw-text-red-500 tw-top-[54px] tw-right-[50px] tw-m-0 tw-text-xs">
                    Harga tidak boleh kosong
                  </p>
                )}
              </div>
            </div>
            <div className="modal-footer tw-flex tw-flex-shrink-0 tw-flex-wrap tw-items-center tw-justify-end tw-py-2 tw-px-6 tw-border-t tw-border-gray-200 tw-rounded-b-md">
              <button
                onClick={() => {
                  if (formik.values.produks[0].harga < 1) {
                    setErrorHarga(true);
                    formik.handleSubmit();
                  } else {
                    formik.handleSubmit();
                  }
                }}
                type="button"
                className={`hover:tw-bg-sky-700 tw-flex tw-items-center tw-px-6 tw-py-2 tw-bg-sky-600 tw-text-white tw-font-bold tw-text-xs tw-rounded tw-duration-150 tw-ease-in-out`}
              >
                {resPengiriman.isLoading && (
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
        </div>
      </div>
    </React.Fragment>
  );
};

export default ModalEdit;
