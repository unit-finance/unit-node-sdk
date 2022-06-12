import {BaseListParams, UnitConfig, UnitResponse, NoContent} from "../types/common"
import { AchCounterparty, CounterpartyBalance, CreateCounterpartyRequest, PatchCounterpartyRequest } from "../types/counterparty"
import { BaseResource } from "./baseResource"

export class Counterparties extends BaseResource {

    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + "/counterparties", config)
    }

    public async create(request: CreateCounterpartyRequest): Promise<UnitResponse<AchCounterparty>> {
        return await this.httpPost<UnitResponse<AchCounterparty>>("", { data: request })
    }

    public async delete(id: string): Promise<NoContent> {
        return await this.httpDelete<NoContent>(`/${id}`)
    }

    public async get(id: string): Promise<UnitResponse<AchCounterparty>> {
        return await this.httpGet<UnitResponse<AchCounterparty>>(`/${id}`)
    }

    public async list(params?: CounterpartyListParams): Promise<UnitResponse<AchCounterparty[]>> {
        const parameters = {
            "page[limit]": (params?.limit ? params?.limit : 100),
            "page[offset]": (params?.offset ? params?.offset : 0),
            ...(params?.customerId && { "filter[customerId]": params?.customerId }),
            ...(params?.tags && { "filter[tags]": params?.tags }),
        }

        return this.httpGet<UnitResponse<AchCounterparty[]>>("", { params: parameters })
    }

    public async update(id: string, request: PatchCounterpartyRequest): Promise<UnitResponse<AchCounterparty>> {
        const data = {
            type: "counterparty",
            attributes: request
        }

        return this.httpPatch<Promise<UnitResponse<AchCounterparty>>>(`/${id}`, data)
    }

    public async getBalance(id: string): Promise<UnitResponse<CounterpartyBalance>> {
        return this.httpGet<Promise<UnitResponse<CounterpartyBalance>>>(`/${id}/balance`)
    }
}

export interface CounterpartyListParams extends BaseListParams {
    /**
    * Optional. Filters the results by the specified customer id.
    * default: empty
    */
    customerId?: string

    /**
     * Optional. Filter Counterparties by Tags.
     */
    tags?: object
}
