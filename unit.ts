
import { Applications } from "./resources/application"
import { Cards } from "./resources/cards"
import { Customers } from "./resources/customer"
import { Transactions } from "./resources/transactions"
import { Accounts } from "./resources/account"
import { CustomerTokens } from "./resources/customerToken"
import { Webhooks } from "./resources/webhooks"
import { UnitError } from "./types/common"
import { createAddress, createFullName, createPhone, createAuthorizedUser, createBeneficialOwner, createBusinessContact, createCoordinates, createCounterparty, createOfficer } from "./helpers"

export class Unit {
    public applications: Applications
    public customers: Customers
    public accounts: Accounts
    public transactions: Transactions
    public cards: Cards
    public webhooks: Webhooks
    public customerToken: CustomerTokens
    public helpers: any

    constructor(token: string, basePath: string) {
        this.applications = new Applications(token, basePath)
        this.customers = new Customers(token, basePath)
        this.accounts = new Accounts(token, basePath)
        this.transactions = new Transactions(token,basePath)
        this.cards = new Cards(token, basePath)
        this.webhooks = new Webhooks(token, basePath)
        this.customerToken = new CustomerTokens(token, basePath)

        this.helpers = { createAddress, createFullName, createPhone, createAuthorizedUser, createBeneficialOwner, createBusinessContact, createCoordinates, createCounterparty, createOfficer }
    }

    isError<T>(response: T | UnitError): response is UnitError {
        return (response as UnitError).errors !== undefined
    }
}