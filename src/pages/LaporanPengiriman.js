import React, {
  useState,
  useLayoutEffect,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPengiriman } from "../store/slices/pengirimanSlice";
import TabelViewLaporan from "../components/TabelViewLaporan";
import CurrencyFormat from "react-currency-format";
import { MdDescription, MdPrint, MdEdit } from "react-icons/md";
import ModalDetail from "../components/laporan-pengiriman/ModalDetail";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import ModalEdit from "../components/laporan-pengiriman/ModalEdit";
import SuratJalan from "../components/print/SuratJalan";
import ModalBulanan from "../components/laporan-pengiriman/ModalBulanan";

const LaporanPengiriman = () => {
  const printRef = useRef(null);
  const onBeforeGetContentResolve = useRef(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const dataPengiriman = useSelector(
    (state) => state.pengirimanSlice.dataPengiriman
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
    // tslint:disable-line no-console
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
    pembeli: "",
    noPolisi: "",
    totalHarga: "",
    detailPengiriman: [],
  });

  const showModalHandler = (type, item = null) => {
    let elModal = null;
    if (item !== null) {
      setValAksi((val) => ({
        ...val,
        id: item.id,
        no: item.no,
        nama: item.nama,
        pembeli: item.pembeli,
        noPolisi: item.noPolisi,
        totalHarga: item.totalHarga,
        detailPengiriman: item.detailPengiriman,
      }));
    }

    switch (type) {
      case "bulanan":
        elModal = document.querySelector(`#${type}`);
        break;
      case "detail":
        elModal = document.querySelector(`#${type}`);
        break;
      case "edit":
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
      getAllPengiriman({ page: e.selected, token: dataSession.data?.token })
    );
  };

  const onPerPageChangeHandler = (e) => {
    dispatch(
      getAllPengiriman({ size: e.target.value, token: dataSession.data?.token })
    );
  };

  const searchHandler = (value) => {
    dispatch(
      getAllPengiriman({ search: value, token: dataSession.data?.token })
    );
  };

  const tabelHead = [
    { title: "No" },
    { title: "No SJ" },
    { title: "Pembeli" },
    { title: "No Polisi" },
    { title: "Total Harga" },
    { title: "Tanggal" },
    { title: "Aksi" },
  ];

  useLayoutEffect(() => {
    dispatch(getAllPengiriman({ token: dataSession.data?.token }));
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
          data={dataPengiriman}
          onPerPageChangeHandler={onPerPageChangeHandler}
          pageChangeHandler={pageChangeHandler}
          searchHandler={searchHandler}
          tabelHead={tabelHead}
        >
          {dataPengiriman.data.length > 0 ? (
            dataPengiriman.data.map((item, i) => (
              <tr
                key={i}
                className={`${
                  item.totalHarga < 1 ? "tw-bg-green-500" : "tw-bg-white"
                } tw-border-t tw-border-b hover:tw-bg-sky-100`}
              >
                <td className="tw-border tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12">
                  {dataPengiriman.currentPage * dataPengiriman.limit + (i + 1)}
                </td>
                <td className="tw-border tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12">
                  {item.no}
                </td>
                <td className="tw-border tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12">
                  {item.pembeli}
                </td>
                <td className="tw-border tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12">
                  {item.noPolisi}
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
                  {moment(item.createAt).format("M/DD/YYYY")}
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
                    {item.totalHarga < 1 && (
                      <button
                        onClick={() => {
                          showModalHandler("edit", item);
                        }}
                        className="hover:tw-text-gray-500 tw-transition tw-duration-300 tw-ease-in-out"
                        title="Penyesuaian Harga"
                      >
                        <MdEdit size={18} />
                      </button>
                    )}

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

                    <SuratJalan innerRef={printRef} item={valAksi} />
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
                {dataPengiriman.message}
              </td>
            </tr>
          )}
        </TabelViewLaporan>
      </div>
      <ModalBulanan token={dataSession.data?.token} />
      <ModalDetail valAksi={valAksi} />
      <ModalEdit valAksi={valAksi} token={dataSession.data?.token} />
    </>
  );
};

export default LaporanPengiriman;
