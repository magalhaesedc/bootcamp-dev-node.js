import Animal from "../models/animal.model.js";
import Proprietario from "../models/proprietario.model.js";

async function inserirAnimal(animal){
    try {
        return await Animal.create(animal);
    } catch (err) {
        throw err;
    }
}

async function buscarAnimais(){
    try {
        return await Animal.findAll({
            include: [ { model: Proprietario } ]
        });
    } catch (err) {
        throw err;
    }
}

async function buscarAnimaisPorProprietario(proprietarioId){
    try {
        return await Animal.findAll({
            include: [
                {
                    model: Proprietario,
                }
            ],
            where: {
                proprietarioId
            }
        });
    } catch (err) {
        throw err;
    }
}

async function buscarAnimal(id){
    try {
        return await Animal.findByPk(id, {
            include: [ { model: Proprietario } ]
        });
    } catch (err) {
        throw err;
    }
}

async function deletarAnimal(id){
    try {
        await Animal.destroy({
            where: { animalId: id }
        });
    } catch (err) {
        throw err;
    }
}

async function atualizarAnimal(animal){
    try {
        await Animal.update(animal, {
            where: { animalId: animal.animalId }
        });
        return await buscarAnimal(animal.animalId);
    } catch (err) {
        throw err;
    }
}

export default {
    inserirAnimal,
    buscarAnimais,
    buscarAnimal,
    deletarAnimal,
    atualizarAnimal,
    buscarAnimaisPorProprietario
}