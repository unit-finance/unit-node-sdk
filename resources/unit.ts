import { Applications } from './application'
import { Cards } from './cards'
import { Customers } from './customer'
import { Transactions } from './transactions'
import { Accounts } from './account'
import { UnitError } from '../types/common'

export class Unit {
    public applications: Applications
    public customers: Customers
    public accounts: Accounts
    public transactions: Transactions
    public cards: Cards

    constructor(token: string, basePath: string) {
        this.applications = new Applications(token, basePath)
        this.customers = new Customers(token, basePath)
        this.accounts = new Accounts(token, basePath)
        this.transactions = new Transactions(token,basePath)
        this.cards = new Cards(token, basePath)
    }

    isError<T>(response: T | UnitError): response is UnitError {
        return (response as UnitError).errors !== undefined
    }
}

