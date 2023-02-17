import { GraphQLInt, GraphQLBoolean } from "graphql";
import Account from "../types/Account.js";
import AccountInput from "../types/AccountInput.js";
import AccountServices from "../../services/account.services.js";

const accountMutation = {
    createAccount: {
        type: Account,
        args: {
            account: {
                name: "account",
                type: AccountInput
            }
        },
        resolve(_, args) {
            return AccountServices.createAccount(args.account);
        } 
    },
    updateAccount: {
        type: Account,
        args: {
            account: {
                name: "account",
                type: AccountInput
            }
        },
        resolve(_, args){
            return AccountServices.updateAccount(args.account);
        }
    },
    deleteAccount: {
        type: GraphQLBoolean,
        args: {
            id: {
                name: "id",
                type: GraphQLInt
            }
        },
        resolve: (_, args) => AccountServices.deleteAccount(args.id)
    }
}

export default accountMutation;