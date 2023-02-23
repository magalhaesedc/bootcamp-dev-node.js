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

export default {
    inserirProprietario,
    buscarProprietarios
}