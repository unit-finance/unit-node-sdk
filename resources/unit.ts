import { Applications } from './application'
import { Cards } from './cards';
import { Customers } from './customer';
import { Transactions } from './transactions';
import { Accounts } from './account';

export class Unit {
    public applications: Applications
    public customers: Customers
    public transactions: Transactions
    public cards: Cards

    constructor(token: string, basePath: string) {
        this.applications = new Applications(token, basePath)
        this.customers = new Customers(token, basePath)
        this.transactions = new Transactions(token,basePath)
        this.cards = new Cards(token, basePath)
    }
}

