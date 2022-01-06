import { UnitResponse, UnitConfig } from "../types/common"
import { Institution } from "../types/institution"
import { BaseResource } from "./baseResource"

export class Institutions extends BaseResource {

    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + "/institutions", config)
    }

    public async get(routingNumber: string): Promise<UnitResponse<Institution>> {
        return this.httpGet<UnitResponse<Institution>>(`/${routingNumber}`)
    }
}