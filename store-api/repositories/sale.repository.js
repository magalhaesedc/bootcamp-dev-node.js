import {connect} from "./db.js";

async function insertSale(sale){
    const conn = await connect();
    try {
        const sql = "INSERT INTO sales (value, date, client_id, product_id) VALUES ($1, $2, $3, $4) RETURNING *";
        const values = [sale.value, sale.date, sale.client_id, sale.product_id];
        const res = await conn.query(sql, values);
        return res.rows[0];
    } catch (err) {
        throw err;
    }finally{
        conn.release();
    }
}

async function getSales(){
    const conn = await connect();
    try {
        const sql = "SELECT * FROM sales";
        const res = await conn.query(sql);
        return res.rows;
    } catch (err) {
        throw err;
    }finally{
        conn.release();
    }
}

async function getSalesByProductId(product_id){
    const conn = await connect();
    try {
        const sql = "SELECT * FROM sales WHERE product_id = $1";
        const res = await conn.query(sql, [product_id]);
        return res.rows;
    } catch (err) {
        throw err;
    }finally{
        conn.release();
    }
}

async function getSalesByClientId(client_id){
    const conn = await connect();
    try {
        const sql = "SELECT * FROM sales WHERE client_id = $1";
        const res = await conn.query(sql, [client_id]);
        return res.rows;
    } catch (err) {
        throw err;
    }finally{
        conn.release();
    }
}

async function getSalesByProductIdClienteId(product_id, client_id){
    const conn = await connect();
    try {
        const sql = "SELECT * FROM sales WHERE product_id = $1 AND client_id = $2";
        const res = await conn.query(sql, [product_id, client_id]);
        return res.rows;
    } catch (err) {
        throw err;
    }finally{
        conn.release();
    }
}

async function getSale(id){
    const conn = await connect();
    try {
        const res = await conn.query("SELECT * FROM sales WHERE sale_id = $1", [id]);
        return res.rows[0];
    } catch (err) {
        throw err;
    }finally{
        conn.release();
    }
}

async function updateSale(sale){
    const conn = await connect();
    try {
        const sql = "UPDATE sales SET value = $2, date = $3, client_id = $4, product_id = $5 WHERE sale_id = $1 RETURNING *";
        const values = [sale.sale_id, sale.value, sale.date, sale.client_id, sale.product_id];
        const res = await conn.query(sql, values);
        return res.rows[0];
    } catch (err) {
        throw err;
    }finally{
        conn.release();
    }
}

async function deleteSale(id){
    const conn = await connect();
    try {
        await conn.query("DELETE FROM sales WHERE sale_id = $1", [id]);
    } catch (err) {
        throw err;
    }finally{
        conn.release();
    }
}

export default {
    insertSale,
    getSales,
    getSalesByProductId,
    getSalesByClientId,
    getSalesByProductIdClienteId,
    getSale,
    updateSale,
    deleteSale
}