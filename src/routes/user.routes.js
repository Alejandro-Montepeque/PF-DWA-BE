import express from "express";
import { getUsers, getUserById, addUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/addUsers", addUser);

export default router;
