import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import "yup-phone-lite";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import isObjEqual from "../../utils/isObjEqual";
import {
  // editKategori,
  editBahanBaku,
  getAllBahanBaku,
  resetResBahanBaku,
} from "../../store/slices/bahanBakuSlice";
import CurrencyFormat from "react-currency-format";

const ModalEdit = ({ valAksi, token }) => {
  const [isEdit, setIsEdit] = useState(true);
  const dispatch = useDispatch();
  const resBahanBaku = useSelector(
    (state) => state.bahanBakuSlice.resBahanBaku
  );
  const formik = useFormik({
    initialValues: {
      nama: "",
      stok: "",
    },
    validationSchema: Yup.object({
      nama: Yup.string().required("Nama tidak boleh kosong"),
    }),
    onSubmit: (values) => {
      dispatch(editBahanBaku({ id: valAksi.id, data: values, token: token }));
    },
  });

  useEffect(() => {
    if (resBahanBaku.success) {
      if (resBahanBaku.type === "edit") {
        const modal = window.Modal.getInstance(document.querySelector("#edit"));
        modal.hide();
        formik.resetForm();
        dispatch(getAllBahanBaku({ token: token }));
        dispatch(resetResBahanBaku());
      }
    }
  }, [resBahanBaku.success]);

  useEffect(() => {
    setIsEdit(
      isObjEqual({ nama: valAksi?.nama, stok: valAksi?.stok }, formik.values)
    );
  }, [formik.values]);

  useEffect(() => {
    formik.setValues((values) => ({
      ...values,
      nama: valAksi?.nama,
      stok: valAksi?.stok,
    }));
  }, [valAksi]);

  return (
    <React.Fragment>
      <div
        className="modal fade tw-fixed tw-top-0 tw-left-0 tw-hidden tw-w-full tw-h-full tw-outline-none tw-overflow-x-hidden tw-overflow-y-auto"
        id="edit"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="detail"
        aria-hidden="true"
      >
        <div className="modal-dialog tw-modal-lg modal-dialog-scrollable tw-relative tw-w-auto tw-pointer-events-none">
          <div className="modal-content tw-border-none tw-shadow-lg tw-relative tw-flex tw-flex-col tw-w-full tw-pointer-events-auto tw-bg-white tw-bg-clip-padding tw-rounded tw-outline-none tw-text-current">
            <div className="modal-header tw-flex tw-flex-shrink-0 tw-items-center tw-justify-between tw-py-2 tw-px-6 tw-border-b tw-border-gray-200 tw-rounded-t">
              <h5
                className="tw-text-base tw-font-bold tw-leading-normal tw-text-gray-800"
                id="exampleModalLabel"
              >
                Edit Data Bahan Baku
              </h5>
              <button
                onClick={() => {
                  setTimeout(() => {
                    formik.resetForm();
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
              <form>
                <div className="form-group mb-2">
                  <label
                    htmlFor="exampleInputEmail2"
                    className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700"
                  >
                    Nama
                  </label>
                  <div className="tw-relative">
                    <input
                      onChange={formik.handleChange}
                      value={formik.values.nama}
                      type="text"
                      className="tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
                      id="nama"
                      placeholder="Nama"
                    />
                    {formik.touched.nama && formik.errors.nama && (
                      <p className="tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs">
                        {formik.errors.nama}
                      </p>
                    )}
                  </div>
                </div>
                <div className="form-group mb-2">
                  <label
                    htmlFor="exampleInputEmail2"
                    className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700"
                  >
                    Stok
                  </label>
                  <div className="tw-relative">
                    <CurrencyFormat
                      thousandSeparator={"."}
                      decimalSeparator={","}
                      onValueChange={(values) => {
                        if (values.value) {
                          formik.setValues((val) => ({
                            ...val,
                            stok: parseInt(values.value),
                          }));
                        } else {
                          formik.setValues((val) => ({
                            ...val,
                            stok: 0,
                          }));
                        }
                      }}
                      value={formik.values.stok}
                      className="tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
                      id="stok"
                      placeholder="Kg"
                    />
                    {formik.touched.stok && formik.errors.stok && (
                      <p className="tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs">
                        {formik.errors.stok}
                      </p>
                    )}
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer tw-flex tw-flex-shrink-0 tw-flex-wrap tw-items-center tw-justify-end tw-py-2 tw-px-6 tw-border-t tw-border-gray-200 tw-rounded-b-md">
              <button
                onClick={formik.handleSubmit}
                disabled={isEdit}
                type="button"
                className={`${
                  isEdit && "tw-cursor-not-allowed tw-opacity-50"
                }  hover:tw-bg-sky-700 tw-flex tw-items-center tw-px-6 tw-py-2 tw-bg-sky-600 tw-text-white tw-font-bold tw-text-xs tw-rounded tw-duration-150 tw-ease-in-out`}
              >
                {resBahanBaku.isLoading && (
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
        </div>
      </div>
    </React.Fragment>
  );
};

export default ModalEdit;
