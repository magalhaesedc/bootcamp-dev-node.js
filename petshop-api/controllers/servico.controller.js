import ServicoService from "../services/servico.service.js";

async function inserirServico(req, res, next){
    try {
        let servico = req.body;
        if(!servico.descricao || !servico.valor || !servico.animalId){
            throw new Error("Descrição, Valor e Animal ID são obrigatórios.");
        }
        servico = await ServicoService.inserirServico(servico);
        res.send(servico);
        logger.info(`POST /servico - ${JSON.stringify(servico)}`);
    } catch (err) {
        next(err);
    }
}

async function buscarServicos(req, res, next){
    try {
        res.send(await ServicoService.buscarServicos(req.query.proprietarioId));
        logger.info("GET /servicos");
    } catch (err) {
        next(err);
    }
}

async function buscarServico(req, res, next){
    try {
        res.send(await ServicoService.buscarServico(req.params.id));
        logger.info("GET /servico/"+req.params.id);
    } catch (err) {
        next(err);
    }
}

async function deletarServico(req, res, next){
    try {
        await ServicoService.deletarServico(req.params.id);
        res.end();
        logger.info("DELETE /servico/"+req.params.id);
    } catch (err) {
        next(err);
    }
}

async function atualizarServico(req, res, next){
    try {
        let servico = req.body;
        if(!servico.servicoId || !servico.descricao || !servico.valor || !servico.animalId){
            throw new Error("Proprietário ID, Descrição, Valor e Animal ID são obrigatórios.");
        }
        servico = await ServicoService.atualizarServico(servico);
        res.send(servico);
        logger.info(`PUT /servico - ${JSON.stringify(servico)}`);
    } catch (err) {
        next(err);
    }
}

export default {
    inserirServico,
    buscarServicos,
    buscarServico,
    deletarServico,
    atualizarServico
}