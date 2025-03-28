import { Button, Step, StepLabel, Stepper } from "@mui/material";
import { useState } from "react";
import BecomeSellerFormStep1 from "./BecomeSellerFormStep1";
import { useFormik } from "formik";
import BecomeSellerFormStep2 from "./BecomeSellerFormStep2";
import BecomeSellerFormStep3 from "./BecomeSellerFormStep3";
import BecomeSellerFormStep4 from "./BecomeSellerFormStep4";

const steps = [
  "Tax Details & Mobile",
  "Pickup Address",
  "Bank Details",
  "Supplier Details",
];

const SellerAccountForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const handleStep = (value: number) => () => {
    (activeStep > 0 || activeStep < steps.length - 1) &&
      setActiveStep(activeStep + value);
    activeStep === steps.length - 1 && handleCreateAccount();
  };

  const formik = useFormik({
    initialValues: {
      mobile: "",
      otp: "",
      gstin: "",
      pickupAddress: {
        name: "",
        mobile: "",
        address: "",
        pincode: "",
        city: "",
        state: "",
        locality: "",
      },
      bankDetails: {
        accountNumber: "",
        ifscCode: "",
        accountHolderName: "",
      },
      sellerName: "",
      email: "",
      businessDetails: {
        businessName: "",
        businessEmail: "",
        businessAddress: "",
        businessMobile: "",
        logo: "",
        banner: "",
      },
      password: "",
    },

    // ValidationSchema: FormSchema,
    onSubmit: (values) => {
      console.log(values, "form submitted");
      console.log("active step", activeStep);
    },
  });

  const handleCreateAccount = () => {};
  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <section className="mt-20 space-y-10">
        <div>
          {activeStep === 0 ? <BecomeSellerFormStep1 formik={formik} /> : 
           activeStep === 1 ? <BecomeSellerFormStep2 formik={formik} /> : 
           activeStep === 2 ? <BecomeSellerFormStep3 formik={formik} /> : 
           activeStep === 3 ? <BecomeSellerFormStep4 formik={formik} /> : ""} 
        </div>

        <div className="flex items-center justify-between">
          <Button
            onClick={handleStep(-1)}
            variant="contained"
            disabled={activeStep === 0}
          >
            Back
          </Button>
          <Button
            onClick={handleStep(1)}
            variant="contained"
          >
            {activeStep === steps.length - 1 ? "Create Account" : "Continue"}
          </Button>
        </div>
      </section>
    </div>
  );
};

export default SellerAccountForm;
