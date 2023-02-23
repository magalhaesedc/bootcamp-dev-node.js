import SupplierRepository from "../repositories/supplier.repository.js";

async function createSupplier(supplier){
    return SupplierRepository.insertSupplier(supplier);
}

async function getSuppliers(){
    return SupplierRepository.getSuppliers();
}

async function getSupplier(id){
    return SupplierRepository.getSupplier(id);
}

async function deleteSupplier(id){
    SupplierRepository.deleteSupplier(id);
}

async function updateSupplier(supplier){
    return SupplierRepository.updateSupplier(supplier);
}

export default {
    createSupplier,
    getSuppliers,
    getSupplier,
    deleteSupplier,
    updateSupplier
}