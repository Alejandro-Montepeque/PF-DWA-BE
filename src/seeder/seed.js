import { seedCategories } from "./categories.seed.js";
import { seedProducts } from "./products.seed.js";
import { seedUsers } from "./userInitial.seed.js";

const seedData = async () => {
  try {
    //Seeder para insertar categorias
    console.log("Insertando categorías...");
    const categoryRefs = await seedCategories();

    //Seeder para insertar productos en categorias
    console.log("Insertando productos...");
    await seedProducts(categoryRefs);

    //Seeder para insertar el usuario incial de pruebas
     console.log("Insertando usuario inicial...");
    await seedUsers();

    console.log("Datos iniciales insertados correctamente.");
    process.exit(0);
  } catch (error) {
    console.error("Error al insertar datos:", error);
    process.exit(1);
  }
};

seedData();
