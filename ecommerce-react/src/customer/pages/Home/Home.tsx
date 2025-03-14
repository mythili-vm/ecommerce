import React from "react";
import ElectricCategory from "./ElectricCategory/ElectricCategory";
import CategoryGrid from "./CategoryGrid/CategoryGrid";
import Deal from "./Deal/Deal";
import ShopByCategory from "./ShopByCategory/ShopByCategory";
import { Button } from "@mui/material";
import Storefront from "@mui/icons-material/Storefront";

export const Home = () => {
  return (
    <>
      <div className="space-y-5 lg:space-y-10 relative pb-20">
        <ElectricCategory />
        <CategoryGrid />
        <div className="mt-20">
          <h1 className="text-lg lg:text-4xl font-bold text-primary-color pb-5 lg:pb-20 text-center">
            TODAY'S DEAL
          </h1>
          <Deal />
        </div>

        <section className="mt-20">
          <h1 className="text-lg lg:text-4xl font-bold text-primary-color pb-5 lg:pb-20 text-center">
            SHOP BY CATEGORY
          </h1>
          <ShopByCategory />
        </section>
        <section className="mt-20 lg:px-20 relative h-[200px] lg:h-[450px]">
          <img
            className="w-full h-full"
            src="https://img.freepik.com/free-photo/beautiful-young-brunette-woman-posing-happy-against-beige-background-smiling-camera-wearing-sweat_1258-121301.jpg?t=st=1741970863~exp=1741974463~hmac=3ba9fd1166d0d2fa454b0c8f1c3a9d1b8aabdccfee6b0ec481b7585946589205&w=1380"
            alt=""
          />
          <div className="absolute top-1/2 left-4 lg:left-[15rem] transform -translate-y-1/2 font-semibold lg:text-4xl space-y-3">
            <h1>Sell your Product</h1>
            <p>With</p>
            <p className="logo">Magizh Tech</p>
            <div className="pt-6 flex justify-center">
              <Button
                startIcon={<Storefront />}
                variant="contained"
                size="large"
              >
              Become Seller </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
