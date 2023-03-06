import express from "express";
import ProductController from "../controllers/product.controller.js";

const router = express.Router();

router.post("/info", ProductController.createProductInfo);
router.put("/info", ProductController.updateProductInfo);
router.get("/info", ProductController.getProductsInfo);
router.delete("/info/:id", ProductController.deleteProductInfo);

router.post("/", ProductController.createProduct);
router.get("/", ProductController.getProducts);
router.get("/:id", ProductController.getProduct);
router.delete("/:id", ProductController.deleteProduct);
router.put("/", ProductController.updateProduct);

router.post("/review", ProductController.createReview);
router.delete("/:id/review/:index", ProductController.deleteReview);

router.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
    res.status(400).send({ "error": err.message });
});


export default router;