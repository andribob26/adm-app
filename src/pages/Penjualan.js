import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBarangByKode, resetResBarang } from "../store/slices/barangSlice";
import CurrencyFormat from "react-currency-format";
import { MdDelete } from "react-icons/md";

const Penjualan = () => {
  const [listBarang, setListBarang] = useState([]);
  const [qty, setQty] = useState([]);
  const [total, setTotal] = useState(0);
  const [bayar, setBayar] = useState(0);
  const [Kembalian, setKembalian] = useState(0);
  const [dataQr, setDataQr] = useState({
    delay: 500,
    status: false,
  });
  const [modalOpen, setModalOpen] = useState({
    isOpen: false,
    type: "",
  });

  const dispatch = useDispatch();

  const resBarang = useSelector((state) => state.barangSlice.resBarang);
  const dataSession = useSelector((state) => state.authSlice.dataSession);

  const addToList = (item) => {
    if (hasMatchId(listBarang, item._id)) {
      const i = listBarang.findIndex((itm) => {
        return itm._id === item._id;
      });

      setQty((qty) => {
        let newArr = [...qty];
        newArr[i].value = newArr[i].value + 1;
        newArr[i].subTotal = newArr[i].value * item.hpp;

        return newArr;
      });
    } else {
      setListBarang((listBarang) => [...listBarang, item]);
      setQty((qty) => [
        ...qty,
        {
          value: 1,
          subTotal: item.hpp,
        },
      ]);
    }
  };

  const deleteList = (item, status) => {
    const i = listBarang.findIndex((itm) => {
      return itm._id === item._id;
    });
    if (status === "all") {
      setListBarang((listBarang) => [
        ...listBarang.slice(0, i),
        ...listBarang.slice(i + 1, listBarang.length),
      ]);
      setQty((qty) => [...qty.slice(0, i), ...qty.slice(i + 1, qty.i)]);
    } else {
      if (hasMatchId(listBarang, item._id)) {
        setQty((qty) => {
          let newArr = [...qty];
          newArr[i].value = newArr[i].value - 1;
          newArr[i].subTotal = newArr[i].value * item.hpp;

          return newArr;
        });

        if (qty[i].value < 1) {
          setListBarang((listBarang) => [
            ...listBarang.slice(0, i),
            ...listBarang.slice(i + 1, listBarang.length),
          ]);
          setQty((qty) => [...qty.slice(0, i), ...qty.slice(i + 1, qty.i)]);
        }
      }
    }
  };

  const hasMatchId = (arr, id) => {
    return arr.some((el) => el._id === id);
  };

  const showModalHandler = (type, item = null) => {
    let elModal = null;

    switch (type) {
      case "barang":
        elModal = document.querySelector(`#${type}`);
        break;
      case "scanner":
        elModal = document.querySelector(`#${type}`);
        break;

      default:
        break;
    }
    if (elModal !== null) {
      const modal = window.Modal.getOrCreateInstance(elModal);
      modal.show();
    }
  };

  const tabelHead = [
    { title: "No" },
    { title: "Gambar" },
    { title: "Kode" },
    { title: "Nama" },
    { title: "HPP" },
    { title: "Qty" },
    { title: "Sub Total" },
    { title: "Aksi" },
  ];

  const handleScan = (data) => {
    if (data) {
      dispatch(
        getBarangByKode({ kode: data.text, token: dataSession.data?.token })
      );
      setDataQr((dataQr) => ({
        ...dataQr,
        status: false,
      }));
      setModalOpen((modalOpen) => ({
        ...modalOpen,
        isOpen: false,
        type: "scanner",
      }));
    }
  };

  const handleError = (err) => {};

  const handleClose = () => {
    setDataQr((dataQr) => ({
      ...dataQr,
      status: false,
    }));
    setModalOpen((modalOpen) => ({
      ...modalOpen,
      isOpen: false,
      type: "",
    }));
  };

  useEffect(() => {
    let sum = 0;
    qty.forEach((e) => {
      sum += e.subTotal;
    });
    setTotal(sum);

    if (qty.length < 1) {
      setBayar(0);
    }
  }, [qty]);

  useEffect(() => {
    if (bayar > 0) {
      setKembalian(bayar - total);
    } else {
      setKembalian(0);
    }
  }, [bayar]);

  useEffect(() => {
    if (resBarang.success) {
      if (resBarang.type === "get-by-kode") {
        if (hasMatchId(listBarang, resBarang.data._id)) {
          const i = listBarang.findIndex((item) => {
            return item._id === resBarang.data._id;
          });

          setQty((qty) => {
            let newArr = [...qty];
            newArr[i].value = newArr[i].value + 1;
            newArr[i].subTotal = newArr[i].value * resBarang.data.hpp;

            return newArr;
          });
        } else {
          setListBarang((listBarang) => [...listBarang, resBarang.data]);
          setQty((qty) => [
            ...qty,
            {
              value: 1,
              subTotal: resBarang.data.hpp,
            },
          ]);
        }
        dispatch(resetResBarang());
      }
    }
  }, [resBarang]);

  return (
    <>
      <div className="tw-bg-white tw-py-2 tw-px-6 tw-rounded-lg tw-shadow">
        <div className="tw-flex tw-items-center tw-mb-2 tw-gap-2 tw-justify-between">
          <div className="tw-relative tw-flex tw-items-center">
            <span className="tw-text-xs tw-font-bold tw-text-gray-700 tw-mr-2">
              No
            </span>
            <input
              type="text"
              className="tw-form-control tw-block tw-w-full tw-px-2 tw-py-1 tw-text-sm tw-font-semibold  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border tw-border-solid tw-border-gray-300 tw-rounded tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
              placeholder="Faktur"
            />
          </div>
          <div className="tw-relative tw-flex tw-items-center tw-gap-2">
            <button
              onClick={() => {
                showModalHandler("barang");
              }}
              type="button"
              className="hover:tw-bg-sky-700 tw-flex tw-items-center tw-px-6 tw-py-2 tw-bg-sky-600 tw-text-white tw-font-bold tw-text-xs tw-rounded tw-duration-150 tw-ease-in-out"
            >
              Cari
            </button>
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
                    className="tw-text-xs tw-font-bold tw-px-6 tw-py-2 tw-text-left"
                  >
                    {item.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {listBarang.length > 0 ? (
                listBarang.map((item, i) => (
                  <tr key={i} className="tw-border-b hover:tw-bg-sky-100">
                    <td className="tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12">
                      {i + 1}
                    </td>
                    <td className="tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12">
                      <div className="tw-h-16 tw-w-16">
                        <img
                          src={item.image}
                          alt=""
                          className="tw-h-16 tw-w-16 tw-object-cover"
                        />
                      </div>
                    </td>
                    <td className="tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12">
                      {item.kodeBarang}
                    </td>
                    <td className="tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12">
                      {item.name}
                    </td>
                    <td className="tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12 tw-text-right">
                      <CurrencyFormat
                        value={item.hpp}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"Rp."}
                        className="tw-px-2"
                      />
                    </td>
                    <td className="tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12">
                      <input
                        value={qty[i].value}
                        onChange={(e) => {
                          const result = e.target.value.replace(/\D/g, "");
                          if (result.length > 0) {
                            setQty((qty) => {
                              let newArr = [...qty];
                              newArr[i].value = parseInt(result);
                              newArr[i].subTotal = parseInt(result) * item.hpp;

                              return newArr;
                            });
                          } else {
                            setQty((qty) => {
                              let newArr = [...qty];
                              newArr[i].value = "";
                              newArr[i].subTotal = item.hpp;

                              return newArr;
                            });
                          }
                        }}
                        onBlur={() => {
                          if (qty[i].value === "") {
                            setQty((qty) => {
                              let newArr = [...qty];
                              newArr[i].value = 1;
                              newArr[i].subTotal = item.hpp;

                              return newArr;
                            });
                          }
                        }}
                        type="text"
                        className="tw-text-right tw-block tw-w-full tw-px-2 tw-py-1 tw-text-xs tw-font-semibold  tw-text-gray-700 tw-bg-transparent tw-bg-clip-padding tw-border-b-2 tw-border-dotted tw-border-gray-700 tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-transparent focus:tw-border-sky-600 focus:tw-outline-none"
                        placeholder="Qty"
                      />
                    </td>
                    <td className="tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12 tw-text-right">
                      <CurrencyFormat
                        value={qty[i].subTotal}
                        displayType={"text"}
                        thousandSeparator={"."}
                        decimalSeparator={","}
                        prefix={"Rp."}
                        className="tw-px-2"
                      />
                    </td>
                    <td className="tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12">
                      <div className="tw-flex tw-gap-2 tw-items-center tw-w-full">
                        <button
                          onClick={() => {
                            deleteList(item, "all");
                          }}
                          className="hover:tw-text-gray-500 tw-transition tw-duration-300 tw-ease-in-out"
                          title="Hapus"
                        >
                          <MdDelete size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="tw-border-b hover:tw-bg-sky-100">
                  <td
                    colSpan={8}
                    className="tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12"
                  >
                    Tidak ada data
                  </td>
                </tr>
              )}
              <tr>
                <th
                  colSpan={5}
                  rowSpan={3}
                  scope="tw-col"
                  className="tw-text-4xl tw-font-bold tw-px-6 tw-py-[13px] tw-text-center"
                >
                  <CurrencyFormat
                    value={total}
                    displayType={"text"}
                    thousandSeparator={"."}
                    decimalSeparator={","}
                    prefix={"Rp."}
                    className="tw-px-2"
                  />
                </th>
                <th
                  scope="tw-col"
                  className="tw-text-xs tw-font-bold tw-px-6 tw-py-[13px] tw-text-left"
                >
                  Total
                </th>
                <th
                  scope="tw-col"
                  className="tw-text-xs tw-font-semibold tw-px-6 tw-py-[13px] tw-text-right"
                >
                  <CurrencyFormat
                    value={total}
                    displayType={"text"}
                    thousandSeparator={"."}
                    decimalSeparator={","}
                    prefix={"Rp."}
                    className="tw-px-2"
                  />
                </th>
              </tr>
              <tr>
                <th
                  scope="tw-col"
                  className="tw-text-xs tw-font-bold tw-px-6 tw-py-[13px] tw-text-left"
                >
                  Bayar
                </th>
                <th
                  scope="tw-col"
                  className="tw-text-xs tw-font-semibold tw-px-6 tw-py-[13px] tw-text-right"
                >
                  <CurrencyFormat
                    thousandSeparator={"."}
                    decimalSeparator={","}
                    prefix={"Rp."}
                    disabled={listBarang.length < 1}
                    onValueChange={(values) => {
                      setBayar(values.value);
                    }}
                    onBlur={(e) => {
                      if (e.target.value === "") {
                        setBayar(0);
                      }
                    }}
                    value={bayar}
                    className="tw-text-right tw-block tw-w-full tw-px-2 tw-py-1 tw-text-xs tw-font-semibold  tw-text-gray-700 tw-bg-white tw-bg-clip-padding tw-border-b-2 tw-border-dotted tw-border-gray-700 tw-transition tw-ease-in-out tw-m-0 focus:tw-text-gray-700 focus:tw-bg-white focus:tw-border-sky-600 focus:tw-outline-none"
                    id="bayar"
                    placeholder="Bayar"
                  />
                </th>
              </tr>
              <tr>
                <th
                  scope="tw-col"
                  className="tw-text-xs tw-font-bold tw-px-6 tw-py-[13px] tw-text-left"
                >
                  Kembali
                </th>
                <th
                  scope="tw-col"
                  className="tw-text-xs tw-font-semibold tw-px-6 tw-py-[13px] tw-text-right"
                >
                  <CurrencyFormat
                    value={Kembalian}
                    displayType={"text"}
                    thousandSeparator={"."}
                    decimalSeparator={","}
                    prefix={"Rp."}
                    className={`${Kembalian <= 0 && "tw-text-red-500"} tw-px-2`}
                  />
                </th>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="tw-mt-2 tw-flex tw-justify-end">
          <button
            type="button"
            className="hover:tw-bg-sky-700 tw-flex tw-items-center tw-px-6 tw-py-2 tw-bg-sky-600 tw-text-white tw-font-bold tw-text-xs tw-rounded tw-duration-150 tw-ease-in-out"
          >
            Simpan
          </button>
        </div>
      </div>
      {/* </div> */}
      {/* <ModalQrCScanner
        modalOpen={modalOpen}
        data={dataQr}
        handleScan={handleScan}
        handleError={handleError}
        handleClose={handleClose}
      />
      <ModalCariBarang
        hasMatchId={hasMatchId}
        token={dataSession.data?.token}
        addToList={addToList}
        deleteList={deleteList}
        listBarang={listBarang}
        qty={qty}
      /> */}
    </>
  );
};

export default Penjualan;
