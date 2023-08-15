import {
  Box,
  Button,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import HomeCard from "Components/HomeCard";
import ProductSlider from "Components/productSlider.js";
import { useGetProductsQuery } from "State/api";
import { setProducts } from "State/productSlice";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import AllProduct from "./allProduct";

const Home = () => {
  const { data, isLoading } = useGetProductsQuery();
  const dispatch = useDispatch();
  const theme = useTheme();
  const vegRef = useRef();
  const isNonMobileScreeen = useMediaQuery("(min-width: 1200px)");
  const { products } = useSelector((state) => state.product);
  const loadingArray = new Array(6).fill(null);

  useEffect(() => {
    if (data) {
      dispatch(setProducts(data));
    }
  }, [data, products]);

  return (
    <Box sx={{padding:isNonMobileScreeen?"2rem":"1rem"}} >
      <Box
        display="flex"
        flexWrap="wrap"
        gap="6rem"
        sx={{ justifyContent: "space-evenly" }}
      >
        <Box maxWidth="40rem">
          <Box
            display="flex"
            sx={{
              gap: "6px",
              mb: "1.5rem",
              maxWidth: "10rem",
              backgroundColor: "#DFD7BF",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "30px",
            }}
          >
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: "14px",
              }}
            >
              Bike delivery
            </Typography>
            <img
              alt="bike_image"
              style={{ width: "2.7rem", height: "2.4rem" }}
              src="https://cdn-icons-png.flaticon.com/512/171/171253.png"
            />
          </Box>
          <Typography
            variant="h1"
            sx={{ fontSize: isNonMobileScreeen ? 72 : "48px" }}
          >
            The Fasted Delivery in{" "}
            <span style={{ color: "red" }}>Your Home</span>
          </Typography>
          <Typography
            sx={{
              marginY: "1rem",
              color: "#777777",
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            PageMaker including versions of Lorem Ipsum.
          </Typography>
          <Button
            sx={{
              backgroundColor: "red",
              paddingX: "1rem",
              color: "white",
              borderRadius: "0.5rem",
              textTransform: "capitalize",
              fontWeight: "bold",
              fontSize: "0.9rem",
              boxShadow: 2,
            }}
          >
            Order Now
          </Button>
        </Box>

        <Box
          display="flex"
          maxWidth="40rem"
          flexWrap="wrap"
          gap="2rem"
          sx={{
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
          }}
        >
          {products
            ? products.slice(0, 6).map(({ name, category, price, image, _id }) => {
                return (
                  <HomeCard
                    key={name}
                    name={name}
                    price={price}
                    image={image}
                    category={category}
                    productId={_id}
                    loading={isLoading}
                  />
                );
              })
            : loadingArray.map((el, index) => {
                return <HomeCard key={index} loading={isLoading} />;
              })}
        </Box>
      </Box>

      {/* Green vegetables section */}
      <Box marginTop="3rem"  sx={{paddingX: isNonMobileScreeen?"2.3rem":"1rem"}}>
        <Typography variant="h5">Green Vegetables</Typography>
        <ProductSlider loading={isLoading} category="vegetables" />
      </Box>

      <Box marginTop="3rem" sx={{paddingX: isNonMobileScreeen?"2.3rem":"1rem"}}>
        <Typography variant="h5">All Products</Typography>
        <AllProduct />
      </Box>
    </Box>
  );
};

export default Home;
