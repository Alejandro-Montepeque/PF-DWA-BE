import db from "../config/firebase.js";
import Product from "../models/product.model.js";

const randomPrice = (min, max) => (Math.random() * (max - min) + min).toFixed(2);
const randomStock = () => Math.floor(Math.random() * 100) + 1;

// Algunos ejemplos de nombres base por categoría
const baseProducts = {
  Tecnología: [
    "Smartphone", "Laptop", "Tablet", "Auriculares Bluetooth", "Monitor LED",
    "Teclado mecánico", "Mouse gamer", "Cámara digital", "Smartwatch", "Disco duro externo",
    "Altavoz portátil", "Cargador rápido", "Router WiFi", "Micrófono USB", "Drone",
    "Proyector", "Memoria USB", "SSD", "Cable HDMI", "Base para laptop"
  ],
  Ropa: [
    "Camiseta", "Jeans", "Sudadera", "Chaqueta", "Pantalón formal",
    "Falda", "Vestido", "Short", "Blusa", "Camisa",
    "Bufanda", "Guantes", "Zapatos", "Tenis", "Gorra",
    "Bolso", "Cinturón", "Reloj", "Calcetines", "Abrigo"
  ],
  Hogar: [
    "Sofá", "Mesa", "Silla", "Lámpara", "Cortinas",
    "Cama", "Colchón", "Reloj de pared", "Cuadro decorativo", "Cojín",
    "Vaso de vidrio", "Plato", "Taza", "Cubertería", "Alfombra",
    "Refrigerador", "Horno microondas", "Ventilador", "Cortadora de césped", "Aspiradora"
  ],
  Deportes: [
    "Balón de fútbol", "Balón de baloncesto", "Raqueta de tenis", "Pesas", "Bicicleta",
    "Cinta para correr", "Guantes de boxeo", "Casco", "Gorra deportiva", "Botella de agua",
    "Zapatillas deportivas", "Rodilleras", "Protector bucal", "Banda elástica", "Cuerda para saltar",
    "Pantalón deportivo", "Camiseta deportiva", "Gafas de natación", "Tabla de surf", "Balón de voleibol"
  ],
  Juguetes: [
    "Muñeca", "Carrito", "Lego", "Rompecabezas", "Pelota",
    "Juego de mesa", "Drone infantil", "Cubos de construcción", "Peluche", "Tren eléctrico",
    "Juguete educativo", "Pistola de agua", "Trompo", "Patineta", "Cometa",
    "Set de cocina", "Bloques de madera", "Camión de bomberos", "Robot", "Microscopio"
  ],
  Belleza: [
    "Perfume", "Crema hidratante", "Shampoo", "Acondicionador", "Secadora de cabello",
    "Plancha para cabello", "Maquillaje", "Esmalte de uñas", "Cepillo facial", "Lima de uñas",
    "Crema facial", "Desodorante", "Aceite corporal", "Mascarilla facial", "Pinceles de maquillaje",
    "Tinte para cabello", "Espuma limpiadora", "Toallas faciales", "Crema para manos", "Exfoliante"
  ]
};

export const seedProducts = async (categoryRefs) => {
  console.log("Insertando productos...");

  try {
    for (const [categoryName, categoryId] of Object.entries(categoryRefs)) {
      const names = baseProducts[categoryName] || [];

      for (const name of names) {
        try {
          const product = new Product({
            name,
            description: `Producto de la categoría ${categoryName}`,
            price: randomPrice(10, 500),
            stock: randomStock(),
            categoryId,
            imageUrl: `https://picsum.photos/seed/${encodeURIComponent(name)}/300/300`,
          });

          await db.collection("products").add({
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            categoryId: product.categoryId,
            imageUrl: product.imageUrl,
            createdAt: product.createdAt,
          });
        } catch (err) {
          console.error(`Error insertando "${name}" en ${categoryName}:`, err.message);
        }
      }

      console.log(`Productos insertados para la categoría "${categoryName}".`);
    }

    console.log("Todos los productos fueron insertados correctamente.");
  } catch (error) {
    console.error("Error al insertar productos:", error);
  }
};
