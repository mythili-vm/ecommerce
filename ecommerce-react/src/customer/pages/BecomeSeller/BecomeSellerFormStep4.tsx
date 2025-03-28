import { TextField } from '@mui/material'
import React from 'react'

interface BecomeSellerFormStep3Props{
    formik:any
}

const BecomeSellerFormStep4 = ({formik}:BecomeSellerFormStep3Props) => {
  return (
    <div className='space-y-5'>
        <TextField
            fullWidth
            name="businessDetails.businessName"
            label="Business Name"
            value={formik.values.businessDetails.businessName}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.bankDetails?.accountNumber && Boolean(formik.errors.bankDetails?.accountNumber)}
            helperText={formik.touched.bankDetails?.accountNumber && formik.errors.bankDetails?.accountNumber}
          />
          <TextField
            fullWidth
            name="sellerName"
            label="Seller Name"
            value={formik.values.sellerName}
            onChange={formik.handleChange}
            error={formik.touched.sellerName && Boolean(formik.errors.sellerName)}
            helperText={formik.touched.sellerName && formik.errors.sellerName}
            onBlur={formik.handleBlur}
          />
          <TextField
            fullWidth
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

    </div>
  )
}

export default BecomeSellerFormStep4