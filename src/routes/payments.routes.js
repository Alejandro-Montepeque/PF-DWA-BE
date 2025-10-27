import express from "express";
import {
  createPayment,
  getPaymentsByUser,
  getPaymentById,
} from "../controllers/payments.controller.js";

const router = express.Router();

// Crear un nuevo pago
router.post("/", createPayment);

// Obtener todos los pagos de un usuario
router.get("/user/:userId", getPaymentsByUser);

// Obtener un pago específico
router.get("/:id", getPaymentById);

export default router;
