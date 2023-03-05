import SaleRepository from "../repositories/sale.repository.js";
import ProductRepository from "../repositories/product.repository.js";
import ClientRepository from "../repositories/client.repository.js";

async function createSale(sale){
    const errors = [];
    if(!await ClientRepository.getClient(sale.clientId)){
        errors.push("O Client ID não existe!");
    }
    let product = await ProductRepository.getProduct(sale.productId);
    if(!product){
        errors.push("O Product ID não existe!");
    }
    
    if(errors.length > 0){
        throw new Error(errors);
    }

    if(product.stock > 0){
        sale = SaleRepository.insertSale(sale);
        product.stock--;
        await ProductRepository.updateProduct(product);
        return sale;
    }else{
        throw new Error("O produto selecionado não possui estoque disponível.");
    }

}

async function getSales(productId, clientId, supplierId){
    if(productId && clientId){
        return SaleRepository.getSalesByProductIdClienteId(productId, clientId);
    }
    if(productId){
        return SaleRepository.getSalesByProductId(productId);
    }
    if(clientId){
        return SaleRepository.getSalesByClientId(clientId);
    }
    if(supplierId){
        return SaleRepository.getSalesBySupplierId(supplierId);
    }
    return SaleRepository.getSales();
}

async function getSale(id){
    return SaleRepository.getSale(id);
}

async function deleteSale(id){
    const sale = await SaleRepository.getSale(id);
    if(sale){
        await SaleRepository.deleteSale(id);
        let product = await ProductRepository.getProduct(sale.productId);
        product.stock++;
        await ProductRepository.updateProduct(product);
    }else{
        throw new Error("O sale não existe.");
    }
}

async function updateSale(sale){
    const errors = [];
    if(!await ClientRepository.getClient(sale.clientId)){
        errors.push("O Client ID não existe!");
    }
    if(errors.length > 0){
        throw new Error(errors);
    }
    return SaleRepository.updateSale(sale);
}

export default {
    createSale,
    getSales,
    getSale,
    deleteSale,
    updateSale
}