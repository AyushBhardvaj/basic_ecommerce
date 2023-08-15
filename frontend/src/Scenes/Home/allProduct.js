import { Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Capitalize } from "Utils/functions";
import Filteritems from "Components/Filteritems";
import { useState } from "react";
import ProductSlider from "../../Components/productSlider";

const AllProduct = () => {
  const { products } = useSelector((state) => state.product);
  const categories = products && [
    ...new Set(
      products.map((product) => {
        const category = Capitalize(product.category);
        return category;
      })
    ),
  ];

  const [filterCategory, setfilterCategory] = useState();

  const handleFilterClick = (category) => {
    console.log(category);
    category
      ? setfilterCategory(() => {
          return category.toLowerCase();
        })
      : setfilterCategory();
  };

  return (
    <Box>
      <Box display="flex" flexWrap="wrap" justifyContent="center" width="100%">
        <Filteritems category="All Categories" onClick={() => handleFilterClick()} />
        {products &&
          categories.map((category, index) => {
            return (
              <Filteritems
                key={index}
                category={category}
                isActive={category.toLowerCase()===filterCategory?true:false}
                onClick={() => handleFilterClick(category)}
              />
            );
          })}
      </Box>
      <ProductSlider category={filterCategory} />
    </Box>
  );
};

export default AllProduct;
