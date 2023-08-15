import {
  Box,
  FormLabel,
  FormControl,
  Typography,
  IconButton,
} from "@mui/material";
import StyledButton from "Components/StyledButton";
import { StyledTextfield } from "Components/StyledTextField";
import { Formik } from "formik";
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import signupAnimation from "assets/login-animation.gif";
import * as yup from "yup";
import { useLoginUserMutation } from "State/api";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "State";

const loginSchema = yup.object({
  email: yup.string().required("required").email("Invalid email"),
  password: yup.string().required("required"),
});

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [loginUser] = useLoginUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setshowpassword] = useState(false);

  const handleShowPassword = () => {
    setshowpassword(!showPassword);
  };

  const handleFormSubmit = async (values, { resetForm }) => {
    const { data, error } = await loginUser(values);
    if (data) {
      dispatch(setLogin({ user: data.user, token: data.token }));
      navigate("/");
    }
    resetForm();
  };

  return (
    <Box paddingTop={{ xs: "2.5rem", sm: "0.75rem", md: "1rem" }}>
      <Box
        maxWidth="420px"
        height="100%"
        bgcolor="white"
        m="auto"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        padding="1rem"
      >
        <Box width="80px" sx={{ borderRadius: "50%", boxShadow: 5 }}>
          <img
            src={signupAnimation}
            alt="login-animation"
            style={{ width: "100%", borderRadius: "50%" }}
          />
        </Box>
        <Box width="100%" mt="20px">
          <Formik
            initialValues={initialValues}
            onSubmit={handleFormSubmit}
            validationSchema={loginSchema}
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

                  <StyledButton type="submit" fullWidth>
                    Login
                  </StyledButton>
                </FormControl>
              </form>
            )}
          </Formik>

          <Typography variant="body2" marginTop="15px">
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "#EF4444" }}>
              Signup
            </Link>{" "}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;