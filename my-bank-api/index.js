import express from "express";
import routerAccount from "./routes/account.routes.js"
import { promises as fs } from "fs";
import winston from "winston";
import cors from "cors";
import basicAuth from "express-basic-auth";
import { graphqlHTTP } from "express-graphql";
import Schema from "./schema/index.js";
import swaggerUi from "swagger-ui-express";
import {swaggerDocument} from "./doc.js";

global.fileName = "accounts.json";

//Instância de Logs
const { combine, printf, label, timestamp} = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({
            filename: "my-bank-api.log"
        })
    ],
    format: combine(
        label({
            label: "MY-BANK-API"
        }),
        timestamp(),
        myFormat
    )
});

/*const schema = buildSchema(`
    type Account {
        id: Int,
        name: String,
        balance: Float
    },
    type Query {
        getAccounts: [Account],
        getAccount(id: Int): Account
    },
    input AccountInput {
        id: Int,
        name: String,
        balance: Float
    },
    type Mutation {
        createAccount(account: AccountInput): Account,
        deleteAccount(id: Int): Boolean,
        updateAccount(account: AccountInput): Account
    }
`);

const root = {
    getAccounts: () => AccountServices.getAccounts(),
    getAccount(args){
        return AccountServices.getAccount(args.id);
    },
    createAccount({account}){
        return AccountServices.createAccount(account);
    },
    deleteAccount(args) {
        AccountServices.deleteAccount(args.id);
    },
    updateAccount({account}) {
        return AccountServices.updateAccount(account);
    }
}*/

const app = express();
app.use(express.json());

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/graphql", graphqlHTTP({
    schema: Schema,
    //rootValue: root,
    graphiql: true,
}));
app.get("/", (req, res) => {
    res.send("GET Raiz");
});

function getRole(username) {
    if(username == 'admin'){
        return 'admin';
    }else if(username == 'angelo') {
        return 'role1';
    }
}

function authorize(...allowed) {

    const isAllowed = role => allowed.indexOf(role) > -1;

    return (req, res, next) => {
        if(req.auth.user) {
            const role = getRole(req.auth.user);
            if(isAllowed(role)) {
                next();
            } else {
                res.status(401).send('Role not allowed');
            }
        } else {
            res.status(403).send('User not found');
        }
    }
}

app.use(basicAuth({
    authorizer: (username, password) => {
        const userMatches = basicAuth.safeCompare(username, 'admin');
        const pwdMatches = basicAuth.safeCompare(password, 'admin');

        const user2Matches = basicAuth.safeCompare(username, 'angelo');
        const pwd2Matches = basicAuth.safeCompare(password, '12345');

        return userMatches && pwdMatches || user2Matches && pwd2Matches;
    }
}));

app.use("/account", authorize('admin', 'role1'), routerAccount);
app.use(cors());

app.listen("3000", async () => {
    try {
        await fs.readFile(global.fileName);
        logger.info("API Started!");
    } catch (err) {
        const data_json = {
            "nextId": 1,
            "accounts": []
        }
        await fs.writeFile(global.fileName, JSON.stringify(data_json)).then(() => {
            logger.info("API Started and File Created!");
        }).catch(err => {
            logger.error(err.message);
        });
    }
});