import { Applications } from './application'
import { Customers } from './customer';

export class Unit {
    public applications: Applications
    public customers: Customers

    constructor(token: string, basePath: string) {
        this.applications = new Applications(token, basePath);
        this.customers = new Customers(token, basePath)
    }
}

