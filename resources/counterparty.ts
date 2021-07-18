import { UnitError, UnitResponse } from "../types/common"
import { AchCounterparty, CreateCounterpartyRequest, PatchCounterpartyRequest } from "../types/counterparty"
import { BaseResource } from "./baseResource"

export class Counterparties extends BaseResource {

    constructor(token: string, basePath: string) {
        super(token, basePath + "/counterparties")
    }

    public async create(request: CreateCounterpartyRequest): Promise<UnitResponse<AchCounterparty> | UnitError> {
        return await this.httpPost<UnitResponse<AchCounterparty>>("", { data: request })
    }

    public async delete(id: string): Promise<UnitResponse<AchCounterparty> | UnitError> {
        return await this.httpDelete<UnitResponse<AchCounterparty>>(`/${id}`)
    }

    public async get(id: string): Promise<UnitResponse<AchCounterparty> | UnitError> {
        return await this.httpGet<UnitResponse<AchCounterparty>>(`/${id}`)
    }

    public async list(params?: CounterpartyListParams): Promise<UnitResponse<AchCounterparty[]> | UnitError> {
        const parameters = {
            "page[limit]": (params?.limit ? params?.limit : 100),
            "page[offset]": (params?.offset ? params?.offset : 0),
            ...(params?.customerId && { "filter[customerId]": params?.customerId })
        }

        return this.httpGet<UnitResponse<AchCounterparty[]>>("", { params: parameters })
    }

    public async update(id: string, request: PatchCounterpartyRequest): Promise<UnitResponse<AchCounterparty> | UnitError> {
        return this.httpPatch<Promise<UnitResponse<AchCounterparty> | UnitError>>(`/${id}`, { data: request })
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
