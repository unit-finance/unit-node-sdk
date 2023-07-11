import { Account } from "../types/account"
import { BaseListParams, Include, Meta, Sort, Tags, UnitConfig, UnitResponse } from "../types/common"
import { Customer } from "../types/customer"
import { BulkPayments, CreatePaymentRequest, PatchPaymentRequest, Payment, PaymentStatus } from "../types/payments"
import { Transaction } from "../types/transactions"
import { BaseResource } from "./baseResource"

export class Payments extends BaseResource {
    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + "/payments", config)
    }

    public async create(request: CreatePaymentRequest): Promise<UnitResponse<Payment>> {
        return this.httpPost<UnitResponse<Payment>>("", { data: request })
    }

    public async createBulk(request: CreatePaymentRequest[]): Promise<UnitResponse<BulkPayments>> {
      return this.httpPost<UnitResponse<BulkPayments>>("/bulk", { data: request })
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
    public async get(id: string, include?: string): Promise<UnitResponse<Payment> & Include<Account[] | Customer[] | Transaction[]>> {
        const params = {...(include && { include })}
        return this.httpGet<UnitResponse<Payment> & Include<Account[] | Customer[] | Transaction[]>>(`/${id}`, { params })
    }

    public async list(params?: PaymentListParams): Promise<UnitResponse<Payment[]> & Include<Account[] | Customer[] | Transaction[]> & Meta> {
        const parameters: any = {
            "page[limit]": (params?.limit ? params.limit : 100),
            "page[offset]": (params?.offset ? params.offset : 0),
            ...(params?.accountId && { "filter[accountId]": params.accountId }),
            ...(params?.customerId && { "filter[customerId]": params.customerId }),
            ...(params?.tags && { "filter[tags]": params.tags }),
            ...(params?.since && { "filter[since]": params.since }),
            ...(params?.until && { "filter[until]": params.until }),
            ...(params?.counterpartyAccountId && { "filter[counterpartyAccountId]": params.counterpartyAccountId }),
            ...(params?.recurringPaymentId && { "filter[recurringPaymentId]": params.recurringPaymentId }),
            ...(params?.fromAmount && { "filter[fromAmount]": params.fromAmount }),
            ...(params?.toAmount && { "filter[toAmount]": params.toAmount }),
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

        if (params?.feature)
            params.feature.forEach((d, idx) => {
                parameters[`filter[feature][${idx}]`] = d
            })
        
        return this.httpGet<UnitResponse<Payment[]> & Include<Account[] | Customer[] | Transaction[]> & Meta>("", { params: parameters })
    }
}

export interface PaymentListParams extends BaseListParams {
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
     * Optional. Filter Payments by [ACH Status](https://developers.unit.co/payments/#ach-status).
     */
    status?: PaymentStatus[]

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
     * Optional. Filters the Payments by the account id of the specified counterparty.
     */
    counterpartyAccountId?: string

    /**
     * Optional. Filters the Payments that have an amount that is higher or equal to the specified amount (in cents). e.g. 5000
     */
    fromAmount?: number

    /**
     * Optional. Filters the Payments that have an amount that is lower or equal to the specified amount (in cents). e.g. 7000
     */
    toAmount?: number

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

    /**
     * Optional. Filters the results by the specified recurring payment id.
     */
    recurringPaymentId?: string

    /**
     * Optional. Filter Payments by Payment feature (SameDay, RecurringPayment). Usage example: filter[feature][0]=SameDay
     */
    feature?: string[]
}
