import { Button } from '@mui/material'
import React, { useState } from 'react'
import DealTable from './DealTable'
import CreateDealForm from './CreateDealForm'

const tabs=[
  "Deals",
  "Create Deal"
]

const Deal = () => {
  const [activeDeal,setActiveDeal]=useState("Deals")
  return (
    <div className='space-y-2'>
      <div className='flex gap-2'>
        {tabs.map((item)=><Button  key={item}
        onClick={()=>setActiveDeal(item)}
        variant={activeDeal===item?"contained":"outlined"}>{item}</Button>)}
      </div>
      <div className='mt-5 flex flex-col justify-center items-center'>
        {activeDeal==="Deals"?(<DealTable/>):(<CreateDealForm/>)}
      </div>
    </div>
  )
}

export default Deal