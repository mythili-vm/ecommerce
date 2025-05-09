import React from "react";
import HomeCategoryTable from "./HomeCategoryTable";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import CategoryModalForm, {
  HomeCategorySection,
} from "../../components/CategoryModalForm";
import { createHomeCategories } from "../../../State/customer/customerSlice";
import { Button } from "@mui/material";
import { TableProps } from "./GridTable";

const ElectronicTable = (props:TableProps) => {
  const dispatch = useAppDispatch();
  const { customer } = useAppSelector((store) => store);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = (values: any) => {
    dispatch(createHomeCategories([values]));
  };
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Button variant="outlined" onClick={handleOpen}>
          Add Electronic Category
        </Button>
      </div>
      <div className="mt-5">
        <HomeCategoryTable
          data={customer.homePageData?.electricCategories ?? []}
          onEdit={handleOpen}
        />
      </div>
      <CategoryModalForm
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
        section={props.section}
        products={props.products}
      />
    </div>
  );
};

export default ElectronicTable;
