import { UnitConfig, UnitResponse } from "../types/common"
import { Dispute, DisputeListParams } from "../types/dispute"
import { BaseResource } from "./baseResource"

export class Disputes extends BaseResource {

    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + "/disputes", config)
    }

    public async get(id: string): Promise<UnitResponse<Dispute>> {
        return await this.httpGet<UnitResponse<Dispute>>(`/${id}`)
    }

    public async list(params?: DisputeListParams): Promise<UnitResponse<Dispute[]>> {
        const parameters = {
            "page[limit]": (params?.limit ? params?.limit : 100),
            "page[offset]": (params?.offset ? params?.offset : 0),
            ...(params?.query && { "filter[query]": params?.query }),
        }

        return this.httpGet<UnitResponse<Dispute[]>>("", { params: parameters })
    }
}