import {connect} from "./db.js";

async function insertClient(client){
    const conn = await connect();
    try {
        const sql = "INSERT INTO clients (name, cpf, phone, email, address) VALUES ($1, $2, $3, $4, $5) RETURNING *";
        const values = [client.name, client.cpf, client.phone, client.email, client.address];
        const res = await conn.query(sql, values);
        return res.rows[0];
    } catch (err) {
        throw err;
    }finally{
        conn.release();
    }
}

async function getClients(){
    const conn = await connect();
    try {
        const sql = "SELECT * FROM clients";
        const res = await conn.query(sql);
        return res.rows;
    } catch (err) {
        throw err;
    }finally{
        conn.release();
    }
}

async function getClient(id){
    const conn = await connect();
    try {
        const res = await conn.query("SELECT * FROM clients WHERE client_id = $1", [id]);
        return res.rows[0];
    } catch (err) {
        throw err;
    }finally{
        conn.release();
    }
}

async function updateClient(client){
    const conn = await connect();
    try {
        const sql = "UPDATE clients SET name = $2, cpf = $3, phone = $4, email = $5, address = $6 WHERE client_id = $1 RETURNING *";
        const values = [client.client_id, client.name, client.cpf, client.phone, client.email, client.address];
        const res = await conn.query(sql, values);
        return res.rows[0];
    } catch (err) {
        throw err;
    }finally{
        conn.release();
    }
}

async function deleteClient(id){
    const conn = await connect();
    try {
        await conn.query("DELETE FROM clients WHERE client_id = $1", [id]);
    } catch (err) {
        throw err;
    }finally{
        conn.release();
    }
}

export default {
    insertClient,
    getClients,
    getClient,
    updateClient,
    deleteClient
}