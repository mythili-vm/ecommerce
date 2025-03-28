import React from 'react'

const DealCard = ({item}:{item:any}) => {
  return (
    <div className='w-[13rem] cursor-pointer'>
        <img className='border-x-[7px] border-t-[7px] border-pink-600 w-full h-[12-rem] object-cover object-top'
            src={item.category}
            alt=''
        />
        <div className='border-4 border-black bg-black text-white p-2 text-center'>
            <p className='text-lg font-semibold'>{item.category.name}</p>
            <p className='text-2xl font-bold'>{item.discount}% OFF</p>
            <p className='text-balance text-lg'>shop now</p>
        </div>
    </div>
  )
}

export default DealCard