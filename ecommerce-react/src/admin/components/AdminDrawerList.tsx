import React from "react";
import DrawerList from "../../component/DrawerList";
import {
  AccountBox,
  Add,
  AddCircleOutline,
  Category,
  Dashboard,
  ElectricBolt,
  Home,
  IntegrationInstructions,
  Inventory,
  LocalOffer,
  Logout,
  Sell,
  SellOutlined,
} from "@mui/icons-material";

const menu = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: <Dashboard className="text-primary-color" />,
    activeIcon: <Dashboard className="text-white" />,
  },
  {
    name: "Coupons",
    path: "/admin/coupon",
    icon: <IntegrationInstructions className="text-primary-color" />,
    activeIcon: <IntegrationInstructions className="text-white" />,
  },
  {
    name: "Category",
    path: "/admin/category",
    icon: <AddCircleOutline className="text-primary-color" />,
    activeIcon: <AddCircleOutline className="text-white" />,
  },
  {
    /**
     * Home Page Grid
     */
    name: "Home Category",
    path: "/admin/home-grid",
    icon: <Home className="text-primary-color" />,
    activeIcon: <Home className="text-white" />,
  },
  // {
  //   name: "Electronics Category",
  //   path: "/admin/electronics-category",
  //   icon: <ElectricBolt className="text-primary-color" />,
  //   activeIcon: <ElectricBolt className="text-white" />,
  // },
  {
    name: "Shop By Category",
    path: "/admin/shop-by-category",
    icon: <Category className="text-primary-color" />,
    activeIcon: <Category className="text-white" />,
  },
  {
    name: "Deal Category",
    path: "/admin/deal-category",
    icon: <Inventory className="text-primary-color" />,
    activeIcon: <Inventory className="text-white" />,
  },
  {
    //get products from dealcategory
    name: "Deals",
    path: "/admin/deals",
    icon: <LocalOffer className="text-primary-color" />,
    activeIcon: <LocalOffer className="text-white" />,
  },
];

const menu2 = [
  {
    name: "Account",
    path: "/seller/account",
    icon: <AccountBox className="text-primary-color" />,
    activeIcon: <AccountBox className="text-white" />,
  },
  {
    name: "Logout",
    path: "/",
    icon: <Logout className="text-primary-color" />,
    activeIcon: <Logout className="text-white" />,
  },
];

const AdminDrawerList = ({ toggleDrawer }: any) => {
  return <DrawerList menu={menu} menu2={menu2} toggleDrawer={toggleDrawer} />;
};

export default AdminDrawerList;
