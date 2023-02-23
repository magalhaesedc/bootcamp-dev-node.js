import SaleRepository from "../repositories/sale.repository.js";
import ProductRepository from "../repositories/product.repository.js";
import ClientRepository from "../repositories/client.repository.js";

async function createSale(sale){
    const errors = [];
    if(!await ClientRepository.getClient(sale.client_id)){
        errors.push("O Client ID não existe!");
    }
    let product = await ProductRepository.getProduct(sale.product_id);
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

async function getSales(product_id, client_id){
    if(product_id && client_id){
        return SaleRepository.getSalesByProductIdClienteId(product_id, client_id);
    }
    if(product_id){
        return SaleRepository.getSalesByProductId(product_id);
    }
    if(client_id){
        return SaleRepository.getSalesByClientId(client_id);
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
        let product = await ProductRepository.getProduct(sale.product_id);
        product.stock++;
        await ProductRepository.updateProduct(product);
    }else{
        console.log('ELSE');
        throw new Error("O sale não existe.");
    }
}

async function updateSale(sale){
    const errors = [];
    if(!await ProductRepository.getProduct(sale.product_id)){
        errors.push("O Product ID não existe!");
    }
    if(!await ClientRepository.getClient(sale.client_id)){
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