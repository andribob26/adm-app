import { useState, useRef, useEffect } from "react";
import { Outlet, useLocation, Navigate, useNavigate } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import Header from "./Header";
import Sidenav from "./SideNav";
import { useDispatch, useSelector } from "react-redux";
import { resetDataLogout, getSession, logOut } from "../store/slices/authSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalKelolaUser from "../components/ModalKelolaUser";
let refreshInterval;

const Layout = () => {
  const dispatch = useDispatch();
  const dataSession = useSelector((state) => state.authSlice.dataSession);
  const dataLogout = useSelector((state) => state.authSlice.dataLogout);
  const dataRefreshToken = useSelector(
    (state) => state.authSlice.dataRefreshToken
  );
  const dataUserById = useSelector((state) => state.userSlice.dataUserById);

  const navigate = useNavigate();
  const location = useLocation();
  const sideNavRef = useRef(null);
  const mainRef = useRef(null);
  const loadingRef = useRef(null);
  const [isOpenNav, setIsOpenNav] = useState(false);
  const [screenMd, setScreenMd] = useState(window.innerWidth);
  const [valAksi, setValAksi] = useState({
    id: "",
    username: "",
    name: "",
    telephone: "",
    email: "",
  });

  const startLoading = () => {
    loadingRef.current.continuousStart();
  };

  const logOutHandler = () => {
    dispatch(logOut());
  };

  const showNavHandler = () => {
    const elSideNav = sideNavRef.current;
    const elMain = mainRef.current;

    setIsOpenNav(!isOpenNav);
    if (screenMd < 768) {
      if (isOpenNav) {
        elSideNav.style.transform = "translate(-240px)";
        elMain.childNodes[2].style.visibility = "hidden";
        elMain.childNodes[2].style.opacity = 0;
      } else {
        elSideNav.style.transform = "translate(0px)";
        elMain.childNodes[2].style.visibility = "visible";
        elMain.childNodes[2].style.opacity = 0.5;
      }
    } else {
      if (!isOpenNav) {
        elSideNav.style.transform = "translate(-240px)";
        elMain.style.marginLeft = "0px";
      } else {
        elSideNav.style.transform = "translate(0px)";
        elMain.style.marginLeft = "240px";
      }
    }
  };

  const showModalUser = () => {
    setValAksi((val) => ({
      ...val,
      id: dataUserById.data.id,
      username: dataUserById.data.username,
      name: dataUserById.data.name,
      telephone: dataUserById.data.telephone,
      email: dataUserById.data.email,
    }));
    const modal = window.Modal.getOrCreateInstance("#kelola-user");
    modal.show();
  };

  useEffect(() => {
    setScreenMd(window.innerWidth);
    window.addEventListener("resize", () => {
      if (sideNavRef.current !== null) {
        setScreenMd(window.innerWidth);
        setIsOpenNav(false);
        sideNavRef.current.style.transform = null;
        mainRef.current.style.marginLeft = null;
      }
    });
  }, []);

  useEffect(() => {
    if (loadingRef.current !== null) {
      loadingRef.current.complete();

      if (screenMd < 768) {
        setIsOpenNav(false);
        sideNavRef.current.style.transform = "translate(-240px)";
        mainRef.current.style.marginLeft = "0px";
        mainRef.current.childNodes[2].style.visibility = "hidden";
        mainRef.current.childNodes[2].style.opacity = 0;
      } else {
        sideNavRef.current.style.transform = "translate(0px)";
        mainRef.current.childNodes[2].style.visibility = "visible";
        mainRef.current.childNodes[2].style.opacity = 0.5;
      }
    }
  }, [location]);

  useEffect(() => {
    if (dataLogout.success) {
      dispatch(getSession());
    }
  }, [dataLogout.success]);

  useEffect(() => {
    if (!dataSession.data?.auth) {
      navigate("/login", {
        replace: true,
        state: { title: "", subtitle: "", from: location },
      });
      localStorage.clear();
      clearInterval(refreshInterval);
    }
  }, [dataSession.data]);

  useEffect(() => {
    return () => {
      dispatch(resetDataLogout());
    };
  }, []);

  useEffect(() => {
    dispatch(getSession());
  }, [dataRefreshToken.data]);

  // if (!location.state) {
  //   return (
  //     <Navigate
  //       to="/"
  //       state={{ title: "", subtitle: "", from: location }}
  //       replace
  //     />
  //   );
  // }

  if (!dataSession.data?.auth) {
    return (
      <Navigate
        to="/login"
        state={{ title: "", subtitle: "", from: location }}
        replace
      />
    );
  }
  return (
    <>
      <LoadingBar color="rgb(14 165 233)" ref={loadingRef} shadow={false} />
      <Sidenav innerRef={sideNavRef} startLoading={startLoading} />
      <div
        ref={mainRef}
        className={`md:tw-ml-60 tw-transition-all tw-duration-500 tw-ease-in-out`}
      >
        <Header
          showNavHandler={showNavHandler}
          isOpenNav={isOpenNav}
          logOutHandler={logOutHandler}
          showModalUser={showModalUser}
        />
        <span
          onClick={showNavHandler}
          className="tw-block md:tw-hidden tw-fixed tw-bg-black tw-w-screen tw-h-full tw-z-10 tw-ransition-all tw-duration-150 tw-ease-in-out"
          style={{ visibility: "hidden", opacity: 0 }}
        ></span>
        <div className="tw-p-3 tw-h-screen tw-overflow-y-auto">
          <div className="tw-mt-14 md:tw-mt-14">
            <Outlet />
            <ToastContainer
              autoClose={5000}
              collapseDuration={300}
              draggable={false}
              hideProgressBar={true}
              theme={"colored"}
            />
          </div>
        </div>
      </div>
      <ModalKelolaUser
        valAksi={valAksi}
        setValAksi={setValAksi}
        token={dataSession.data?.token}
      />
    </>
  );
};

export default Layout;
