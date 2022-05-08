import {
    ApproveAuthorizationRequest,
    DeclineAuthorizationRequest,
    PurchaseAuthorizationRequest
} from "../types/authorizationRequest"
import { UnitResponse, UnitConfig } from "../types/common"
import { BaseResource } from "./baseResource"


export class AuthorizationRequests extends BaseResource {

    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + "/authorization-requests", config)
    }

    public async get(id: string): Promise<UnitResponse<PurchaseAuthorizationRequest>> {
        return this.httpGet<UnitResponse<PurchaseAuthorizationRequest>>(`/${id}`)
    }

    public async list(params?: AuthorizationRequestQueryParams): Promise<UnitResponse<PurchaseAuthorizationRequest[]>> {
        const parameters: any = {
            "page[limit]": (params?.limit ? params.limit : 100),
            "page[offset]": (params?.offset ? params.offset : 0),
            ...(params?.accountId && { "filter[accountId]": params.accountId }),
            ...(params?.customerId && { "filter[customerId]": params.customerId }),
            ...(params?.toAmount && { "filter[toAmount]": params.toAmount }),
            ...(params?.fromAmount && { "filter[fromAmount]": params.fromAmount })
        }

        if (params?.merchantCategoryCode)
            params.merchantCategoryCode.forEach((mcc, idx) => {
                parameters[`filter[merchantCategoryCode][${idx}]`] = mcc
            })

        return this.httpGet<UnitResponse<PurchaseAuthorizationRequest[]>>("", { params: parameters })
    }

    public async approve(request: ApproveAuthorizationRequest): Promise<UnitResponse<PurchaseAuthorizationRequest>> {
        const path = `/${request.id}/approve`
        const data = {
            type: "approveAuthorizationRequest",
            attributes: {
                amount: request.amount
            }
        }
        return await this.httpPost<UnitResponse<PurchaseAuthorizationRequest>>(path, { data })
    }

    public async decline(request: DeclineAuthorizationRequest): Promise<UnitResponse<PurchaseAuthorizationRequest>> {
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
