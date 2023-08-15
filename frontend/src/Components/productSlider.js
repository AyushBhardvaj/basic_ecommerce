import React, { useRef } from "react";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import HomeCard from "Components/HomeCard";
import { useSelector } from "react-redux";


const GreenVeggie = ({loading=false, category }) => {
  const ref = useRef()
    const { products } = useSelector((state) => state.product);
    const loadingArrayFeature = new Array(10).fill(null);

    const handleBackClick = () => {
        ref.current.scrollLeft -= 300;
      };
    
      const handleForwardClick = () => {
        ref.current.scrollLeft += 300;
      };

  return (
    <Box>
      <Box display="flex" alignItems="center" paddingX="0">
        <IconButton onClick={handleBackClick} sx={{ height: "10%" }}>
          <ArrowBack />
        </IconButton>
        <Box
          ref={ref}
          sx={{
            scrollbar: "none",
            display: "grid",
            overflowX: "scroll",
            scrollBehavior: "smooth",
            paddingY: "1.5rem",
            gridTemplateColumns: "repeat(auto-fit, 1fr)",
            gridAutoFlow: "column",
            columnGap: "10px",
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {products
            ? products
                .filter((product) => {
                  if(category) {
                    return product.category === category;
                  }
                  else {
                    return product
                  }
                })
                .map(({ name, category, price, image, _id }) => {
                  return (
                    <HomeCard
                      key={name}
                      productId={_id}
                      name={name}
                      price={price}
                      image={image}
                      category={category}
                      loading={loading}
                    />
                  );
                })
            : loadingArrayFeature.map((el, index) => {
                return <HomeCard key={index} loading={true} />;
              })}
        </Box>
        <IconButton onClick={handleForwardClick} sx={{ height: "10%" }}>
          <ArrowForward />
        </IconButton>
      </Box>
    </Box>
  );
};

export default GreenVeggie;
