import { Route, Routes } from "react-router-dom";
import SellersTable from "../admin/pages/Sellers/SellersTable";
import Coupon from "../admin/pages/Coupon/Coupon";
import AddNewCouponForm from "../admin/pages/Coupon/AddNewCouponForm";
import GridTable from "../admin/pages/HomePage/GridTable";
import ElectronicTable from "../admin/pages/HomePage/ElectronicTable";
import ShopByCategoryTable from "../admin/pages/HomePage/ShopByCategoryTable";
import DealCategoryTable from "../admin/pages/HomePage/DealCategoryTable";
import { HomeCategorySection } from "../admin/components/CategoryModalForm";
import Deal from "../admin/pages/HomePage/Deal/Deal";
import CategoryList from "../admin/pages/HomePage/CategoryList";
import { Product } from "../types/ProductTypes";
interface AdminRoutesProps {
  products: Product[];
}
const AdminRoutes = (props: AdminRoutesProps) => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SellersTable />} />
        <Route path="/coupon" element={<Coupon />} />
        <Route path="/add-coupon" element={<AddNewCouponForm />} />
        <Route
          path="/home-grid"
          element={
            <GridTable
              section={HomeCategorySection.GRID}
              products={props.products}
            />
          }
        />
        <Route
          path="/electronics-category"
          element={
            <ElectronicTable
              products={props.products}
              section={HomeCategorySection.ELECTRIC_CATEGORIES}
            />
          }
        />
        <Route
          path="/shop-by-category"
          element={
            <ShopByCategoryTable
              products={props.products}
              section={HomeCategorySection.SHOP_BY_CATEGORIES}
            />
          }
        />
        <Route
          path="/deal-category"
          element={
            <DealCategoryTable
              products={props.products}
              section={HomeCategorySection.DEALS}
            />
          }
        />
        <Route path="/deals" element={<Deal />} />
        <Route path="/category" element={<CategoryList />} />
      </Routes>
    </div>
  );
};

export default AdminRoutes;
