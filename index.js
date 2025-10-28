import express from "express";
import cors from "cors";

// Importar las rutas configuradas
import cartRoutes from "./src/routes/cart.routes.js";
import paymentRoutes from './src/routes/payments.routes.js';
import productRoutes from './src/routes/products.routes.js';
import categoryRoutes from './src/routes/category.routes.js';
import userRouter from './src/routes/user.routes.js';


const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas base
app.use("/api/cart", cartRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/users", userRouter);

// Ruta base de prueba
app.get("/", (req, res) => {
  res.send("Servidor corriendo correctamente");
});

// Puerto
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
