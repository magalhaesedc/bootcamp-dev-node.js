import { GraphQLList,  GraphQLInt} from "graphql";
import Account from "../types/Account.js";
import AccountServices from "../../services/account.services.js";

const accountQueries = {
    getAccounts: {
        type: new GraphQLList(Account),
        resolve: () => AccountServices.getAccounts()
    },
    getAccount: {
        type: Account,
        args: {
            id: {
                name: "id",
                type: GraphQLInt
            }
        },
        resolve: (_, args) => AccountServices.getAccount(args.id)
    }
}

export default accountQueries;