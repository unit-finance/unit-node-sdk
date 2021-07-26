import { UnitResponse, UnitError, UnitConfig } from "../types/common"
import { ReturnReceivedAchTransactionRequest } from "../types/returns"
import { ReturnedReceivedAchTransaction } from "../types/transactions"
import { BaseResource } from "./baseResource"

export class Returns extends BaseResource {
    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + "/returns", config)
    }

    public async return(request: ReturnReceivedAchTransactionRequest): Promise<UnitResponse<ReturnedReceivedAchTransaction> | UnitError> {
        return this.httpPost<UnitResponse<ReturnedReceivedAchTransaction>>(`/${request.transactionId}`, { data: request.data })
    }
}