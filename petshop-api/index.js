import express from "express";
import cors from "cors";
import winston from "winston";
import animaisRouter from "./routes/animais.router.js";
import proprietariosRouter from "./routes/proprietario.router.js";

const { combine, printf, label, timestamp} = winston.format;
const { Console, File } = winston.transports;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new (Console)(),
        new (File)({ filename: "petshop-api.log" })
    ],
    format: combine(
        label({ label: "PETSHOP-API" }),
        timestamp(),
        myFormat
    )
});

const app = express();
app.use(express.json());
app.use(cors());
app.use("/animais", animaisRouter);
app.use("/proprietario", proprietariosRouter);
app.listen(3000, () => console.log("API Started!"));