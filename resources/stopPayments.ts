import { Meta, UnitConfig, UnitResponse } from "../types/common"
import { BaseCheckPaymentListParams, CreateStopPaymentRequest, StopPayment, StopPaymentStatus } from "../types/checkPayment"
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

export interface StopPaymentListParams extends BaseCheckPaymentListParams {
    /**
     * Optional. Filter by status (Active or Disabled). Usage example: filter[status][0]=Active
     */
    status?: StopPaymentStatus[]
}
