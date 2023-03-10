import ProductRepository from "../repositories/product.repository.js";
import SupplierRepository from "../repositories/supplier.repository.js";

async function createProduct(product){
    if(await SupplierRepository.getSupplier(product.supplier_id)){
        return ProductRepository.insertProduct(product);
    }
    throw new Error("O Suplier ID não existe!");
}

async function getProducts(){
    return ProductRepository.getProducts();
}

async function getProduct(id){
    return ProductRepository.getProduct(id);
}

async function deleteProduct(id){
    ProductRepository.deleteProduct(id);
}

async function updateProduct(product){
    if(await SupplierRepository.getSupplier(product.supplier_id)){
        return ProductRepository.updateProduct(product);
    }
    throw new Error("O Suplier ID não existe!");
}

export default {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct
}