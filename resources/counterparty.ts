import { UnitError, UnitResponse } from "../types/common"
import { ACHCounterparty, CreateCounterpartyRequest, PatchCounterpartyRequest } from "../types/counterparty"
import { BaseResource } from "./baseResource"

export class Counterparty extends BaseResource {

    constructor(token: string, basePath: string) {
        super(token, basePath + "/counterparties")
    }

    public async create(request: CreateCounterpartyRequest): Promise<UnitResponse<ACHCounterparty> | UnitError> {
        return await this.httpPost<UnitResponse<ACHCounterparty>>("", { data: request })
    }
    
    public async delete(id: string): Promise<UnitResponse<ACHCounterparty> | UnitError> {
        return await this.httpDelete<UnitResponse<ACHCounterparty>>(`/${id}`)
    }

    public async get(id: string): Promise<UnitResponse<ACHCounterparty> | UnitError> {
        return await this.httpGet<UnitResponse<ACHCounterparty>>(`/${id}`)
    }

    public async list(params?: CounterpartyListParams): Promise<UnitResponse<ACHCounterparty[]> | UnitError> {
        const parameters = {
            "page[limit]": (params?.limit ? params?.limit : 100),
            "page[offset]": (params?.offset ? params?.offset : 0),
            ...(params?.customerId && { "filter[customerId]": params?.customerId })
        }

        return this.httpGet<UnitResponse<ACHCounterparty[]>>("", { params: parameters })
    }

    public async update(id: string, request: PatchCounterpartyRequest): Promise<UnitResponse<ACHCounterparty> | UnitError> {
        return this.httpPatch<Promise<UnitResponse<ACHCounterparty> | UnitError>>(`/${id}`, { data: request })
    }
}

interface CounterpartyListParams {
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