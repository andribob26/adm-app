import React, {
  useState,
  useLayoutEffect,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPembelian } from "../store/slices/pembelianSlice";
import TabelViewLaporan from "../components/TabelViewLaporan";
import CurrencyFormat from "react-currency-format";
import { MdDescription, MdPrint } from "react-icons/md";
import ModalDetail from "../components/laporan-pembelian/ModalDetail";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import Nota from "../components/print/Nota";
import ModalBulanan from "../components/laporan-pembelian/ModalBulanan";

const LaporanPembelian = () => {
  const printRef = useRef(null);
  const onBeforeGetContentResolve = useRef(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const dataPembelian = useSelector(
    (state) => state.pembelianSlice.dataPembelian
  );
  const dataSession = useSelector((state) => state.authSlice.dataSession);

  const reactToPrintContent = useCallback(() => {
    return printRef.current;
  }, [printRef.current]);

  const handleAfterPrint = useCallback(() => {
    // tslint:disable-line no-console
  }, []);

  const handleBeforePrint = useCallback(() => {
    // tslint:disable-line no-console
  }, []);

  const handleOnBeforeGetContent = useCallback(() => {
    setLoading(true);

    return new Promise((resolve) => {
      onBeforeGetContentResolve.current = resolve;

      setTimeout(() => {
        setLoading(false);
        resolve();
      }, 2000);
    });
  }, [setLoading]);

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: "Nota",
    onBeforeGetContent: handleOnBeforeGetContent,
    onBeforePrint: handleBeforePrint,
    onAfterPrint: handleAfterPrint,
    removeAfterPrint: true,
  });

  const [valAksi, setValAksi] = useState({
    id: "",
    no: "",
    nama: "",
    pemasok: "",
    alamat: "",
    totalHarga: "",
    detailPembelian: [],
  });

  const showModalHandler = (type, item = null) => {
    let elModal = null;
    if (item !== null) {
      setValAksi((val) => ({
        ...val,
        id: item.id,
        no: item.no,
        nama: item.nama,
        pemasok: item.pemasok,
        alamat: item.alamat,
        totalHarga: item.totalHarga,
        detailPembelian: item.detailPembelian,
      }));
    }

    switch (type) {
      case "bulanan":
        elModal = document.querySelector(`#${type}`);
        break;
      case "detail":
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

  const pageChangeHandler = (e) => {
    dispatch(
      getAllPembelian({ page: e.selected, token: dataSession.data?.token })
    );
  };

  const onPerPageChangeHandler = (e) => {
    dispatch(
      getAllPembelian({ size: e.target.value, token: dataSession.data?.token })
    );
  };

  const searchHandler = (value) => {
    dispatch(
      getAllPembelian({ search: value, token: dataSession.data?.token })
    );
  };

  const tabelHead = [
    { title: "No" },
    { title: "No Nota" },
    { title: "Pemasok" },
    { title: "Alamat" },
    { title: "Total Harga" },
    { title: "Tanggal" },
    { title: "Aksi" },
  ];

  useLayoutEffect(() => {
    dispatch(getAllPembelian({ token: dataSession.data?.token }));
  }, []);

  useEffect(() => {
    if (typeof onBeforeGetContentResolve.current === "function") {
      onBeforeGetContentResolve.current();
    }
  }, [onBeforeGetContentResolve.current]);

  return (
    <>
      <div className="tw-bg-white tw-py-2 tw-px-6 tw-rounded-lg tw-shadow">
        <TabelViewLaporan
          showModalHandler={showModalHandler}
          data={dataPembelian}
          onPerPageChangeHandler={onPerPageChangeHandler}
          pageChangeHandler={pageChangeHandler}
          searchHandler={searchHandler}
          tabelHead={tabelHead}
        >
          {dataPembelian.data.length > 0 ? (
            dataPembelian.data.map((item, i) => (
              <tr
                key={i}
                className="tw-border-t tw-border-b hover:tw-bg-sky-100"
              >
                <td className="tw-border tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12">
                  {dataPembelian.currentPage * dataPembelian.limit + (i + 1)}
                </td>
                <td className="tw-border tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12">
                  {item.no}
                </td>
                <td className="tw-border tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12">
                  {item.pemasok}
                </td>
                <td className="tw-border tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12">
                  {item.alamat}
                </td>
                <td className="tw-border tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12 tw-text-right">
                  <CurrencyFormat
                    value={item.totalHarga}
                    displayType={"text"}
                    thousandSeparator={"."}
                    decimalSeparator={","}
                    prefix={"Rp."}
                    suffix={",-"}
                  />
                </td>
                <td className="tw-border tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12">
                  {moment(item.createdAt).format("M/DD/YYYY")}
                </td>
                <td className="tw-border tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12">
                  <div className="tw-flex tw-gap-2 tw-items-center tw-w-full">
                    <button
                      onClick={() => {
                        showModalHandler("detail", item);
                      }}
                      className="hover:tw-text-gray-500 tw-transition tw-duration-300 tw-ease-in-out"
                      title="Detail"
                    >
                      <MdDescription size={18} />
                    </button>

                    <button
                      onClick={() => {
                        setValAksi(item);
                        handlePrint();
                      }}
                      disabled={loading}
                      className="tw-flex tw-items-center hover:tw-text-gray-500 tw-transition tw-duration-300 tw-ease-in-out"
                      title="Print"
                    >
                      <MdPrint size={18} />
                    </button>

                    <Nota
                      innerRef={printRef}
                      item={valAksi}
                      // name={"boy"}
                    />
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr className="tw-border-b hover:tw-bg-sky-100">
              <td
                colSpan={9}
                className="tw-border tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12"
              >
                {dataPembelian.message}
              </td>
            </tr>
          )}
        </TabelViewLaporan>
      </div>
      <ModalBulanan token={dataSession.data?.token} />
      <ModalDetail valAksi={valAksi} />
    </>
  );
};

export default LaporanPembelian;
