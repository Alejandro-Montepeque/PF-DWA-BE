import { seedCategories } from "./categories.seed.js";
import { seedProducts } from "./products.seed.js";

const seedData = async () => {
  try {
    console.log("Insertando categorías...");
    const categoryRefs = await seedCategories();

    console.log("Insertando productos...");
    await seedProducts(categoryRefs);

    console.log("Datos iniciales insertados correctamente.");
    process.exit(0);
  } catch (error) {
    console.error("Error al insertar datos:", error);
    process.exit(1);
  }
};

seedData();
