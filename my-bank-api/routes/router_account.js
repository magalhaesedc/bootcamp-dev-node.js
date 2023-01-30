import express from "express";
import { promises as fs } from "fs";

const router = express.Router();
router.use(express.json())

router.post("/", async (req, res, next) => {
    try {
        let newAccount = req.body;

        if(!newAccount.name || newAccount.balance == null){
            throw new Error("Name e Balance são obrigatórios!");
        }

        if(newAccount.balance < 0){
            throw new Error("Balance não pode ser menor que zero");
        }

        const data = JSON.parse(await fs.readFile(global.fileName));

        newAccount = {
            id: data.nextId++,
            name: newAccount.name,
            balance: newAccount.balance
        };
        data.accounts.push(newAccount);

        await fs.writeFile(global.fileName, JSON.stringify(data, null, 2));

        res.send(newAccount);

        global.logger.info(`POST /account - ${JSON.stringify(newAccount)}`);
    } catch (err) {
        next(err);
    }
});

router.get("/", async (req, res, next) => {
    try {
        const data = JSON.parse(await fs.readFile(global.fileName));
        delete data.nextId
        res.send(data);
        global.logger.info("GET /account");
    } catch(err) {
        next(err);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const data = JSON.parse(await fs.readFile(global.fileName));
        const result_account = data.accounts.find(account => account.id === parseInt(req.params.id));
        
        if(result_account === undefined){
            throw new Error("Registro não encontrado.");
        }

        res.send(result_account);
        global.logger.info("GET /account/:id");
    } catch(err) {
        next(err);
    }
});

router.delete("/:id", async (req, res, next) => {
    try {
        const data = JSON.parse(await fs.readFile(global.fileName));
        
        const result_account = data.accounts.find(account => account.id === parseInt(req.params.id));
        if(result_account === undefined){
            throw new Error("Registro não encontrado.");
        }

        data.accounts = data.accounts.filter(account => account.id !== parseInt(req.params.id));
        await fs.writeFile(global.fileName, JSON.stringify(data, null, 2));
        res.end();
        global.logger.info(`DELETE /account - ${req.params.id}`);
    } catch(err) {
        next(err);
    }
});

router.put("/", async (req, res, next) => {
    try {
        const update_account = req.body;

        if(!update_account.id || !update_account.name || update_account.balance == null){
            throw new Error("ID, Name e Balance são obrigatórios!");
        }

        if(update_account.balance < 0){
            throw new Error("Balance não pode ser menor que zero");
        }

        const data = JSON.parse(await fs.readFile(global.fileName));
        const index = data.accounts.findIndex(account => account.id === update_account.id);

        if(index === -1){
            throw new Error("Registro não encontrado.");
        }

        data.accounts[index].name = update_account.name;
        data.accounts[index].balance = update_account.balance;

        await fs.writeFile(global.fileName, JSON.stringify(data, null, 2));
        res.send(data.accounts[index]);
        global.logger.info(`PUT /account - ${JSON.stringify(data.accounts[index])}`);
    } catch(err) {
        next(err);
    }
});

router.patch("/updateBalance", async (req, res, next) => {
    try {
        const update_account = req.body;

        if(!update_account.id || update_account.balance == null){
            throw new Error("ID e Balance são obrigatórios!");
        }

        if(update_account.balance < 0){
            throw new Error("Balance não pode ser menor que zero");
        }

        const data = JSON.parse(await fs.readFile(global.fileName));
        const index = data.accounts.findIndex(account => account.id === update_account.id);

        if(index === -1){
            throw new Error("Registro não encontrado.");
        }

        data.accounts[index].balance = update_account.balance;

        await fs.writeFile(global.fileName, JSON.stringify(data, null, 2));
        res.send(data.accounts[index]);
        global.logger.info(`PATCH /account/updateBalance - ${JSON.stringify(data.accounts[index])}`);
    } catch(err) {
        next(err);
    }
});

router.use((err, req, res, next) => {
    global.logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
    res.status(400).send({ "error": err.message });
});

export default router;