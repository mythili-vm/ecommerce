import React from 'react'
import "./ShopByCategory.css"

const ShopByCategoryCard = () => {
  return (
    <div className='flex gap-3 flex-col justify-center items-center group cursor-pointer'>
        <div className='custom-border w-[150px] h-[150px] lg:w-[249px] lg:h-[249px] rounded-full bg-primary-color'>
            <img className='rounded-full group-hover:scale-95 transition-transform transform-duration-700 object-cover object-top h-full w-full'
                src='https://petalhome.in/cdn/shop/products/01-3_cb02e6f1-15d2-4b72-a8b1-5411b574e0aa_696x927.jpg?v=1686194356'
                alt=''
            />
        </div>
        <h1>Kitchen & Table</h1>

    </div>
  )
}

export default ShopByCategoryCard