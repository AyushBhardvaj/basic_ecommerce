import {
  Alert,
  Box,
  FormControl,
  FormLabel,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import signupAnimation from "assets/login-animation.gif";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { StyledTextfield } from "Components/StyledTextField";
import StyledButton from "Components/StyledButton";
import { Formik } from "formik";
import * as yup from "yup";
import { ImagetoBase64 } from "Utils/imagetoBase64";
import { useRegisterUserMutation } from "State/api";
import SignupBox from "Components/SignupBox";
import AnimationBox from "Components/AnimationBox";
import SuccessMessage from "Components/SuccessMessage";

const signupSchema = yup.object({
  firstName: yup
    .string()
    .required("required")
    .min(2, "Minimum 2 letters are required"),
  lastName: yup.string().required("required"),
  email: yup.string().required("required").email("Invalid email"),
  password: yup.string().required("required"),
  confirmPassword: yup
    .string()
    .required("required")
    .oneOf(
      [yup.ref("password")],
      "Password and Confirm Password should be the same."
    ),
});

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Signup = () => {
  const navigate = useNavigate("/");
  const ref = useRef();
  const [registerUser] = useRegisterUserMutation();

  const [alertOpen, setAlertOpen] = useState(false);
  const [signupPic, setsignupPic] = useState(null);
  const [showPassword, setshowpassword] = useState(false);

  const handleShowPassword = () => {
    setshowpassword(!showPassword);
  };

  const [showConfirmPassword, setshowConfirmpassword] = useState(false);
  const handleShowConfirmPassword = () => {
    setshowConfirmpassword(!showConfirmPassword);
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    const valueProps = Object.keys(values);

    valueProps.forEach((value) => {
      formData.append(value, values[value]);
    });

    formData.append("profilePic", signupPic);
    const { data, isLoading } = await registerUser(formData);
    if (data) {
      setAlertOpen(true)
      navigate("/login");
    }
    resetForm();
  };

  const handleImageUpload = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);
    setsignupPic(data);
  };

  const handleAlert = () => {
  };
  return (
    <Box paddingTop={{ xs: "2.5rem", sm: "0.75rem", md: "1rem" }}>
      <SignupBox>
        <AnimationBox sx={{ boxShadow: 5 }}>
          <img
            src={signupPic ? signupPic : signupAnimation}
            alt="login-animation"
            style={{ width: "100%", height: "100%", borderRadius: "50%" }}
          />
          <IconButton
            onClick={() => ref.current.click()}
            sx={{
              position: "absolute",
              backgroundColor: "#848884",
              opacity: "0.5",
              width: "100%",
              height: "40%",
              bottom: 0,
              left: 0,
              borderRadius: "0 0 50% 50%",
              textAlign: "center",
              fontSize: "15px",
              color: "black",
              "&:hover": {
                backgroundColor: "#A9A9A9",
                color: "white",
                opacity: "0.8",
              },
            }}
          >
            Upload
          </IconButton>
          <input
            ref={ref}
            type="file"
            hidden
            accept="image/*"
            multiple={false}
            onChange={handleImageUpload}
          />
        </AnimationBox>
        <Box width="100%" mt="20px">
          <Formik
            initialValues={initialValues}
            onSubmit={handleFormSubmit}
            validationSchema={signupSchema}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              resetForm,
            }) => (
              <form onSubmit={handleSubmit}>
                <FormControl fullWidth>
                  <FormLabel sx={{ fontWeight: "Bold" }}>First Name</FormLabel>
                  <StyledTextfield
                    name="firstName"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />

                  <FormLabel sx={{ fontWeight: "Bold" }}>Last Name</FormLabel>
                  <StyledTextfield
                    name="lastName"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />

                  <FormLabel sx={{ fontWeight: "Bold" }}>Email</FormLabel>
                  <StyledTextfield
                    name="email"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.email && errors.email}
                  />

                  <FormLabel sx={{ fontWeight: "Bold" }}>Password</FormLabel>
                  <StyledTextfield
                    name="password"
                    type={showPassword ? "text" : "password"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    InputProps={{
                      endAdornment: (
                        <IconButton onClick={handleShowPassword}>
                          {showPassword ? (
                            <AiFillEye />
                          ) : (
                            <AiFillEyeInvisible />
                          )}
                        </IconButton>
                      ),
                    }}
                  />

                  <FormLabel sx={{ fontWeight: "Bold" }}>
                    Confirm Password
                  </FormLabel>
                  <StyledTextfield
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                    error={
                      touched.confirmPassword && Boolean(errors.confirmPassword)
                    }
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
                    InputProps={{
                      endAdornment: (
                        <IconButton onClick={handleShowConfirmPassword}>
                          {showPassword ? (
                            <AiFillEye />
                          ) : (
                            <AiFillEyeInvisible />
                          )}
                        </IconButton>
                      ),
                    }}
                  />

                  <StyledButton type="submit" fullWidth>
                    Signup
                  </StyledButton>
                </FormControl>
              </form>
            )}
          </Formik>

          <Typography variant="body2" marginTop="15px">
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#EF4444" }}>
              Login
            </Link>{" "}
          </Typography>
        </Box>
      </SignupBox>

      <SuccessMessage
        open={alertOpen}
        handleClose={() => setAlertOpen(false)}
        message="User signed up successfully!"
        severity="success"
      />
    </Box>
  );
};

export default Signup;
