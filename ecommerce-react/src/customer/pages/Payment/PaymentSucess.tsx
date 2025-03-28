import React, { use, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../State/Store";
import { Button } from "@mui/material";
import { paymentSuccess } from "../../../State/customer/orderSlice";

const PaymentSucess = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {orderId} = useParams();
  const getQueryParam=(key:string)=>{
    const query=new URLSearchParams(window.location.search);
    return query.get("orderId");
  }

  useEffect(() => {
    const paymentId = getQueryParam("razorpay_payment_id");
    const paymentLinkId = getQueryParam("razorpay_payment_link");
      dispatch(paymentSuccess({
        jwt:localStorage.getItem("jwt") ?? "",
        paymentId:paymentId || "",
        paymentLinkId:paymentLinkId || ""
      }))
  },[orderId]);
  return (
    <div className="min-h-[90vh] flex justify-center items-center">
      <div
        className="bg-primary-color text-white p-8 w-[80%] lg:w-[35%] border
        rounded-md h-[40vh] flex flex-col gap-7 items-center justify-center"
      >
        <h1 className="text-3xl font-semibold">Congratulations!</h1>
        <h1 className="text-2xl font-semibold">
          Your Order Placed Successfully
        </h1>
        <div>
            <Button color="secondary" variant="contained" onClick={()=>navigate("/")}>Shopping More</Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSucess;
