import { Applications } from './application'
import { Cards } from './cards';
import { Customers } from './customer';
import { Accounts } from './account';

export class Unit {
    public applications: Applications
    public customers: Customers
    public accounts: Accounts
    public cards: Cards

    constructor(token: string, basePath: string) {
        this.applications = new Applications(token, basePath)
        this.customers = new Customers(token, basePath)
        this.accounts = new Accounts(token,basePath)
        this.cards = new Cards(token, basePath)
    }
}

