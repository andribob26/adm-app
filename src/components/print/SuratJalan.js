import React from "react";
import moment from "moment";
import CurrencyFormat from "react-currency-format";

const SuratJalan = ({ innerRef, item }) => {
  const tabelHead = [
    { title: "No" },
    { title: "Nama" },
    { title: "Karung" },
    { title: "Kg" },
  ];
  return (
    <div
      className="hiddenViewPrint"
      style={{
        overflow: "scroll",
        //backgroundColor: "blue"
      }}
    >
      <div ref={innerRef} className="tw-bg-white tw-p-20">
        <div className="tw-border-b-2 tw-border-gray-700 tw-pb-2">
          <div className="tw-flex tw-items-center">
            <div className="tw-mr-4 tw-text-3xl tw-font-extrabold">
              <h1>ADM</h1>
            </div>
            <div className="tw-text-sm">
              <h1 className="tw-font-bold">ADM</h1>
              <p className="tw-text-xs">
                Blok. Kiara kurung, Desa Situraja, Kec. Gantar, Kab. Indramayu
              </p>
              <p className="tw-text-xs">HP: 085714057686</p>
            </div>
          </div>
        </div>

        <div className="tw-text-2xl tw-font-bold tw-text-center tw-mt-4">
          <h1>SURAT JALAN</h1>
        </div>

        <div className="tw-mt-4 tw-flex tw-justify-between">
          <div className="tw-flex tw-items-end tw-text-sm">
            <p>No : {item.no}</p>
          </div>
          <div className="tw-text-sm">
            <div className="tw-flex">
              <p className="tw-w-24">Tanggal</p>
              <p>: {moment(item.createdAt).format("M/DD/YYYY")}</p>
            </div>
            <div className="tw-flex">
              <p className="tw-w-24">No Polisi</p>
              <p>: {item.noPolisi}</p>
            </div>
          </div>
        </div>

        <div className="tw-mt-2">
          <table className="tw-w-full tw-relative">
            <thead className="tw-bg-black tw-text-white">
              <tr>
                {tabelHead.map((item, i) => (
                  <th
                    key={i}
                    scope="tw-col"
                    className="tw-text-xs tw-font-bold tw-px-6 tw-py-2 tw-text-left tw-border tw-border-gray-700"
                  >
                    {item.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {item.detailPengiriman.map((itm, i) => {
                return (
                  <tr key={i}>
                    <td className="tw-text-xs tw-font-normal tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12 tw-border tw-border-gray-700">
                      {i + 1}
                    </td>
                    <td className="tw-text-xs tw-font-normal tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12 tw-border tw-border-gray-700">
                      {itm.nama}
                    </td>

                    <td className="tw-text-xs tw-font-normal tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12 tw-border tw-border-gray-700">
                      <CurrencyFormat
                        value={Math.floor(itm.qty / 50)}
                        displayType={"text"}
                        thousandSeparator={"."}
                        decimalSeparator={","}
                      />
                    </td>
                    <td className="tw-text-xs tw-font-normal tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12 tw-border tw-border-gray-700">
                      <CurrencyFormat
                        value={itm.qty}
                        displayType={"text"}
                        thousandSeparator={"."}
                        decimalSeparator={","}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SuratJalan;
