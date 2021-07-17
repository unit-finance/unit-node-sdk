import { UnitResponse, UnitError } from "../types/common"
import { ReturnReceivedAchTransactionRequest } from "../types/returns"
import { ReturnedReceivedAchTransaction } from "../types/transactions"
import { BaseResource } from "./baseResource"

export class Returns extends BaseResource {
    constructor(token: string, basePath: string) {
        super(token, basePath + "/returns")
    }

    public async return(request: ReturnReceivedAchTransactionRequest): Promise<UnitResponse<ReturnedReceivedAchTransaction> | UnitError> {
        return this.httpPost<UnitResponse<ReturnedReceivedAchTransaction>>(`/${request.transactionId}`, { data: request.data })
    }
}