import React, { useEffect } from "react";
import * as Yup from "yup";
import "yup-phone-lite";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  getAllUser,
  resetResUser,
} from "../../store/slices/userSlice";

const ModalTambah = ({ token }) => {
  const dispatch = useDispatch();
  const resUser = useSelector((state) => state.userSlice.resUser);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "123456",
      nama: "",
      noHp: "",
      role: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username tidak boleh kosong"),
      nama: Yup.string().required("Nama tidak boleh kosong"),
      noHp: Yup.string()
        .phone("ID", "Harus berupa nomor yang valid")
        .required("Telephone tidak boleh kosong"),
      role: Yup.string().required("Hak akses tidak boleh kosong"),
    }),
    onSubmit: (values) => {
      dispatch(addUser({ data: values, token: token }));
    },
  });

  useEffect(() => {
    if (resUser.success) {
      if (resUser.type === "tambah") {
        const modal = window.Modal.getInstance(
          document.querySelector("#tambah")
        );
        modal.hide();
        formik.resetForm();
        dispatch(getAllUser({ token: token }));
        dispatch(resetResUser());
      }
    }
  }, [resUser.success]);

  return (
    <React.Fragment>
      <div
        className="modal fade tw-fixed tw-top-0 tw-left-0 tw-hidden tw-w-full tw-h-full tw-outline-none tw-overflow-x-hidden tw-overflow-y-auto"
        id="tambah"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="detail"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-scrollable tw-relative tw-w-auto tw-pointer-events-none">
          <div className="modal-content tw-border-none tw-shadow-lg tw-relative tw-flex tw-flex-col tw-w-full tw-pointer-events-auto tw-bg-white tw-bg-clip-padding tw-rounded tw-outline-none tw-text-current">
            <div className="modal-header tw-flex tw-flex-shrink-0 tw-items-center tw-justify-between tw-py-2 tw-px-6 tw-border-b tw-border-gray-200 tw-rounded-t">
              <h5
                className="tw-text-base tw-font-bold tw-leading-normal tw-text-gray-800"
                id="exampleModalLabel"
              >
                Tambah User
              </h5>
              <button
                onClick={formik.resetForm}
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
                    Username
                  </label>
                  <div className="tw-relative">
                    <input
                      onChange={formik.handleChange}
                      value={formik.values.username}
                      type="text"
                      className="tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
                      id="username"
                      placeholder="Username"
                    />
                    {formik.touched.username && formik.errors.username && (
                      <p className="tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs">
                        {formik.errors.username}
                      </p>
                    )}
                  </div>
                </div>
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
                    No Hp
                  </label>
                  <div className="tw-relative">
                    <input
                      onChange={formik.handleChange}
                      value={formik.values.noHp}
                      type="number"
                      className="tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
                      id="noHp"
                      placeholder="Telephone"
                    />
                    {formik.touched.noHp && formik.errors.noHp && (
                      <p className="tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs">
                        {formik.errors.noHp}
                      </p>
                    )}
                  </div>
                </div>
                <div className="form-group mb-2">
                  <label
                    htmlFor="exampleInputEmail2"
                    className="tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700"
                  >
                    Hak Akses
                  </label>
                  <div className="tw-relative">
                    <select
                      onChange={formik.handleChange}
                      defaultValue={formik.values.role}
                      className="tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-blue-600 focus:tw-outline-none"
                      aria-label="Default select example"
                      id="role"
                    >
                      <option value="" disabled>
                        Pilih
                      </option>
                      {/* <option value="Pemilik">Pemilik</option> */}
                      <option value="Sekretaris">Sekretaris</option>
                      <option value="Bag.Pembelian">Bag.Pembelian</option>
                    </select>
                    {formik.touched.role && formik.errors.role && (
                      <p className="tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs">
                        {formik.errors.role}
                      </p>
                    )}
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer tw-flex tw-flex-shrink-0 tw-flex-wrap tw-items-center tw-justify-end tw-py-2 tw-px-6 tw-border-t tw-border-gray-200 tw-rounded-b-md">
              <button
                onClick={formik.handleSubmit}
                type="button"
                className="hover:tw-bg-sky-700 tw-flex tw-items-center tw-px-6 tw-py-2 tw-bg-sky-600 tw-text-white tw-font-bold tw-text-xs tw-rounded tw-duration-150 tw-ease-in-out"
              >
                {resUser.isLoading && (
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

export default ModalTambah;
