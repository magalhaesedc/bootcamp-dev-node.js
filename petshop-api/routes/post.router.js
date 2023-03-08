import express from "express";
import PostController from "../controllers/post.controller.js";

const router = express.Router();

router.get("/", PostController.buscarPosts);
router.post("/", PostController.inserirPost);
router.post("/comentario", PostController.inserirComentario);

export default router;