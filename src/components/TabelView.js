import React, { useState } from "react";
import { MdAddCircle, MdClose } from "react-icons/md";
import ReactPaginate from "react-paginate";

const TabelView = ({
  children,
  showModalHandler,
  tabelHead,
  searchHandler,
  onPerPageChangeHandler,
  pageChangeHandler,
  data,
}) => {
  const [searchVal, setSearchVal] = useState("");
  return (
    <>
      <div className="tw-flex tw-items-center tw-mb-2 tw-gap-2 tw-justify-between">
        <button
          onClick={() => {
            showModalHandler("tambah");
          }}
          type="button"
          className="tw-flex tw-items-center hover:tw-bg-green-600 tw-px-3 tw-py-2 tw-bg-green-500 hover:tw-shadow-md tw-text-white tw-font-bold tw-text-xs tw-rounded tw-duration-300 tw-ease-in-out"
        >
          <MdAddCircle size={16} />
          <span className="tw-ml-1">Tambah</span>
        </button>
        <div className="tw-relative tw-flex tw-items-center tw-gap-2">
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
          <select
            onChange={onPerPageChangeHandler}
            defaultValue={10}
            className="tw-form-control tw-block tw-w-14 tw-px-2 tw-py-1 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
            aria-label="Default select example"
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
      <div className="tw-overflow-x-auto">
        <table className="tw-w-full tw-relative">
          <thead className="tw-bg-white tw-border-b-2 tw-border-t">
            <tr>
              {tabelHead.map((item, i) => (
                <th
                  key={i}
                  scope="tw-col"
                  className="tw-text-xs tw-border tw-font-bold tw-px-6 tw-py-2 tw-text-left"
                >
                  {item.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {children}
          </tbody>
        </table>
      </div>
      <div className="tw-mt-2 tw-flex tw-justify-end">
        <ReactPaginate
          breakLabel="..."
          nextLabel={null}
          onPageChange={pageChangeHandler}
          pageRangeDisplayed={data.limit}
          pageCount={data.totalPage}
          forcePage={data.currentPage}
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
    </>
  );
};

export default TabelView;
