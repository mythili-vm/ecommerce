import React from 'react'
import ElectricCategoryCard from './ElectricCategoryCard'

const ElectricCategory = () => {
  return (
    <div className='flex flex-wrap justify-between py-5 lg:px-20 border-b'>
        {[1,2,3,4,5].map((item)=> <ElectricCategoryCard/>)}
       
    </div>
  )
}

export default ElectricCategory