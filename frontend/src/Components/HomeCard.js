import {
  Button,
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Skeleton,
  Typography,
  Snackbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { setCart } from "State";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomeCard = ({
  name,
  category,
  price,
  image,
  loading = false,
  productId,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.users.cartItems);
  const [openSnackbar, setOpenSnackbar] = useState(false);

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

  const handleClick = () => {
    return (
      navigate(`/menu/${productId}`),
      window.scrollTo({ top: "0", behavior: "smooth" })
    );
  };

  const AddCart = (e) => {
    dispatch(setCart({ id: productId }));
    setOpenSnackbar(true)
    e.stopPropagation();
  };
  
  return (
    <Box>
      <Card
        onClick={handleClick}
        sx={{
          width: "12rem",
          boxShadow: 3,
          borderRadius: "0.5rem",
          paddingTop: "0.5rem",
          position: "relative",
          "&:hover": {
            backgroundColor: "#FCFAF7",
            cursor: "pointer",
          },
        }}
      >
        {loading ? (
          <Skeleton
            animation="wave"
            variant="rectangular"
            width="12rem"
            height="8rem"
          />
        ) : (
          <CardMedia
            component="img"
            image={image}
            alt="product image"
            sx={{
              m: "auto",
              width: "12rem",
              height: "8rem",
              objectFit: "contain",
            }}
          />
        )}

        <CardContent sx={{ textAlign: "center", padding: "10px 0 0 0" }}>
          <Typography variant="h5" fontSize="16px">
            {loading ? <Skeleton animation="wave" /> : name}
          </Typography>
          <Typography variant="body2" fontSize="12px" color="#777777">
            {loading ? <Skeleton animation="wave" /> : category}
          </Typography>
          <Typography
            variant="h6"
            fontSize="14px"
            fontWeight="bold"
            paddingTop="0.5rem"
            paddingBottom="0"
          >
            ₹{"  "} {loading ? <Skeleton animation="wave" /> : price}
          </Typography>
        </CardContent>

        <CardActions sx={{ paddingTop: "3px", paddingBottom: "12px" }}>
          <Button
            onClick={(e) => AddCart(e)}
            sx={{
              height: "25px",
              margin: "auto",
              backgroundColor: "red",
              color: "white",
              borderRadius: "0.5rem",
              textTransform: "capitalize",
              fontWeight: "bold",
              fontSize: "0.8rem",
              "&:hover": {
                backgroundColor: "#DC2626",
              },
            }}
          >
            Add to Cart
          </Button>
        </CardActions>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={2000}
          onClose={() => setOpenSnackbar(false)}
          message="Product added succesfully"
          action={action}
        />
      </Card>
    </Box>
  );
};

export default HomeCard;
