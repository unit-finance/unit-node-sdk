import { UnimplementedFields, UnitConfig, UnitResponse } from "../types/common"
import { CreateFeeRequest, Fee } from "../types/fee"
import { BaseResource } from "./baseResource"

export class Helpers extends BaseResource {
    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + "/", config)
    }

    public async getRequest(params: string = ""): Promise<RawUnitObject> {
        return this.httpGet<RawUnitObject>(`${params}`)
    }

    public async postRequest(params: string = ""): Promise<RawUnitObject> {
        return this.httpPost<RawUnitObject>(`${params}`)
    }

    public async patchRequest(params: string = ""): Promise<RawUnitObject> {
        return this.httpPatch<RawUnitObject>(`${params}`, {})
    }
}

export interface RawUnitObject extends UnimplementedFields {
    data: {
        id: string
        type: string
        attributes: {}
        relationships: {}
    },
    included?:{}
}
