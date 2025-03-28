import React, { useEffect } from 'react'
import AdminDrawerList from '../../components/AdminDrawerList'
import AdminRoutes from '../../../Routes/AdminRoutes'
import { useAppDispatch, useAppSelector } from '../../../State/Store';
import { searchProduct } from '../../../State/customer/ProductSlice';


const AdminDashboard = () => {
  const dispatch = useAppDispatch();
  const {product} = useAppSelector((store) => store);
  useEffect(() => {
    dispatch(searchProduct());
  }, []);

  useEffect(() => {
    console.log("product",product);
  },[])
  const toggleDrawer = () => {}
  return (
    <div>
      <div className='lg:flex lg:h-[90vh]'>
        <section className='hidden lg:block h-full'>
          <AdminDrawerList toggleDrawer={toggleDrawer}/>
        </section>
        <section className='p-10 w-full lg:w-[80%] overflow-y-auto'>
            <AdminRoutes products={product.products}/>
        </section>
      </div>
    </div>
  )
}

export default AdminDashboard