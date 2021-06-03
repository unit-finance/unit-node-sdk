import { CreateDebitCardRequest, DebitCard } from "../types/cards";
import { UnitResponse, UnitError } from "../types/core";
import { BaseResource } from "./baseResource";

export class Cards extends BaseResource {

    constructor(token: string, basePath: string) {
        super(token, basePath + '/cards');
    }

    public async createDebitCard(request: CreateDebitCardRequest): Promise<UnitResponse<DebitCard> | UnitError> {
        return await this.httpPost('', { data: request })
    }
}
