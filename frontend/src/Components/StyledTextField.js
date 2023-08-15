import { TextField, styled } from "@mui/material";

export const StyledTextfield = styled(TextField)({
  color: "black",
  marginTop: "2px",
  marginBottom: "15px",
  borderRadius: "5px",

  "& .MuiOutlinedInput-root": {
    backgroundColor: " #e2e8f0",
    height: "40px",
    "& fieldset": { border: "none" },

    "&:hover": {
      backgroundColor: "#f3f5f5",
      border: "4px solid #87959d",
    },

    "&.Mui-focused": {
      backgroundColor: "#f2f7ff",
      border: "4px solid #6398e2",
    },
    // "& input :-webkit-autofill": {
    //   WebkitBoxShadow: "0 0 0 1000px black inset",
    // },
    // input: {
    //   "&:-webkit-autofill:active": {
    //     WebkitBoxShadow: "0 0 0 100px transparent inset",
    //     WebkitTextFillColor: "black",
    //   },
    // }, Need to learn about this. Leaving it for next time.
  },
});
