import { Avatar, Box, IconButton, Typography, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { AiOutlineShopping } from "react-icons/ai";

const Filteritems = ({ category, onClick, isActive }) => {
 
 
  return (
    <Stack
      direction="column"
      key={category}
      width="6rem"
      paddingX="2rem"
      alignItems="center"
      textAlign="center"
    >
      <IconButton name={category} onClick={onClick}>
        <Avatar sx={{ width: "5rem", height: "5rem", backgroundColor: isActive?"rgb(220 38 38)":"rgb(234 179 8)" }}>
          <AiOutlineShopping />
        </Avatar>
      </IconButton>
      <Typography>{category}</Typography>
    </Stack>
  );
};

export default Filteritems;
