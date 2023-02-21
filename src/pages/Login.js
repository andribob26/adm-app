import React, { useEffect, useState } from "react";
import { MdRemoveRedEye, MdPerson, MdVpnKey } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { resetDataLogin, logIn, getSession } from "../store/slices/authSlice";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [isShowPass, setIsShowPass] = useState(false);
  const dataLogin = useSelector((state) => state.authSlice.dataLogin);
  const dataSession = useSelector((state) => state.authSlice.dataSession);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username tidak boleh kosong"),
      password: Yup.string().required("Password tidak boleh kosong"),
    }),
    onSubmit: (values) => {
      setIsLoading(true);
      dispatch(logIn(values));
    },
  });

  const showPassword = () => {
    setIsShowPass(!isShowPass);
  };

  useEffect(() => {
    if (dataLogin.success) {
      dispatch(getSession());
    }
  }, [dataLogin.success]);

  useEffect(() => {
    if (!dataLogin.isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [dataLogin.isLoading]);

  useEffect(() => {
    if (dataSession.data?.auth) {
      setIsLoading(false);
      navigate("/", {
        replace: true,
        state: { title: "", subtitle: "", from: location },
      });
    }
  }, [dataSession.data]);

  useEffect(() => {
    return () => {
      dispatch(resetDataLogin());
    };
  }, []);

  // useLayoutEffect(() => {
  //   dispatch(getSession())
  // }, [])

  if (dataSession.data?.auth) {
    return (
      <Navigate
        to="/"
        state={{ title: "", subtitle: "", from: location }}
        replace
      />
    );
  } else {
    return (
      <>
        <div className="tw-flex tw-justify-center tw-h-screen tw-items-center">
          <div className="tw-bg-white tw-w-80 tw-p-6 tw-rounded-lg tw-shadow">
            <div className="tw-bg-white tw-p-3 tw-w-full tw-flex tw-justify-center tw-mb-3 tw-text-gray-700">
              <h1 className="tw-text-4xl tw-font-extrabold">PD. ADM</h1>
            </div>
            <div className="tw-mb-3 tw-form-group">
              <label
                htmlFor="exampleInputEmail2"
                className="tw-form-label tw-text-sm tw-font-medium tw-inline-block tw-mb-2 tw-text-gray-700"
              >
                Username
              </label>
              <div className="tw-relative">
                <input
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  type="text"
                  className="tw-form-control tw-block tw-w-full tw-pl-11 tw-pr-3 tw-py-2 tw-text-sm tw-font-normal tw-text-gray-700  tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0  focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
                  id="username"
                  placeholder="Username"
                />
                {formik.touched.username && formik.errors.username && (
                  <p className="tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs">
                    {formik.errors.username}
                  </p>
                )}
                <div className="tw-absolute tw-left-3 tw-top-[6px] tw-p-1">
                  <MdPerson size={18} />
                </div>
              </div>
            </div>
            <div className="tw-mb-3 tw-form-group">
              <label
                htmlFor="exampleInputEmail2"
                className="tw-form-label tw-text-sm tw-font-medium tw-inline-block tw-mb-2 tw-text-gray-700"
              >
                Password
              </label>
              <div className="tw-relative">
                <input
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  type={`${isShowPass ? "text" : "password"}`}
                  className={`tw-form-control tw-block tw-w-full tw-pl-11 tw-pr-3 tw-py-2 tw-text-sm tw-font-normal tw-text-gray-700  tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0  focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none`}
                  id="password"
                  placeholder="Password"
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="tw-absolute tw-text-red-500 -tw-top-4 tw-right-0 tw-m-0 tw-text-xs">
                    {formik.errors.password}
                  </p>
                )}
                <div className="tw-absolute tw-left-3 tw-top-[6px] tw-p-1">
                  <MdVpnKey size={18} />
                </div>
                <button
                  onClick={showPassword}
                  className={`${
                    isShowPass ? "tw-opacity-50" : "tw-opacity-100"
                  } tw-absolute tw-right-3 tw-top-[6px] hover:tw-bg-gray-200 tw-p-1 tw-rounded-full tw-transition tw-duration-300 tw-ease-in-out`}
                >
                  <MdRemoveRedEye size={18} />
                </button>
              </div>
            </div>
            <div className="tw-mt-8 tw-mb-3">
              <button
                onClick={formik.handleSubmit}
                type="button"
                className="hover:tw-bg-sky-700 tw-flex tw-items-center tw-justify-center tw-w-full tw-px-3 tw-py-2 tw-bg-sky-600 tw-text-white tw-font-bold tw-text-base tw-rounded tw-duration-300 tw-ease-in-out"
              >
                {isLoading && (
                  <div
                    className="spinner-border animate-spin tw-inline-block tw-w-5 tw-h-5 tw-border-2 tw-rounded-full tw-mr-2"
                    role="status"
                  >
                    <span className="tw-visually-hidden">Loading...</span>
                  </div>
                )}
                Login
              </button>
            </div>
          </div>
          <ToastContainer
            autoClose={5000}
            collapseDuration={300}
            draggable={false}
            hideProgressBar={true}
            theme={"colored"}
          />
        </div>
      </>
    );
  }
};

export default Login;
