import { Box, Button, Grid2, TextField } from '@mui/material'
import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import { useAppDispatch } from '../../../State/Store';
import { createOrder } from '../../../State/customer/orderSlice';


const AddressFormSchema=Yup.object({
    name: Yup.string().required('Name is required'),
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, 'Mobile must be 10 digits')
      .required('Mobile is required'),
    address: Yup.string().required('Address is required'),
    pincode: Yup.string()
      .matches(/^[0-9]{6}$/, 'Pincode must be 6 digits')
      .required('Pincode is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    locality: Yup.string().required('Locality is required'),
  })



const AddressForm = ({paymentGateway}:any) => {
    const dispatch=useAppDispatch();

    const formik=useFormik({
        initialValues:{
            name:"",
            mobileNumber:"",
            address:"",
            pinCode:"",
            city:"",
            state:"",
            locality:"",
        },
        validationSchema:AddressFormSchema,
        onSubmit:(values) =>{
            console.log(values);
            dispatch(createOrder({address:values, jwt:localStorage.getItem("jwt") ?? "", paymentGateway}));
        }
    })

  return (
    <Box sx={{max:"auto"}}>
        <p className='text-xl font-bold text-center pb-5'>
            Contact Details
        </p>
        <form onSubmit={formik.handleSubmit}>
            <Grid2 container spacing={3}>
                <Grid2 size={{xs:12}}>
                    <TextField
                        fullWidth
                        name='name'
                        label='Name'
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                </Grid2>
                <Grid2 size={{xs:6}}>
                    <TextField
                        fullWidth
                        name='mobileNumber'
                        label='Mobile'
                        value={formik.values.mobileNumber}
                        onChange={formik.handleChange}
                        error={formik.touched.mobileNumber && Boolean(formik.errors.mobileNumber)}
                        helperText={formik.touched.mobileNumber && formik.errors.mobileNumber}
                    />
                </Grid2>
                <Grid2 size={{xs:6}}>
                    <TextField
                        fullWidth
                        name='pinCode'
                        label='Pincode'
                        value={formik.values.pinCode}
                        onChange={formik.handleChange}
                        error={formik.touched.pinCode && Boolean(formik.errors.pinCode)}
                        helperText={formik.touched.pinCode && formik.errors.pinCode}
                    />
                </Grid2>
                <Grid2 size={{xs:12}}>
                    <TextField
                        fullWidth
                        name='address'
                        label='Address'
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        error={formik.touched.address && Boolean(formik.errors.address)}
                        helperText={formik.touched.address && formik.errors.address}
                    />
                </Grid2>
                <Grid2 size={{xs:6}}>
                    <TextField
                        fullWidth
                        name='state'
                        label='State'
                        value={formik.values.state}
                        onChange={formik.handleChange}
                        error={formik.touched.state && Boolean(formik.errors.state)}
                        helperText={formik.touched.state && formik.errors.state}
                    />
                </Grid2>
                <Grid2 size={{xs:6}}>
                    <TextField
                        fullWidth
                        name='city'
                        label='City'
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        error={formik.touched.city && Boolean(formik.errors.city)}
                        helperText={formik.touched.city && formik.errors.city}
                    />
                </Grid2>
                <Grid2 size={{xs:12}}>
                    <TextField
                        fullWidth
                        name='locality'
                        label='Locality'
                        value={formik.values.locality}
                        onChange={formik.handleChange}
                        error={formik.touched.locality && Boolean(formik.errors.locality)}
                        helperText={formik.touched.locality && formik.errors.locality}
                    />
                </Grid2>
                <Grid2 size={{xs:12}}>
                    <Button fullWidth type='submit' variant='contained' sx={{py:"14px"}}>
                        Add Address
                    </Button>
                </Grid2>
            </Grid2>
        </form>
    </Box>
  )
}

export default AddressForm