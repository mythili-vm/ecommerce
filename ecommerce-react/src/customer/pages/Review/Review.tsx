import React from 'react'
import ReviewCard from './ReviewCard'
import { Divider } from '@mui/material'

const Review = () => {
  return (
    <div className='p-5 lg:px-20 flex flec-col lg:flex-row gap-20'>
      <section className='w-full md:w-1/2 lg:w-[30%] space-y-2'>
        <img src='https://wholetex.sgp1.cdn.digitaloceanspaces.com/full/banarasi-soft-silk-meena-and-zari-saree-9522.jpg' alt=""/>
        <div>
          <div>
              <p className='font-bold text-xl'>Virani Clothing</p>
              <p className='text-lg text-gray-500'>Men's White Shirt</p>
          </div>
          <div>
            <div className="price flex items-center gap-3 text-2xl">
              <span className="font-sans text-gray-800">₹ 400</span>
              <span className="thin-line-through text-gray-400">₹ 999</span>
              <span className="text-primary-color">60%</span>
            </div>
          </div>
        </div>
      </section>
      <section>
       {[1,1,1,1].map(()=><div className='mt-3 space-y-3 w-full'><ReviewCard/>
       <Divider/>
       </div>)}
      </section>

    </div>
  )
}

export default Review