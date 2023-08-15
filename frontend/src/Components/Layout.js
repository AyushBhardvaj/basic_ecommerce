import { Box } from "@mui/material";
import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Box>
      <Header />
      <Box
        minHeight="100vh"
        sx={{backgroundColor: "#f7fafc" }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
