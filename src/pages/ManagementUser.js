import React, { useState, useLayoutEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUser } from "../store/slices/userSlice";
import TabelView from "../components/TabelView";
import { MdAutorenew, MdDelete } from "react-icons/md";
import ModalTambah from "../components/management-user/ModalTambah";
import ModalReset from "../components/management-user/ModalReset";
import ModalRemove from "../components/management-user/ModalRemove";
import moment from "moment";

const ManagementUser = () => {
  const dispatch = useDispatch();
  const dataUser = useSelector((state) => state.userSlice.dataUser);
  const dataSession = useSelector((state) => state.authSlice.dataSession);

  const [valAksi, setValAksi] = useState({
    id: "",
    nama: "",
    username: "",
    noHp: "",
    role: "",
    lastLogin: "",
  });

  const showModalHandler = (type, item = null) => {
    let elModal = null;
    if (item !== null) {
      setValAksi((val) => ({
        ...val,
        id: item.id,
        nama: item.nama,
        username: item.username,
        noHp: item.noHp,
        role: item.role,
        lastLogin: item.lastLogin,
      }));
    }

    switch (type) {
      case "tambah":
        elModal = document.querySelector(`#${type}`);
        break;
      case "reset":
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
    dispatch(getAllUser({ page: e.selected, token: dataSession.data?.token }));
  };

  const onPerPageChangeHandler = (e) => {
    dispatch(
      getAllUser({ size: e.target.value, token: dataSession.data?.token })
    );
  };

  const searchHandler = (value) => {
    dispatch(getAllUser({ search: value, token: dataSession.data?.token }));
  };

  const tabelHead = [
    { title: "No" },
    { title: "Username" },
    { title: "Nama" },
    { title: "No Hp" },
    { title: "Hak Akses" },
    { title: "Last Login" },
    { title: "Aksi" },
  ];

  useLayoutEffect(() => {
    dispatch(getAllUser({ token: dataSession.data?.token }));
  }, []);

  return (
    <>
      <div className="tw-bg-white tw-py-2 tw-px-6 tw-rounded-lg tw-shadow">
        <TabelView
          showModalHandler={showModalHandler}
          data={dataUser}
          onPerPageChangeHandler={onPerPageChangeHandler}
          pageChangeHandler={pageChangeHandler}
          searchHandler={searchHandler}
          tabelHead={tabelHead}
        >
          {dataUser.data.length > 1 ? (
            dataUser.data.map(
              (item, i) =>
                item.role !== "Pemilik" && (
                  <tr key={i} className="tw-border-b hover:tw-bg-sky-100">
                    <td className="tw-border tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12">
                      {dataUser.currentPage * dataUser.limit + (i + 1)}
                    </td>
                    <td className="tw-border tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12">
                      {item.username}
                    </td>
                    <td className="tw-border tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12">
                      {item.nama}
                    </td>
                    <td className="tw-border tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12">
                      {item.noHp}
                    </td>
                    <td className="tw-border tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12">
                      {item.role}
                    </td>
                    <td className="tw-border tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12">
                      {item.lastLogin !== null
                        ? moment(item.lastLogin).format("M/DD/YYYY HH:mm")
                        : "_"}
                    </td>
                    <td className="tw-border tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12">
                      <div className="tw-flex tw-gap-2 tw-items-center tw-w-full">
                        <button
                          onClick={() => {
                            showModalHandler("reset", item);
                          }}
                          className="hover:tw-text-gray-500 tw-transition tw-duration-300 tw-ease-in-out"
                          title="Reset password"
                        >
                          <MdAutorenew size={18} />
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
                )
            )
          ) : (
            <tr className="tw-border-b hover:tw-bg-sky-100">
              <td
                colSpan={9}
                className="tw-border tw-text-xs tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-wrap tw-w-12"
              >
                Tidak ada data
              </td>
            </tr>
          )}
        </TabelView>
      </div>
      <ModalTambah token={dataSession.data?.token} />
      <ModalReset valAksi={valAksi} token={dataSession.data?.token} />
      <ModalRemove valAksi={valAksi} token={dataSession.data?.token} />
    </>
  );
};

export default ManagementUser;
