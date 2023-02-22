import React, { useState, useEffect } from "react";
import QrReader from "react-qr-scanner";

const ModalQrCScanner = ({
  modalOpen,
  data,
  handleScan,
  handleError,
  handleClose,
}) => {
  useEffect(() => {
    if (modalOpen.isOpen === false) {
      if (modalOpen.type === "scanner") {
        const modal = window.Modal.getInstance(
          document.querySelector("#scanner")
        );
        modal.hide();
        handleClose();
      }
    }
  }, [modalOpen]);
  return (
    <React.Fragment>
      <div
        className="modal fade tw-fixed tw-top-0 tw-left-0 tw-hidden tw-w-full tw-h-full tw-outline-none tw-overflow-x-hidden tw-overflow-y-auto"
        id="scanner"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="detail"
        aria-hidden="true"
      >
        <div className="modal-dialog tw-modal-sm tw-modal-dialog-scrollable tw-relative tw-w-auto tw-pointer-events-none">
          <div className="modal-content tw-border-none tw-shadow-lg tw-relative tw-flex tw-flex-col tw-w-full tw-pointer-events-auto tw-bg-white tw-bg-clip-padding tw-rounded tw-outline-none tw-text-current">
            <div className="modal-header tw-flex tw-flex-shrink-0 tw-items-center tw-justify-between tw-py-2 tw-px-6 tw-border-b tw-border-gray-200 tw-rounded-t">
              <h5
                className="tw-text-base tw-font-bold tw-leading-normal tw-text-gray-800"
                id="exampleModalLabel"
              >
                QRCode Scanner
              </h5>
              <button
                onClick={handleClose}
                type="button"
                className="tw-btn-close tw-box-content tw-w-4 tw-h-4 tw-p-1 tw-text-black tw-border-none tw-rounded-none tw-opacity-50 focus:tw-shadow-none focus:tw-outline-none focus:tw-opacity-100 hover:tw-text-black hover:tw-opacity-75 hover:tw-no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body tw-relative tw-py-2 tw-px-6">
              <div className="tw-w-full">
                <div className="tw-w-full tw-h-[189px] tw-relative"></div>
                {data.status && (
                  <QrReader
                    className="tw-absolute tw-py-2 tw-px-2 tw-top-1/2 tw-left-1/2 -tw-translate-x-1/2 -tw-translate-y-1/2"
                    style={{ width: "100%" }}
                    delay={QrReader.delay}
                    onError={handleError}
                    onScan={handleScan}
                  />
                )}
              </div>
            </div>
            <div className="modal-footer tw-flex tw-flex-shrink-0 tw-flex-wrap tw-items-center tw-justify-end tw-py-2 tw-px-6 tw-border-t tw-border-gray-200 tw-rounded-b-md">
              {/* <button
                type='button'
                className='hover:tw-bg-sky-700 tw-flex tw-items-center tw-px-6 tw-py-2 tw-bg-sky-600 tw-text-white tw-font-bold tw-text-xs tw-rounded tw-duration-150 tw-ease-in-out'
              >
                {resUser.isLoading && (
                  <div
                    class="tw-inline-block tw-h-5 tw-w-5 tw-animate-spin tw-rounded-full tw-border-[3px] tw-border-solid tw-border-current tw-border-r-transparent tw-align-[-0.125em] tw-motion-reduce:animate-[spin_1.5s_linear_infinite] tw-mr-2"
                    role="status"
                  >
                    <span class="!tw-absolute !-tw-m-px !tw-h-px !tw-w-px !tw-overflow-hidden !tw-whitespace-nowrap !tw-border-0 !tw-p-0 !tw-[clip:rect(0,0,0,0)]">
                      Loading...
                    </span>
                  </div>
                )}
                Ya
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ModalQrCScanner;
