import { CheckCircle, FiberManualRecord } from "@mui/icons-material";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { OrderStatus } from "../../../types/orderTypes";

const steps = [
  { name: "Order Placed", description: "on Thu, 11 Jul", value: "PLACED" },
  {
    name: "Packed",
    description: "Item packed in Dispactch Warehouse",
    value: "CONFIRMED",
  },
  { name: "Shipped", description: "Shipped on Fri, 12 Jul", value: "SHIPPED" },
  {
    name: "Arriving",
    description: "Arriving By Mon, 22 Mar",
    value: "ARRIVING",
  },
  {
    name: "Arrived",
    description: "Arrived on Mon, 22 Mar",
    value: "DELIVERED",
  },
  {
    name: "Cancelled",
    description: "Cancelled on Mon, 22 Mar",
    value: "CANCELLED",
  },
];

const canceledStep = [
  { name: "Order Placed", description: "on Thu, 11 Jul", value: "PLACED" },
  { name: "Orde Cancelled", description: "on Thu, 11 Jul", value: "CANCELLED" },
];

const currentStep = 1;

const OrderStepper = ({ orderStatus }: {orderStatus:string}) => {
  const [statusStep, setStatusStep] = React.useState(steps);
  useEffect(() => {
    if (orderStatus ===  "CANCELLED") {
      setStatusStep(canceledStep);
    } else {
      setStatusStep(steps);
    }
  }, [orderStatus]);
  return (
    <Box className="my-10">
      {statusStep.map((step, index) => (
        <>
          <div key={index} className={`flex px-4`}>
            <div className="flex flex-col items-center">
              <Box
                sx={{ zIndex: -1 }}
                className={`w-8 h-8 rounded-full flex items-center justify-center
                            ${
                              index <= currentStep
                                ? "bg-gray-200 text-teal-500"
                                : "bg-gray-300 text-gray-600"
                            }`}
              >
                {step.value === orderStatus ? (
                  <CheckCircle />
                ) : (
                  <FiberManualRecord sx={{ zIndex: -1 }} />
                )}
              </Box>
              {statusStep.length - 1 !== index && (
                <div
                  className={`border h-20 w-[2px] ${
                    index < currentStep ? "border-primary-color bg-primary-color" : "bg-gray-300"
                  }`}
                ></div>
              )}
            </div>
            <div className="ml-2 w-full">
              <div
                className={`${
                  step.value === orderStatus
                    ? "bg-primary-color p-2 text-white font-medium rounded-md -translate-y-3"
                    : ""
                } 
                    ${
                      orderStatus === "CANCELLED" && step.value === orderStatus
                        ? "bg-red-500"
                        : ""
                    } w-full`}
              >
                <p className={``}>{step.name}</p>
                <p
                  className={`${
                    step.value === orderStatus
                      ? " text-gray-200"
                      : "text-gray-500"
                  } text-xs`}
                >
                  {" "}
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        </>
      ))}
    </Box>
  );
};

export default OrderStepper;
