import express from "express";
import SaleController from "../controllers/sale.controller.js";

const router = express.Router();

router.post("/", SaleController.createSale);
router.get("/", SaleController.getSales);
router.get("/:id", SaleController.getSale);
router.delete("/:id", SaleController.deleteSale);
router.put("/", SaleController.updateSale);

router.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
    res.status(400).send({ "error": err.message });
});


export default router;