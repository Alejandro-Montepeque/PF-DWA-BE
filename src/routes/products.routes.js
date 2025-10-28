import express from "express";
import { getProducts, addProduct } from "../controllers/products.controller.js";

const router = express.Router();

router.get("/getAll", getProducts);
router.post("/products", addProduct);

export default router;
