import { BaseResource } from "./baseResource";

export class Transactions extends BaseResource {

    constructor(token: string, basePath: string) {
        super(token, basePath)
    }

    public async get(accountId: number, transactionId: number) {
        return await this.httpGet(`/accounts/${accountId}/transactions/${transactionId}`)
    }

    public async list(){
        return await this.httpGet('/transactions');
    }

    public async update(accountId: number, transactionId: number) {
        return await this.httpPatch(`/accounts/${accountId}/transactions/${transactionId}`,{})
    }
}