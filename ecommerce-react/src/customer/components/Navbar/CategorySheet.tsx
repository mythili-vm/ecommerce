import React, { use, useEffect } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Category } from "../../../State/customer/categorySlice";

interface CategorySheetProps {
  selectedCategory: string;
  categories: Category[];
}

const CategorySheet = (props: CategorySheetProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(props.categories);
  }, [props.selectedCategory]);

  return (
    <Box
      sx={{ zIndex: 1 }}
      className="bg-black shadow-lg lg:h=[500px] overflow-y-auto"
    >
      <div className="flex text-sm flex-wrap">
        {props.categories?.map((item: Category, index) => (
          <div
            className={`p-8 lg:w-[20%] ${
              index % 2 === 0 ? "bg-slate-50" : "bg-white"
            }`}
            key={item.categoryId}
          >
            <p className="text-primary-color mb-5 font-semibold">{item.categoryId}</p>

            <ul>
              {item.subcategories &&
                item.subcategories.map((subItem: Category) => (
                <div key={subItem.categoryId}>
                  <li
                    onClick={() => navigate("/products/" + subItem.categoryId)}
                    className="hover:text-primary-color cursor-pointer"
                  >
                    {subItem.categoryId}
                  </li>
                </div>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default CategorySheet;
