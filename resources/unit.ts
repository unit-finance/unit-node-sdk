import { Applications } from './application'
import { Customers } from './customer';
import { DepositAccounts } from './depositAccount';

export class Unit {
    public applications: Applications
    public customers: Customers
    public accounts: DepositAccounts

    constructor(token: string, basePath: string) {
        this.applications = new Applications(token, basePath)
        this.customers = new Customers(token, basePath)
        this.accounts = new DepositAccounts(token, basePath)
    }
}

