import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import CartCard from "Components/CartCard";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EmptyCart from "assets/empty_cart.gif";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import SuccessMessage from "Components/SuccessMessage";
import { setCart } from "State";

const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
const Cart = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const [cartProducts, setCartProducts] = useState([]);
  const { cartItems } = useSelector((state) => state.users);
  const { products } = useSelector((state) => state.product);
  const { token } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const [alertOpen, setAlertOpen] = useState(false);

  const handlePayment = async () => {
    if (token) {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}create-checkout-session`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(cartProducts),
        }
      );

      const data = await res.json();
      if (!data) return;
      stripePromise.redirectToCheckout({ sessionId: data });
    } else {
      setAlertOpen(true);
      setTimeout(() => navigate("/login"), 1000);
    }
  };

  useEffect(() => {
    const cart = cartItems.map((item) => {
      const product = products.find((product) => product._id === item.id);
      return { ...product, quantity: item.quantity };
    });
    setCartProducts(cart);
  }, [cartItems]);

  return (
    <Box>
      {cartItems.length !== 0 ? (
        <Box display="flex" justifyContent="space-between" flexWrap="wrap">
          <Box sx={{ padding: isMobile ? "2rem" : "5rem", width: "50rem" }}>
            <Typography variant="h4" fontWeight="700" color="#636971" mb="1rem">
              Your Cart Items
            </Typography>
            {cartProducts.map(
              ({ _id, name, category, price, image, quantity }) => {
                return (
                  <CartCard
                    key={_id}
                    id={_id}
                    name={name}
                    category={category}
                    price={price}
                    image={image}
                    quantity={quantity}
                  />
                );
              }
            )}
          </Box>
          <Box sx={{ padding: isMobile ? "2rem" : "5rem", width: "40rem" }}>
            <Typography variant="h4" fontWeight="700" color="#636971" mb="1rem">
              Summary
            </Typography>
            <Typography variant="h5" fontWeight="700" color="#636971" mb="1rem">
              Total : ₹{" "}
              {cartProducts.reduce(
                (acc, product) => product.price * product.quantity + acc,
                0
              )}
            </Typography>
            <Button
              onClick={handlePayment}
              sx={{
                backgroundColor: "#4477CE",
                width: "15rem",
                color: "white",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#0A6EBD",
                },
              }}
            >
              Payment
            </Button>
          </Box>
        </Box>
      ) : (
        <Box
          display="flex"
          flexDirection="column"
          sx={{ padding: isMobile ? "2rem" : "5rem" }}
        >
          <img
            src={EmptyCart}
            alt="empty cart"
            style={{ width: "25rem", margin: "auto" }}
          />
          <Typography m=" 10px auto" fontSize="32px" color="#636971">
            Nothing Here!!
          </Typography>
        </Box>
      )}
      <SuccessMessage
        message="You need to login first"
        severity="error"
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
      />
    </Box>
  );
};

export default Cart;
