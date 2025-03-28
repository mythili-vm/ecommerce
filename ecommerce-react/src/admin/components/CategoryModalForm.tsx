import React from "react";
import { Box, Button, Modal, TextField, MenuItem, ListItemText, ListItemIcon, Avatar } from "@mui/material";
import { useFormik } from "formik";
import { Product } from "../../types/ProductTypes";

interface HomeCategoryModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (values: HomeCategoryFormValues) => void;
  section: HomeCategorySection;
  initialData?: HomeCategoryFormValues | null;
  products: Product[];
}

interface HomeCategoryFormValues {
  productId: number;
  product?: Product | null;
  section: HomeCategorySection;
}

export enum HomeCategorySection {
  ELECTRIC_CATEGORIES = "ELECTRIC_CATEGORIES",
  GRID = "GRID",
  SHOP_BY_CATEGORIES = "SHOP_BY_CATEGORIES",
  DEALS = "DEALS",
}

const CategoryModalForm: React.FC<HomeCategoryModalProps> = ({
  open,
  onClose,
  onSubmit,
  section,
  products,
}) => {
  const formik = useFormik<HomeCategoryFormValues>({
    initialValues: {
      productId: 0,
      section: section,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      const selectedProduct = products.find((p) => p.id === values.productId);
      const updatedValues = {
        ...values,
        product: selectedProduct,  // Attach the full product object
      };
      onSubmit(updatedValues);
      onClose();
    },
  });

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <h2 className="text-xl font-bold mb-4" id="modal-title">
          Add Category
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-3">
          <TextField
            fullWidth
            select
            label="Product"
            name="productId"
            value={formik.values.productId}
            onChange={formik.handleChange}
            required
          >
            {products && products.length > 0 ? (
              products.map((product: Product) => (
                <MenuItem key={product.id} value={product.id}>
                  <ListItemIcon>
                    <Avatar
                      src={product.images[0]}
                      alt={product.title}
                      sx={{ width: 30, height: 30 }}
                    />
                  </ListItemIcon>
                  <ListItemText primary={product.title} />
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No products available</MenuItem>
            )}
          </TextField>
          <TextField
            fullWidth
            label="Section"
            name="section"
            value={formik.values.section}
            disabled
            required
          ></TextField>
          <div className="flex justify-end gap-2">
            <Button onClick={onClose} variant="outlined">
              Cancel
            </Button>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default CategoryModalForm;
