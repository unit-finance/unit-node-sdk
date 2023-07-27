import { BaseListParams, Meta, Sort, Tags, UnitConfig, UnitResponse } from "../types/common"
import { CreateStopPaymentRequest, StopPayment, StopPaymentStatus } from "../types/checkPayment"
import { BaseResource } from "./baseResource"

export class StopPayments extends BaseResource {
    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + "/stop-payments", config)
    }

    public async create(request: CreateStopPaymentRequest): Promise<UnitResponse<StopPayment>> {
        return this.httpPost<UnitResponse<StopPayment>>("", { data: request} )
    }

    public async get(id: string): Promise<UnitResponse<StopPayment>> {
        return this.httpGet<UnitResponse<StopPayment>>(`/${id}`)
    }

    public async disable(id: string): Promise<UnitResponse<StopPayment>> {
        return this.httpPost<UnitResponse<StopPayment>>(`/${id}/disable`)
    }
    
    public async list(params?: StopPaymentListParams): Promise<UnitResponse<StopPayment[]> & Meta> {
        const parameters: any = {
            "page[limit]": (params?.limit ? params.limit : 100),
            "page[offset]": (params?.offset ? params.offset : 0),
            ...(params?.accountId && { "filter[accountId]": params.accountId }),
            ...(params?.customerId && { "filter[customerId]": params.customerId }),
            ...(params?.since && { "filter[since]": params.since }),
            ...(params?.until && { "filter[until]": params.until }),
            ...(params?.fromAmount && { "filter[fromAmount]": params.fromAmount }),
            ...(params?.toAmount && { "filter[toAmount]": params.toAmount }),
            ...(params?.checkNumber && { "filter[checkNumber]": params.checkNumber }),
            ...(params?.tags && { "tags": params.tags }),
            ...(params?.sort && { "sort": params.sort })
        }

        if (params?.status)
            params.status.forEach((s, idx) => {
                parameters[`filter[status][${idx}]`] = s
            })
        
        return this.httpGet<UnitResponse<StopPayment[]> & Meta>("", { params: parameters })
    }
}

export interface StopPaymentListParams extends BaseListParams {
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
     * Optional. Filter stop payments by Tags.
     */
    tags?: Tags

    /**
     * Optional. Leave empty or provide sort=createdAt for ascending order. Provide sort=-createdAt (leading minus sign) for descending order.
     */
    sort?: Sort

    /**
     * Optional. Filters before the specified date. e.g. 2021-06-01
     */
    since?: string

    /**
     * Optional. Filters after the specified date. e.g. 2021-07-01
     */
    until?: string

    /**
     * Optional. Filters the Stop Payments that have an amount that is higher or equal to the specified amount (in cents). e.g. 5000
     */
    fromAmount?: number

    /**
     * Optional. Filters the Stop Payments that have an amount that is lower or equal to the specified amount (in cents). e.g. 7000 
     */
    toAmount?: number

    /**
     * Optional. Filter Stop Payments by check number (trimming leading zeros).
     */
    checkNumber?: string

    /**
     * Optional. Filter repayments by status (Pending, PendingReview, Returned, Sent or Rejected). Usage example: *filter[status][0]=Active
     */
    status?: StopPaymentStatus[]

    /**
     * Optional. Filter by status (Active, Disabled). Usage example: filter[status][0]=Disabled
     */
    type?: string[]
}
