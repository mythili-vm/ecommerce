import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { useFormik } from "formik";
import { Button, CircularProgress, TextField } from "@mui/material";
import { sendLoginSignupOtp, signin } from "../../../State/AuthSlice";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const { auth } = useAppSelector((store) => store);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    onSubmit: async (values) => {
      try {
        const res = await dispatch(signin(values)).unwrap(); // throws if rejected
        navigate("/");
      } catch (err: any) {
        alert(err || "Failed to sign in");
      }
    },
  });


  const handleSendOtp = () => {
    dispatch(sendLoginSignupOtp({ email: formik.values.email }));
  };

  return (
    <div>
      <h1 className="text-center font-bold text-xl text-primary-color pb-8">
        Login
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
          {auth.otpSent && (
            <div className="space-y-2">
              <p className="font-medium text-sm opacity-60">
                Enter OTP sent to your email
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
            </div>
          )}

          {auth.otpSent ? (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ py: "11px" }}
            >
              Login
            </Button>
          ) : (
            <Button
              onClick={handleSendOtp}
              fullWidth
              variant="contained"
              sx={{ py: "11px" }}
            >
              {auth.loading ? <CircularProgress size={20} /> : "Send OTP"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

