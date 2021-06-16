import { UnitError, Include, UnitResponse } from "../types/core";
import { Customer } from "../types/customer";
import { DepositAccount } from "../types/depositAccount";
import { Transaction } from "../types/transactions";
import { BaseResource } from "./baseResource";

export class Transactions extends BaseResource {

    constructor(token: string, basePath: string) {
        super(token, basePath)
    }

    public async get(accountId: number, transactionId: number, params?: TransactionGetParams): Promise<UnitResponse<Transaction> & Include<DepositAccount[] | Customer[]> | UnitError> {
        let parameters = {
            ...(params?.customerId && { 'filter[customerId]': params.customerId }),
            'include': params?.include ? params.include : ''
        }

        return await this.httpGet<UnitResponse<Transaction> & Include<DepositAccount[] | Customer[]>>(`/accounts/${accountId}/transactions/${transactionId}`, { params: parameters })
    }

    public async list(params?: TransactionListParams): Promise<UnitResponse<Transaction[]> & Include<DepositAccount[] | Customer[]> | UnitError> {
        let parameters = {
            'page[limit]': (params?.limit ? params.limit : 100),
            'page[offset]': (params?.offset ? params.offset : 0),
            ...(params?.accountId && { 'filter[accountId]': params.accountId }),
            ...(params?.customerId && { 'filter[customerIdcustomerId]': params.customerId }),
            ...(params?.query && { 'filter[query]': params.query }),
            ...(params?.tags && { 'filter[tags]': params.tags }),
            ...(params?.since && { 'filter[since]': params.since }),
            ...(params?.until && { 'filter[until]': params.until }),
            ...(params?.cardId && { 'filter[cardId]': params.cardId }),
            'sort': params?.sort ? params.sort : '-createdAt',
            'include': params?.include ? params.include : ''
        }

        return await this.httpGet<UnitResponse<Transaction[]> & Include<DepositAccount[] | Customer[]>>('/transactions', {params: parameters});
    }

    public async update(accountId: number, transactionId: number): Promise<UnitResponse<Transaction> | UnitError> {
        return await this.httpPatch<UnitResponse<Transaction>>(`/accounts/${accountId}/transactions/${transactionId}`, {})
    }
}

export interface TransactionGetParams {
    /**
     * Optional. Filters the result by the specified customer id.
     */
    customerId?: string

    /**
     * Optional. A comma-separated list of related resources to include in the response. 
     * Related resources include: customer, account. [See Getting Related Resources](https://developers.unit.co/#intro-getting-related-resources)
     */
    include?: string
}

export interface TransactionListParams {
    /**
     * Maximum number of resources that will be returned. Maximum is 1000 resources. See Pagination.
     * default: 100
     */
    limit?: number,

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
     * Optional. Search term according to the Full-Text Search Rules.
     * default: empty
     */
    query?: string,

    /**
    * Optional. Filter Applications by Tags.
    * default: empty
    */
    tags?: Object,

    /**
     * Optional. Filters the Transactions that occurred after the specified date.
     * RFC3339 Date string - e.g. 2020 - 01 - 13T16: 01: 19.346Z
     * default: empty
     */
    since?: string

    /**
     * Optional. Filters the Transactions that occurred before the specified date
     * RFC3339 Date string - e.g. 2020 - 01 - 13T16: 01: 19.346Z
     * default: empty
     */
    until?: string

    /**
     * Optional. Filters the results by the specified card id.
     * default: empty
     */
    cardId?: string

    /**
     * Optional. .Leave empty or provide sort = createdAt for ascending order.Provide sort = -createdAt(leading minus sign) for descending order.
     * default: sort=-createdAt	
     */
    sort?: string

    /**
    * Optional. A comma-separated list of related resources to include in the response. 
    * Related resources include: customer, account. [See Getting Related Resources](https://developers.unit.co/#intro-getting-related-resources)
    */
    include?: string
}