import React from "react";
import { Avatar, Box, Button, Icon, IconButton, useMediaQuery, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import StorefrontIcon from "@mui/icons-material/Storefront";
const Navbar = () => {

    const theme=useTheme();
    const isLarge=useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <div>
      <Box>
        <div className="flex items-center justify-between px-5 lg:px-20 h-[70px] border-b">
          <div className="flex items-center gap-9">
            <div className="flex items-center gap-2">
              <IconButton>
                <MenuIcon />
              </IconButton>
              <h1 className="logo cursor-pointer text-lg md:text-2xl text-primary-color">
                Magizh Tech
              </h1>
            </div>
            <ul className="flex items-center font-medium  text-gray-800">
                {["Men","Women","Home & Furniture","Electronics"].map((item)=>
                    <li className="maincategory hover:text-primary-color hover:border-b-2 h-[70px] px-4 border-primary-color flex items-center" >
                        {item}
                    </li>)}
                
            </ul>
          </div>
          <div className="flex gap-1 lg:gap-6 items-center">
            <IconButton>
              <SearchIcon />
            </IconButton>
            {false ? (
              <Button>
                <Avatar
                  sx={{ width: 29, height: 29 }}
                  src="https://d2az3zd39o5d63.cloudfront.net/linkedin-profile-picture-squinch.jpg"
                />
                <h1 className="font-semibold hidden lg:block">Magizh</h1>
              </Button>
            ) : (
              <Button variant="contained">Login</Button>
            )}
            <IconButton>
              <FavoriteBorderIcon sx={{ fontSize: 29 }} />
            </IconButton>
            <IconButton>
              <AddShoppingCartIcon
                className="text-gray-700"
                sx={{ fontSize: 29 }}
              />
            </IconButton>
            {isLarge && (
              <Button startIcon={<StorefrontIcon />} variant="outlined">
                Become Seller
              </Button>
            )}
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Navbar;
