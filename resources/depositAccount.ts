import { BaseResource } from "./baseResource";


export class DepositAccounts extends BaseResource {

    constructor(token: string, basePath: string) {
        super(token, basePath + '/accounts')
    }

}