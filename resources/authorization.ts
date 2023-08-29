import { Authorization, AuthorizationStatus } from "../types/authorization"
import { BaseListParams, Meta, Sort, UnitConfig, UnitResponse } from "../types/common"
import { BaseResource } from "./baseResource"

export class Authorizations extends BaseResource {

    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + "/authorizations", config)
    }

    public async get(id: string, includeNonAuthorized = false): Promise<UnitResponse<Authorization>> {
        const parameters: any = {
            ...(includeNonAuthorized && { "filter[includeNonAuthorized]": includeNonAuthorized }),
        }

        return this.httpGet<UnitResponse<Authorization>>(`/${id}`, { params: parameters })
    }

    public async find(params?: AuthorizationQueryParams): Promise<UnitResponse<Authorization[]> & Meta> {
        const parameters: any = {
            "page[limit]": (params?.limit ? params.limit : 100),
            "page[offset]": (params?.offset ? params.offset : 0),
            ...(params?.accountId && { "filter[accountId]": params.accountId }),
            ...(params?.customerId && { "filter[customerId]": params.customerId }),
            ...(params?.cardId && { "filter[cardId]": params.cardId }),
            ...(params?.since && { "filter[since]": params.since }),
            ...(params?.until && { "filter[until]": params.until }),
            ...(params?.includeNonAuthorized && { "filter[includeNonAuthorized]": params.includeNonAuthorized }),
            ...(params?.sort && { "sort": params.sort }),
            ...(params?.toAmount && { "filter[toAmount]": params.toAmount }),
            ...(params?.fromAmount && { "filter[fromAmount]": params.fromAmount }),
            ...(params?.status && { "filter[status]": params.status }),
            ...params
        }

        if (params?.merchantCategoryCode)
            params.merchantCategoryCode.forEach((mcc, idx) => {
                parameters[`filter[merchantCategoryCode][${idx}]`] = mcc
            })

        return this.httpGet<UnitResponse<Authorization[]> & Meta>("", { params: parameters })
    }

    public async list(params?: AuthorizationQueryParams): Promise<UnitResponse<Authorization[]> & Meta> {
        return this.find(params)
    }
}

export interface AuthorizationQueryParams extends BaseListParams {
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
     * Optional. Filters the results by the specified card id.
     * default: empty
     */
    cardId?: string

    /**
     * Optional. Filters the Authorizations that occurred after the specified date. e.g. 2020-01-13T16:01:19.346Z
     */
    since?: string

    /**
     * Optional. Filters the Authorizations that occurred before the specified date. e.g. 2020-01-02T20:06:23.486Z
     */
    until?: string

    /**
     * Optional. Include authorizations from all statuses.
     */
    includeNonAuthorized?: boolean

    /**
     * Optional. Filter authorizations by (Authorization Status)[https://docs.unit.co/cards-authorizations/#authorization-statuses].
     */
    status?: AuthorizationStatus

    /**
     * Optional. Leave empty or provide sort=createdAt for ascending order. Provide sort=-createdAt (leading minus sign) for descending order.
     */
    sort?: Sort

    /**
     * Optional. Filter result by their 4-digit ISO 18245 merchant category code (MCC).
     */
    merchantCategoryCode?: number[]

    /**
     * 	Optional. Filters the result that have an amount that is higher or equal to the specified amount (in cents). e.g. 5000
     */
    fromAmount?: number

    /**
     * 	Optional. Filters the result that have an amount that is lower or equal to the specified amount (in cents). e.g. 7000
     */
    toAmount?: number
}
