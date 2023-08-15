import { Box, Typography } from "@mui/material";
import React from "react";

const success = () => {
  return (
    <Box
      marginX="auto"
      width="30rem"
      height="20rem"
      marginTop="5rem"
      paddingTop="5rem"
      sx={{ backgroundColor: "#D0F0C0", textAlign: "center" }}
    >
      <Typography variant="h6" color="#0B6623">
        Your payment was successful
      </Typography>
    </Box>
  );
};

export default success;
