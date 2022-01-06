import { UnitConfig, UnitResponse } from "../types/common"
import { AchCounterparty, CounterpartyBalance, CreateCounterpartyRequest, PatchCounterpartyRequest } from "../types/counterparty"
import { BaseResource } from "./baseResource"

export class Counterparties extends BaseResource {

    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + "/counterparties", config)
    }

    public async create(request: CreateCounterpartyRequest): Promise<UnitResponse<AchCounterparty>> {
        return await this.httpPost<UnitResponse<AchCounterparty>>("", { data: request })
    }

    public async delete(id: string): Promise<UnitResponse<AchCounterparty>> {
        return await this.httpDelete<UnitResponse<AchCounterparty>>(`/${id}`)
    }

    public async get(id: string): Promise<UnitResponse<AchCounterparty>> {
        return await this.httpGet<UnitResponse<AchCounterparty>>(`/${id}`)
    }

    public async list(params?: CounterpartyListParams): Promise<UnitResponse<AchCounterparty[]>> {
        const parameters = {
            "page[limit]": (params?.limit ? params?.limit : 100),
            "page[offset]": (params?.offset ? params?.offset : 0),
            ...(params?.customerId && { "filter[customerId]": params?.customerId })
        }

        return this.httpGet<UnitResponse<AchCounterparty[]>>("", { params: parameters })
    }

    public async update(id: string, request: PatchCounterpartyRequest): Promise<UnitResponse<AchCounterparty>> {
        return this.httpPatch<Promise<UnitResponse<AchCounterparty>>>(`/${id}`, { data: request })
    }

    public async getBalance(id: string): Promise<UnitResponse<CounterpartyBalance>> {
        return this.httpGet<Promise<UnitResponse<CounterpartyBalance>>>(`/${id}/balance`)
    }
}

export interface CounterpartyListParams {
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

    /**
    * Optional. Filters the results by the specified customer id.
    * default: empty
    */
    customerId?: string
}
