import { UnitConfig, UnitResponse } from "../types/common"
import { CreateFeeRequest, Fee, FeeReversal, FeeReversalRequest } from "../types/fee"
import { BaseResource } from "./baseResource"

export class Fees extends BaseResource {
    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + "/fees", config)
    }

    public async createFee(request: CreateFeeRequest): Promise<UnitResponse<Fee>> {
        return this.httpPost<UnitResponse<Fee>>("", { data: request })
    }

    public async reverse(request: FeeReversalRequest): Promise<UnitResponse<FeeReversal>>{
        return this.httpPost<UnitResponse<FeeReversal>>("/reverse", { data: request })
    }
}
