import express from "express";
import routerPedidos from "./routes/router_pedidos.js"
import {promises as fs} from "fs";
import winston from "winston";
import cors from "cors";
import { exit } from "process";

global.fileName = "pedidos.json";

//Instância de Logs
const { combine, printf, label, timestamp} = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({
            filename: "delivery-api.log"
        })
    ],
    format: combine(
        label({
            label: "DELIVERY-API"
        }),
        timestamp(),
        myFormat
    )
});

const app = express();
app.use(express.json());

app.use("/pedidos", routerPedidos);
app.use(cors());
app.get("/", (req, res) => {
    res.send("GET Raiz");
});

app.listen("8099", async () => {
    try {
        await fs.readFile(global.fileName);
        logger.info("API Started!");
    } catch (err) {
        logger.error(err.message);
        exit();
    }
});