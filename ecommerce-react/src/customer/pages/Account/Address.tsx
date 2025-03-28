import React from 'react'
import UserAddressCard from './UserAddressCard'
import { useAppSelector } from '../../../State/Store';

const Address = () => {
  const {auth}=useAppSelector(store=>store);
  return (
    <div className='space-y-3'>
        {auth.user?.addresses.map((item)=>(<UserAddressCard key={item.id} address={item}/>))}
    </div>
  )
}

export default Address