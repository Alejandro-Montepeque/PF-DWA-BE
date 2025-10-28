import { db } from "../config/firebase.js";

// Trae todas las categorías
export const getCategories = async (_req, res) => {
  try {
    // Obtenemos todos los documentos de la colección "categories"
    const snapshot = await db.collection("categories").get();

    // Si no hay categorías
    if (snapshot.empty) {
      return res.status(404).json({ message: "No se encontraron categorías." });
    }

    // Mapeamos los documentos a objetos con id + data
    const categories = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Enviamos la respuesta
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las categorías: " + error.message });
  }
};
