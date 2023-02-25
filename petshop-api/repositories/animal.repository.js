import {connect} from "./db.js";

async function inserirAnimal(animal){
    const conn = await connect();
    try {
        const sql = "INSERT INTO animais (nome, tipo, proprietario_id) VALUES ($1, $2, $3) RETURNING *";
        const values = [animal.nome, animal.tipo, animal.proprietario_id];
        const res = await conn.query(sql, values);
        return res.rows[0];
    } catch (err) {
        throw err;
    }finally{
        conn.release();
    }
}

async function buscarAnimais(){
    const conn = await connect();
    try {
        const sql = "SELECT * FROM animais";
        const res = await conn.query(sql);
        return res.rows;
    } catch (err) {
        throw err;
    }finally{
        conn.release();
    }
}

async function buscarAnimaisPorProprietario(proprietario_id){
    const conn = await connect();
    try {
        const sql = "SELECT * FROM animais WHERE proprietario_id = $1";
        const res = await conn.query(sql, [proprietario_id]);
        return res.rows;
    } catch (err) {
        throw err;
    }finally{
        conn.release();
    }
}

async function buscarAnimal(id){
    const conn = await connect();
    try {
        const sql = "SELECT * FROM animais WHERE animal_id = $1";
        const res = await conn.query(sql, [id]);
        return res.rows[0];
    } catch (err) {
        throw err;
    }finally{
        conn.release();
    }
}

async function deletarAnimal(id){
    const conn = await connect();
    try {
        const sql = "DELETE FROM animais WHERE animal_id = $1";
        const res = await conn.query(sql, [id]);
    } catch (err) {
        throw err;
    }finally{
        conn.release();
    }
}

async function atualizarAnimal(animal){
    const conn = await connect();
    try {
        const sql = "UPDATE animais SET nome = $2, tipo = $3 WHERE animal_id = $1 RETURNING *";
        const values = [animal.animal_id, animal.nome, animal.tipo];
        const res = await conn.query(sql, values);
        return res.rows[0];
    } catch (err) {
        throw err;
    }finally{
        conn.release();
    }
}

export default {
    inserirAnimal,
    buscarAnimais,
    buscarAnimal,
    deletarAnimal,
    atualizarAnimal,
    buscarAnimaisPorProprietario
}