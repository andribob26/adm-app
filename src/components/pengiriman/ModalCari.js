import React, { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduk } from "../../store/slices/produkSlice";
import { MdClose } from "react-icons/md";
import ReactPaginate from "react-paginate";

const ModalCari = ({
  token,
  addToList,
  deleteList,
  detailPengiriman,
  hasMatchId,
}) => {
  const dispatch = useDispatch();
  const dataProduk = useSelector((state) => state.produkSlice.dataProduk);
  const dataSession = useSelector((state) => state.authSlice.dataSession);
  const [searchVal, setSearchVal] = useState("");

  const pageChangeHandler = (event) => {
    dispatch(
      getAllProduk({
        size: "18",
        page: event.selected,
        token: dataSession.data?.token,
      })
    );
  };

  const searchHandler = (value) => {
    dispatch(
      getAllProduk({
        size: "18",
        search: value,
        token: dataSession.data?.token,
      })
    );
  };

  useLayoutEffect(() => {
    dispatch(getAllProduk({ size: "18", token: dataSession.data?.token }));
  }, []);

  return (
    <React.Fragment>
      <div
        className="modal fade tw-fixed tw-top-0 tw-left-0 tw-hidden tw-w-full tw-h-full tw-outline-none tw-overflow-x-hidden tw-overflow-y-auto"
        id="produk"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="detail"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-scrollable tw-relative tw-w-auto tw-pointer-events-none">
          <div className="modal-content tw-border-none tw-shadow-lg tw-relative tw-flex tw-flex-col tw-w-full tw-pointer-events-auto tw-bg-white tw-bg-clip-padding tw-rounded tw-outline-none tw-text-current">
            <div className="modal-header tw-flex tw-flex-shrink-0 tw-items-center tw-justify-between tw-py-2 tw-px-6 tw-border-b tw-border-gray-200 tw-rounded-t">
              <h5
                className="tw-text-base tw-font-bold tw-leading-normal tw-text-gray-800"
                id="exampleModalLabel"
              >
                Produk
              </h5>
              <div className="tw-flex tw-items-center tw-gap-3">
                <div className="tw-relative">
                  <input
                    onChange={(e) => {
                      searchHandler(e.target.value);
                      setSearchVal(e.target.value);
                    }}
                    value={searchVal}
                    type="text"
                    className="tw-form-control tw-block tw-w-full tw-px-2 tw-py-1 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
                    placeholder="Search.."
                  />
                  {searchVal !== "" && (
                    <button
                      onClick={() => {
                        searchHandler("");
                        setSearchVal("");
                      }}
                      className="tw-absolute tw-right-1 tw-top-[7px]"
                    >
                      <MdClose />
                    </button>
                  )}
                </div>
                <button
                  onClick={() => {
                    searchHandler("");
                    setSearchVal("");
                  }}
                  type="button"
                  className="tw-btn-close tw-box-content tw-w-4 tw-h-4 tw-p-1 tw-text-black tw-border-none tw-rounded-none tw-opacity-50 focus:tw-shadow-none focus:tw-outline-none focus:tw-opacity-100 hover:tw-text-black hover:tw-opacity-75 hover:tw-no-underline"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
            </div>
            <div className="modal-body tw-relative tw-py-2 tw-px-6">
              {/* //content */}
              <div
                className={`tw-py-2 tw-grid tw-gap-3 tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-6`}
              >
                {dataProduk.data.length > 0 ? (
                  dataProduk.data.map((item, i) => {
                    return (
                      <div
                        key={i}
                        className="tw-rounded tw-flex tw-flex-col tw-justify-center tw-border tw-px-3 tw-py-2"
                      >
                        <div
                          onClick={() => {
                            addToList(item);
                            const modal = window.Modal.getInstance(
                              document.querySelector("#produk")
                            );
                            modal.hide();
                          }}
                          className="tw-mt-2 tw-text-sm"
                        >
                          <div className="tw-mb-2">
                            <h1 className="tw-font-bold">{item.nama}</h1>
                          </div>
                          <button
                            className={`${
                              hasMatchId(detailPengiriman, item.id) ||
                              (item.stok === 0 &&
                                "tw-cursor-not-allowed tw-opacity-50")
                            } tw-w-full tw-justify-center hover:tw-bg-sky-700 tw-flex tw-items-center tw-px-6 tw-py-2 tw-bg-sky-600 tw-text-white tw-font-bold tw-text-xs tw-rounded tw-duration-150 tw-ease-in-out`}
                            disabled={
                              hasMatchId(detailPengiriman, item.id) ||
                              item.stok === 0
                                ? true
                                : false
                            }
                          >
                            Pilih
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="tw-text-sm tw-col-span-6">
                    <p>{dataProduk.message}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="modal-footer tw-flex tw-flex-shrink-0 tw-flex-wrap tw-items-center tw-justify-end tw-py-2 tw-px-6 tw-border-t tw-border-gray-200 tw-rounded-b-md">
              <div className="tw-flex tw-justify-end">
                <ReactPaginate
                  breakLabel="..."
                  nextLabel={null}
                  onPageChange={pageChangeHandler}
                  pageRangeDisplayed={dataProduk.limit}
                  pageCount={dataProduk.totalPage}
                  forcePage={dataProduk.currentPage}
                  previousLabel={null}
                  pageLinkClassName="page-link tw-text-sm tw-relative tw-block tw-py-1 tw-px-3 tw-rounded tw-border-0 tw-bg-transparent tw-outline-none tw-transition-all tw-duration-300 tw-text-gray-700 hover:tw-text-gray-700 hover:tw-bg-gray-200 focus:tw-shadow-none"
                  previousClassName="tw-hidden"
                  nextClassName="tw-hidden"
                  breakClassName="page-item"
                  breakLinkClassName="page-link tw-text-sm tw-relative tw-block tw-py-1 tw-px-3 tw-rounded tw-border-0 tw-bg-transparent tw-outline-none tw-transition-all tw-duration-300 tw-text-gray-700 hover:tw-text-gray-700 hover:tw-bg-gray-200 focus:tw-shadow-none"
                  containerClassName="pagination tw-flex tw-list-style-none tw-gap-1"
                  activeClassName="page-item active"
                  renderOnZeroPageCount={null}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ModalCari;
