import Sequelize from "sequelize";
import db from "../repositories/db.js";
import Proprietario from "./proprietario.model.js";

const Animal = db.define("animais", {
    animalId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    tipo: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, { underscored: true });

Animal.belongsTo(Proprietario, { foreignKey: "proprietarioId" });

export default Animal;