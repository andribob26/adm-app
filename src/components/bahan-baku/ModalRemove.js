import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBahanBaku,
  resetResBahanBaku,
  getAllBahanBaku,
} from "../../store/slices/bahanBakuSlice";

const ModalRemove = ({ valAksi, token }) => {
  const dispatch = useDispatch();
  const resBahanBaku = useSelector(
    (state) => state.bahanBakuSlice.resBahanBaku
  );

  const deleteHandler = (id, token) => {
    dispatch(deleteBahanBaku({ id: id, token: token }));
  };

  useEffect(() => {
    if (resBahanBaku.success) {
      if (resBahanBaku.type === "remove") {
        const modal = window.Modal.getInstance(
          document.querySelector("#remove")
        );
        modal.hide();
        dispatch(getAllBahanBaku({ token: token }));
        dispatch(resetResBahanBaku());
      }
    }
  }, [resBahanBaku.success]);

  return (
    <React.Fragment>
      <div
        className="modal fade tw-fixed tw-top-0 tw-left-0 tw-hidden tw-w-full tw-h-full tw-outline-none tw-overflow-x-hidden tw-overflow-y-auto"
        id="remove"
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
                Hapus
              </h5>
              <button
                type="button"
                className="tw-btn-close tw-box-content tw-w-4 tw-h-4 tw-p-1 tw-text-black tw-border-none tw-rounded-none tw-opacity-50 focus:tw-shadow-none focus:tw-outline-none focus:tw-opacity-100 hover:tw-text-black hover:tw-opacity-75 hover:tw-no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body tw-relative tw-py-2 tw-px-6">
              <p className="tw-text-sm">
                {`Apakah Anda yakin ingin menghapus ${valAksi.nama} dari database?`}
              </p>
            </div>
            <div className="modal-footer tw-flex tw-flex-shrink-0 tw-flex-wrap tw-items-center tw-justify-end tw-py-2 tw-px-6 tw-border-t tw-border-gray-200 tw-rounded-b-md">
              <button
                onClick={() => {
                  deleteHandler(valAksi.id, token);
                }}
                type="button"
                className="hover:tw-bg-sky-700 tw-flex tw-items-center tw-px-6 tw-py-2 tw-bg-sky-600 tw-text-white tw-font-bold tw-text-xs tw-rounded tw-duration-150 tw-ease-in-out"
              >
                {resBahanBaku.isLoading && (
                  <div
                    className="spinner-border animate-spin tw-inline-block tw-w-4 tw-h-4 tw-border-2 tw-rounded-full tw-mr-2"
                    role="status"
                  >
                    <span className="tw-visually-hidden">Loading...</span>
                  </div>
                )}
                Ya
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ModalRemove;
