import React from "react";
import CurrencyFormat from "react-currency-format";

const ModalDetail = ({ valAksi }) => {
  return (
    <React.Fragment>
      <div
        className="modal fade tw-fixed tw-top-0 tw-left-0 tw-hidden tw-w-full tw-h-full tw-outline-none tw-overflow-x-hidden tw-overflow-y-auto"
        id="detail"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="detail"
        aria-hidden="true"
      >
        <div className="modal-dialog tw-modal-lg tw-modal-dialog-scrollable tw-relative tw-w-auto tw-pointer-events-none">
          <div className="modal-content tw-border-none tw-shadow-lg tw-relative tw-flex tw-flex-col tw-w-full tw-pointer-events-auto tw-bg-white tw-bg-clip-padding tw-rounded tw-outline-none tw-text-current">
            <div className="modal-header tw-flex tw-flex-shrink-0 tw-items-center tw-justify-between tw-py-2 tw-px-6 tw-border-b tw-border-gray-200 tw-rounded-t">
              <h5
                className="tw-text-base tw-font-bold tw-leading-normal tw-text-gray-800"
                id="exampleModalLabel"
              >
                Detail Laporan Pembelian
              </h5>
              <button
                type="button"
                className="tw-btn-close tw-box-content tw-w-4 tw-h-4 tw-p-1 tw-text-black tw-border-none tw-rounded-none tw-opacity-50 focus:tw-shadow-none focus:tw-outline-none focus:tw-opacity-100 hover:tw-text-black hover:tw-opacity-75 hover:tw-no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body tw-relative tw-py-2 tw-px-6">
              {/* //content */}
              <div className="md:tw-flex tw-items-center tw-overflow-x-auto">
                <table className="tw-w-full">
                  <tbody>
                    <tr className="tw-border-b">
                      <td className="tw-text-sm tw-text-gray-900 tw-font-bold tw-px-6 tw-py-2 tw-whitespace-nowrap tw-w-1/3">
                        Nama
                      </td>
                      <td className="tw-text-sm tw-text-gray-900 tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-nowrap tw-w-2/3">
                        {valAksi.nama}
                      </td>
                    </tr>
                    {/* <tr className="tw-border-b">
                      <td className="tw-text-sm tw-text-gray-900 tw-font-bold tw-px-6 tw-py-2 tw-whitespace-nowrap tw-w-1/3">
                        Harga
                      </td>
                      <td className="tw-text-sm tw-text-gray-900 tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-nowrap tw-w-2/3">
                        <CurrencyFormat
                          value={valAksi.harga}
                          displayType={"text"}
                          thousandSeparator={"."}
                          decimalSeparator={","}
                          prefix={"Rp."}
                          suffix={",-"}
                        />
                      </td>
                    </tr> */}
                    <tr className="tw-border-b">
                      <td className="tw-text-sm tw-text-gray-900 tw-font-bold tw-px-6 tw-py-2 tw-whitespace-nowrap tw-w-1/3">
                        Pemasok
                      </td>
                      <td className="tw-text-sm tw-text-gray-900 tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-nowrap tw-w-2/3">
                        {valAksi.pemasok}
                      </td>
                    </tr>
                    <tr className="tw-border-b">
                      <td className="tw-text-sm tw-text-gray-900 tw-font-bold tw-px-6 tw-py-2 tw-whitespace-nowrap tw-w-1/3">
                        Alamat
                      </td>
                      <td className="tw-text-sm tw-text-gray-900 tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-nowrap tw-w-2/3">
                        {valAksi.alamat}
                      </td>
                    </tr>
                    <tr className="tw-border-b">
                      <td className="tw-text-sm tw-text-gray-900 tw-font-bold tw-px-6 tw-py-2 tw-whitespace-nowrap tw-w-1/3">
                        Total Harga
                      </td>
                      <td className="tw-text-sm tw-text-gray-900 tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-nowrap tw-w-2/3">
                        <CurrencyFormat
                          value={valAksi.totalHarga}
                          displayType={"text"}
                          thousandSeparator={"."}
                          decimalSeparator={","}
                          prefix={"Rp."}
                          suffix={",-"}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <table className="tw-w-full tw-relative">
                          <thead className="tw-bg-white tw-border-b-2">
                            <tr>
                              <th
                                scope="tw-col"
                                className="tw-border tw-text-xs tw-font-bold tw-px-6 tw-py-2 tw-text-left"
                              >
                                nama
                              </th>
                              <th
                                scope="tw-col"
                                className="tw-border tw-text-xs tw-font-bold tw-px-6 tw-py-2 tw-text-left"
                              >
                                harga
                              </th>
                              <th
                                scope="tw-col"
                                className="tw-border tw-text-xs tw-font-bold tw-px-6 tw-py-2 tw-text-left"
                              >
                                kg
                              </th>
                              <th
                                scope="tw-col"
                                className="tw-border tw-text-xs tw-font-bold tw-px-6 tw-py-2 tw-text-left"
                              >
                                subTotal
                              </th>
                            </tr>
                          </thead>
                          <tbody className="tw-bg-white tw-border-b-2">
                            {valAksi.detailPembelian.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td className="tw-border tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12">
                                    {item.nama}
                                  </td>
                                  <td className="tw-border tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12">
                                    <CurrencyFormat
                                      value={item.harga}
                                      displayType={"text"}
                                      thousandSeparator={"."}
                                      decimalSeparator={","}
                                      prefix={"Rp."}
                                      suffix={",-"}
                                    />
                                  </td>
                                  <td className="tw-border tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12 tw-text-right">
                                    <CurrencyFormat
                                      value={item.qty}
                                      displayType={"text"}
                                      thousandSeparator={"."}
                                      decimalSeparator={","}
                                    />
                                  </td>
                                  <td className="tw-border tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12 tw-text-right">
                                    <CurrencyFormat
                                      value={item.subTotal}
                                      displayType={"text"}
                                      thousandSeparator={"."}
                                      decimalSeparator={","}
                                      prefix={"Rp."}
                                      suffix={",-"}
                                    />
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="modal-footer tw-flex tw-flex-shrink-0 tw-flex-wrap tw-items-center tw-justify-end tw-py-2 tw-px-6 tw-border-t tw-border-gray-200 tw-rounded-b-md"></div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ModalDetail;
