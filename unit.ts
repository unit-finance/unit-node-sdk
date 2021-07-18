
import { Applications } from "./resources/application"
import { Cards } from "./resources/cards"
import { Customers } from "./resources/customer"
import { Transactions } from "./resources/transactions"
import { Accounts } from "./resources/account"
import { CustomerTokens } from "./resources/customerToken"
import { Webhooks } from "./resources/webhooks"
import { UnitError } from "./types/common"
import { BatchAccounts } from "./resources/batchAccounts"
import { Fees } from "./resources/fee"
import * as helpers from "./helpers"
import { Counterparties } from "./resources/counterparty"
import { Events } from "./resources/events"
import { Payments } from "./resources/payments"
import { Authorizations } from "./resources/authorization"
import { Statments } from "./resources/statements"

export class Unit {
    public applications: Applications
    public customers: Customers
    public accounts: Accounts
    public transactions: Transactions
    public cards: Cards
    public webhooks: Webhooks
    public customerToken: CustomerTokens
    public batchAccount: BatchAccounts
    public fees: Fees
    public counterparties: Counterparties
    public payments: Payments
    public authorizations: Authorizations
    public helpers: typeof helpers
    public statements: Statments
    public events: Events

    constructor(token: string, basePath: string) {
        this.applications = new Applications(token, basePath)
        this.customers = new Customers(token, basePath)
        this.accounts = new Accounts(token, basePath)
        this.transactions = new Transactions(token, basePath)
        this.cards = new Cards(token, basePath)
        this.webhooks = new Webhooks(token, basePath)
        this.customerToken = new CustomerTokens(token, basePath)
        this.batchAccount = new BatchAccounts(token, basePath)
        this.fees = new Fees(token, basePath)
        this.counterparties = new Counterparties(token, basePath)
        this.events = new Events(token, basePath)
        this.payments = new Payments(token, basePath)
        this.authorizations = new Authorizations(token, basePath)
        this.statements = new Statments(token, basePath)
        this.helpers = helpers
    }

    isError<T>(response: T | UnitError): response is UnitError {
        return (response as UnitError).errors !== undefined
    }
}

export * from "./types"
export * from "./resources"
