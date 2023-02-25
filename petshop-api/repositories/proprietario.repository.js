import {connect} from "./db.js";

async function inserirProprietario(proprietario){
    const conn = await connect();
    try {
        const sql = "INSERT INTO proprietarios (nome, telefone) VALUES ($1, $2) RETURNING *";
        const values = [proprietario.nome, proprietario.telefone];
        const res = await conn.query(sql, values);
        return res.rows[0];
    } catch (err) {
        throw err;
    }finally{
        conn.release();
    }
}

async function buscarProprietarios(){
    const conn = await connect();
    try {
        const sql = "SELECT * FROM proprietarios";
        const res = await conn.query(sql);
        return res.rows;
    } catch (err) {
        throw err;
    }finally{
        conn.release();
    }
}

async function buscarProprietario(id){
    const conn = await connect();
    try {
        const sql = "SELECT * FROM proprietarios WHERE proprietario_id = $1";
        const res = await conn.query(sql, [id]);
        return res.rows[0];
    } catch (err) {
        throw err;
    }finally{
        conn.release();
    }
}

async function deletarProprietario(id){
    const conn = await connect();
    try {
        const sql = "DELETE FROM proprietarios WHERE proprietario_id = $1";
        const res = await conn.query(sql, [id]);
    } catch (err) {
        throw err;
    }finally{
        conn.release();
    }
}

async function atualizarProprietario(proprietario){
    const conn = await connect();
    try {
        const sql = "UPDATE proprietarios SET nome = $2, telefone = $3 WHERE proprietario_id = $1 RETURNING *";
        const values = [proprietario.proprietario_id, proprietario.nome, proprietario.telefone];
        const res = await conn.query(sql, values);
        return res.rows[0];
    } catch (err) {
        throw err;
    }finally{
        conn.release();
    }
}

export default {
    inserirProprietario,
    buscarProprietarios,
    buscarProprietario,
    deletarProprietario,
    atualizarProprietario
}