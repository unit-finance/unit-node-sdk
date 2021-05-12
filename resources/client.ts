import { Application } from './application'

export class Unit {
    private name: string;
    private token: string;
    public applications: Application

    constructor(token: string, name: string) {
        this.token = token;
        this.name = name;
        this.applications = new Application(token);
    }
}

