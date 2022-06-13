import { UnitConfig, UnitResponse, BaseListParams } from "../types/common"
import { Dispute } from "../types/dispute"
import { BaseResource } from "./baseResource"

export class Disputes extends BaseResource {
    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + "/disputes", config)
    }

    public async get(disputeId: string): Promise<UnitResponse<Dispute>> {
        return this.httpGet<UnitResponse<Dispute>>(`/${disputeId}/`)
    }

    public async list(params?: DisputesListParams): Promise<UnitResponse<Dispute[]>> {
        const parameters: any = {
            "page[limit]": (params?.limit ? params.limit : 100),
            "page[offset]": (params?.offset ? params.offset : 0),
            ...(params?.query && { "filter[query]": params.query })
        }

        return this.httpGet<UnitResponse<Dispute[]>>("", { params: parameters })
    }
}

export interface DisputesListParams extends BaseListParams {
    /**
     * Optional. Search term according to the Full-Text Search Rules.
     * default: empty
     */
    query?: string
}

