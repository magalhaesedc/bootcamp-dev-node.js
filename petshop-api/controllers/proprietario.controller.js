import ProprietarioService from "../services/proprietario.service.js";

async function inserirProprietario(req, res, next){
    try {
        let proprietario = req.body;
        if(!proprietario.nome || !proprietario.telefone){
            throw new Error("Nome, Telefone são obrigatórios.");
        }
        proprietario = await ProprietarioService.inserirProprietario(proprietario);
        res.send(proprietario);
        logger.info(`POST /proprietario - ${JSON.stringify(proprietario)}`);
    } catch (err) {
        next(err);
    }
}

async function buscarProprietarios(req, res, next){
    try {
        res.send(await ProprietarioService.buscarProprietarios());
        logger.info("GET /proprietarios");
    } catch (err) {
        next(err);
    }
}

async function buscarProprietario(req, res, next){
    try {
        res.send(await ProprietarioService.buscarProprietario(req.params.id));
        logger.info("GET /proprietario/"+req.params.id);
    } catch (err) {
        next(err);
    }
}

async function deletarProprietario(req, res, next){
    try {
        await ProprietarioService.deletarProprietario(req.params.id);
        res.end();
        logger.info("DELETE /proprietario/"+req.params.id);
    } catch (err) {
        next(err);
    }
}

async function atualizarProprietario(req, res, next){
    try {
        let proprietario = req.body;
        if(!proprietario.proprietarioId || !proprietario.nome || !proprietario.telefone){
            throw new Error("Proprietário ID, Nome, Telefone são obrigatórios.");
        }
        proprietario = await ProprietarioService.atualizarProprietario(proprietario);
        res.send(proprietario);
        logger.info(`PUT /proprietario - ${JSON.stringify(proprietario)}`);
    } catch (err) {
        next(err);
    }
}

export default {
    inserirProprietario,
    buscarProprietarios,
    buscarProprietario,
    deletarProprietario,
    atualizarProprietario
}