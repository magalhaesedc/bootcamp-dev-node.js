import Sale from "../models/sale.model.js";
import Product from "../models/product.model.js";
import Client from "../models/client.model.js";

const includes = [{model: Product} ,{model: Client}];

async function insertSale(sale){
    console.log(sale);
    try {
        return await Sale.create(sale);
    } catch (err) {
        throw err;
    }
}

async function getSales(){
    try {
       return await Sale.findAll({include: includes});
    } catch (err) {
        throw err;
    }
}

async function getSalesByProductId(productId){
    try {
        return await Sale.findAll({
            where: {
                productId: productId
            },
            include: includes
        });
    } catch (err) {
        throw err;
    }
}

async function getSalesByClientId(clientId){
    try {
        return await Sale.findAll({
            where: {
                clientId: clientId
            },
            include: includes
        });
    } catch (err) {
        throw err;
    }
}

async function getSalesBySupplierId(supplierId){
    try {
        return await Sale.findAll({
            include: [
                {
                    model: Product,
                    where: {
                        supplierId: supplierId
                    } 
                }
            ]
        });
    } catch (err) {
        throw err;
    }
}

async function getSalesByProductIdClienteId(productId, clientId){
    try {
        return await Sale.findAll({
            where: {
                clientId: clientId,
                productId: productId
            },
            include: includes
        });
    } catch (err) {
        throw err;
    }
}

async function getSale(id){
    try {
        return await Sale.findByPk(id, {include: includes});
    } catch (err) {
        throw err;
    }
}

async function updateSale(sale){
    try {
        await Sale.update(
            {
                value: sale.value,
                date: sale.date,
                clientId: sale.clientId
            }, 
            {
                where: {
                    saleId: sale.saleId
                }
            }
        );
        return await getSale(sale.saleId)
    } catch (err) {
        throw err;
    }
}

async function deleteSale(id){
    try {
        await Sale.destroy({
            where: { saleId: id }
        });
    } catch (err) {
        throw err;
    }
}

export default {
    insertSale,
    getSales,
    getSalesByProductId,
    getSalesByClientId,
    getSalesByProductIdClienteId,
    getSalesBySupplierId,
    getSale,
    updateSale,
    deleteSale
}