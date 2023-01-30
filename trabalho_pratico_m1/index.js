import express from "express";
import routerCar from "./router_car.js"

global.fileName = "car-list.json";

const app = express();
app.use(express.json());

app.use("/marcas", routerCar);

app.listen("8099", async () => {
    console.log("API Started!");
});