import {connect} from "./db.js";

async function insertSupplier(supplier){
    const conn = await connect();
    try {
        const sql = "INSERT INTO suppliers (name, cnpj, phone, email, address) VALUES ($1, $2, $3, $4, $5) RETURNING *";
        const values = [supplier.name, supplier.cnpj, supplier.phone, supplier.email, supplier.address];
        const res = await conn.query(sql, values);
        return res.rows[0];
    } catch (err) {
        throw err;
    }finally{
        conn.release();
    }
}

async function getSuppliers(){
    const conn = await connect();
    try {
        const sql = "SELECT * FROM suppliers";
        const res = await conn.query(sql);
        return res.rows;
    } catch (err) {
        throw err;
    }finally{
        conn.release();
    }
}

async function getSupplier(id){
    const conn = await connect();
    try {
        const res = await conn.query("SELECT * FROM suppliers WHERE supplier_id = $1", [id]);
        return res.rows[0];
    } catch (err) {
        throw err;
    }finally{
        conn.release();
    }
}

async function updateSupplier(supplier){
    const conn = await connect();
    try {
        const sql = "UPDATE suppliers SET name = $2, cnpj = $3, phone = $4, email = $5, address = $6 WHERE supplier_id = $1 RETURNING *";
        const values = [supplier.supplier_id, supplier.name, supplier.cnpj, supplier.phone, supplier.email, supplier.address];
        const res = await conn.query(sql, values);
        return res.rows[0];
    } catch (err) {
        throw err;
    }finally{
        conn.release();
    }
}

async function deleteSupplier(id){
    const conn = await connect();
    try {
        await conn.query("DELETE FROM suppliers WHERE supplier_id = $1", [id]);
    } catch (err) {
        throw err;
    }finally{
        conn.release();
    }
}

export default {
    insertSupplier,
    getSuppliers,
    getSupplier,
    updateSupplier,
    deleteSupplier
}