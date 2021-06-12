import { Applications } from './application'
import { Customers } from './customer';
import { Accounts } from './account';

export class Unit {
    public applications: Applications
    public customers: Customers
    public accounts: Accounts

    constructor(token: string, basePath: string) {
        this.applications = new Applications(token, basePath)
        this.customers = new Customers(token, basePath)
        this.accounts = new Accounts(token, basePath)
    }
}

