import { Alert, Snackbar } from "@mui/material";
import React from "react";

const SuccessMessage = ({open, handleClose, message, severity}) => {
    
  return (
    <Snackbar open={open} autoHideDuration={8000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
      {message}
      </Alert>
    </Snackbar>
  );
};

export default SuccessMessage;