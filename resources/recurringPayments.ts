import { BaseResource } from "./baseResource"
import { BaseListParams, Meta, UnitConfig, UnitResponse } from "../types/common"
import { CreateRecurringPaymentRequest, RecurringPayment } from "../types/recurringPayment"

export class RecurringPayments extends BaseResource {
    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + "/recurring-payments", config)
    }

    public async create(request: CreateRecurringPaymentRequest): Promise<UnitResponse<RecurringPayment>> {
        return this.httpPost<UnitResponse<RecurringPayment>>("", { data: request })
    }

    public async disable(paymentId: string): Promise<UnitResponse<RecurringPayment>> {
        return this.httpPost<UnitResponse<RecurringPayment>>(`/${paymentId}/disable`)
    }

    public async enable(paymentId: string): Promise<UnitResponse<RecurringPayment>> {
        return this.httpPost<UnitResponse<RecurringPayment>>(`/${paymentId}/enable`)
    }

    public async get(paymentId: string): Promise<UnitResponse<RecurringPayment>> {
        return this.httpGet<UnitResponse<RecurringPayment>>(`/${paymentId}`)
    }

    public async list(params?: RecurringPaymentListParams): Promise<UnitResponse<RecurringPayment[]> & Meta> {
        const parameters: any = {
            "page[limit]": (params?.limit ? params.limit : 100),
            "page[offset]": (params?.offset ? params.offset : 0),
            ...(params?.accountId && { "filter[accountId]": params.accountId }),
            ...(params?.customerId && { "filter[customerId]": params.customerId }),
            ...(params?.tags && { "filter[tags]": params.tags }),
            ...(params?.fromStartTime && { "filter[fromStartTime]": params.fromStartTime }),
            ...(params?.toStartTime && { "filter[toStartTime]": params.toStartTime }),
            ...(params?.fromEndTime && { "filter[fromEndTime]": params.fromEndTime }),
            ...(params?.toEndTime && { "filter[toEndTime]": params.toEndTime }),
            "sort": params?.sort ? params.sort : "-createdAt"
        }

        if (params?.status)
            params.status.forEach((s, idx) => {
                parameters[`filter[status][${idx}]`] = s
            })

        if (params?.type)
            params.type.forEach((t, idx) => {
                parameters[`filter[type][${idx}]`] = t
            })

        return this.httpGet<UnitResponse<RecurringPayment[]> & Meta>("", { params: parameters })
    }
}

export interface RecurringPaymentListParams extends BaseListParams {
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
     * Optional. Filter Applications by Tags.
     * default: empty
     */
    tags?: object

    /**
     * Optional. Filter recurring payments by status (Active, Completed or Disabled). Usage example: *filter[status][0]=Active
     */
    status?: string[]

    /**
     * Optional. Filter recurring payments by Recurring Payment type. such as (RecurringCreditAchPayment, RecurringCreditBookPayment). Usage example: filter[type][0]=RecurringCreditAchPayment&filter[type][1]=RecurringCreditBookPayment
     */
    type?: string[]

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
     * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
     * Optional. Filters the Recurring Payments that their end time occurred after the specified date. e.g. 2022-06-13
     */
    fromEndTime?: string

    /**
     * RFC3339 format. For more information: https://en.wikipedia.org/wiki/ISO_8601#RFCs
     * Optional. Filters the Recurring Payments that their end time occurred before the specified date. e.g. 2022-05-13
     */
    toEndTime?: string

    /**
     * Optional. Leave empty or provide sort = createdAt for ascending order.Provide sort = -createdAt(leading minus sign) for descending order.
     * default: sort=-createdAt
     */
    sort?: string
}
