import Sequelize from "sequelize";

const sequelize = new Sequelize(
    "postgresql://postgres:postgres@localhost:5432/petshop",
    {
        dialect: "postgres",
        define: {
            timestamps: false
        }
    }
);

export default sequelize;