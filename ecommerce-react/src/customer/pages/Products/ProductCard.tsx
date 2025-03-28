import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import { Button } from "@mui/material";
import { Favorite, ModeComment } from "@mui/icons-material";
import teal from "@mui/material/colors/teal";
import { Product } from "../../../types/ProductTypes";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../State/Store";
import { addproductToWishlist } from "../../../State/customer/wishlistSlice";

const ProductCard = ({item}:{item:Product}) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const navigate=useNavigate();
  const dispatch=useAppDispatch();

  useEffect(() => {
    let interval: any;

    if (isHovered) {
      interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % item.images.length);
      }, 3000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHovered]);

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Handles the click event for adding a product to the wishlist.
 * 
 * @param e - The mouse event triggered by clicking the wishlist button.
 * 
 * Stops the propagation of the event to prevent parent handlers from executing.
 * Dispatches an action to add the product to the wishlist if the product ID is available.
 */

/******  66418732-a2ef-4011-87d8-ccbf41727b08  *******/
  const handleWishlist=(e:any)=>{
    e.stopPropagation();
   item.id && dispatch(addproductToWishlist({productId:item.id}))
  }

  return (
    <div onClick={()=>navigate(`/product-details/${item.category?.categoryId}/${item.title}/${item.id}`)} className="group px-4 relative">
      <div
        className="card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)} // ✅ Supports keyboard focus
        onBlur={() => setIsHovered(false)} // ✅ Handles focus loss
      >
        {item.images.map((item, index) => (
          <img
            key={index} // ✅ Added key prop
            className="card-media object-top"
            src={item}
            alt=""
            style={{
              transform: `translateX(${(index - currentImage) * 100}%)`,
              transition: "transform 0.5s ease-in-out",
            }}
          />
        ))}

        { isHovered &&
          <div className="indicator flex flex-col justify-center items-center space-y-2">
            <div className="flex gap-3">
              <Button onClick={handleWishlist} variant="contained" color="secondary">
                <Favorite sx={{ color: teal[500] }} />
              </Button>
              <Button variant="contained" color="secondary">
                <ModeComment sx={{ color: teal[500] }} />
              </Button>
            </div>
          </div>
        }
      </div>

      <div className="details pt-3 space-y-1 group-hover-effect rounded-md">
        <div className="name">
          <h1>{item.seller?.businessDetails.businessName}</h1>
          <p>{item.title}</p>
        </div>
        <div className="price flex items-center gap-3">
          <span className="font-sans text-gray-800">₹ {item.sellingPrice}</span>
          <span className="thin-line-through text-gray-400">₹ {item.mrpPrice}</span>
          <span className="text-primary-color">{item.discountPercent}%</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
