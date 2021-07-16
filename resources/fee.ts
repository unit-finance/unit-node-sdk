import { UnitResponse, UnitError } from "../types/common"
import { CreateFeeRequest, Fee } from "../types/fee"
import { BaseResource } from "./baseResource"
import { AxiosInstance } from "axios"

export class Fees extends BaseResource {
    constructor(token: string, basePath: string, axios?: AxiosInstance) {
        super(token, basePath + "/fees", axios)
    }

    public async createFee(request: CreateFeeRequest): Promise<UnitResponse<Fee> | UnitError> {
        return this.httpPost<UnitResponse<Fee>>("", { data: request })
    }
}
