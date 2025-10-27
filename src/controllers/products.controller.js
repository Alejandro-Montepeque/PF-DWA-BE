// src/controllers/products.controller.js
import db from "../config/firebase.js";
import Product from "../models/product.model.js";

// Agregar producto
export const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    const ref = await db.collection("products").add({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      categoryId: product.categoryId,
      imageUrl: product.imageUrl,
      createdAt: product.createdAt,
    });
    res.status(201).json({ id: ref.id, message: "Producto agregado correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los productos
export const getProducts = async (_req, res) => {
  try {
    const snapshot = await db.collection("products").get();
    const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
