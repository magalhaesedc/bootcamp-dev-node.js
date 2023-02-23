import ProprietarioRepository from "../repositories/proprietario.respository.js";

async function inserirProprietario(proprietario){
    return ProprietarioRepository.inserirProprietario(proprietario);
}

async function buscarProprietarios(){
    return ProprietarioRepository.buscarProprietarios();
}

export default {
    inserirProprietario,
    buscarProprietarios
}