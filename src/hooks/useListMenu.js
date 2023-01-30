import {
  MdDashboard,
  MdPeopleAlt,
  MdSportsRugby,
  MdMenuBook,
  MdRoomPreferences,
  MdViewAgenda,
  MdLocalShipping,
  MdPointOfSale,
} from "react-icons/md";
import hasRole from "../utils/hasRole";
import { useSelector } from "react-redux";

const useListMenu = () => {
  const dataSession = useSelector((state) => state.authSlice.dataSession);
  return [
    {
      id: "dashboard",
      link: "/",
      title: "Dashboard",
      icon: MdDashboard,
      subMenu: null,
      hasRole: true,
    },
    {
      id: "management-user",
      link: "/management-user",
      title: "Management User",
      icon: MdPeopleAlt,
      subMenu: null,
      hasRole: hasRole(dataSession.data?.role, ["Pemilik"]),
    },
    {
      id: "bahan-baku",
      link: "/bahan-baku",
      title: "Bahan baku",
      icon: MdSportsRugby,
      subMenu: null,
      hasRole: hasRole(dataSession.data?.role, ["Sekretaris"]),
    },
    {
      id: "produk",
      link: "/produk",
      title: "Produk",
      icon: MdViewAgenda,
      subMenu: null,
      hasRole: hasRole(dataSession.data?.role, ["Sekretaris"]),
    },
    {
      id: "produksi",
      link: "/produksi",
      title: "Produksi",
      icon: MdRoomPreferences,
      subMenu: null,
      hasRole: hasRole(dataSession.data?.role, ["Sekretaris"]),
    },
    {
      id: "pembelian",
      link: "/pembelian",
      title: "Pembelian",
      icon: MdPointOfSale,
      subMenu: null,
      hasRole: hasRole(dataSession.data?.role, ["Bag.Pembelian"]),
    },
    {
      id: "pengiriman",
      link: "/pengiriman",
      title: "Pengiriman",
      icon: MdLocalShipping,
      subMenu: null,
      hasRole: hasRole(dataSession.data?.role, ["Sekretaris"]),
    },
    {
      id: "laporan-pembelian",
      link: "/laporan-pembelian",
      title: "Laporan Pembelian",
      icon: MdMenuBook,
      subMenu: null,
      hasRole: hasRole(dataSession.data?.role, ["Pemilik", "Sekretaris", "Bag.Pembelian"]),
    },

    {
      id: "laporan-pengiriman",
      link: "/laporan-pengiriman",
      title: "Laporan Pengiriman",
      icon: MdMenuBook,
      subMenu: null,
      hasRole: hasRole(dataSession.data?.role, ["Pemilik", "Sekretaris"]),
    },
  ];
};

export default useListMenu;
