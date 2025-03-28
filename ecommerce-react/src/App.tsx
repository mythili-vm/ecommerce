import { useEffect } from "react";
import "./App.css";
import Navbar from "./customer/components/Navbar/Navbar";
import customTheme from "./Theme/customTheme";
import { ThemeProvider } from "@mui/material";
import Home from "./customer/pages/Home/Home";
import Product from "./customer/pages/Products/Product";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProductDetails from "./customer/pages/Page Details/ProductDetails";
import Review from "./customer/pages/Review/Review";
import Cart from "./customer/pages/Cart/Cart";
import Checkout from "./customer/pages/Checkout/Checkout";
import Account from "./customer/pages/Account/Account";
import BecomeSeller from "./customer/pages/BecomeSeller/BecomeSeller";
import SellerDashboard from "./seller/pages/SellerDashboard/SellerDashboard";
import AdminDashboard from "./admin/pages/Dashboard/Dashboard";
import { useAppDispatch, useAppSelector } from "./State/Store";
import { fetchSellerProfile } from "./State/seller/sellerSlice";
import Auth from "./customer/pages/Auth/Auth";
import { fetchUserProfile } from "./State/AuthSlice";
import PaymentSucess from "./customer/pages/Payment/PaymentSucess";
import Wishlist from "./customer/pages/Wishlist/Wishlist";
import { isNotNullOrUndefined } from "./util/utils";
import { getHomeCategories } from "./State/customer/customerSlice";
import { ROLE_SELLER } from "./util/constants";
import { fetchCategories } from "./State/customer/categorySlice";

function App() {
  const dispatch = useAppDispatch();
  const { seller, auth } = useAppSelector((store) => store);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCategories());
  },[]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    const role = localStorage.getItem("role");
    if (isNotNullOrUndefined(jwt) && role === ROLE_SELLER) {
      dispatch(fetchSellerProfile(jwt));
    }
    dispatch(getHomeCategories());
  }, [auth.jwt]);

  useEffect(() => {
    if (seller.profile) {
      navigate("/");
    }
  }, [seller.profile]);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt") ?? auth.jwt;
    const role = localStorage.getItem("role");

    if (isNotNullOrUndefined(jwt) && role !== ROLE_SELLER) {
      dispatch(fetchUserProfile({ jwt }));
    }
  }, [auth.jwt]);

  return (
    <ThemeProvider theme={customTheme}>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:category" element={<Product />} />
          <Route path="/reviews/:productId" element={<Review />} />
          <Route
            path="/product-details/:categoryId/:name/:productId"
            element={<ProductDetails />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment-success/:orderId" element={<PaymentSucess />} />
          <Route path="/account/*" element={<Account />} />
          <Route path="/become-seller" element={<BecomeSeller />} />
          <Route path="/seller/*" element={<SellerDashboard />} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/login" element={<Auth />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
