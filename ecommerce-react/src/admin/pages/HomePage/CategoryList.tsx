import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import {
  AddCategory,
  addCategory,
  fetchFlatCategories,
} from "../../../State/customer/categorySlice";
import {searchProduct } from "../../../State/customer/ProductSlice";
import AddCategoryModal from "../../components/AddCategoryModal";

const CategoryList = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useAppDispatch();
  const { category } = useAppSelector((store) => store);

  useEffect(() => {
    dispatch(searchProduct());
  }, []);

  const onAddCategory = (newCategory: AddCategory) => {
    dispatch(addCategory(newCategory)).then(() =>
      dispatch(fetchFlatCategories())
    );
    setOpen(false); // Close modal after submission
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 ">
        <Button variant="outlined" onClick={handleOpen}>
          Add New Category
        </Button>
      </div>
      <div className="mt-5">table data</div>
      <AddCategoryModal
        open={open}
        handleClose={handleClose}
        categories={category.categoryList}
        onAddCategory={onAddCategory}
      />
    </div>
  );
};

export default CategoryList;
