import { Box, Stack, Typography, useMediaQuery } from "@mui/material";
import StyledButton from "Components/StyledButton";
import AllProduct from "Scenes/Home/allProduct";
import GreenVeggie from "Components/productSlider";
import { setCart } from "State";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const Menu = () => {
  const { productId } = useParams();
  const isMobile = useMediaQuery("(max-width: 400px)");
  const { products } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const navigate  = useNavigate();

  const { name, category, image, description, price } = products
    ? products.find((product) => {
        return product._id === productId;
      })
    : "";

    const handleBuy = () => {
      dispatch(setCart({id: productId}))
      navigate("/cart")
    }

  return (
    products && (
      <Box paddingTop="2rem">
        <Box
          sx={{
            display: "flex",
            flexWrap: isMobile ?"wrap":"",
            backgroundColor: "white",
            maxWidth: "35rem",
            m: "auto",
            padding: "1rem",
            gap: "2rem",
            boxSizing: "border-box",
          }}
        >
          <img src={image} alt="" />
          <Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: "500", fontSize: "36px", color: "#5a5a5a" }}
            >
              {name}
            </Typography>
            <Typography variant="body1" sx={{ color: "#808080" }}>
              {category}
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              ₹{"  "}
              {price}
            </Typography>
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              margin="0.5rem 0 0.8rem 0"
            >
              <StyledButton
              onClick={handleBuy}
                sx={{
                  borderRadius: "3px",
                  height: "2rem",
                  fontSize: "16px",
                  m: "0",
                }}
              >
                Buy
              </StyledButton>
              <StyledButton
              onClick={() => dispatch(setCart({id: productId}))}
                sx={{
                  borderRadius: "3px",
                  height: "2rem",
                  fontSize: "16px",
                  paddingX: "1rem",
                }}
              >
                Add to Cart
              </StyledButton>
            </Stack>
            <Typography variant="body2" color="#808080">
              {description}
            </Typography>
          </Box>
        </Box>

        <Box marginTop="3rem" paddingX="2.3rem">
          <Typography variant="h5">Related Products</Typography>
          <GreenVeggie category={category} />
        </Box>

        <Box marginTop="3rem" paddingX="2.3rem">
        <Typography variant="h5">All Products</Typography>
<AllProduct />
        </Box>

      </Box>
    )
  );
};

export default Menu;
