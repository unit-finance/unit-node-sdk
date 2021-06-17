import { Applications } from './application'
import { Customers } from './customer';
import { Transactions } from './transactions';

export class Unit {
    public applications: Applications
    public customers: Customers
    public transactions: Transactions

    constructor(token: string, basePath: string) {
        this.applications = new Applications(token, basePath);
        this.customers = new Customers(token, basePath)
        this.transactions = new Transactions(token,basePath)
    }
}

