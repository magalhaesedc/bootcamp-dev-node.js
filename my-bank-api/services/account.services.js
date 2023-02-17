import { promises as fs } from "fs";
import AccountRepository from "../repositories/account.repository.js";

async function createAccount(newAccount) {
    return await AccountRepository.insertAccount(newAccount);
}

async function getAccounts() {
    return await AccountRepository.getAccounts();
}

async function getAccount(id) {
    return await AccountRepository.getAccount(id);
}

async function deleteAccount(id) {
    await AccountRepository.deleteAccount(id);
}

async function updateAccount(update_account) {
    return await AccountRepository.updateAcount(update_account);
}

async function updateBalance(update_account) {
    const accountUpdateBalance = await AccountRepository.getAccount(update_account.id);
    accountUpdateBalance.balance = update_account.balance;
    return AccountRepository.updateAcount(accountUpdateBalance);
}

export default {
    createAccount,
    getAccounts,
    getAccount,
    deleteAccount,
    updateAccount,
    updateBalance
}