import express from "express";
import ProprietarioController from "../controllers/proprietario.controller.js";

const router = express.Router();

router.get("/", ProprietarioController.buscarProprietarios);
router.post("/", ProprietarioController.inserirProprietario);

export default router;