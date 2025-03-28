import { Favorite, ModeComment } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { teal } from '@mui/material/colors';
import React, { useState } from 'react'

const SimilarProductCard = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
  return (
    <div>
        <div className="group px-4 relative">
      <div
        className="card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)} // ✅ Supports keyboard focus
        onBlur={() => setIsHovered(false)} // ✅ Handles focus loss
      >
          <img
            className="card-media object-top"
            src="https://cdn.shopify.com/s/files/1/1384/4105/files/plain-silk-saree-with-golden-border_2048x2048.jpg?v=1529738800"
            alt=""
          />
        

        { isHovered &&
          <div className="indicator flex flex-col justify-center items-center space-y-2">
            <div className="flex gap-3">
              <Button variant="contained" color="secondary">
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
          <h1>Niky</h1>
          <p>Blue shirt</p>
        </div>
        <div className="price flex items-center gap-3">
          <span className="font-sans text-gray-800">₹ 400</span>
          <span className="thin-line-through text-gray-400">₹ 999</span>
          <span className="text-primary-color">60%</span>
        </div>
      </div>
    </div>
    </div>
  )
}

export default SimilarProductCard