import { UnitResponse, UnitError } from "../types/common"
import { UnitEvent } from "../types/events"
import { BaseResource } from "./baseResource"
import { AxiosInstance } from "axios"

export class Events extends BaseResource {

    constructor(token: string, basePath: string, axios?: AxiosInstance) {
        super(token, basePath + "/events", axios)
    }

    public async get(id: string): Promise<UnitResponse<UnitEvent> | UnitError> {
        return await this.httpGet<UnitResponse<UnitEvent>>(`/${id}`)
    }

    public async list(params?: EventListParams): Promise<UnitResponse<UnitEvent[]> | UnitError> {
        const parameters = {
            "page[limit]": (params?.limit ? params?.limit : 100),
            "page[offset]": (params?.offset ? params?.offset : 0)
        }

        return this.httpGet<UnitResponse<UnitEvent[]>>("", { params: parameters })
    }

    public async fire(id: string): Promise<UnitResponse<UnitEvent> | UnitError> {
        return await this.httpPost<UnitResponse<UnitEvent>>(`/${id}`)
    }
}

export interface EventListParams {
    /**
     * Maximum number of resources that will be returned. Maximum is 1000 resources. See Pagination.
     * default: 100
     */
    limit?: number

    /**
     * Number of resources to skip. See Pagination.
     * default: 0
     */
    offset?: number
}
