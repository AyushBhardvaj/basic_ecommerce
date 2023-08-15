import Product from "../models/productModel.js";

export const addproduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getproduct = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(201).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
