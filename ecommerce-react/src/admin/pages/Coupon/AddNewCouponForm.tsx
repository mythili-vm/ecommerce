import { useFormik } from "formik";
import React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box, Button, Grid2, TextField } from "@mui/material";
import { useAppDispatch } from "../../../State/Store";
import { createCoupon } from "../../../State/admin/AdminCouponSlice";
import { Coupon } from "../../../types/couponTypes";
import { useNavigate } from "react-router-dom";

interface CouponFormValues {
  code: string;
  discountPercentage: number;
  validityStartDate: Dayjs | null;
  validityEndDate: Dayjs | null;
  minimumOrderValue: number;
}

const AddNewCouponForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      code: "",
      discountPercentage: 0,
      validityStartDate: null,
      validityEndDate: null,
      minimumOrderValue: 0,
    },
    onSubmit: (values) => {
      const formattedValues: Coupon = {
        ...values,
        validityStartDate: values.validityStartDate
          ? new Date(values.validityStartDate)
          : new Date(),
        validityEndDate: values.validityEndDate
          ? new Date(values.validityEndDate)
          : new Date(),
        active: true,
      };
      const jwt = localStorage.getItem("jwt") ?? "";
      dispatch(createCoupon({ coupon: formattedValues, jwt })).then(() =>
        navigate("/admin/coupon")
      );
    },
  });
  return (
    <div>
      <h1 className="text-2xl font-bold text-primary-color pb-5 text-center">
        Create New Coupon
      </h1>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box component={"form"} onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ sm: 6, xs: 12 }}>
              <TextField
                fullWidth
                id="code"
                name="code"
                label="Coupon Code"
                value={formik.values.code}
                onChange={formik.handleChange}
                error={formik.touched.code && Boolean(formik.errors.code)}
                helperText={formik.touched.code && formik.errors.code}
                required
              />
            </Grid2>
            <Grid2 size={{ sm: 6, xs: 12 }}>
              <TextField
                fullWidth
                id="discountPercentage"
                name="discountPercentage"
                label="Discount Percentage"
                value={formik.values.discountPercentage}
                onChange={formik.handleChange}
                error={
                  formik.touched.discountPercentage &&
                  Boolean(formik.errors.discountPercentage)
                }
                helperText={
                  formik.touched.discountPercentage &&
                  formik.errors.discountPercentage
                }
              />
            </Grid2>
            <Grid2 size={{ sm: 6, xs: 12 }}>
              <DatePicker
                sx={{ width: "100%" }}
                label="Validity Start Date"
                value={formik.values.validityStartDate}
                name="validityStartDate"
                onChange={(newValue) =>
                  formik.setFieldValue("validityStartDate", newValue)
                }
              />
            </Grid2>
            <Grid2 size={{ sm: 6, xs: 12 }}>
              <DatePicker
                sx={{ width: "100%" }}
                label="Validity End Date"
                value={formik.values.validityEndDate}
                name="validityEndDate"
                onChange={(newValue) =>
                  formik.setFieldValue("validityEndDate", newValue)
                }
              />
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <TextField
                fullWidth
                id="minimumOrderValue"
                name="minimumOrderValue"
                label="Minimum Order Value"
                value={formik.values.minimumOrderValue}
                type="number"
                onChange={formik.handleChange}
                error={
                  formik.touched.minimumOrderValue &&
                  Boolean(formik.errors.minimumOrderValue)
                }
                helperText={
                  formik.touched.minimumOrderValue &&
                  formik.errors.minimumOrderValue
                }
              />
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
              <Button onClick={() => formik.submitForm()} variant="contained" fullWidth sx={{ py: ".8rem" }}>
                Create Coupon
              </Button>
            </Grid2>
          </Grid2>
        </Box>
      </LocalizationProvider>
    </div>
  );
};

export default AddNewCouponForm;
