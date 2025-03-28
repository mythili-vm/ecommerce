import { Box, Button, Divider } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OrderStepper from "./OrderStepper";
import { Payments } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { fetchOrderById, fetchOrderItemById } from "../../../State/customer/orderSlice";
import { OrderStatus } from "../../../types/orderTypes";

const OrderDetails = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {orderId,orderItemId}=useParams();
  const {order} = useAppSelector((store) => store);

  useEffect(() => {
    dispatch(fetchOrderById({orderId:Number(orderId),jwt:localStorage.getItem("jwt") ?? ""}));
    dispatch(fetchOrderItemById({orderItemId:Number(orderItemId),jwt:localStorage.getItem("jwt") ?? ""}));
  },[])

  return (
    <Box className="space-y-5">
      <section className="flex flex-col gap-5 justify-center items-center">
        <img
          className="w-[100px]"
          alt=""
          src={order.orderItem?.product.images[0]}
        />
        <div className="text-sm space-y-1 text-center">
          <h1 className="font-bold">{order.orderItem?.product.seller?.businessDetails.businessName}</h1>
          <p>
            {order.orderItem?.product.title}
          </p>
          <p>
            <strong>size : </strong>{order.orderItem?.product.sizes}
          </p>
        </div>
        <div>
          <Button onClick={() => navigate(`/reviews/${5}/create`)}>
            Write Review
          </Button>
        </div>
      </section>
      <section className="border p-5">
        <OrderStepper orderStatus={order.currentOrder?.orderStatus ?? OrderStatus.PLACED} />
      </section>
      <div className="border p-5">
        <h1 className="font-bold pb-3">Delivery Address</h1>
        <div className="text-sm space-y-2">
          <div className="flex gap-5 font-medium">
            <p>{order.currentOrder?.shippingAddress.name}</p>
            <Divider flexItem orientation="vertical" />
            <p>{order.currentOrder?.shippingAddress.mobileNumber}</p>
          </div>
          <p>{order.currentOrder?.shippingAddress.address},
          {order.currentOrder?.shippingAddress.state},
          {order.currentOrder?.shippingAddress.city} -
          {order.currentOrder?.shippingAddress.pinCode}</p>
        </div>
      </div>
      <div className="border space-y-4">
        <div className="flex justify-between px-5 text-sm pt-5">
          <div className="space-y-1">
            <p className="font-bold">Total Item Price</p>
            <p>
              You saved{" "}
              <span className="text-green-500 font-medium text-xs">
                ₹ 
              </span>{" "}
              on this item{" "}
            </p>
          </div>

          <p className="font-medium">₹ {order.orderItem?.sellingPrice}</p>
        </div>

        <div className="px-5">
          <div className="bg-teal-50 px-5 py-2 text-xs font-medium flex items-center gap-3">
            <Payments />
            <p>Pay On Delivery</p>
          </div>
        </div>
        <Divider />
        <div className="px-5 pb-5">
          <p className="text-xs">
            <strong>Sold by : </strong>{order.orderItem?.product.seller?.businessDetails.businessName}
          </p>
        </div>
        <div className="p-10">
          <Button
            color='error'
            sx={{ py: "0.7rem" }}
            variant="outlined"
            disabled={false}
            fullWidth
          >
            {false ? "Order Cancelled" : "Cancel Order"}
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default OrderDetails;
