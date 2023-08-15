import React, { useState } from "react";
import {
  AppBar,
  Badge,
  IconButton,
  MenuItem,
  Menu,
  Stack,
  Toolbar,
  useMediaQuery,
  Avatar,
} from "@mui/material";
import logo from "assets/logo (1).png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUserAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "State";

const navbarLinks = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
  { name: "Contact", link: "/contact" },
];
const Header = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.users.cartItems);
  const loggedIn = Boolean(useSelector((state) => state.users.token));
  const user = useSelector((state) => state.users.user);
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);

  const NoofCartItems =
    cartItems && cartItems.reduce((acc, { quantity }) => acc + quantity, 0);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      elevation={3}
      position="sticky"
      sx={{
        bgcolor: "white",
        height: isMobile ? "3rem" : "4rem",
      }}
    >
      <Toolbar
        sx={{
          px: 0,
          justifyContent: "space-between",
        }}
      >
        <IconButton
          onClick={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          <img src={logo} alt="logo" height={isMobile ? "30px" : "48px"} />
        </IconButton>

        <Stack
          fontSize={isMobile ? 12 : 18}
          direction="row"
          alignItems="center"
          spacing={isMobile ? 2 : 7}
        >
          {!isMobile &&
            navbarLinks.map((navLink) => {
              return (
                <Link
                  key={navLink.name}
                  style={{ textDecoration: "none" }}
                  to={navLink.link}
                  underline="none"
                >
                  {navLink.name}
                </Link>
              );
            })}

          <IconButton
            onClick={() => navigate("/cart")}
            sx={{ fontSize: isMobile ? "1rem" : "1.5rem" }}
          >
            <Badge badgeContent={NoofCartItems} color="primary" showZero>
              <FaShoppingCart style={{ color: "#475569" }} />
            </Badge>
          </IconButton>
          <IconButton
            onClick={handleClick}
            sx={{ fontSize: isMobile ? "1rem" : "1.5rem" }}
          >
            {loggedIn ? (
              <Avatar src={user.profilePic} alt="Profile Pic" />
            ) : (
              <FaUserAlt style={{ color: "#475569" }} />
            )}
          </IconButton>
          <Menu
            sx={{ color: "#475569" }}
            anchorEl={anchorEl}
            open={isOpen}
            onClose={handleClose}
          >
            {isMobile &&
              navbarLinks.map((navLink) => {
                return (
                  <MenuItem key={navLink.name}>
                    <Link
                      onClick={handleClose}
                      style={{ textDecoration: "none" }}
                      to={navLink.link}
                      underline="none"
                    >
                      {navLink.name}
                    </Link>
                  </MenuItem>
                );
              })}
            {user && user.role === "admin" && (
              <MenuItem
                onClick={() => {
                  navigate("/newproduct");
                  handleClose();
                }}
              >
                New Product
              </MenuItem>
            )}

            <MenuItem
              onClick={() => {
                handleClose();
                if (loggedIn) {
                  dispatch(setLogout());
                  navigate("/");
                } else {
                  navigate("/login");
                }
              }}
            >
              {loggedIn ? `Logout (${user.firstName})` : "Login"}
            </MenuItem>
          </Menu>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
