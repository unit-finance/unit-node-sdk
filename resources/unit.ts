import { Applications } from './application'

export class Unit {
    private token: string;
    public applications: Applications

    constructor(token: string) {
        this.token = token;
        this.applications = new Applications(token);
    }
}

