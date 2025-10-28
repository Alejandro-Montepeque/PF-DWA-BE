// src/seeder/categories.seed.js
import db from "../config/firebase.js"; // importa Firestore
import Category from "../models/category.model.js"; // tu modelo

const categoriesData = [
  { name: "Tecnología", description: "Artículos electrónicos y gadgets" },
  { name: "Ropa", description: "Moda para hombres y mujeres" },
  { name: "Hogar", description: "Muebles y artículos domésticos" },
  { name: "Deportes", description: "Equipamiento y ropa deportiva" },
  { name: "Juguetes", description: "Juguetes y juegos para todas las edades" },
  { name: "Belleza", description: "Productos de cuidado personal y belleza" },
];

export const seedCategories = async () => {
  const categoryRefs = {};
  console.log("Insertando categorías...");

  for (const catData of categoriesData) {
    try {

        const existing = await db
        .collection("categories")
        .where("name", "==", catData.name)
        .get();

        //Valida que si los datos ya existen no los vuelva a insertar
        if (!existing.empty) {
            console.log(`Categoría "${catData.name}" ya existe, se omite.`);
            categoryRefs[catData.name] = existing.docs[0].id;
            continue;
        }

        // Validar los datos usando el modelo
        const category = new Category(catData);
        // Insertar en Firestore usando un objeto plano
        const ref = await db.collection("categories").add({
            name: category.name,
            description: category.description,
            createdAt: category.createdAt,
        });

        categoryRefs[category.name] = ref.id;
    } catch (err) {
      console.error(`Error con la categoría "${catData.name}":`, err.message);
    }
  }

  console.log("Categorías insertadas correctamente.");
  return categoryRefs;
};
