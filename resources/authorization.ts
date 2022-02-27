import { Authorization } from "../types/authorization"
import { UnitConfig, UnitResponse } from "../types/common"
import { BaseResource } from "./baseResource"

export class Authorizations extends BaseResource {

    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + "/authorizations", config)
    }

    public async get(id: string): Promise<UnitResponse<Authorization>> {
        return this.httpGet<UnitResponse<Authorization>>(`/${id}`)
    }

    public async find(params?: AuthorizationQueryParams): Promise<UnitResponse<Authorization[]>> {
        const parameters: any = {
            "page[limit]": (params?.limit ? params.limit : 100),
            "page[offset]": (params?.offset ? params.offset : 0),
            ...(params?.accountId && { "filter[accountId]": params.accountId }),
            ...(params?.customerId && { "filter[customerId]": params.customerId }),
            ...(params?.cardId && { "filter[cardId]": params.cardId }),
            ...(params?.since && { "filter[since]": params.since }),
            ...(params?.until && { "filter[until]": params.until }),
            ...(params?.includeNonAuthorized && { "filter[includeNonAuthorized]": params.includeNonAuthorized }),
            ...(params?.sort && { "sort": params.sort })
        }

        if (params?.status)
            params.status.forEach((s, idx) => {
                parameters[`filter[status][${idx}]`] = s
            })

        return this.httpGet<UnitResponse<Authorization[]>>("", { params: parameters })
    }
}

export interface AuthorizationQueryParams {
    /**
         * Maximum number of resources that will be returned. Maximum is 1000 resources. [See Pagination](https://developers.unit.co/#intro-pagination).
         * default: 100
         */
    limit?: number

    /**
     * Number of resources to skip.  [See Pagination](https://developers.unit.co/#intro-pagination).
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
    status: string[]

    /**
     * Optional. Leave empty or provide sort=createdAt for ascending order. Provide sort=-createdAt (leading minus sign) for descending order.
     */
    sort?: string
}
