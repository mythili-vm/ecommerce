import React from "react";
import { useAppDispatch, useAppSelector } from "../../../State/Store";
import { useFormik } from "formik";
import { sendLoginSignupOtp, signup } from "../../../State/AuthSlice";
import { Button, CircularProgress, TextField } from "@mui/material";

interface RegisterFormProps {
  setIsLogin: (isLogin: boolean) => void; // Explicitly define the type
}

const RegisterForm :React.FC<RegisterFormProps> = ({ setIsLogin }) => {
  const [showOtp, setShowOtp] = React.useState(false);
  const { auth } = useAppSelector((store) => store);
  const dispatch = useAppDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
      fullName: "",
    },
    onSubmit: (values) => {
      console.log("form data", values);
      dispatch(signup(values)).then(() => {
        setIsLogin(true);
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
      <h1 className="text-center font-bold text-xl text-primary-color pb-8">
        Signup
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
          <TextField
            fullWidth
            name="fullName"
            label="Full Name"
            value={formik.values.fullName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            helperText={formik.touched.fullName && formik.errors.fullName}
          />
          {showOtp && (
            <div className="space-y-5">
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
            </div>
          )}

          {showOtp ? (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ py: "11px" }}
            >
              Signup
            </Button>
          ) : (
            <Button
              onClick={handleSendOtp}
              fullWidth
              variant="contained"
              sx={{ py: "11px" }}
            >
               {auth.loading ? <CircularProgress size={20} /> : "Send otp"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
