import Proprietario from "../models/proprietario.model.js";

async function inserirProprietario(proprietario){
    try {
        return await Proprietario.create(proprietario);
    } catch (err) {
        throw err;
    }
}

async function buscarProprietarios(){
    try {
        return await Proprietario.findAll();
    } catch (err) {
        throw err;
    }
}

async function buscarProprietario(id){
    try {
        return await Proprietario.findByPk(id, {
            where: { proprietarioId: id }
        });
    } catch (err) {
        throw err;
    }
}

async function deletarProprietario(id){
    try {
        await Proprietario.destroy({
            where: { proprietarioId: id }
        });
    } catch (err) {
        throw err;
    }
}

async function atualizarProprietario(proprietario){
    try {
        await Proprietario.update(proprietario, {
            where: { proprietarioId: proprietario.proprietarioId }
        });
        return await buscarProprietario(proprietario.proprietarioId)
    } catch (err) {
        throw err;
    }
}

export default {
    inserirProprietario,
    buscarProprietarios,
    buscarProprietario,
    deletarProprietario,
    atualizarProprietario
}