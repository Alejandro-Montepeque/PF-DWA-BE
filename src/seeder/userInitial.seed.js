import db from "../config/firebase.js";
import User from "../models/user.model.js";

export const seedUsers = async () => {
  try {
    const users = [
      {
        firstName: "Alejandro",
        lastName: "Montepeque",
        email: "alejandro@example.com",
        address: "San Salvador",
      },
    ];

    for (const userData of users) {
        const existing = await db
        .collection("users")
        .where("email", "==", userData.email)
        .get();

        if (!existing.empty) {
            console.log(`Usuario con correo "${userData.email}" ya existe, se omite.`);
            continue;
        }

        const user = new User(userData);
        const ref = await db.collection("users").add({ ...user });
        console.log(`Usuario agregado con ID: ${ref.id}`);
    }

  } catch (error) {
    console.error("Error al ejecutar el seeder:", error.message);
    process.exit(1);
  }
};
