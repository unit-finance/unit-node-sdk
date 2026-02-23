import { UnitConfig, UnitResponse } from "../types/common"
import { Bill } from "../types/bill"
import { BaseResource } from "./baseResource"

export class Bills extends BaseResource {

    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + "/bills", config)
    }

    public async get(id: string): Promise<UnitResponse<Bill>> {
        return await this.httpGet<UnitResponse<Bill>>(`/${id}`)
    }
}
