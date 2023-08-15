import {
  Box,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { TbPlus, TbMinus } from "react-icons/tb";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { decreaseCartProductQuantity, deleteCartProduct, setCart } from "State";

const CartCard = ({ id, name, category, image, price, quantity }) => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <Box
      display="flex"
      sx={{
        maxWidth: "40rem",
        maxHeight: "9rem",
        backgroundColor: "#dee2e8",
        gap: isMobile ? "1.25rem" : "2rem",
        padding: "0.6rem",
        borderRadius: "6px",
        borderBottom: 2,
        borderBottomColor: "rgb(191 193 195)",
      }}
    >
      <img
        src={image}
        alt=""
        style={{
          borderRadius: "6px",
          width: "7rem",
          objectFit: "contain",
          overflow: "hidden",
        }}
      />
      <Box width="100%">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginRight: isMobile ? "0.3rem" : "0.6rem",
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontSize: "1.4rem", color: "rgb(71 85 105)" }}
          >
            {name}
          </Typography>
          <IconButton onClick={() => dispatch(deleteCartProduct({ id: id }))}>
            <RiDeleteBin6Fill fontSize="1.5rem" />
          </IconButton>
        </Box>
        <Typography sx={{ color: "rgb(100 116 139)" }}>{category}</Typography>
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: "1rem",
            mt: "0.3rem",
          }}
        >
          <span style={{ color: "rgb(239 68 68)" }}>₹</span>
          {"  "}
          {price}
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Stack
            direction="row"
            alignItems="center"
            marginTop="3px"
            spacing="2px"
          >
            <IconButton
              onClick={() => dispatch(decreaseCartProductQuantity({ id }))}
            >
              <TbMinus fontSize="1rem" />
            </IconButton>
            <Typography
              fontWeight="400"
              fontSize="1rem"
            >
              {quantity}
            </Typography>
            <IconButton
              onClick={() => dispatch(setCart({ id }))}
            >
              <TbPlus fontSize="1rem" />
            </IconButton>
          </Stack>
          <Typography
            sx={{
              fontWeight: "600",
              color: "rgb(71 85 105)",
              marginRight: "0.5rem",
            }}
          >
            Total : <span style={{ color: "rgb(239 68 68)" }}>₹</span>
            {quantity * price}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CartCard;
