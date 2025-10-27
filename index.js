import express from "express";
import cors from "cors";

// Importar rutas (usa rutas relativas correctas)
import cartRoutes from "./src/routes/cart.routes.js";
import paymentRoutes from './src/routes/payments.routes.js';
import productRoutes from './src/routes/products.routes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas base
app.use("/api/cart", cartRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/products", productRoutes);

// Ruta base de prueba
app.get("/", (req, res) => {
  res.send("Servidor corriendo correctamente 🚀");
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
