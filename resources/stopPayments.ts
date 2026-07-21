import { Meta, UnitConfig, UnitResponse } from "../types/common"
import { AchStopPayment, BaseCheckPaymentListParams, CreateAchStopPaymentRequest, CreateStopPaymentRequest, PatchAchStopPaymentRequest, StopPayment, StopPaymentResource, StopPaymentStatus } from "../types/checkPayment"
import { BaseResource } from "./baseResource"

export class StopPayments extends BaseResource {
    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + "/stop-payments", config)
    }

    public async create(request: CreateStopPaymentRequest): Promise<UnitResponse<StopPayment>>
    public async create(request: CreateAchStopPaymentRequest): Promise<UnitResponse<AchStopPayment>>
    public async create(request: CreateStopPaymentRequest | CreateAchStopPaymentRequest): Promise<UnitResponse<StopPaymentResource>> {
        return this.httpPost<UnitResponse<StopPaymentResource>>("", { data: request} )
    }

    public async get(id: string): Promise<UnitResponse<StopPaymentResource>> {
        return this.httpGet<UnitResponse<StopPaymentResource>>(`/${id}`)
    }

    public async update(id: string, request: PatchAchStopPaymentRequest): Promise<UnitResponse<AchStopPayment>> {
        return this.httpPatch<UnitResponse<AchStopPayment>>(`/${id}`, { data: request })
    }

    public async disable(id: string): Promise<UnitResponse<StopPaymentResource>> {
        return this.httpPost<UnitResponse<StopPaymentResource>>(`/${id}/disable`)
    }

    public async list(params?: StopPaymentListParams): Promise<UnitResponse<StopPaymentResource[]> & Meta> {
        const parameters: any = {
            "page[limit]": (params?.limit ? params.limit : 100),
            "page[offset]": (params?.offset ? params.offset : 0),
            ...(params?.accountId && { "filter[accountId]": params.accountId }),
            ...(params?.customerId && { "filter[customerId]": params.customerId }),
            ...(params?.since && { "filter[since]": params.since }),
            ...(params?.until && { "filter[until]": params.until }),
            ...(params?.fromAmount && { "filter[fromAmount]": params.fromAmount }),
            ...(params?.toAmount && { "filter[toAmount]": params.toAmount }),
            ...(params?.noAmount !== undefined && { "filter[noAmount]": params.noAmount }),
            ...(params?.fromMinAmount && { "filter[fromMinAmount]": params.fromMinAmount }),
            ...(params?.toMinAmount && { "filter[toMinAmount]": params.toMinAmount }),
            ...(params?.noMinAmount !== undefined && { "filter[noMinAmount]": params.noMinAmount }),
            ...(params?.originatorName && { "filter[originatorName]": params.originatorName }),
            ...(params?.noOriginatorName !== undefined && { "filter[noOriginatorName]": params.noOriginatorName }),
            ...(params?.checkNumber && { "filter[checkNumber]": params.checkNumber }),
            ...(params?.type && { "filter[type]": params.type }),
            ...(params?.tags && { "filter[tags]": this.customStringify(params.tags, ":") }),
            ...(params?.sort && { "sort": params.sort })
        }

        if (params?.status)
            params.status.forEach((s, idx) => {
                parameters[`filter[status][${idx}]`] = s
            })

        return this.httpGet<UnitResponse<StopPaymentResource[]> & Meta>("", { params: parameters })
    }
}

export interface StopPaymentListParams extends BaseCheckPaymentListParams {
    /**
     * Optional. Filter by status (Active or Disabled). Usage example: filter[status][0]=Active
     */
    status?: StopPaymentStatus[]

    /**
     * Optional. If set to true, returns only Stop Payments with no amount. If set to false only returns Stop Payments with amount.
     */
    noAmount?: boolean

    /**
     * Optional. Filters ACH Stop Payments that have minAmount higher than the specified amount (in cents).
     */
    fromMinAmount?: number

    /**
     * Optional. Filters ACH Stop Payments that have minAmount lower than the specified amount (in cents).
     */
    toMinAmount?: number

    /**
     * Optional. If set to true, returns only ACH Stop Payments with no minAmount. If set to false only returns Stop Payments with minAmount.
     */
    noMinAmount?: boolean

    /**
     * Optional. Filters the results by a single originator name.
     */
    originatorName?: string

    /**
     * Optional. If set to true, returns only Stop Payments with no originatorName. If set to false only returns Stop Payments with originatorName.
     */
    noOriginatorName?: boolean

    /**
     * Optional. Either checkStopPayment or achStopPayment.
     */
    type?: "checkStopPayment" | "achStopPayment"
}
