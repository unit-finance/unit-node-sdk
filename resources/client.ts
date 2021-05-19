import { Applications } from './application'

export class Unit {
    private name: string;
    private token: string;
    public applications: Applications

    constructor(token: string, name: string) {
        this.token = token;
        this.name = name;
        this.applications = new Applications(token);
    }
}

