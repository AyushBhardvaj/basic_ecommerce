import { Button, styled } from "@mui/material";
import React from "react";

const StyledButton = styled(Button)({
  backgroundColor: "#EF4444",
  maxWidth: "175px",
  borderRadius: "30px",
  margin: "12px auto",
  color: "white",
  fontWeight: "500",
  fontSize: "1.1rem",
  padding: "5px",
  textTransform: "capitalize",
  "&:hover": {
    backgroundColor: "#DC2626",
  },
  "&:focus": {
    boxShadow: "3",
  }
});

export default StyledButton;
