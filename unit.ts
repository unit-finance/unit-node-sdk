import { Applications } from "./resources/application"
import { Cards } from "./resources/cards"
import { Customers } from "./resources/customer"
import { Transactions } from "./resources/transactions"
import { Accounts } from "./resources/account"
import { CustomerTokens } from "./resources/customerToken"
import { Webhooks } from "./resources/webhooks"
import { UnitConfig, UnitError } from "./types/common"
import { BatchAccounts } from "./resources/batchAccounts"
import { Fees } from "./resources/fee"
import * as helpers from "./helpers"
import { Counterparties } from "./resources/counterparty"
import { Events } from "./resources/events"
import { Payments } from "./resources/payments"
import { Authorizations } from "./resources/authorization"
import { AuthorizationRequests } from "./resources/authorizationRequest"
import { Statments } from "./resources/statements"
import { Returns } from "./resources/returns"
import { ApplicationForms } from "./resources/applicationForm"
import { AccountsEndOfDay } from "./resources/accountEndOfDay"
import { BillPays, Rewards } from "./resources"
import { Institutions } from "./resources/institutions"
import { AtmLocations } from "./resources/atmLocations"
import { CheckDeposits } from "./resources/checkDeposit"
import { ReceivedPayments } from "./resources/receivedPayments"
import { RecurringPayments } from "./resources/recurringPayments"
import { OrgTokens } from "./resources/orgToken"
import { Simulations } from "./resources/simulations"

export class Unit {
    public applications: Applications
    public customers: Customers
    public accounts: Accounts
    public accountsEndOfDay: AccountsEndOfDay
    public transactions: Transactions
    public cards: Cards
    public webhooks: Webhooks
    public customerToken: CustomerTokens
    public batchAccount: BatchAccounts
    public fees: Fees
    public counterparties: Counterparties
    public payments: Payments
    public receivedPayments: ReceivedPayments
    public authorizations: Authorizations
    public authorizationRequests: AuthorizationRequests
    public helpers: typeof helpers
    public statements: Statments
    public events: Events
    public applicationForms: ApplicationForms
    public returns: Returns
    public billPays: BillPays
    public institutions: Institutions
    public atmLocations: AtmLocations
    public checkDeposits: CheckDeposits
    public rewards: Rewards
    public recurringPayments: RecurringPayments
    public orgTokens: OrgTokens
    public simulations: Simulations

    constructor(token: string, basePath: string, config?: UnitConfig) {
        // remove all trailing slashes from user-provided basePath
        basePath = basePath.trim().replace(/\/+$/, "")

        this.applications = new Applications(token, basePath, config)
        this.customers = new Customers(token, basePath, config)
        this.accounts = new Accounts(token, basePath, config)
        this.accountsEndOfDay = new AccountsEndOfDay(token, basePath, config)
        this.transactions = new Transactions(token, basePath, config)
        this.cards = new Cards(token, basePath, config)
        this.webhooks = new Webhooks(token, basePath, config)
        this.customerToken = new CustomerTokens(token, basePath, config)
        this.batchAccount = new BatchAccounts(token, basePath, config)
        this.fees = new Fees(token, basePath, config)
        this.counterparties = new Counterparties(token, basePath, config)
        this.events = new Events(token, basePath, config)
        this.payments = new Payments(token, basePath, config)
        this.receivedPayments = new ReceivedPayments(token, basePath, config)
        this.authorizations = new Authorizations(token, basePath, config)
        this.authorizationRequests = new AuthorizationRequests(token, basePath, config)
        this.statements = new Statments(token, basePath, config)
        this.applicationForms = new ApplicationForms(token, basePath, config)
        this.returns = new Returns(token, basePath, config)
        this.billPays = new BillPays(token, basePath, config)
        this.institutions = new Institutions(token, basePath, config)
        this.atmLocations = new AtmLocations(token, basePath, config)
        this.checkDeposits = new CheckDeposits(token, basePath, config)
        this.rewards = new Rewards(token, basePath, config)
        this.recurringPayments = new RecurringPayments(token, basePath, config)
        this.orgTokens = new OrgTokens(token, basePath, config)
        this.simulations = new Simulations(token, basePath, config)
        this.helpers = helpers
    }


    isError<T>(response: T | UnitError): response is UnitError {
        // noinspection PointlessBooleanExpressionJS
        return (response as UnitError).isUnitError === true
    }
}

export * from "./types"
export * from "./resources"
