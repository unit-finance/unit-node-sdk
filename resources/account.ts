import {Include, UnitResponse, UnitConfig, BaseListParams} from "../types/common"
import {Customer} from "../types/customer"
import {
    CreateAccountRequest,
    Account,
    PatchAccountRequest,
    AccountLimits,
    AccountDepositProduct,
    CloseAccountRequest,
    FreezeAccountRequest,
    AccountOwnersRequest
} from "../types/account"
import {BaseResource} from "./baseResource"

export class Accounts extends BaseResource {

    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + "/accounts", config)
    }

    public async create(request: CreateAccountRequest): Promise<UnitResponse<Account>> {
        return this.httpPost<UnitResponse<Account>>("", {data: request})
    }

    public async closeAccount(request: CloseAccountRequest): Promise<UnitResponse<Account>> {
        return this.httpPost<UnitResponse<Account>>(`/${request.accountId}/close`, request.to_json())
    }

    public async reopenAccount(accountId: string): Promise<UnitResponse<Account>> {
        return this.httpPost<UnitResponse<Account>>(`/${accountId}/reopen`)
    }

    public async freezeAccount(request: FreezeAccountRequest): Promise<UnitResponse<Account>> {
        return this.httpPost<UnitResponse<Account>>(`/${request.accountId}/freeze`, {data: request.data})
    }

    public async unfreezeAccount(accountId: string): Promise<UnitResponse<Account>> {
        return this.httpPost<UnitResponse<Account>>(`/${accountId}/unfreeze`)
    }

    /**
     * Include is Optional. Related resource available to include: customer. See [Getting Related Resources](https://developers.unit.co/#intro-getting-related-resources)
     * @param accountId
     * @param include
     */
    public async get(accountId: string, include = ""): Promise<UnitResponse<Account> & Include<Customer>> {
        return this.httpGet<UnitResponse<Account> & Include<Customer>>(`/${accountId}`, {params: {include}})
    }

    public async list(params?: AccountListParams): Promise<UnitResponse<Account[]> & Include<Customer[]>> {
        const parameters: any = {
            "page[limit]": (params?.limit ? params.limit : 100),
            "page[offset]": (params?.offset ? params.offset : 0),
            ...(params?.customerId && {"filter[customerId]": params.customerId}),
            ...(params?.tags && {"filter[tags]": params.tags}),
            ...(params?.include && {"include": params.include}),
            ...(params?.fromBalance && {"filter[fromBalance]": params.fromBalance}),
            ...(params?.toBalance && {"filter[toBalance]": params.toBalance}),
        }

        if (params?.status)
            params.status.forEach((s, idx) => {
                parameters[`filter[status][${idx}]`] = s
            })

        return this.httpGet<UnitResponse<Account[]> & Include<Customer[]>>("", {params: parameters})
    }

    public async update(request: PatchAccountRequest): Promise<UnitResponse<Account>> {
        return this.httpPatch<UnitResponse<Account>>(`/${request.accountId}`, {data: request.data})
    }

    public async limits(accountId: string): Promise<UnitResponse<AccountLimits>> {
        return this.httpGet<UnitResponse<AccountLimits>>(`/${accountId}/limits`)
    }

    public async getAvailableDepositProducts(accountId: string): Promise<UnitResponse<AccountDepositProduct[]>> {
        return this.httpGet<UnitResponse<AccountDepositProduct[]>>(`/${accountId}/deposit-products`)
    }

    public async addOwners(request: AccountOwnersRequest): Promise<UnitResponse<Account>> {
        return this.httpPost<UnitResponse<Account>>(`/${request.accountId}/relationships/customers`, {data: request.data})
    }

    public async removeOwners(request: AccountOwnersRequest): Promise<UnitResponse<Account>> {
        return this.httpDelete<UnitResponse<Account>>(`/${request.accountId}/relationships/customers`, request.data)
    }

    public async enterDaca(accountId: string): Promise<UnitResponse<Account>> {
        return this.httpGet<UnitResponse<Account>>(`/${accountId}/enter-daca`)
    }

    public async activateDaca(accountId: string): Promise<UnitResponse<Account>> {
        return this.httpGet<UnitResponse<Account>>(`/${accountId}/activate-daca`)
    }

    public async deactivateDaca(accountId: string): Promise<UnitResponse<Account>> {
        return this.httpGet<UnitResponse<Account>>(`/${accountId}/deactivate-daca`)
    }
}

export interface AccountListParams extends BaseListParams {
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
     * Optional. Filter Account by its status (Open, Frozen, or Closed). Usage example: filter[status][0]=Closed
     */
    status?: string[]

    /**
     * Optional. Related resource available to include: customer. See [Getting Related Resources](https://developers.unit.co/#intro-getting-related-resources).
     * default: empty
     */
    include?: string

    /**
     * Optional. Filters Accounts that have balance higher or equal to the specified amount (in cents). e.g. 5000
     */
    fromBalance?: number

    /**
     * Optional. Filters Accounts that have balance lower or equal to the specified amount (in cents). e.g. 7000
     */
    toBalance?: number

}
