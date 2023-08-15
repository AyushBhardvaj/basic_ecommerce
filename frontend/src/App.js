import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import "./App.css";
import Layout from "Components/Layout";
import About from "Scenes/About";
import Contact from "Scenes/Contact";
import Home from "Scenes/Home";
import Login from "Scenes/Login";
import Menu from "Scenes/Menu";
import NewProduct from "Scenes/NewProduct";
import Signup from "Scenes/Signup";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Cart from "Scenes/Cart";
import Failure from 'Scenes/Payment/failure.js'
import Success from 'Scenes/Payment/success.js'

function App() {
  const user = useSelector((state) => state.users.user);
  const theme = createTheme((themeSettings()))
  return (
    <div>
      <BrowserRouter>
      <ThemeProvider theme={theme}>
      <CssBaseline />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {user && user.role === "admin" && (
              <Route path="/newproduct" element={<NewProduct />} />
            )}
            {/* <Route path="/menu" element={<Menu />} /> */}
            <Route path="/menu/:productId" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            
          </Route>
          <Route path="/success" element={<Success />} />
            <Route path="/failure" element={<Failure/>} />

        </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
