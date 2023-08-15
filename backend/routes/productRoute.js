import express from "express";
import { addproduct } from "../controllers/productController.js";
import { getproduct } from "../controllers/productController.js";

const router = express.Router();

router.post("/addproduct", addproduct);
router.get("/getproduct", getproduct);

export default router;