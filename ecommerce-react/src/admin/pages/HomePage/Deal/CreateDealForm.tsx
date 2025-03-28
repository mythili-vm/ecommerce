import {
  Avatar,
  Box,
  Button,
  FormControl,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../State/Store";
import { createDeal } from "../../../../State/admin/DealSlice";

const CreateDealForm = () => {
  const dispatch = useAppDispatch();

  const { customer } = useAppSelector((store) => store);

  useEffect(() => {
    console.log(
      "customer data in deals form",
      customer.homePageData?.dealCategories
    );
  }, []);

  const formik = useFormik({
    initialValues: {
      category: "",
      discount: 0,
    },
    onSubmit: (values) => {
      console.log(values);
      const reqData = {
        category: {
          id: values.category,
        },
        discount: values.discount,
      };
      dispatch(createDeal(reqData));
    },
  });
  return (
    <Box
      component={"form"}
      onSubmit={formik.handleSubmit}
      className="space-y-6"
    >
      <Typography variant="h4" className="text-center">
        Create Deal
      </Typography>
      <TextField
        fullWidth
        id="discount"
        name="discount"
        label="Discount"
        onChange={formik.handleChange}
        value={formik.values.discount}
        error={formik.touched.discount && Boolean(formik.errors.discount)}
        helperText={formik.touched.discount && formik.errors.discount}
      />
      <FormControl fullWidth>
        <TextField
          fullWidth
          label="Product"
          id="category-select"
          name="category"
          value={formik.values.category}
          onChange={formik.handleChange}
          select
        >
          {customer.homePageData?.dealCategories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              <ListItemIcon>
                <Avatar
                  src={category.product.images[0]}
                  alt={category.product.title}
                  sx={{ width: 30, height: 30 }}
                />
              </ListItemIcon>
              <ListItemText primary={category.product.title} />
            </MenuItem>
          ))}
        </TextField>
      </FormControl>

      <Button fullWidth type="submit" variant="contained">
        Create Deal
      </Button>
    </Box>
  );
};

export default CreateDealForm;
