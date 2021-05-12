
export class Application {
    private token: string;

    constructor(token: string) {
        this.token = token;
    }

    public list(): { data: Array<Application> } {
        return { data: [] }
    }
}
