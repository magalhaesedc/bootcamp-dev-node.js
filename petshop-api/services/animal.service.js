import AnimalRepository from "../repositories/animal.repository.js";
import ProprietarioRepository from "../repositories/proprietario.repository.js";

async function inserirAnimal(animal){
    const proprietario = await ProprietarioRepository.buscarProprietario(animal.proprietarioId);
    if(!proprietario){
        throw new Error("O proprietario selecionado não existe.");
    }
    return AnimalRepository.inserirAnimal(animal);
}

async function buscarAnimais(proprietarioId){
    if(proprietarioId){
        return AnimalRepository.buscarAnimaisPorProprietario(proprietarioId);
    }
    return AnimalRepository.buscarAnimais();
}

async function buscarAnimal(id){
    return AnimalRepository.buscarAnimal(id);
}

async function deletarAnimal(id){
    AnimalRepository.deletarAnimal(id);
}

async function atualizarAnimal(animal){
    return AnimalRepository.atualizarAnimal(animal);
}

export default {
    inserirAnimal,
    buscarAnimais,
    buscarAnimal,
    deletarAnimal,
    atualizarAnimal
}