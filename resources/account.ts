import { AccountLimits, Include, UnitError, UnitResponse } from "../types/core";
import { Customer } from "../types/customer";
import { CreateAccountRequest, Account, PatchDepositAccountRequest } from "../types/account";
import { BaseResource } from "./baseResource";

export class Accounts extends BaseResource {

    constructor(token: string, basePath: string) {
        super(token, basePath + '/accounts')
    }

    public async create(request: CreateAccountRequest): Promise<UnitResponse<Account> | UnitError> {
        return this.httpPost<UnitResponse<Account>>('', { data: request })
    }

    public async closeAccount(accountId: number): Promise<UnitResponse<Account> | UnitError> {
        return this.httpPost<UnitResponse<Account>>(`/${accountId}/close`)
    }

    public async reopenAccount(accountId: number): Promise<UnitResponse<Account> | UnitError> {
        return this.httpPost<UnitResponse<Account>>(`/${accountId}/reopen`)
    }

    /**
     * Include is Optional. Related resource available to include: customer. See [Getting Related Resources](https://developers.unit.co/#intro-getting-related-resources)
     * @param depositId 
     * @param include 
     */
    public async get(depositId: number, include: string = ""): Promise<UnitResponse<Account> & Include<Customer> | UnitError> {
        return this.httpGet<UnitResponse<Account> & Include<Customer>>(`/${depositId}`, { params: { include } })
    }

    public async list(params?: AccountListParams): Promise<UnitResponse<Account> & Include<Customer> | UnitError> {
        const parameters = {
            'page[limit]': (params?.limit ? params?.limit : 100),
            'page[offset]': (params?.offset ? params?.offset : 0),
            ...(params?.customerId && { 'filter[customerId]': params?.customerId }),
            ...(params?.tags && { 'filter[tags]': params?.tags }),
            ...(params?.include && { 'include': params?.include }),
        }

        return this.httpGet<UnitResponse<Account> & Include<Customer>>('', { params: parameters })
    }

    public async update(request: PatchDepositAccountRequest) : Promise<UnitResponse<Account> | UnitError> {
        return this.httpPatch<UnitResponse<Account> | UnitError>(`/${request.accountId}`,{data: request.data})
    }

    public async limits(accountId: number) : Promise<UnitResponse<AccountLimits> | UnitError> {
        return this.httpGet<UnitResponse<AccountLimits>>(`/${accountId}/limits`)
    }
}

interface AccountListParams {
    /**
     * Maximum number of resources that will be returned. Maximum is 1000 resources. [See Pagination](https://developers.unit.co/#intro-pagination).
     * default: 100
     */
    limit?: number,

    /**
     * Number of resources to skip.  [See Pagination](https://developers.unit.co/#intro-pagination).
     * default: 0
     */
    offset?: number,

    /**
     * Optional. Filters the results by the specified customer id.
     * default: empty
     */
    customerId?: string,

    /**
     * Optional. Filter Applications by [Tags](https://developers.unit.co/#tags).
     * default: empty
     */
    tags?: Object,

    /**
     * Optional. Related resource available to include: customer. See [Getting Related Resources](https://developers.unit.co/#intro-getting-related-resources).
     * default: empty
     */
    include?: string
}