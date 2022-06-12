import { BaseListParams, UnitConfig, UnitResponse } from "../types/common"
import { UnitEvent } from "../types/events"
import { BaseResource } from "./baseResource"

export class Events extends BaseResource {

    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + "/events", config)
    }

    public async get(id: string): Promise<UnitResponse<UnitEvent>> {
        return await this.httpGet<UnitResponse<UnitEvent>>(`/${id}`)
    }

    public async list(params?: EventListParams): Promise<UnitResponse<UnitEvent[]>> {
        const parameters: any = {
            "page[limit]": (params?.limit ? params?.limit : 100),
            "page[offset]": (params?.offset ? params?.offset : 0)
        }

        if (params?.type)
            params.type.forEach((t, idx) => {
                parameters[`filter[type][${idx}]`] = t
            })

        return this.httpGet<UnitResponse<UnitEvent[]>>("", { params: parameters })
    }

    public async fire(id: string): Promise<UnitResponse<UnitEvent>> {
        return await this.httpPost<UnitResponse<UnitEvent>>(`/${id}`)
    }
}

export interface EventListParams extends BaseListParams {
    /**
     * Optional. Filter events by event type
     * default: empty
     */
    type?: string[]
}
