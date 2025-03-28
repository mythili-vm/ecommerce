import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import sellerSlice from "./seller/sellerSlice";
import sellerProductSlice from "./seller/sellerProductSlice";
import productSlice from "./customer/ProductSlice";
import authSlice from "./AuthSlice";
import cartSlice from "./customer/CartSlice";
import orderSlice from "./customer/orderSlice";
import wishlistSlice from "./customer/wishlistSlice";
import sellerOrderSlice from "./seller/sellerOrderSlice";
import transactionSlice from "./seller/transactionSlice";
import customerSlice from "./customer/customerSlice";
import adminSlice from "./admin/AdminSlice";
import dealSlice from "./admin/DealSlice";
import adminSellerSlice from "./admin/AdminSellerSlice";
import adminCouponSlice from "./admin/AdminCouponSlice";
import categorySlice from "./customer/categorySlice";
import levelThreeCategoriesSlice from "./customer/levelThreeCategoriesSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "seller","cart"], // Only persist these reducers
};

const rootReducer = combineReducers({
  seller: sellerSlice,
  sellerProduct: sellerProductSlice,
  product: productSlice,
  auth: authSlice,
  cart: cartSlice,
  order: orderSlice,
  wishlist: wishlistSlice,
  customer: customerSlice,
  category: categorySlice,
  levelThreeCategories: levelThreeCategoriesSlice,

  // Seller reducers
  sellerOrder: sellerOrderSlice,
  sellerTransaction: transactionSlice,

  // Admin reducers
  admin: adminSlice,
  deal: dealSlice,
  adminSeller: adminSellerSlice,
  adminCoupon: adminCouponSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer, // 🔹 Use persistedReducer instead of rootReducer
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store); // 🔹 Required for persistence

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
