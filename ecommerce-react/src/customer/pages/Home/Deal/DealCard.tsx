import React from 'react'

const DealCard = () => {
  return (
    <div className='w-[13rem] cursor-pointer'>
        <img className='border-x-[7px] border-t-[7px] border-pink-600 w-full h-[12-rem] object-cover object-top'
            src='https://acwo.com/cdn/shop/files/white_sx_ontable_2_0121a2c2-4371-4d5e-b54a-3858dcdb10bf_533x.webp?v=1715664912'
            alt=''
        />
        <div className='border-4 border-black bg-black text-white p-2 text-center'>
            <p className='text-lg font-semibold'>Smart Watch</p>
            <p className='text-2xl font-bold'>20% OFF</p>
            <p className='text-balance text-lg'>shop now</p>
        </div>
    </div>
  )
}

export default DealCard