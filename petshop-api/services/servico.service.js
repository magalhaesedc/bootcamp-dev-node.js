import ServicoRepository from "../repositories/servico.repository.js";

async function inserirServico(servico){
    return ServicoRepository.inserirServico(servico);
}

async function buscarServicos(proprietarioId){
    if(proprietarioId){
        return ServicoRepository.buscarServicosPorProprietario(proprietarioId);
    }
    return ServicoRepository.buscarServicos();
}

async function buscarServico(id){
    return ServicoRepository.buscarServico(id);
}

async function deletarServico(id){
    ServicoRepository.deletarServico(id);
}

async function atualizarServico(servico){
    return ServicoRepository.atualizarServico(servico);
}

export default {
    inserirServico,
    buscarServicos,
    buscarServico,
    deletarServico,
    atualizarServico
}