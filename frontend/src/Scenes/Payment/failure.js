import { Box, Typography } from "@mui/material";
import React from "react";

const failure = () => {
  return (
    <Box
      marginX="auto"
      width="30rem"
      height="20rem"
      marginTop="5rem"
      paddingTop="5rem"
      sx={{ backgroundColor: "#ffe2e2", textAlign: "center" }}
    >
      <Typography variant="h6" color="Red">
        Your payment has failed
      </Typography>
    </Box>
  );
};

export default failure;
