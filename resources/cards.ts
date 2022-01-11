import { Card, CardLimits, CreateDebitCardRequest, PinStatus, ReplaceCardRequest } from "../types/cards"
import { Include, UnitConfig, UnitResponse } from "../types/common"
import { Customer } from "../types/customer"
import { Account } from "../types/account"
import { BaseResource } from "./baseResource"

export class Cards extends BaseResource {

    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + "/cards", config)
    }

    public async createDebitCard(request: CreateDebitCardRequest): Promise<UnitResponse<Card>> {
        return await this.httpPost<UnitResponse<Card>>("", { data: request })
    }

    public async reportStolen(id: string): Promise<UnitResponse<Card>> {
        const path = `/${id}/report-stolen`
        return await this.httpPost<UnitResponse<Card>>(path)
    }

    public async reportLost(id: string): Promise<UnitResponse<Card>> {
        return await this.httpPost<UnitResponse<Card>>(`/${id}/report-lost`)
    }

    public async closeCard(id: string): Promise<UnitResponse<Card>> {
        return await this.httpPost<UnitResponse<Card>>(`/${id}/close`)
    }

    public async freeze(id: string): Promise<UnitResponse<Card>> {
        return await this.httpPost<UnitResponse<Card>>(`/${id}/freeze`)
    }

    public async unfreeze(id: string): Promise<UnitResponse<Card>> {
        return await this.httpPost<UnitResponse<Card>>(`/${id}/unfreeze`)
    }

    public async replace(request: ReplaceCardRequest): Promise<UnitResponse<Card>> {
        const data = {
            type: "replaceCard",
            attributes: {
                shippingAddress: request.shippingAddress
            }
        }

        return await this.httpPost<UnitResponse<Card>>(`/${request.id}/replace`, { data })
    }

    /**
     * @param id
     * @param include - Optional. A comma-separated list of related resources to include in the response.
     * Related resources include: customer, account. See [Getting Related Resources](https://developers.unit.co/#intro-getting-related-resources).
     */
    public async get(id: string, include = ""): Promise<UnitResponse<Card>> {
        return await this.httpGet<UnitResponse<Card> & Include<Account[] | Customer[]>>(`/${id}?include=${include}`)
    }

    public async list(params?: CardListParams): Promise<UnitResponse<Card[]> & Include<Account[] | Customer[]>> {
        const parameters = {
            "page[limit]": (params?.limit ? params?.limit : 100),
            "page[offset]": (params?.offset ? params?.offset : 0),
            ...(params?.accountId && { "filter[accountId]": params?.accountId }),
            ...(params?.customerId && { "filter[customerId]": params?.customerId }),
            ...(params?.include && { "include": params?.include })
        }

        return this.httpGet<UnitResponse<Card[]> & Include<Account[] | Customer[]>>("", { params: parameters })
    }

    public async getPinStatus(id: string): Promise<UnitResponse<PinStatus>> {
        const path = `/${id}/secure-data/pin/status`

        return await this.httpGet<UnitResponse<PinStatus>>(path)
    }
    
    public async limits(id: string) : Promise<UnitResponse<CardLimits>> {
        return this.httpGet<UnitResponse<CardLimits>>(`/${id}/limits`)
    }
}

export interface CardListParams {
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
     * Optional. Filters the results by the specified account id.
     * default: empty
     */
    accountId?: string

    /**
     * Optional. Filters the results by the specified customer id.
     * default: empty
     */
    customerId?: string

    /**
     * Optional. A comma-separated list of related resources to include in the response. Related resources include: customer, account. See Getting Related Resources
     * default: empty
     */
    include?: string
}
