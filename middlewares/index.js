import express from "express";
import carrosRouter from "./carrosRouter.js";

const app = express();
app.use(express.json());

app.use("/carros", carrosRouter);

app.use((req, res, next) => {
    console.log(new Date());
    next();
});

app.get("/teste", (req, res) => {
    res.end();
});

app.listen("8099", () => {
   console.log("API started!"); 
});

