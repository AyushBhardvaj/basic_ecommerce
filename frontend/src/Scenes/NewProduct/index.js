import {
  Box,
  FormControl,
  FormLabel,
  IconButton,
  MenuItem,
  Snackbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { StyledTextfield } from "Components/StyledTextField";
import StyledButton from "Components/StyledButton";
import { Formik } from "formik";
import * as yup from "yup";
import { ImagetoBase64 } from "Utils/imagetoBase64";
import { useAddProductMutation } from "State/api";
import SignupBox from "Components/SignupBox";
import Dropzone from "react-dropzone";

const categories = [
  { label: "Apparel", value: "apparel" },
  { label: "Books", value: "books" },
  { label: "Electroncs", value: "electronics" },
  { label: "Fruits", value: "fruits" },
  { label: "Groceries", value: "groceries" },
  { label: "Luggage", value: "luggage" },
  { label: "Vegetables", value: "vegetables" },
];

const initialValues = {
  name: "",
  category: "",
  image: "",
  price: "",
  description: "",
};

const NewProduct = () => {
  const ref = useRef();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [addProduct] = useAddProductMutation();

  const [productImage, setProductImage] = useState(null);

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={() => setOpenSnackbar(false)}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  const handleFormSubmit = async (values, { resetForm }) => {
    const { data, isLoading } = await addProduct(values);
    if (data) {
      setOpenSnackbar(true);

      resetForm();
    }
  };

  return (
    <Box paddingTop={{ xs: "2.5rem", sm: "0.75rem", md: "1rem" }}>
      <SignupBox>
        <Box width="100%" mt="20px">
          <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              resetForm,
              setFieldValue,
            }) => (
              <form onSubmit={handleSubmit}>
                <FormControl fullWidth>
                  <FormLabel sx={{ fontWeight: "Bold" }}>Name</FormLabel>
                  <StyledTextfield
                    name="name"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />

                  <FormLabel sx={{ fontWeight: "Bold" }}>Category</FormLabel>
                  <StyledTextfield
                    name="category"
                    select
                    value={values.category}
                    onChange={(event) => {
                      setFieldValue("category", event.target.value);
                    }}
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.label} value={category.value}>
                        {category.label}
                      </MenuItem>
                    ))}
                  </StyledTextfield>

                  <FormLabel sx={{ fontWeight: "Bold" }}>Image</FormLabel>
                  <Box
                    sx={{
                      height: "45vh",
                      width: "100%",
                      marginTop: "2px",
                      marginBottom: "15px",
                      backgroundColor: "#e2e8f0",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      overflow: "hidden",
                      borderRadius: "5px",
                    }}
                  >
                    <Dropzone
                      acceptedFiles=".jpg,.jpeg,.png"
                      multiple={false}
                      onDrop={async (acceptedFiles) => {
                        const data = await ImagetoBase64(acceptedFiles[0]);
                        setFieldValue("image", data);
                        setProductImage(data);
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          border={`2px dashed`}
                          p="1rem"
                          sx={{
                            "&:hover": {
                              cursor: "pointer",
                              backgroundColor: "#f3f5f5",
                              border: "4px solid #87959d",
                            },
                            "&.Mui-focused": {
                              backgroundColor: "#f2f7ff",
                              border: "4px solid #6398e2",
                            },
                          }}
                        >
                          <input {...getInputProps()} />
                          {!values.image ? (
                            <AiOutlineCloudUpload style={{ fontSize: 100 }} />
                          ) : (
                            <img
                              src={productImage}
                              alt="product"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                overflow: "hidden",
                              }}
                            />
                          )}
                        </Box>
                      )}
                    </Dropzone>

                    {/* <IconButton onClick={() => ref.current.click()}>
                      {productImage ? (
                        <img
                          src={productImage}
                          alt="product-image"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            overflow: "hidden",
                          }}
                        />
                      ) : (
                        <AiOutlineCloudUpload style={{ fontSize: 100 }} />
                      )}
                    </IconButton>
                    <input
                      ref={ref}
                      type="file"
                      hidden
                      accept="image/*"
                      multiple={false}
                      onChange={handleImageUpload}
                    /> */}
                  </Box>

                  <FormLabel sx={{ fontWeight: "Bold" }}>Price</FormLabel>
                  <StyledTextfield
                    name="price"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />

                  <FormLabel sx={{ fontWeight: "Bold" }}>Description</FormLabel>
                  <StyledTextfield
                    name="description"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.email && errors.email}
                  />

                  <StyledButton type="submit" fullWidth>
                    Add Product
                  </StyledButton>
                </FormControl>
              </form>
            )}
          </Formik>
        </Box>
      </SignupBox>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={() => setOpenSnackbar(false)}
        message="Product added succesfully"
        action={action}
      />
      ;
    </Box>
  );
};

export default NewProduct;
