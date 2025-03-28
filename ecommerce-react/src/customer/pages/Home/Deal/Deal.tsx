import React, { useEffect } from "react";
import DealCard from "./DealCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAppSelector } from "../../../../State/Store";

const Deal = () => {
  const {customer}=useAppSelector(store=>store);
  
  useEffect(() => {
    console.log("deals ",customer.homePageData?.deals);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="py-5 lg:px-20 ">
      <div className="flex items-center justify-between">
        {/* <Slider {...settings}> */}
          {customer.homePageData?.deals.slice(0,6).map((item) => (
            <DealCard key={item.id} item={item} />
          ))}
        {/* </Slider> */}
      </div>
    </div>
  );
};

export default Deal;
