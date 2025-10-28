import { db } from "../config/firebase.js";
import User from "../models/user.model.js";

// Obtiene todos los usuarios
export const getUsers = async (_req, res) => {
  try {
    const snapshot = await db.collection("users").get();
    const users = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

// Obtiene un usuario por ID
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection("users").doc(id).get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

// Agrega un nuevo usuario
export const addUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const ref = await db.collection("users").add({ ...user });
    res.status(201).json({ id: ref.id, message: "Usuario agregado correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
