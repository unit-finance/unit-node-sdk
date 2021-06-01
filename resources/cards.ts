import { BaseResource } from "./baseResource";

export class Cards extends BaseResource {

    constructor(token: string, basePath: string) {
        super(token, basePath + '/cards');
    }
}
