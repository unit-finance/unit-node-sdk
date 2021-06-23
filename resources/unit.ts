import { Applications } from './application'
import { Customers } from './customer';
import { Accounts } from './account';
import { CustomerTokens } from './customerToken';

export class Unit {
    public applications: Applications
    public customers: Customers
    public accounts: Accounts
    public customerToken: CustomerTokens

    constructor(token: string, basePath: string) {
        this.applications = new Applications(token, basePath)
        this.customers = new Customers(token, basePath)
        this.accounts = new Accounts(token, basePath)
        this.customerToken = new CustomerTokens(token, basePath)
    }
}

