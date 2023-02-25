import express from "express";
import ProprietarioController from "../controllers/proprietario.controller.js";

const router = express.Router();

router.get("/", ProprietarioController.buscarProprietarios);
router.post("/", ProprietarioController.inserirProprietario);
router.get("/:id", ProprietarioController.buscarProprietario);
router.delete("/:id", ProprietarioController.deletarProprietario);
router.put("/", ProprietarioController.atualizarProprietario);

export default router;