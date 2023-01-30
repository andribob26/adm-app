import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'
import { MdClose } from 'react-icons/md'

const GridView = ({
  children,
  pageChangeHandler,
  searchHandler,
  data,
  colsSize = 6
}) => {
  const [searchVal, setSearchVal] = useState('')
  return (
    <>
      <div className='tw-flex tw-items-center tw-mb-2 tw-gap-2 tw-justify-end'>
        <div className='tw-relative tw-flex tw-items-center tw-gap-2'>
          <div className='tw-relative'>
            <input
              onChange={e => {
                searchHandler(e.target.value)
                setSearchVal(e.target.value)
              }}
              value={searchVal}
              type='search'
              className='tw-form-control tw-block tw-w-full tw-px-2 tw-py-1 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none'
              placeholder='Faktur'
            />
            {searchVal !== '' && (
              <button
                onClick={() => {
                  searchHandler('')
                  setSearchVal('')
                }}
                className='tw-absolute tw-right-1 tw-top-[7px]'
              >
                <MdClose />
              </button>
            )}
          </div>
        </div>
      </div>
      <div
        class={`tw-border-y tw-py-2 tw-grid tw-gap-3 tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-${colsSize}`}
      >
        {children}
      </div>

      <div className='tw-mt-2 tw-flex tw-justify-end'>
        <ReactPaginate
          breakLabel='...'
          nextLabel={null}
          onPageChange={pageChangeHandler}
          pageRangeDisplayed={data.limit}
          pageCount={data.totalPage}
          forcePage={data.currentPage - 1}
          previousLabel={null}
          pageLinkClassName='page-link tw-text-sm tw-relative tw-block tw-py-1 tw-px-3 tw-rounded tw-border-0 tw-bg-transparent tw-outline-none tw-transition-all tw-duration-300 tw-text-gray-700 hover:tw-text-gray-700 hover:tw-bg-gray-200 focus:tw-shadow-none'
          previousClassName='tw-hidden'
          nextClassName='tw-hidden'
          breakClassName='page-item'
          breakLinkClassName='page-link tw-text-sm tw-relative tw-block tw-py-1 tw-px-3 tw-rounded tw-border-0 tw-bg-transparent tw-outline-none tw-transition-all tw-duration-300 tw-text-gray-700 hover:tw-text-gray-700 hover:tw-bg-gray-200 focus:tw-shadow-none'
          containerClassName='pagination tw-flex tw-list-style-none tw-gap-1'
          activeClassName='page-item active'
          renderOnZeroPageCount={null}
        />
      </div>
    </>
  )
}

export default GridView
