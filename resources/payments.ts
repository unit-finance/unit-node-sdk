import { Account } from "../types/account"
import { Include, UnitConfig, UnitResponse } from "../types/common"
import { Customer } from "../types/customer"
import { CreatePaymentRequest, PatchPaymentRequest, Payment } from "../types/payments"
import { Transaction } from "../types/transactions"
import { BaseResource } from "./baseResource"

export class Payments extends BaseResource {
    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + "/payments", config)
    }

    public async create(request: CreatePaymentRequest): Promise<UnitResponse<Payment>> {
        return this.httpPost<UnitResponse<Payment>>("", { data: request })
    }

    public async update(id: string, request: PatchPaymentRequest): Promise<UnitResponse<Payment>> {
        return this.httpPatch<UnitResponse<Payment>>(`/${id}`, { data: request })
    }

    public async cancel(id: string) : Promise<UnitResponse<Payment>> {
        return this.httpPost<UnitResponse<Payment>>(`/${id}/cancel`)
    }

    /**
     * Optional. A comma-separated list of related resources to include in the response.
     * Related resources include: customer, account, transaction. See Getting Related Resources
     */
    public async get(id: string, include?: string): Promise<UnitResponse<Payment & Include<Account[] | Customer[] | Transaction[]>>> {
        const params = { include: include ? `include=${include}` : "" }
        return this.httpGet<UnitResponse<Payment & Include<Account[] | Customer[] | Transaction[]>>>(`/${id}`, { params })
    }

    public async list(params?: PaymentListParams): Promise<UnitResponse<Payment[] & Include<Account[] | Customer[] | Transaction[]>>> {
        const parameters: any = {
            "page[limit]": (params?.limit ? params.limit : 100),
            "page[offset]": (params?.offset ? params.offset : 0),
            ...(params?.accountId && { "filter[accountId]": params.accountId }),
            ...(params?.customerId && { "filter[customerId]": params.customerId }),
            ...(params?.tags && { "filter[tags]": params.tags }),
            ...(params?.since && { "filter[since]": params.since }),
            ...(params?.until && { "filter[until]": params.until }),
            "sort": params?.sort ? params.sort : "-createdAt",
            "include": params?.include ? params.include : ""
        }

        if (params?.type)
            params.type.forEach((t, idx) => {
                parameters[`filter[type][${idx}]`] = t
            })

        if (params?.status)
            params.status.forEach((s, idx) => {
                parameters[`filter[status][${idx}]`] = s
            })

        if (params?.direction)
            params.direction.forEach((d, idx) => {
                parameters[`filter[direction][${idx}]`] = d
            })
        
        return this.httpGet<UnitResponse<Payment[] & Include<Account[] | Customer[] | Transaction[]>>>("", { params: parameters })
    }
}

export interface PaymentListParams {
    /**
     * Maximum number of resources that will be returned. Maximum is 1000 resources. See Pagination.
     * default: 100
     */
    limit?: number

    /**
     * Number of resources to skip. See Pagination.
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
     * Optional. Filter Applications by Tags.
     * default: empty
     */
    tags?: object

    /**
     * Optional. Filter Payments by [ACH Status](https://developers.unit.co/payments/#ach-status).
     */
    status?: string[]

    /**
     * Optional. Filter Payments by Payment type. such as (ACHPayment, BookPayment, WirePayment or BillPayment).
     */
    type?: string[]

    /**
     * 	Optional. Filter Payments by direction. such as (Debit, Credit).
     */
    direction?: string[]

    /**
     * Optional. Filters the Payments that occurred after the specified date. e.g. 2020-01-13T16:01:19.346Z
     */
    since?: string

    /**
     * Optional. Filters the Payments that occurred before the specified date. e.g. 2020-01-02T20:06:23.486Z
     */
    until?: string

    /**
     * Optional. Leave empty or provide sort = createdAt for ascending order.Provide sort = -createdAt(leading minus sign) for descending order.
     * default: sort=-createdAt
     */
    sort?: string

    /**
    * Optional. A comma-separated list of related resources to include in the response.
    * Related resources include: customer, account. [See Getting Related Resources](https://developers.unit.co/#intro-getting-related-resources)
    */
    include?: string
}
