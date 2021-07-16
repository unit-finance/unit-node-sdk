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
import { ApplicationForms } from "./resources/applicationForm";
import { AxiosInstance } from "axios"

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
    public applicationForms: ApplicationForms

    constructor(token: string, basePath: string, axios?: AxiosInstance) {
        // remove all trailing slashes from user-provided basePath
        basePath = basePath.trim().replace(/\/+$/, "")

        this.applications = new Applications(token, basePath, axios)
        this.customers = new Customers(token, basePath, axios)
        this.accounts = new Accounts(token, basePath, axios)
        this.transactions = new Transactions(token, basePath, axios)
        this.cards = new Cards(token, basePath, axios)
        this.webhooks = new Webhooks(token, basePath, axios)
        this.customerToken = new CustomerTokens(token, basePath, axios)
        this.batchAccount = new BatchAccounts(token, basePath, axios)
        this.fees = new Fees(token, basePath, axios)
        this.counterparties = new Counterparties(token, basePath, axios)
        this.events = new Events(token, basePath, axios)
        this.payments = new Payments(token, basePath, axios)
        this.authorizations = new Authorizations(token, basePath, axios)
        this.statements = new Statments(token, basePath, axios)
        this.applicationForms = new ApplicationForms(token, basePath, axios)
        this.helpers = helpers
    }

    isError<T>(response: T | UnitError): response is UnitError {
        return (response as UnitError).errors !== undefined
    }
}

export * from "./types"
export * from "./resources"
