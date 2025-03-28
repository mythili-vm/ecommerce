import {
  Box,
  Button,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";
import PricingCard from "../Cart/PricingCard";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { createOrder } from "../../../State/customer/orderSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const paymentGatewayList = [
  {
    value: "RAZORPAY",
    image:
      "https://th.bing.com/th/id/OIP.xitpbBzO1SJh4G4bABsXVgHaBk?rs=1&pid=ImgDetMain",
    label: "",
  },
  {
    value: "STRIPE",
    image: "https://logos-world.net/wp-content/uploads/2021/03/Stripe-Logo.png",
    label: "",
  },
];

const Checkout = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [paymentGateway, setPaymentGateway] = React.useState("STRIPE");
  const { auth, cart } = useAppSelector((store) => store);
  const [selectedAddressIndex, setSelectedAddressIndex] = React.useState(0);
  const dispatch = useAppDispatch();

  const handlePayementChange = (event: any) => {
    setPaymentGateway(event.target.value);
  };

  const handlePayment = () => {
    if (auth.user?.addresses && auth.user.addresses.length > 0) {
      dispatch(
        createOrder({
          address: auth.user?.addresses[selectedAddressIndex],
          jwt: localStorage.getItem("jwt") ?? "",
          paymentGateway,
        })
      );
    }
  };

  return (
    <>
      <div className="pt-10 px-5 sm:px-10 md:px-44 lg:px-60 min-h-screen">
        <div className="space-y-5 lg:space-y-0 lg:grid grid-cols-3 lg:gap-9">
          <div className="col-span-2 space-y-5">
            <div className="flex justify-between items-center">
              <h1 className="font-semibold">Select Address</h1>
              <Button onClick={handleOpen}>Add New Address</Button>
            </div>
            <div className="text-xs font-medium space-y-5">
              <p>Saved Addressess</p>
              <div className="space-y-3">
                {auth.user?.addresses && auth.user.addresses.length > 0 ? (
                  auth.user.addresses.map((item, index) => (
                    <AddressCard
                      isChecked={index === selectedAddressIndex}
                      onSelect={() => setSelectedAddressIndex(index)}
                      key={index}
                      address={item}
                    />
                  ))
                ) : (
                  <p>No saved addresses found.</p>
                )}
              </div>
            </div>
            <div className="py-4 px-5 rounded-md border">
              <Button onClick={handleOpen}>Add new Address</Button>
            </div>
          </div>
          <div>
            <div>
              <div className="space-y-3 border p-5 rounded-md">
                <h1 className="text-primary-color font-medium pb-2 text-center">
                  Choose Payment Gateway
                </h1>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  className="flex justify-between pr-0"
                  onChange={handlePayementChange}
                  value={paymentGateway}
                >
                  {paymentGatewayList.map((item) => (
                    <FormControlLabel
                      className="border w-[45%] pr-2 rounded-md flex justify-center"
                      value={item.value}
                      control={<Radio />}
                      label={
                        <img
                          src={item.image}
                          alt={item.label}
                          className={`${item.value === "stripe" ? "w-14" : ""}`}
                        />
                      }
                    />
                  ))}
                </RadioGroup>
              </div>
            </div>
            <div className="border rounded-md">
              <PricingCard
                subtotal={cart.cart?.totalSellingPrice ?? 0}
                total={cart.cart?.totalMrpPrice ?? 0}
              />
              <div className="p-5">
                <Button
                  onClick={handlePayment}
                  fullWidth
                  variant="contained"
                  sx={{ py: "11px" }}
                >
                  Pay now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddressForm paymentGateway={paymentGateway} />
        </Box>
      </Modal>
    </>
  );
};

export default Checkout;
