import {
    ApproveAuthorizationRequest,
    DeclineAuthorizationRequest,
    PurchaseAuthorizationRequest
} from "../types/authorizationRequest"
import { UnitResponse, UnitError, UnitConfig } from "../types/common"
import { BaseResource } from "./baseResource"


export class AuthorizationRequests extends BaseResource {

    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + "/authorization-requests", config)
    }

    public async get(id: string): Promise<UnitResponse<PurchaseAuthorizationRequest> | UnitError> {
        return this.httpGet<UnitResponse<PurchaseAuthorizationRequest>>(`/${id}`)
    }

    public async list(params?: AuthorizationRequestQueryParams): Promise<UnitResponse<PurchaseAuthorizationRequest[]> | UnitError> {
        const parameters = {
            "page[limit]": (params?.limit ? params?.limit : 100),
            "page[offset]": (params?.offset ? params?.offset : 0),
            ...(params?.accountId && { "filter[accountId]": params?.accountId }),
            ...(params?.customerId && { "filter[customerId]": params?.customerId })
        }

        return this.httpGet<UnitResponse<PurchaseAuthorizationRequest[]>>("", { params: parameters })
    }

    public async approve(request: ApproveAuthorizationRequest): Promise<UnitResponse<PurchaseAuthorizationRequest> | UnitError> {
        const path = `/${request.id}/approve`
        const data = {
            type: "approveAuthorizationRequest",
            attributes: {
                amount: request.amount
            }
        }
        return await this.httpPost<UnitResponse<PurchaseAuthorizationRequest>>(path, { data })
    }

    public async decline(request: DeclineAuthorizationRequest): Promise<UnitResponse<PurchaseAuthorizationRequest> | UnitError> {
        const path = `/${request.id}/decline`
        const data = {
            type: "declineAuthorizationRequest",
            attributes: {
                reason: request.reason
            }
        }
        return await this.httpPost<UnitResponse<PurchaseAuthorizationRequest>>(path, { data })
    }
}

interface AuthorizationRequestQueryParams {
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
