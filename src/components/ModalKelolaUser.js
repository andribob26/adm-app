import React, { useEffect, useState } from 'react'
import * as Yup from 'yup'
import 'yup-phone-lite'
import { useFormik } from 'formik'
import isObjEqual from '../utils/isObjEqual'
import { useDispatch, useSelector } from 'react-redux'
import {
  editUser,
  getUserById,
  getAllUser,
  resetResUser,
  changePass
} from '../store/slices/userSlice'

const ModalKelolaUser = ({ valAksi, setValAksi, token }) => {
  const [isEdit, setIsEdit] = useState(true)
  const dispatch = useDispatch()
  const resUser = useSelector(state => state.userSlice.resUser)

  const formikUbahData = useFormik({
    initialValues: {
      username: '',
      name: '',
      telephone: '',
      email: ''
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username tidak boleh kosong'),
      name: Yup.string().required('Nama tidak boleh kosong'),
      telephone: Yup.string()
        .phone('ID', 'Harus berupa nomor yang valid')
        .required('Telephone tidak boleh kosong'),
      email: Yup.string()
        .email('Harus berupa emai yang valid')
        .required('Email tidak boleh kosong')
    }),
    onSubmit: values => {
      dispatch(editUser({ id: valAksi.id, data: values, token: token }))
    }
  })

  const formikUbahPass = useFormik({
    initialValues: {
      password: '',
      newPassword: '',
      cmprNewPass: ''
    },
    validationSchema: Yup.object({
      password: Yup.string().required('Password lama tidak boleh kosong'),
      newPassword: Yup.string().required('Password baru tidak boleh kosong'),
      cmprNewPass: Yup.string().required(
        'Confirm password baru tidak boleh kosong'
      )
    }),
    onSubmit: values => {
      dispatch(changePass({ id: valAksi.id, data: values, token: token }))
    }
  })

  useEffect(() => {
    setIsEdit(
      isObjEqual(
        {
          username: valAksi.username,
          name: valAksi.name,
          telephone: valAksi.telephone,
          email: valAksi.email
        },
        formikUbahData.values
      )
    )
  }, [formikUbahData.values])

  useEffect(() => {
    if (resUser.success) {
      const modal = window.Modal.getInstance(
        document.querySelector('#kelola-user')
      )
      if (resUser.type === 'edit-user') {
        modal.hide()
        dispatch(getUserById({ id: valAksi.id, token: token }))
        dispatch(getAllUser({ token: token }))
        dispatch(resetResUser())
      }
      if (resUser.type === 'change-pass') {
        modal.hide()
        formikUbahPass.resetForm()
        dispatch(getUserById({ id: valAksi.id, token: token }))
        dispatch(getAllUser({ token: token }))
        dispatch(resetResUser())
      }
    }
  }, [resUser.success])

  useEffect(() => {
    formikUbahData.setValues(values => ({
      ...values,
      username: valAksi.username,
      name: valAksi.name,
      telephone: valAksi.telephone,
      email: valAksi.email
    }))
  }, [valAksi])

  return (
    <React.Fragment>
      <div
        className='modal fade tw-fixed tw-top-0 tw-left-0 tw-hidden tw-w-full tw-h-full tw-outline-none tw-overflow-x-hidden tw-overflow-y-auto'
        id='kelola-user'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabIndex='-1'
        aria-labelledby='detail'
        aria-hidden='true'
      >
        <div className='modal-dialog tw-modal-lg modal-dialog-scrollable tw-modal-dialog-scrollable tw-relative tw-w-auto tw-pointer-events-none'>
          <div className='modal-content tw-border-none tw-shadow-lg tw-relative tw-flex tw-flex-col tw-w-full tw-pointer-events-auto tw-bg-white tw-bg-clip-padding tw-rounded tw-outline-none tw-text-current'>
            <div className='modal-header tw-flex tw-flex-shrink-0 tw-items-center tw-justify-between tw-py-2 tw-px-6 tw-border-b tw-border-gray-200 tw-rounded-t'>
              <h5
                className='tw-text-base tw-font-bold tw-leading-normal tw-text-gray-800'
                id='exampleModalLabel'
              >
                Kelola akun
              </h5>
              <button
                onClick={() => {
                  setTimeout(() => {
                    formikUbahData.resetForm()
                    formikUbahPass.resetForm()
                  }, 150)
                }}
                type='button'
                className='tw-btn-close tw-box-content tw-w-4 tw-h-4 tw-p-1 tw-text-black tw-border-none tw-rounded-none tw-opacity-50 focus:tw-shadow-none focus:tw-outline-none focus:tw-opacity-100 hover:tw-text-black hover:tw-opacity-75 hover:tw-no-underline'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='tw-border-b tw-mt-1 tw-px-6'>
              <ul
                className='nav nav-tabs tw-flex tw-flex-row tw-flex-wrap tw-list-none tw-border-b-0 tw-pl-0'
                id='tabs-tab'
                role='tablist'
              >
                <li className='nav-item' role='presentation'>
                  <a
                    href='#tabs-ubah-data'
                    className='nav-link tw-block tw-font-bold tw-text-xs tw-leading-tight tw-border-x-0 tw-border-t-0 tw-border-transparent tw-px-3 tw-py-2 tw-my-0 hover:tw-border-transparent hover:tw-bg-gray-100 focus:tw-border-transparent active'
                    id='tabs-ubah-data-tab'
                    data-bs-toggle='pill'
                    data-bs-target='#tabs-ubah-data'
                    role='tab'
                    aria-controls='tabs-ubah-data'
                    aria-selected='true'
                  >
                    Ubah Data
                  </a>
                </li>
                <li className='nav-item' role='presentation'>
                  <a
                    href='#tabs-ubah-pass'
                    className='nav-link tw-block tw-font-bold tw-text-xs tw-leading-tight tw-border-x-0 tw-border-t-0 tw-border-transparent tw-px-3 tw-py-2 tw-my-0 hover:tw-border-transparent hover:tw-bg-gray-100 focus:tw-border-transparent'
                    id='tabs-ubah-pass-tab'
                    data-bs-toggle='pill'
                    data-bs-target='#tabs-ubah-pass'
                    role='tab'
                    aria-controls='tabs-ubah-pass'
                    aria-selected='false'
                  >
                    Ubah Password
                  </a>
                </li>
              </ul>
            </div>
            <div className='modal-body tw-relative tw-py-2 tw-px-6'>
              {/* //content */}
              <form>
                <div className='tab-content' id='tabs-tabContent'>
                  <div
                    className='tab-pane fade show active'
                    id='tabs-ubah-data'
                    role='tabpanel'
                    aria-labelledby='tabs-ubah-data-tab'
                  >
                    <div className='form-group mb-2'>
                      <label
                        htmlFor='exampleInputEmail2'
                        className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                      >
                        Username
                      </label>
                      <div className='tw-relative'>
                        <input
                          onChange={formikUbahData.handleChange}
                          value={formikUbahData.values.username}
                          type='text'
                          className='tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none'
                          id='username'
                          placeholder='Username'
                        />
                        {formikUbahData.touched.username &&
                          formikUbahData.errors.username && (
                            <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                              {formikUbahData.errors.username}
                            </p>
                          )}
                      </div>
                    </div>
                    <div className='form-group mb-2'>
                      <label
                        htmlFor='exampleInputEmail2'
                        className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                      >
                        Nama
                      </label>
                      <div className='tw-relative'>
                        <input
                          onChange={formikUbahData.handleChange}
                          value={formikUbahData.values.name}
                          type='text'
                          className='tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none'
                          id='name'
                          placeholder='Nama'
                        />
                        {formikUbahData.touched.name &&
                          formikUbahData.errors.name && (
                            <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                              {formikUbahData.errors.name}
                            </p>
                          )}
                      </div>
                    </div>

                    <div className='form-group mb-2'>
                      <label
                        htmlFor='exampleInputEmail2'
                        className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                      >
                        Telephone
                      </label>
                      <div className='tw-relative'>
                        <input
                          onChange={formikUbahData.handleChange}
                          value={formikUbahData.values.telephone}
                          type='text'
                          className='tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none'
                          id='telephone'
                          placeholder='Telephone'
                        />
                        {formikUbahData.touched.telephone &&
                          formikUbahData.errors.telephone && (
                            <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                              {formikUbahData.errors.telephone}
                            </p>
                          )}
                      </div>
                    </div>
                    <div className='form-group mb-2'>
                      <label
                        htmlFor='exampleInputEmail2'
                        className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                      >
                        Email
                      </label>
                      <div className='tw-relative'>
                        <input
                          onChange={formikUbahData.handleChange}
                          value={formikUbahData.values.email}
                          type='text'
                          className='tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none'
                          id='email'
                          placeholder='Email'
                        />
                        {formikUbahData.touched.email &&
                          formikUbahData.errors.email && (
                            <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                              {formikUbahData.errors.email}
                            </p>
                          )}
                      </div>
                    </div>
                    <div className='tw-mt-4 tw-flex tw-justify-end'>
                      <button
                        onClick={formikUbahData.handleSubmit}
                        type='button'
                        disabled={isEdit}
                        className={`${isEdit &&
                          'tw-cursor-not-allowed tw-opacity-50'} hover:tw-bg-sky-700 tw-flex tw-items-center tw-px-6 tw-py-2 tw-bg-sky-600 tw-text-white tw-font-bold tw-text-xs tw-rounded tw-duration-150 tw-ease-in-out`}
                      >
                        {resUser.isLoading && (
                          <div
                            className='spinner-border animate-spin tw-inline-block tw-w-4 tw-h-4 tw-border-2 tw-rounded-full tw-mr-2'
                            role='status'
                          >
                            <span className='tw-visually-hidden'>
                              Loading...
                            </span>
                          </div>
                        )}
                        Simpan
                      </button>
                    </div>
                  </div>
                  <div
                    className='tab-pane fade'
                    id='tabs-ubah-pass'
                    role='tabpanel'
                    aria-labelledby='tabs-ubah-pass-tab'
                  >
                    <div className='form-group mb-2'>
                      <label
                        htmlFor='exampleInputEmail2'
                        className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                      >
                        Password Lama
                      </label>
                      <div className='tw-relative'>
                        <input
                          onChange={formikUbahPass.handleChange}
                          value={formikUbahPass.values.password}
                          type='password'
                          className='tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none'
                          id='password'
                          placeholder='Password lama'
                        />
                        {formikUbahPass.touched.password &&
                          formikUbahPass.errors.password && (
                            <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                              {formikUbahPass.errors.password}
                            </p>
                          )}
                      </div>
                    </div>
                    <div className='form-group mb-2'>
                      <label
                        htmlFor='exampleInputEmail2'
                        className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                      >
                        Password Baru
                      </label>
                      <div className='tw-relative'>
                        <input
                          onChange={formikUbahPass.handleChange}
                          value={formikUbahPass.values.newPassword}
                          type='password'
                          className='tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none'
                          id='newPassword'
                          placeholder='Password Baru'
                        />
                        {formikUbahPass.touched.newPassword &&
                          formikUbahPass.errors.newPassword && (
                            <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                              {formikUbahPass.errors.newPassword}
                            </p>
                          )}
                      </div>
                    </div>
                    <div className='form-group mb-2'>
                      <label
                        htmlFor='exampleInputEmail2'
                        className='tw-form-label tw-text-sm tw-font-bold tw-inline-block tw-mb-2 tw-text-gray-700'
                      >
                        Confirm Password Baru
                      </label>
                      <div className='tw-relative'>
                        <input
                          onChange={formikUbahPass.handleChange}
                          value={formikUbahPass.values.cmprNewPass}
                          type='password'
                          className='tw-form-control tw-block tw-w-full tw-px-3 tw-py-2 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none'
                          id='cmprNewPass'
                          placeholder='Confirm Password lama'
                        />
                        {formikUbahPass.touched.cmprNewPass &&
                          formikUbahPass.errors.cmprNewPass && (
                            <p className='tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs'>
                              {formikUbahPass.errors.cmprNewPass}
                            </p>
                          )}
                      </div>
                    </div>
                    <div className='tw-mt-4 tw-flex tw-justify-end'>
                      <button
                        onClick={formikUbahPass.handleSubmit}
                        type='button'
                        className='hover:tw-bg-sky-700 tw-flex tw-items-center tw-px-6 tw-py-2 tw-bg-sky-600 tw-text-white tw-font-bold tw-text-xs tw-rounded tw-duration-150 tw-ease-in-out'
                      >
                        {resUser.isLoading && (
                          <div
                            className='spinner-border animate-spin tw-inline-block tw-w-4 tw-h-4 tw-border-2 tw-rounded-full tw-mr-2'
                            role='status'
                          >
                            <span className='tw-visually-hidden'>
                              Loading...
                            </span>
                          </div>
                        )}
                        Simpan
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className='modal-footer tw-flex tw-flex-shrink-0 tw-flex-wrap tw-items-center tw-justify-end tw-py-2 tw-px-6 tw-border-t tw-border-gray-200 tw-rounded-b-md'></div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ModalKelolaUser
