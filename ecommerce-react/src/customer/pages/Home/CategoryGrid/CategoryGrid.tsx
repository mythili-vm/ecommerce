import React from 'react'

const CategoryGrid = () => {
  return (
    <div className='grid gap-4 grid-rows-12 grid-cols-12 lg:h-[600px] px-5 lg:px-20'>
        <div className='col-span-3 row-span-12 text-white'>
            <img className='w-full h-full object-cover object-top rounded-md' src='https://maharaniwomen.b-cdn.net/wp-content/uploads/2021/09/A2.jpg'
            alt=''/>
        </div>
        <div className='col-span-2 row-span-6 text-white'>
            <img className='w-full h-full object-cover object-top rounded-md' 
            src='https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/19683634/2022/8/27/3861f04b-3c97-4c69-96ab-2598a9d5f1841661587410238TeakwoodLeathersMenBrownSolidLeatherFormalOxfordShoes1.jpg'
            alt=''/>
        </div>
        <div className='col-span-4 row-span-6 text-white'>
            <img className='w-full h-full object-cover object-top rounded-md' src='https://images.lifestyleasia.com/wp-content/uploads/sites/7/2020/06/04221414/94355437_557170458266142_2059950625939816594_n.jpg?tr=w-1600'
            alt=''/>
        </div>
        <div className='col-span-3 row-span-12 text-white'>
            <img className='w-full h-full object-cover object-top rounded-md' src='https://goldenattirestore.com/cdn/shop/files/Untitleddesign_45.png?v=1736364116'
            alt=''/>
        </div>
        <div className='col-span-4 row-span-6 text-white'>
            <img className='w-full h-full object-cover object-top rounded-md' src='https://media.istockphoto.com/id/1276740597/photo/indian-traditional-gold-necklace.jpg?s=612x612&w=0&k=20&c=OYp1k0OVJObYq9hqVK_r6NwYa_W54km4nya1R-ovIUY='
            alt=''/>
        </div>
        <div className='col-span-2 row-span-6 text-white'>
            <img className='w-full h-full object-cover object-top rounded-md' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGso-4Cf5xYYCGYEc-jkgdEOH4-qnnNueWkw&s'
            alt=''/>
        </div>
    </div>
  )
}

export default CategoryGrid