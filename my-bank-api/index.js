import express from "express";
import routerAccount from "./routes/router_account.js"
import {promises as fs} from "fs";
import winston from "winston";
import cors from "cors";

global.fileName = "accounts.json";

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
            filename: "my-bank-api.log"
        })
    ],
    format: combine(
        label({
            label: "MY-BANK-API"
        }),
        timestamp(),
        myFormat
    )
});

const app = express();
app.use(express.json());

app.use("/account", routerAccount);
app.use(cors());
app.get("/", (req, res) => {
    res.send("GET Raiz");
});

app.listen("8099", async () => {
    try {
        await fs.readFile(global.fileName);
        logger.info("API Started!");
    } catch (err) {
        const data_json = {
            "nextId": 1,
            "accounts": []
        }
        await fs.writeFile(global.fileName, JSON.stringify(data_json)).then(() => {
            logger.info("API Started and File Created!");
        }).catch(err => {
            logger.error(err.message);
        });
    }
});