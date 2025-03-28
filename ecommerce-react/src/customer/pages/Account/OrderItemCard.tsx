import { ElectricBolt } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { teal } from "@mui/material/colors";
import React from "react";
import { Order, OrderItem } from "../../../types/orderTypes";
import { useNavigate } from "react-router-dom";

const OrderItemCard = ({ item, order }: { item: OrderItem; order: Order }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/account/order/${order.id}/${item.id}`)} className="text-sm bg-white p-5 space-y-4 border rounded-md cursor-pointer">
      <div className="flex items-center gap-5">
        <div>
          <Avatar sizes="small" sx={{ bgcolor: teal[500] }}>
            <ElectricBolt />
          </Avatar>
        </div>
        <div>
          <h1 className="font-bold text-primary-color">{order.orderStatus}</h1>
          <p>Arriving By {order.deliverDate}</p>
        </div>
      </div>
      <div className="p-5 bg-teal-50 flex gap-3">
        <div>
          <img src={item.product.images[0]} alt="" className="w-[70px]" />
        </div>
        <div className="w-full space-y-2">
          <h1 className="font-bold">
            {item.product.seller?.businessDetails.businessName}
          </h1>
          <p>{item.product.title}</p>
          <p>
            <strong>size : </strong>
            {item.product.sizes}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderItemCard;
