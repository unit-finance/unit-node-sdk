import { BaseListParams, Meta, Sort, UnitConfig, UnitResponse } from "../types"
import { CreateRecurringRepaymentRequest, RecurringRepayment, RecurringRepaymentStatus } from "../types/recurringRepayments"
import { BaseResource } from "./baseResource"

export class RecurringRepayments extends BaseResource {
    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + "/recurring-repayments", config)
    }

    public async create(request: CreateRecurringRepaymentRequest): Promise<UnitResponse<RecurringRepayment>> {
        return this.httpPost<UnitResponse<RecurringRepayment>>("", { data: request })
    }

    public async get(repaymentId: string): Promise<UnitResponse<RecurringRepayment>> {
        return this.httpGet<UnitResponse<RecurringRepayment>>(`/${repaymentId}`)
    }

    public async disable(repaymentId: string): Promise<UnitResponse<RecurringRepayment>> {
        // NB: We must pass an empty body here because the API is returning a 415 for any requests made
        //  to this endpoint from this SDK: Content-Type must be application/vnd.api+json
        //  However, there is code in Axios that strips the Content-Type from the request whenever 
        //  there is no body since it makes no sense to provide it + makes the data over the wire
        //  that much smaller:  
        //   https://github.com/axios/axios/blob/649d739288c8e2c55829ac60e2345a0f3439c730/dist/axios.js#L1449-L1450
        // TODO: Remove the empty body after we update the API to not throw 415 for missing Content-Type 
        //  when the body is empty.
        return this.httpPost<UnitResponse<RecurringRepayment>>(`/${repaymentId}/disable`, { data: {} })
    }

    public async enable(repaymentId: string): Promise<UnitResponse<RecurringRepayment>> {
        // NB: We must pass an empty body here because the API is returning a 415 for any requests made
        //  to this endpoint from this SDK: Content-Type must be application/vnd.api+json
        //  However, there is code in Axios that strips the Content-Type from the request whenever 
        //  there is no body since it makes no sense to provide it + makes the data over the wire
        //  that much smaller:  
        //   https://github.com/axios/axios/blob/649d739288c8e2c55829ac60e2345a0f3439c730/dist/axios.js#L1449-L1450
        // TODO: Remove the empty body after we update the API to not throw 415 for missing Content-Type 
        //  when the body is empty.
        return this.httpPost<UnitResponse<RecurringRepayment>>(`/${repaymentId}/enable`, { data: {} })
    }

    public async list(params?: RecurringPaymentListParams): Promise<UnitResponse<RecurringRepayment[]>> {
        const parameters: any = {
            "page[limit]": (params?.limit ? params.limit : 100),
            "page[offset]": (params?.offset ? params.offset : 0),
            ...(params?.creditAccountId && { "filter[creditAccountId]": params.creditAccountId }),
            ...(params?.customerId && { "filter[customerId]": params.customerId }),
            ...(params?.status && { "filter[status]": params.status }),
            ...(params?.fromStartTime && { "filter[fromStartTime]": params.fromStartTime }),
            ...(params?.toStartTime && { "filter[toStartTime]": params.toStartTime }),
            "sort": params?.sort ? params.sort : "-createdAt"
        }

        if (params?.status)
            params.status.forEach((s, idx) => {
                parameters[`filter[status][${idx}]`] = s
            })

        return this.httpGet<UnitResponse<RecurringRepayment[] & Meta>>("", { params: parameters })
    }
}

export interface RecurringPaymentListParams extends BaseListParams {
    /**
     * Optional. Filters the results by the specified credit account id.
     * default: empty
     */
    creditAccountId?: string

    /**
     * Optional. Filters the results by the specified customer id.
     * default: empty
     */
    customerId?: string

    /**
     * Optional. Filter recurring payments by status (Active or Disabled). Usage example: *filter[status][0]=Active
     */
    status?: RecurringRepaymentStatus[]

    /**
     * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
     * Optional. Filters the Recurring Payments that their start time occurred after the specified date. e.g. 2022-06-13
     */
    fromStartTime?: string

    /**
     * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
     * Optional. Filters the Recurring Payments that their start time occurred before the specified date. e.g. 2022-05-13
     */
    toStartTime?: string

    /**
     * Optional. Leave empty or provide sort = createdAt for ascending order.Provide sort = -createdAt(leading minus sign) for descending order.
     * default: sort=-createdAt
     */
    sort?: Sort
}
