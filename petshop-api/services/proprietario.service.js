import ProprietarioRepository from "../repositories/proprietario.repository.js";
import AnimalRepository from "../repositories/animal.repository.js";

async function inserirProprietario(proprietario){
    return ProprietarioRepository.inserirProprietario(proprietario);
}

async function buscarProprietarios(){
    return ProprietarioRepository.buscarProprietarios();
}

async function buscarProprietario(id){
    return ProprietarioRepository.buscarProprietario(id);
}

async function deletarProprietario(id){
    const animal = await AnimalRepository.buscarAnimaisPorProprietario(id);
    if(animal.length > 0){
        throw new Error("Não é possível deletar esse proprietário pois possui vínculo com animais");
    }

    ProprietarioRepository.deletarProprietario(id);
}

async function atualizarProprietario(proprietario){
    return ProprietarioRepository.atualizarProprietario(proprietario);
}

export default {
    inserirProprietario,
    buscarProprietarios,
    buscarProprietario,
    deletarProprietario,
    atualizarProprietario
}