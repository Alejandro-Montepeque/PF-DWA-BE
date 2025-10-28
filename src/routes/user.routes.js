import express from "express";
import { getUsers, getUserById, addUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users", addUser);

export default router;
