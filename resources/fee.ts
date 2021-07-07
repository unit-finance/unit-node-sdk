import { UnitResponse, UnitError } from "../types/common"
import { CreateFeeRequest, Fee } from "../types/fee"
import { BaseResource } from "./baseResource"

export class Fees extends BaseResource {
    constructor(token: string, basePath: string) {
        super(token, basePath + "/fees")
    }

    public async createFee(request: CreateFeeRequest): Promise<UnitResponse<Fee> | UnitError> {
        return this.httpPost<UnitResponse<Fee>>("", { data: request })
    }
}