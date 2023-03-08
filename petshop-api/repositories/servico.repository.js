import Servico from "../models/servico.model.js";
import Animal from "../models/animal.model.js";
import Proprietario from "../models/proprietario.model.js";

async function inserirServico(servico){
    try {
        return await Servico.create(servico);
    } catch (err) {
        throw err;
    }
}

async function buscarServicos(){
    try {
        return await Servico.findAll({
            include: [
                {
                    model: Animal,
                    include: [
                        {
                            model: Proprietario
                        }
                    ]
                },
                
            ]
        });
    } catch (err) {
        throw err;
    }
}

async function buscarServico(id){
    try {
        return await Servico.findByPk(id, {
            include: [
                {
                    model: Animal
                }
            ],
            where: { servicoId: id }
        });
    } catch (err) {
        throw err;
    }
}

async function buscarServicosPorProprietario(proprietarioId){
    try {
        return await Servico.findAll({
            include: [
                {
                    model: Animal,
                    where: {
                        proprietarioId
                    }
                }
            ]
        });
    } catch (err) {
        throw err;
    }
}

async function deletarServico(id){
    try {
        await Servico.destroy({
            where: { servicoId: id }
        });
    } catch (err) {
        throw err;
    }
}

async function atualizarServico(servico){
    try {
        await Servico.update(servico, {
            where: { servicoId: servico.servicoId }
        });
        return await buscarServico(servico.servicoId)
    } catch (err) {
        throw err;
    }
}

export default {
    inserirServico,
    buscarServicos,
    buscarServicosPorProprietario,
    buscarServico,
    deletarServico,
    atualizarServico
}