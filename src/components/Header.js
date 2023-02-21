import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdOutlineChevronLeft, MdChevronRight, MdLogout } from "react-icons/md";

const Header = ({
  isOpenNav,
  showNavHandler,
  logOutHandler,
  showModalUser,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const dataSession = useSelector((state) => state.authSlice.dataSession);
  // const dataUserById = useSelector((state) => state.userSlice.dataUserById);
  const location = useLocation();
  // const headerTitle = location.pathname.split('/')
  const [headerBar, setHeaderBar] = useState({
    title: "",
    subtitle: "",
  });

  useEffect(() => {
    if (location.state !== null) {
      setHeaderBar((headerBar) => ({
        ...headerBar,
        title:
          location.state.title !== undefined && location.state.title !== ""
            ? location.state.title
            : "Dashboard",
        subtitle:
          location.state.subtitle !== undefined &&
          location.state.subtitle !== ""
            ? location.state.subtitle
            : "",
      }));
    }
  }, [location]);

  return (
    <>
      <nav className="tw-bg-white tw-z-20 tw-fixed tw-left-0 tw-right-0 tw-flex tw-items-center tw-transition-all tw-duration-500 tw-ease-in-out tw-shadow">
        <div className="tw-w-full md:tw-w-60 tw-flex md:tw-flex-none">
          <button
            onClick={showNavHandler}
            type="button"
            className="md:tw-hidden tw-absolute tw-justify-center tw-h-10 tw-w-10 tw-ml-3 tw-left-0 tw-top-[9px] md:tw-top-3 tw-text-gray-700 tw-flex tw-items-center tw-hover:text-gray-500 tw-transition tw-duration-300 tw-ease-in-out"
          >
            <MdOutlineChevronLeft
              size={22}
              className={`${
                !isOpenNav ? "tw--scale-x-100" : "tw-scale-x-100"
              } tw-transition tw-duration-300 tw-ease-in-out`}
            />
          </button>
          <div className="tw-ml-12 md:tw-ml-0 md:tw-w-full tw-flex tw-justify-center">
            <div className="tw-bg-white tw-p-3 tw-text-gray-700">
              <div className="tw-font-extrabold tw-text-lg">PD. ADM</div>
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlSpace="preserve"
                width={121}
                height={30}
                style={{
                  shapeRendering: "geometricPrecision",
                  textRendering: "geometricPrecision",
                  imageRendering: "optimizeQuality",
                  fillRule: "evenodd",
                  clipRule: "evenodd",
                }}
                viewBox="0 0 121 29.88"
              >
                <defs>
                  <style>
                    {".fil0,.fil1{fill:#0284c7}.fil1{fill-rule:nonzero}"}
                  </style>
                </defs>
                <g id="Layer_x0020_1">
                  <g id="_3079842621008">
                    <path
                      className="fil0"
                      d="M31.03 19.03c.09.1-.03.12-.1.19l-.37.38c-.01.01-.01.02-.01.02-.05.07.03.04-.07.05-.09.01-.02.04-.06-.03l-2.31 2.29c-.12.13-.67.7-.78.76-.06.1-.16.17-.24.27l-.13.13c-.05.05-.09.08-.14.1-.06.12-1.1 1.14-1.21 1.25l-2.49 2.47c-.21.21-.41.4-.62.61l-.55.55c-.02.02-.03.03-.04.05-.03.04 0-.02-.04.06 1.12-.01 2.26-.05 3.37-.09l4.17-.11c.44-.01.59.04.75-.12.28-.28.57-.57.87-.86l1.73-1.73c.57-.58 1.15-1.13 1.72-1.71.49-.49 1.28-1.23 1.73-1.71.33-.36.58-.59.85-.86l2.6-2.58-2.9-2.7c-.29-.28-1.03-.91-1.26-1.16l-3.13-2.9c-.18-.17-.47-.4-.64-.57L28.8 8.37c-.14-.12-.3-.27-.42-.39l-.83-.77c-.08-.08-.13-.1-.21-.19-.08-.08-.13-.12-.22-.2-.18-.15-.71-.7-.86-.77l-5.08 5c-.19.19-.4.41-.55.57-.39.37-.77.72-1.15 1.1l-2.27 2.25c-.71.7-1.55 1.53-2.26 2.22-.18.18-.37.34-.56.54-.52.57-1.1 1.08-1.7 1.68-.43.43-.74.74-1.12 1.11l-1.14 1.12c-.39.38-.75.74-1.14 1.11l-.99.99c-.08.08-.09.06-.14.16l9.91-.3 1.05-1.06c.19-.17.35-.33.54-.51l1.6-1.6c.37-.36.69-.66 1.08-1.06l1.61-1.57c.16-.15.38-.4.53-.55.45-.44 1.2-1.13 1.61-1.58.16-.17.42-.43.55-.53l1.64 1.44c.09.07.2.17.28.24l2.21 1.96c.09.08.23.17.26.25zM-.26 29.88c.11-.05.31-.28.4-.38l1.2-1.16c.08-.07.12-.12.19-.2l.4-.39c.86-.83 1.72-1.74 2.58-2.54.24-.23.54-.5.79-.78.32-.38 1.48-1.45 1.97-1.94l1.78-1.76c.06-.05.14-.15.19-.2l6.33-6.23c.27-.27.54-.51.8-.78.64-.66 1.32-1.31 1.98-1.95.12-.12.27-.29.38-.4.54-.53 1.04-.99 1.58-1.54.59-.6 1.04-1.05 1.59-1.57l3.15-3.13c-.07-.11-.82-.79-.97-.92L19.74 0c-.17.07-.94.92-1.17 1.14-.14.13-.26.25-.4.39L16.6 3.08c-.29.28-.51.5-.78.76-.82.8-1.57 1.57-2.37 2.33-.27.25-.5.51-.77.78l-6.27 6.18C5.08 14.4 3.78 15.72 2.49 17c-.51.5-1.01.95-1.58 1.55-.12.12-.11.42-.13.64-.14 1.65-.35 3.34-.49 4.99-.15 1.82-.43 3.94-.55 5.7z"
                    />
                    <path
                      className="fil1"
                      d="m66.72 8.33-7.8 13.23h3l1.3-2.39h5.28l.44 2.39h3.03L69.36 8.33h-2.64zm.53 3.65.84 4.76H64.6l2.65-4.76zM73.44 21.56h2.94l.87-4.6h.97c1.49 0 2.22.46 2.68 2.37l.55 2.23h3.29l-.81-3.07c-.29-1.2-1.14-2.43-2.44-2.61 1.98-.26 3.57-1.54 3.95-3.57.57-2.88-1.4-3.98-4.26-3.98h-5.2l-2.54 13.23zm4.96-10.57h1.25c1.75 0 3.02.18 2.72 1.73-.26 1.27-1.47 1.76-3.36 1.76h-1.29l.68-3.49zM120.25 21.56l.49-2.67h-6.94l2.04-10.56h-2.94l-2.54 13.23zM107.97 21.56l.5-2.67h-6.93l.53-2.76h5.83l.51-2.66h-5.82l.48-2.48h6.74l.51-2.66h-9.68L98.1 21.56zM86.38 17.33c-.35 2.81 1.03 4.5 4.54 4.5 2.51 0 5.33-1.32 5.88-4.11.44-2.21-.7-3.37-2.54-3.92-1.19-.35-2.44-.72-2.99-.95-.59-.24-.74-.54-.63-1.03.11-.7.94-1.2 2.13-1.2 1.42 0 1.99.54 1.79 1.49h2.88c.59-2.76-1.12-4.06-4.24-4.06-2.41 0-4.93 1.29-5.44 4.02-.24 1.25-.09 2.72 2.09 3.42.74.24 2.13.63 2.78.87.99.35 1.3.69 1.15 1.45-.2 1.04-1.26 1.45-2.44 1.45-1.53 0-2.28-.51-2.11-2.08l-2.85.15zM50.71 14.94c.51-2.7 2.26-4.32 4.47-4.32 1.43 0 2.42.66 2.16 1.77h3.05c.63-2.83-1.72-4.34-4.72-4.34-4.23 0-7.24 2.9-7.99 6.89-.79 3.99 1.01 6.89 5.23 6.89 2.37 0 4.73-.86 6-2.33l.97-5.02h-5.61l-.42 2.28h2.72l-.35 1.73c-.62.44-1.39.77-2.81.77-2.2 0-3.23-1.62-2.7-4.32z"
                    />
                  </g>
                </g>
              </svg> */}
            </div>
          </div>
        </div>
        <div className="tw-flex tw-w-full tw-py-3 tw-px-6">
          <div className="tw-hidden md:tw-flex tw-item-center">
            <button
              onClick={showNavHandler}
              type="button"
              className=" tw-text-gray-700 tw-flex tw-justify-center tw-h-10 tw-w-10 tw-items-center hover:tw-text-gray-500 hover:tw-bg-gray-100 tw-rounded-full tw-transition tw-duration-300 tw-ease-in-out"
            >
              <MdOutlineChevronLeft
                size={22}
                className={`${
                  isOpenNav ? "tw--scale-x-100" : "tw-scale-x-100"
                } tw-transition tw-duration-300 tw-ease-in-out`}
              />
            </button>
            <ol className="tw-list-reset tw-flex tw-text-sm tw-font-semibold tw-items-center tw-mx-2">
              <li>
                <h1 className="tw-text-gray-700">
                  {headerBar.title.replace(/-/g, " ")}
                </h1>
              </li>
              {headerBar.subtitle !== "" && (
                <li>
                  <MdChevronRight className="tw-text-gray-700" />
                </li>
              )}
              <li>
                <h1 className="tw-text-gray-500">
                  {headerBar.subtitle.replace(/-/g, " ")}
                </h1>
              </li>
            </ol>
          </div>
          <div className="tw-flex tw-gap-2 tw-items-center tw-ml-auto">
            <div className="tw-ml-2">
              <p className="tw-text-sm tw-font-semibold tw-flex tw-leading-none tw-flex-col">
                {dataSession.data?.role}
              </p>
            </div>
            <button
              onClick={() => {
                setIsLoading(true);
                logOutHandler();
              }}
              type="button"
              className="parent tw-justify-center tw-text-gray-700 tw-flex tw-items-center tw-w-10 tw-h-10 hover:tw-text-gray-500 hover:tw-bg-red-100 tw-rounded-full tw-transition tw-duration-300 tw-ease-in-out"
            >
              {isLoading ? (
                <div
                  className="tw-border-red-500 parent-hover:myHover spinner-border animate-spin tw-inline-block tw-w-5 tw-h-5 tw-border-2 tw-rounded-full"
                  role="status"
                ></div>
              ) : (
                <MdLogout
                  size={22}
                  className="tw-text-gray-700 parent-hover:myHover"
                />
              )}
            </button>

            {/* <ul
              className=" tw-min-w-max tw-w-32 tw-absolute tw-bg-white tw-text-base tw-right-0 tw-py-2 tw-list-none tw-text-left tw-rounded tw-shadow-lg tw-mt-1 tw-m-0 tw-bg-clip-padding tw-border tw-border-solid"
            >
              <li className="hover:tw-bg-gray-100">
                <span
                  onClick={logOutHandler}
                  className="tw-cursor-pointer active:tw-bg-gray-200 active:tw-text-gray-700 tw-text-sm tw-py-2 tw-px-4 tw-font-normal tw-block tw-w-full tw-whitespace-nowrap tw-bg-transparent tw-text-gray-700"
                >
                  Logout
                </span>
              </li>
            </ul> */}
          </div>
        </div>
      </nav>
      <div className="tw-absolute tw-flex md:tw-hidden tw-mt-[55px] tw-px-6 tw-py-2 tw-w-full">
        {/* <div className="tw-flex tw-item-center">
          <ol className="tw-list-reset tw-flex tw-text-sm tw-font-semibold tw-items-center tw-mx-2">
            <li>
              <h1 className="tw-text-gray-700">{headerBar.title}</h1>
            </li>
            {headerBar.subtitle !== "" && (
              <li>
                <MdChevronRight className="tw-text-gray-500" />
              </li>
            )}
            <li>
              <h1 className="tw-text-gray-500">{headerBar.subtitle}</h1>
            </li>
          </ol>
        </div> */}
      </div>
    </>
  );
};

export default Header;
