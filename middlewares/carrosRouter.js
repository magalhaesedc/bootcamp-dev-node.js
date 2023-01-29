import express from "express";

const router = express.Router();

router.route("/") 
    .get((req, res) => {
        res.send("GET /carros (Recupera Carros)");
    })
    .post((req, res) => {
        res.send("POST /carros (Inseri Carros)");
    });

router.get("/listagem", (req, res) => {
    console.log("GET /carros/listagem");
    res.send("GET /carros/listagem");
});

export default router;