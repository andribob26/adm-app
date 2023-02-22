import React, { useEffect, useLayoutEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBarang } from '../../store/slices/barangSlice'
import { MdAdd, MdRemove, MdClose, MdRestore } from 'react-icons/md'
import ReactPaginate from 'react-paginate'
import CurrencyFormat from 'react-currency-format'

const ModalCariBarang = ({
  token,
  addToList,
  deleteList,
  listBarang,
  hasMatchId,
  qty
}) => {
  const dispatch = useDispatch()
  const dataBarang = useSelector(state => state.barangSlice.dataBarang)
  const dataSession = useSelector(state => state.authSlice.dataSession)
  const [searchVal, setSearchVal] = useState('')

  const pageChangeHandler = event => {
    dispatch(
      getAllBarang({
        size: '18',
        page: event.selected,
        token: dataSession.data?.token
      })
    )
  }

  const searchHandler = value => {
    dispatch(
      getAllBarang({
        size: '18',
        search: value,
        token: dataSession.data?.token
      })
    )
  }

  useLayoutEffect(() => {
    dispatch(getAllBarang({ size: '18', token: dataSession.data?.token }))
  }, [])

  return (
    <React.Fragment>
      <div
        className='modal fade tw-fixed tw-top-0 tw-left-0 tw-hidden tw-w-full tw-h-full tw-outline-none tw-overflow-x-hidden tw-overflow-y-auto'
        id='barang'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabIndex='-1'
        aria-labelledby='detail'
        aria-hidden='true'
      >
        <div className='modal-dialog tw-modal-xl modal-dialog-scrollable tw-relative tw-w-auto tw-pointer-events-none'>
          <div className='modal-content tw-border-none tw-shadow-lg tw-relative tw-flex tw-flex-col tw-w-full tw-pointer-events-auto tw-bg-white tw-bg-clip-padding tw-rounded tw-outline-none tw-text-current'>
            <div className='modal-header tw-flex tw-flex-shrink-0 tw-items-center tw-justify-between tw-py-2 tw-px-6 tw-border-b tw-border-gray-200 tw-rounded-t'>
              <h5
                className='tw-text-base tw-font-bold tw-leading-normal tw-text-gray-800'
                id='exampleModalLabel'
              >
                Barang
              </h5>
              <div className='tw-flex tw-items-center tw-gap-3'>
                <div className='tw-relative'>
                  <input
                    onChange={e => {
                      searchHandler(e.target.value)
                      setSearchVal(e.target.value)
                    }}
                    value={searchVal}
                    type='text'
                    className='tw-form-control tw-block tw-w-full tw-px-2 tw-py-1 tw-text-sm tw-font-normal  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none'
                    placeholder='Search..'
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
                <button
                  onClick={() => {
                    searchHandler('')
                    setSearchVal('')
                  }}
                  type='button'
                  className='tw-btn-close tw-box-content tw-w-4 tw-h-4 tw-p-1 tw-text-black tw-border-none tw-rounded-none tw-opacity-50 focus:tw-shadow-none focus:tw-outline-none focus:tw-opacity-100 hover:tw-text-black hover:tw-opacity-75 hover:tw-no-underline'
                  data-bs-dismiss='modal'
                  aria-label='Close'
                ></button>
              </div>
            </div>
            <div className='modal-body tw-relative tw-py-2 tw-px-6'>
              {/* //content */}
              <div
                className={`tw-py-2 tw-grid tw-gap-3 tw-grid-cols-2 md:tw-grid-cols-3 lg:tw-grid-cols-6`}
              >
                {dataBarang.data.length > 0 ? (
                  dataBarang.data.map((item, i) => {
                    const index = listBarang.findIndex(
                      el => el._id === item._id
                    )
                    return (
                      <div
                        key={i}
                        className='tw-rounded tw-flex tw-flex-col tw-justify-center tw-border tw-px-3 tw-py-2'
                      >
                        <div className='tw-w-full tw-flex tw-justify-center tw-bg-gray-100 tw-relative'>
                          <img
                            src={item.image}
                            alt=''
                            className='object-cover tw-h-32 tw-w-auto'
                          />
                        </div>
                        <div className='tw-mt-2 tw-text-sm'>
                          <div className='tw-text-center'>
                            <h1 className='tw-font-bold'>
                              <span className='tw-text-gray-500'>
                                {item.kodeBarang}&nbsp;-&nbsp;
                              </span>
                              {item.name}
                            </h1>
                            <p className='tw-text-xs tw-text-gray-500'>
                              {item.kategori.name}
                            </p>
                            {/* <p className='tw-text-sm tw-font-bold'>
                              <CurrencyFormat
                                value={item.hargaJual}
                                displayType={'text'}
                                thousandSeparator={'.'}
                                decimalSeparator={','}
                                prefix={'Rp.'}
                                className='tw-px-2'
                              />
                            </p> */}
                          </div>
                        </div>
                        <div className='tw-mt-2 tw-m-auto'>
                          <div className='tw-flex tw-items-center'>
                            <button
                              onClick={() => {
                                deleteList(item)
                              }}
                              type='button'
                              disabled={
                                hasMatchId(listBarang, item._id) &&
                                qty.length > 0
                                  ? false
                                  : true
                              }
                              className={`${
                                hasMatchId(listBarang, item._id) &&
                                qty.length > 0
                                  ? ''
                                  : 'tw-opacity-50 tw-cursor-not-allowed'
                              } hover:tw-bg-red-600 tw-px-2 tw-py-2 tw-bg-red-500 tw-text-white tw-font-bold tw-text-xs tw-rounded-full tw-duration-300 tw-ease-in-out`}
                            >
                              <>
                                <MdRemove size={16} />
                              </>
                            </button>
                            <span className='tw-w-12 tw-text-center tw-text-sm'>
                              {hasMatchId(listBarang, item._id) &&
                              qty.length > 0
                                ? qty[index].value
                                : '0'}
                            </span>
                            <button
                              onClick={() => {
                                addToList(item)
                              }}
                              type='button'
                              className={`hover:tw-bg-green-600 tw-px-2 tw-py-2 tw-bg-green-500 tw-text-white tw-font-bold tw-text-xs tw-rounded-full tw-duration-300 tw-ease-in-out`}
                            >
                              <>
                                <MdAdd size={16} />
                              </>
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div className='tw-text-sm tw-col-span-6'>
                    <p>{dataBarang.message}</p>
                  </div>
                )}
              </div>
            </div>
            <div className='modal-footer tw-flex tw-flex-shrink-0 tw-flex-wrap tw-items-center tw-justify-end tw-py-2 tw-px-6 tw-border-t tw-border-gray-200 tw-rounded-b-md'>
              <div className='tw-flex tw-justify-end'>
                <ReactPaginate
                  breakLabel='...'
                  nextLabel={null}
                  onPageChange={pageChangeHandler}
                  pageRangeDisplayed={dataBarang.limit}
                  pageCount={dataBarang.totalPage}
                  forcePage={dataBarang.currentPage - 1}
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
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ModalCariBarang
