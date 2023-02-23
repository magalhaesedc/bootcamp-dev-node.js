import express from "express";
import ClientController from "../controllers/cliente.controller.js";

const router = express.Router();

router.post("/", ClientController.createClient);
router.get("/", ClientController.getClients);
router.get("/:id", ClientController.getClient);
router.delete("/:id", ClientController.deleteClient);
router.put("/", ClientController.updateClient);

router.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
    res.status(400).send({ "error": err.message });
});


export default router;