import AccountServices from "../services/account.services.js";

async function createAccount (req, res, next) {
    try {
        let newAccount = req.body;
        if(!newAccount.name || newAccount.balance == null){
            throw new Error("Name e Balance são obrigatórios!");
        }
        if(newAccount.balance < 0){
            throw new Error("Balance não pode ser menor que zero");
        }
        newAccount = await AccountServices.createAccount(newAccount);
        global.logger.info(`POST /account - ${JSON.stringify(newAccount)}`);
        res.send(newAccount);
    } catch (err) {
        next(err);
    }
}

async function getAccounts (req, res, next) {
    try {
        global.logger.info("GET /account");
        res.send(await AccountServices.getAccounts());
    } catch(err) {
        next(err);
    }
}

async function getAccount (req, res, next) {
    try {
        const result_account = await AccountServices.getAccount(req.params.id);
        global.logger.info("GET /account/:id");
        res.send(result_account);
    } catch(err) {
        next(err);
    }
}

async function deleteAccount (req, res, next) {
    try {
        await AccountServices.deleteAccount(req.params.id);
        res.end();
        global.logger.info(`DELETE /account - ${req.params.id}`);
    } catch(err) {
        next(err);
    }
}

async function updateAccount (req, res, next) {
    try {
        const update_account = req.body;
        if(!update_account.id || !update_account.name || update_account.balance == null){
            throw new Error("ID, Name e Balance são obrigatórios!");
        }
        if(update_account.balance < 0){
            throw new Error("Balance não pode ser menor que zero");
        }
        const account = await AccountServices.updateAccount(update_account);
        global.logger.info(`PUT /account - ${JSON.stringify(account)}`);
        res.send(account);
    } catch(err) {
        next(err);
    }
}

async function updateBalance (req, res, next) {
    try {
        const update_account = req.body;
        if(!update_account.id || update_account.balance == null){
            throw new Error("ID e Balance são obrigatórios!");
        }
        if(update_account.balance < 0){
            throw new Error("Balance não pode ser menor que zero");
        }
        const account = await AccountServices.updateBalance(update_account);
        global.logger.info(`PATCH /account/updateBalance - ${JSON.stringify(account)}`);
        res.send(account);
    } catch(err) {
        next(err);
    }
}

export default { 
    createAccount,
    getAccounts,
    getAccount,
    deleteAccount,
    updateAccount,
    updateBalance
};