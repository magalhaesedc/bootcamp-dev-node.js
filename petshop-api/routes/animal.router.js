import express from "express";
import AnimalController from "../controllers/animal.controller.js";

const router = express.Router();

router.get("/", AnimalController.buscarAnimais);
router.post("/", AnimalController.inserirAnimal);
router.get("/:id", AnimalController.buscarAnimal);
router.delete("/:id", AnimalController.deletarAnimal);
router.put("/", AnimalController.atualizarAnimal);

export default router;