import express from "express";
import {
  getCart,
  addItem,
  removeItem,
  deleteItem,
  clearCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

// Obtener carrito
router.get("/:userId", getCart);

// Agregar producto o aumentar cantidad
router.post("/:userId/add", addItem);

// Disminuir cantidad o eliminar si llega a 0
router.post("/:userId/remove", removeItem);

// Eliminar producto completamente
router.delete("/:userId/delete/:productId", deleteItem);

// Vaciar carrito
router.delete("/:userId/clear", clearCart);

export default router;
