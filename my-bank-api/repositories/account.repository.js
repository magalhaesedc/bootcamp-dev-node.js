import { promises as fs } from "fs";

async function getData(){
    return JSON.parse(await fs.readFile(global.fileName));
}

async function setData(data){
    await fs.writeFile(global.fileName, JSON.stringify(data, null, 2));
}

async function getAccounts(){
    const data = await getData();
    return data.accounts;
}

async function getAccount(id){
    const accounts = await getAccounts();
    const result_account = accounts.find(account => account.id === parseInt(id));
    if(result_account === undefined){
        throw new Error("Registro não encontrado.");
    }
    return result_account;
}

async function insertAccount(account){
    const data = await getData();
    account = {
        id: data.nextId++,
        name: account.name,
        balance: account.balance
    };
    data.accounts.push(account);
    await setData(data);
    return account;
}

async function deleteAccount(id){
    const data = await getData();
    const result_account = data.accounts.find(account => account.id === parseInt(id));
    if(result_account === undefined){
        throw new Error("Registro não encontrado.");
    }
    data.accounts = data.accounts.filter(account => account.id !== parseInt(id));
    await setData(data);
}

async function updateAcount(account){
    const data = await getData();
    const index = data.accounts.findIndex(data_account => data_account.id === account.id);
    if(index === -1){
        throw new Error("Registro não encontrado.");
    }
    data.accounts[index].name = account.name;
    data.accounts[index].balance = account.balance;
    await setData(data);
    return data.accounts[index];
}

export default {
    getAccounts,
    getAccount,
    insertAccount,
    deleteAccount,
    updateAcount
};