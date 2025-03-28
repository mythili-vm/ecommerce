import { Button, CircularProgress, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { sellerLogin, sendLoginSignupOtp } from "../../../State/AuthSlice";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { useNavigate } from "react-router-dom";

const SellerLoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showOtp, setShowOtp] = React.useState(false);
  const { auth } = useAppSelector((store) => store);
  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    onSubmit: (values) => {
      console.log("form data", values);
      dispatch(sellerLogin(values)).then(() => {
        navigate("/");
      });
    },
  });

  const handleSendOtp = () => {
    dispatch(sendLoginSignupOtp({ email: formik.values.email })).then(() => {
      setShowOtp(true);
    });
  };

  return (
    <div>
      <h1 className="text-center font-bold text-xl text-primary-color pb-5">
        Login As Seller
      </h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="space-y-5">
          <TextField
            fullWidth
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          {showOtp ? (
            <div className="space-y-4">
              <p className="font-medium text-sm opacity-60">
                Enter Otp sent to your email
              </p>
              <TextField
                fullWidth
                name="otp"
                label="Otp"
                value={formik.values.otp}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.otp && Boolean(formik.errors.otp)}
                helperText={formik.touched.otp && formik.errors.otp}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ py: "11px", mt: "10px" }}
              >
                Login
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleSendOtp}
              fullWidth
              variant="contained"
              sx={{ py: "11px", mt: "10px" }}
            >
              {auth.loading ? <CircularProgress size={20} /> : "Send OTP"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SellerLoginForm;
