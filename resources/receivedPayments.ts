import { Account } from "../types/account"
import {BaseListParams, Include, Meta, Sort, Tags, UnitConfig, UnitResponse} from "../types/common"
import { Customer } from "../types/customer"
import { AchReceivedPayment, PatchPaymentRequest, ReceivedPaymentStatus } from "../types/payments"
import { Transaction } from "../types/transactions"
import { BaseResource } from "./baseResource"

export class ReceivedPayments extends BaseResource {
    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + "/received-payments", config)
    }

    public async update(id: string, request: PatchPaymentRequest): Promise<UnitResponse<AchReceivedPayment>> {
        return this.httpPatch<UnitResponse<AchReceivedPayment>>(`/${id}`, { data: request })
    }

    public async advance(id: string): Promise<UnitResponse<AchReceivedPayment>> {
        return this.httpPost<UnitResponse<AchReceivedPayment>>(`/${id}/advance`)
    }

    /**
     * @param include
     * Optional. A comma-separated list of related resources to include in the response.
     * Related resources include: customer, account. See Getting Related Resources
     */
    public async get(id: string, include?: string): Promise<UnitResponse<AchReceivedPayment> & Include<Account[] | Customer[]>> {
        const params = {...(include && { include })}
        return this.httpGet<UnitResponse<AchReceivedPayment> & Include<Account[] | Customer[]>>(`/${id}`, { params })
    }

    public async list(params?: ReceivedPaymentListParams): Promise<UnitResponse<AchReceivedPayment[]> & Include<Account[] | Customer[] | Transaction[]> & Meta> {
        const parameters: any = {
            "page[limit]": (params?.limit ? params.limit : 100),
            "page[offset]": (params?.offset ? params.offset : 0),
            ...(params?.accountId && { "filter[accountId]": params.accountId }),
            ...(params?.customerId && { "filter[customerId]": params.customerId }),
            ...(params?.tags && { "filter[tags]": params.tags }),
            ...(params?.includeCompleted && { "filter[includeCompleted]": params.includeCompleted }),
            "sort": params?.sort ? params.sort : "-createdAt",
            "include": params?.include ? params.include : ""
        }

        if (params?.status)
            params.status.forEach((s, idx) => {
                parameters[`filter[status][${idx}]`] = s
            })
        
        return this.httpGet<UnitResponse<AchReceivedPayment[]> & Include<Account[] | Customer[] | Transaction[]> & Meta>("", { params: parameters })
    }
}

export interface ReceivedPaymentListParams extends BaseListParams {
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
    tags?: Tags

    /**
     * Optional. Filter Received Payments by ReceivedPayment Status. Usage example: filter[status][0]=Pending&filter[status][1]=Advanced. cant be stated with includeCompleted.
     */
    status?: ReceivedPaymentStatus[]

    /**
     * Optional. Filter to include ReceivedPayment with Status 'Completed', default False. cant be stated with filter[status[]
     */
    includeCompleted?: boolean

    /**
     * Optional. Leave empty or provide sort = createdAt for ascending order.Provide sort = -createdAt(leading minus sign) for descending order.
     * default: sort=-createdAt
     */
    sort?: Sort

    /**
    * Optional. A comma-separated list of related resources to include in the response.
    * Related resources include: customer, account. [See Getting Related Resources](https://developers.unit.co/#intro-getting-related-resources)
    */
    include?: string
}
