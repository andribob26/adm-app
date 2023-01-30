import React, { useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBahanBaku } from "../store/slices/bahanBakuSlice";
import TabelView from "../components/TabelView";
import CurrencyFormat from "react-currency-format";
import { MdEdit, MdDelete } from "react-icons/md";
import ModalTambah from "../components/bahan-baku/ModalTambah";
import ModalEdit from "../components/bahan-baku/ModalEdit";
import ModalRemove from "../components/bahan-baku/ModalRemove";

const BahanBaku = () => {
  const dispatch = useDispatch();
  const dataBahanBaku = useSelector(
    (state) => state.bahanBakuSlice.dataBahanBaku
  );
  const dataSession = useSelector((state) => state.authSlice.dataSession);

  const [valAksi, setValAksi] = useState({
    id: "",
    nama: "",
    stok: "",
  });

  const showModalHandler = (type, item = null) => {
    let elModal = null;
    if (item !== null) {
      setValAksi((val) => ({
        ...val,
        id: item.id,
        nama: item.nama,
        stok: item.stok,
      }));
    }

    switch (type) {
      case "tambah":
        elModal = document.querySelector(`#${type}`);
        break;
      case "edit":
        elModal = document.querySelector(`#${type}`);
        break;
      case "remove":
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
      getAllBahanBaku({ page: e.selected, token: dataSession.data?.token })
    );
  };

  const onPerPageChangeHandler = (e) => {
    dispatch(
      getAllBahanBaku({ size: e.target.value, token: dataSession.data?.token })
    );
  };

  const searchHandler = (value) => {
    dispatch(
      getAllBahanBaku({ search: value, token: dataSession.data?.token })
    );
  };

  const tabelHead = [
    { title: "No" },
    { title: "Nama" },
    { title: "Kg" },
    { title: "Aksi" },
  ];

  useLayoutEffect(() => {
    dispatch(getAllBahanBaku({ token: dataSession.data?.token }));
  }, []);

  return (
    <>
      <div className="tw-bg-white tw-py-2 tw-px-6 tw-rounded-lg tw-shadow">
        <TabelView
          showModalHandler={showModalHandler}
          data={dataBahanBaku}
          onPerPageChangeHandler={onPerPageChangeHandler}
          pageChangeHandler={pageChangeHandler}
          searchHandler={searchHandler}
          tabelHead={tabelHead}
        >
          {dataBahanBaku.data.length > 0 ? (
            dataBahanBaku.data.map((item, i) => (
              <tr key={i} className="tw-border-b hover:tw-bg-sky-100">
                <td className="tw-border tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12">
                  {dataBahanBaku.currentPage * dataBahanBaku.limit + (i + 1)}
                </td>
                <td className="tw-border tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12">
                  {item.nama}
                </td>

                <td className="tw-border tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12 tw-text-right">
                  <CurrencyFormat
                    value={item.stok}
                    displayType={"text"}
                    thousandSeparator={"."}
                    decimalSeparator={","}
                  />
                </td>
                <td className="tw-border tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12">
                  <div className="tw-flex tw-gap-2 tw-items-center tw-w-full">
                    <button
                      onClick={() => {
                        showModalHandler("edit", item);
                      }}
                      className="hover:tw-text-gray-500 tw-transition tw-duration-300 tw-ease-in-out"
                      title="Edit"
                    >
                      <MdEdit size={18} />
                    </button>
                    <button
                      onClick={() => {
                        showModalHandler("remove", item);
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
                colSpan={9}
                className="tw-border tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12"
              >
                {dataBahanBaku.message}
              </td>
            </tr>
          )}
        </TabelView>
      </div>
      <ModalTambah token={dataSession.data?.token} />
      <ModalEdit valAksi={valAksi} token={dataSession.data?.token} />
      <ModalRemove valAksi={valAksi} token={dataSession.data?.token} />
    </>
  );
};

export default BahanBaku;
