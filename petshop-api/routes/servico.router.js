import express from "express";
import ServiceController from "../controllers/servico.controller.js";

const router = express.Router();

router.get("/", ServiceController.buscarServicos);
router.post("/", ServiceController.inserirServico);

export default router;