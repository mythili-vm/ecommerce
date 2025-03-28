import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
import CategorySheet from "./CategorySheet";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../State/Store";
import { ROLE_ADMIN, ROLE_SELLER } from "../../../util/constants";
const Navbar = () => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.up("lg"));
  const [selectedCategory, setSelectedCategory] = useState("men");
  const [showCategorySheet, setShowCategorySheet] = useState(false);
  const navigate = useNavigate();
  const { auth,seller,category } = useAppSelector((store) => store);

  useEffect(() => {
    console.log(selectedCategory);
    console.log(category.categories.find((item) => item.categoryId === selectedCategory)?.subcategories);
  },[selectedCategory]);

  useEffect(() => {
    console.log(auth,"   auht");
  },[])

  return (
    <div>
      <Box className="sticky top-0 left-0 right-0 bg-white" sx={{ zIndex: 2 }}>
        <div className="flex items-center justify-between px-5 lg:px-20 h-[70px] border-b">
          <div className="flex items-center gap-9">
            <div className="flex items-center gap-2">
              {!isLarge && (
                <IconButton>
                  <MenuIcon />
                </IconButton>
              )}
              <h1
                onClick={() => {
                  navigate("/");
                }}
                className="logo cursor-pointer text-lg md:text-2xl text-primary-color"
              >
                Magizh Tech
              </h1>
            </div>
            <ul className="flex items-center font-medium  text-gray-800">
              {category.categories.map((item) => (
                <li
                  key={item.categoryId}
                  onMouseLeave={() => {
                    setShowCategorySheet(false);
                  }}
                  onMouseEnter={() => {
                    setSelectedCategory(item.categoryId);
                    setShowCategorySheet(true);
                  }}
                  className="maincategory hover:text-primary-color hover:border-b-2 h-[70px] px-4 border-primary-color flex items-center"
                >
                  {item.categoryId}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-1 lg:gap-6 items-center">
            <IconButton>
              <SearchIcon />
            </IconButton>
            {auth.isLoggedIn ? (
              <Button
                onClick={() => {
                  let targetPath = "/account/orders"; // Default path
                  if (auth.user?.role === ROLE_ADMIN) {
                    targetPath = "/admin";
                  } else if (seller.profile?.role === ROLE_SELLER) {
                    targetPath = "/seller";
                  }
                  navigate(targetPath);
                }}
                className="flex items-center gap-2"
              >
                <Avatar
                  sx={{ width: 29, height: 29 }}
                  src="https://d2az3zd39o5d63.cloudfront.net/linkedin-profile-picture-squinch.jpg"
                />
                <h1 className=" font-semibold hidden lg:block">
                  { (auth.user?.fullName !== undefined && auth.user?.fullName !== null) ? auth.user?.fullName :  seller.profile?.sellerName}
                </h1>
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </Button>
            )}
            <IconButton
              onClick={() => {
                navigate("/wishlist");
              }}
            >
              <FavoriteBorderIcon sx={{ fontSize: 29 }} />
            </IconButton>
            <IconButton
              onClick={() => {
                navigate("/cart");
              }}
            >
              <AddShoppingCartIcon
                className="text-gray-700"
                sx={{ fontSize: 29 }}
              />
            </IconButton>
            {isLarge && (
              <Button
                onClick={() => {
                  navigate("/become-seller");
                }}
                startIcon={<StorefrontIcon />}
                variant="outlined"
              >
                Become Seller
              </Button>
            )}
          </div>
        </div>
        {showCategorySheet && (
          <div
            onMouseLeave={() => {
              setShowCategorySheet(false);
            }}
            onMouseEnter={() => {
              setShowCategorySheet(true);
            }}
            className="categorySheet absolute top-[4.41rem] left-20 right-20 border bg-slate-500"
          >
            <CategorySheet selectedCategory={selectedCategory} 
            categories={category.categories.find((item) => item.categoryId === selectedCategory)?.subcategories ?? []}  />
          </div>
        )}
      </Box>
    </div>
  );
};

export default Navbar;
