import { Divider } from '@mui/material'
import React from 'react'

interface PricingCardProps {
  subtotal: number;
  total: number;
}

const PricingCard = ({ subtotal, total }: PricingCardProps) => {
  return (
    <>
    <div className='space-y-3 p-5'>
      <div className='flex justify-between items-center'>
        <span>Subtotal</span>
        <span>₹ {total}</span>
      </div>
      <div className='flex justify-between items-center'>
        <span>Discount</span>
        <span>- ₹ {total - subtotal}</span>
      </div>
      <div className='flex justify-between items-center'>
        <span>Shipping</span>
        <span className='text-primary-color'>Free</span>
      </div>
      <div className='flex justify-between items-center'>
        <span>Platform</span>
        <span className='text-primary-color'>Free</span>
      </div>
   

    </div>
    <Divider/>
    <div className='flex justify-between items-center p-5 text-primary-color'>
        <span>Total</span>
        <span>₹ {subtotal}</span>
        </div>
    </>
    
  )
}

export default PricingCard