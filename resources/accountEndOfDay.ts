import { Include, UnitResponse, UnitConfig } from "../types/common"
import { Customer } from "../types/customer"
import { Account } from "../types/account"
import { BaseResource } from "./baseResource"
import { AccountEndOfDay } from "../types/accountEndOfDay"

export class AccountsEndOfDay extends BaseResource {

    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + '/account-end-of-day', config)
    }

    public async list(params?: AccountEndOfDayParams): Promise<UnitResponse<AccountEndOfDay[]> & Include<Customer> & Include<Account> & Include<Customer[]>> {
        const parameters = {
            "page[limit]": (params?.limit ? params?.limit : 100),
            "page[offset]": (params?.offset ? params?.offset : 0),
            ...(params?.customerId && { "filter[customerId]": params?.customerId }),
            ...(params?.accountId && { "filter[accountId]": params?.accountId }),
            ...(params?.since && { "filter[since]": params?.since }),
            ...(params?.until && { "filter[until]": params?.until }),
        }

        return this.httpGet<UnitResponse<AccountEndOfDay[]> & Include<Customer> & Include<Account> & Include<Customer[]>>("", { params: parameters })
    }
}

export interface AccountEndOfDayParams {
    /**
     * Maximum number of resources that will be returned. Maximum is 1000 resources. [See Pagination](https://developers.unit.co/#intro-pagination).
     * default: 100
     */
    limit?: number

    /**
     * Number of resources to skip.  [See Pagination](https://developers.unit.co/#intro-pagination).
     * default: 0
     */
    offset?: number

    /**
     * Optional. Filters the results by the specified customer id.
     * default: empty
     */
    customerId?: string

    /**
     * Optional. Filters the results by the specified account id.
     * default: empty
     */
    accountId?: string

    /**
     * Optional. Filters the account end-of-day balances before the specified date. e.g. 2021-06-01
     * default: empty
     */
    since?: string

    /**
     * Optional. Filters the account end-of-day balances after the specified date. e.g. 2021-07-01
     * default: empty
     */
    until?: string
}
