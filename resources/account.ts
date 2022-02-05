import { Include, UnitResponse, UnitConfig } from "../types/common"
import { Customer } from "../types/customer"
import { CreateAccountRequest, Account, PatchAccountRequest, AccountLimits, AccountDepositProduct, CloseAccountRequest } from "../types/account"
import { BaseResource } from "./baseResource"

export class Accounts extends BaseResource {

    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + "/accounts", config)
    }

    public async create(request: CreateAccountRequest): Promise<UnitResponse<Account>> {
        return this.httpPost<UnitResponse<Account>>("", { data: request })
    }

    public async closeAccount(request: CloseAccountRequest): Promise<UnitResponse<Account>> {
        return this.httpPost<UnitResponse<Account>>(`/${request.accountId}/close`, request.to_json())
    }

    public async reopenAccount(accountId: string): Promise<UnitResponse<Account>> {
        return this.httpPost<UnitResponse<Account>>(`/${accountId}/reopen`)
    }

    /**
     * Include is Optional. Related resource available to include: customer. See [Getting Related Resources](https://developers.unit.co/#intro-getting-related-resources)
     * @param id
     * @param include
     */
    public async get(id: string, include = ""): Promise<UnitResponse<Account> & Include<Customer>> {
        return this.httpGet<UnitResponse<Account> & Include<Customer>>(`/${id}`, { params: { include } })
    }

    public async list(params?: AccountListParams): Promise<UnitResponse<Account[]> & Include<Customer[]>> {
        const parameters = {
            "page[limit]": (params?.limit ? params?.limit : 100),
            "page[offset]": (params?.offset ? params?.offset : 0),
            ...(params?.customerId && { "filter[customerId]": params?.customerId }),
            ...(params?.tags && { "filter[tags]": params?.tags }),
            ...(params?.include && { "include": params?.include }),
        }

        return this.httpGet<UnitResponse<Account[]> & Include<Customer[]>>("", { params: parameters })
    }

    public async update(request: PatchAccountRequest): Promise<UnitResponse<Account>> {
        return this.httpPatch<UnitResponse<Account>>(`/${request.accountId}`, { data: request.data })
    }

    public async limits(accountId: string): Promise<UnitResponse<AccountLimits>> {
        return this.httpGet<UnitResponse<AccountLimits>>(`/${accountId}/limits`)
    }

    public async getAvailableDepositProducts(accountId: string): Promise<UnitResponse<AccountDepositProduct[]>> {
        return this.httpGet<UnitResponse<AccountDepositProduct[]>>(`/${accountId}/deposit-products`)
    }
}

export interface AccountListParams {
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
     * Optional. Filter Applications by [Tags](https://developers.unit.co/#tags).
     * default: empty
     */
    tags?: object

    /**
     * Optional. Related resource available to include: customer. See [Getting Related Resources](https://developers.unit.co/#intro-getting-related-resources).
     * default: empty
     */
    include?: string
}
