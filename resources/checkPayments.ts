import { Include, Meta, UnitConfig, UnitResponse } from "../types/common"
import { CheckPayment, CheckPaymentStatus, ApproveCheckPaymentRequest, ReturnCheckPaymentRequest, BaseCheckPaymentListParams, CreateCheckPaymentRequest } from "../types/checkPayment"
import { BaseResource } from "./baseResource"
import { Account, Customer, Transaction } from "../types"
import {responseEncoding, ResponseType} from "axios"

type CheckPaymentIncluded = Include<Account[] | Customer[] | Transaction[]>

export class CheckPayments extends BaseResource {
    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + "/check-payments", config)
    }

    public async create(request: CreateCheckPaymentRequest): Promise<UnitResponse<CheckPayment>> {
        return this.httpPost<UnitResponse<CheckPayment>>("", {data: request})
    }

    public async get(id: string, include?: string): Promise<UnitResponse<CheckPayment> & CheckPaymentIncluded> {
        return this.httpGetWithInclude<UnitResponse<CheckPayment> & CheckPaymentIncluded>(`/${id}`, include)
    }

    public async return(request: ReturnCheckPaymentRequest): Promise<UnitResponse<CheckPayment>> {
        return this.httpPost<UnitResponse<CheckPayment>>(`/${request.id}/return`, {data: request.data})
    }

    public async approve(request: ApproveCheckPaymentRequest): Promise<UnitResponse<CheckPayment>> {
        return this.httpPost<UnitResponse<CheckPayment>>(`/${request.id}/approve`, {data: request.data})
    }

    public async getImage(id: string, front = true, responseEncoding: responseEncoding = "binary", responseType: ResponseType = "blob"): Promise<string> {
        const p = front ? "front" : "back"
        return this.httpGet<string>(`/${id}/${p}`, {responseEncoding, responseType})
    }

    
    public async list(params?: CheckPaymentListParams): Promise<UnitResponse<CheckPayment[]> & CheckPaymentIncluded & Meta> {
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
            ...(params?.sort && { "sort": params.sort }),
            ...(params?.include && { "sort": params.include })
        }

        if (params?.status)
            params.status.forEach((s, idx) => {
                parameters[`filter[status][${idx}]`] = s
            })
        
        return this.httpGet<UnitResponse<CheckPayment[]> & CheckPaymentIncluded & Meta>("", { params: parameters })
    }
}

export interface CheckPaymentListParams extends BaseCheckPaymentListParams {
    /**
     * Optional. Filter by status (Processed, PendingReview, MarkedForReturn or Returned). Usage example: filter[status][0]=Processed
     */
    status?: CheckPaymentStatus[]
    
    /**
     * Optional. A comma-separated list of related resources to include in the response. Related resources include: customer, account, transaction.
     * See [Getting Related Resources](https://docs.unit.co/about-jsonapi/#intro-getting-related-resources)
     */
    include?: string
}
