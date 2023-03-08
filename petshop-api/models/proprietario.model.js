import Sequelize from "sequelize";
import db from "../repositories/db.js";

const Proprietario = db.define("proprietarios", {
    proprietarioId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    telefone: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, { underscored: true });

export default Proprietario;