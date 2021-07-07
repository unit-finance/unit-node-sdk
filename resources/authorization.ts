import { Authorization } from "../types/authorization"
import { UnitResponse, UnitError } from "../types/common"
import { BaseResource } from "./baseResource"

export class Authorizations extends BaseResource {

    constructor(token: string, basePath: string) {
        super(token, basePath + "/authorizations")
    }

    public async get(id: string): Promise<UnitResponse<Authorization> | UnitError> {
        return this.httpGet<UnitResponse<Authorization>>(`/${id}`)
    }

    public async find(params?: AuthorizationQueryParams): Promise<UnitResponse<Authorization[]> | UnitError> {
        const parameters = {
            "page[limit]": (params?.limit ? params?.limit : 100),
            "page[offset]": (params?.offset ? params?.offset : 0),
            ...(params?.accountId && { "filter[accountId]": params?.accountId }),
            ...(params?.customerId && { "filter[customerId]": params?.customerId })
        }

        return this.httpGet<UnitResponse<Authorization[]>>("", { params: parameters })
    }
}

interface AuthorizationQueryParams {
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
}