import { BaseListParams, Meta, UnitConfig, UnitResponse } from "../types/common"
import { CreateRepaymentRequest, Repayment } from "../types/repayments"
import { BaseResource } from "./baseResource"

export class Repayments extends BaseResource {
    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + "/repayments", config)
    }

    public async create(request: CreateRepaymentRequest): Promise<UnitResponse<Repayment>> {
        return this.httpPost<UnitResponse<Repayment>>("", { data: request })
    }

    public async get(id: string): Promise<UnitResponse<Repayment>> {
        return this.httpGet<UnitResponse<Repayment>>(`/${id}`)
    }
    
    public async list(params?: RepaymentListParams): Promise<UnitResponse<Repayment[]> & Meta> {
        const parameters: any = {
            "page[limit]": (params?.limit ? params.limit : 100),
            "page[offset]": (params?.offset ? params.offset : 0),
            ...(params?.accountId && { "filter[accountId]": params.accountId }),
            ...(params?.creditAccountId && { "filter[creditAccountId]": params.creditAccountId }),
            ...(params?.customerId && { "filter[customerId]": params.customerId })
        }

        if (params?.type)
            params.type.forEach((t, idx) => {
                parameters[`filter[type][${idx}]`] = t
            })

        if (params?.status)
            params.status.forEach((s, idx) => {
                parameters[`filter[status][${idx}]`] = s
            })
        
        return this.httpGet<UnitResponse<Repayment[]> & Meta>("", { params: parameters })
    }
}

export interface RepaymentListParams extends BaseListParams {
    /**
     * Optional. Filters the results by the specified account id.
     * default: empty
     */
    accountId?: string

    /**
     * Optional. Filters the results by the specified account id.
     * default: empty
     */
    creditAccountId?: string

    /**
     * Optional. Filters the results by the specified customer id.
     * default: empty
     */
    customerId?: string

    /**
     * Optional. Filter repayments by status (Pending, PendingReview, Returned, Sent or Rejected). Usage example: *filter[status][0]=Active
     */
    status?: string[]

    /**
     * Optional. Filter repayments by Repayment type. such as (AchRepayment, BookRepayment). Usage example: filter[type][0]=AchRepayment&filter[type][1]=BookRepayment
     */
    type?: string[]

    /**
     * Optional. Filters the result according to the associated [Recurring Repayment](https://www.unit.co/docs/api/recurring-repayments/) id
     */
    recurringRepayment?: string
}
