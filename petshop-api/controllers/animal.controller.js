import AnimalService from "../services/animal.service.js";

async function inserirAnimal(req, res, next){
    try {
        let animal = req.body;
        if(!animal.nome || !animal.tipo || !animal.proprietarioId){
            throw new Error("Nome, Tipo e Proprietario ID são obrigatórios.");
        }
        animal = await AnimalService.inserirAnimal(animal);
        res.send(animal);
        logger.info(`POST /animal - ${JSON.stringify(animal)}`);
    } catch (err) {
        next(err);
    }
}

async function buscarAnimais(req, res, next){
    try {
        res.send(await AnimalService.buscarAnimais(req.query.proprietarioId));
        logger.info("GET /animais");
    } catch (err) {
        next(err);
    }
}

async function buscarAnimal(req, res, next){
    try {
        res.send(await AnimalService.buscarAnimal(req.params.id));
        logger.info("GET /animal/"+req.params.id);
    } catch (err) {
        next(err);
    }
}

async function deletarAnimal(req, res, next){
    try {
        await AnimalService.deletarAnimal(req.params.id);
        res.end();
        logger.info("DELETE /animal/"+req.params.id);
    } catch (err) {
        next(err);
    }
}

async function atualizarAnimal(req, res, next){
    try {
        let animal = req.body;
        if(!animal.animalId || !animal.nome || !animal.tipo){
            throw new Error("Animal ID, Nome e Tipo são obrigatórios.");
        }
        animal = await AnimalService.atualizarAnimal(animal);
        res.send(animal);
        logger.info(`PUT /animal - ${JSON.stringify(animal)}`);
    } catch (err) {
        next(err);
    }
}

export default {
    inserirAnimal,
    buscarAnimais,
    buscarAnimal,
    deletarAnimal,
    atualizarAnimal
}