import { DepositAccountLimits, Include, UnitError, UnitResponse } from "../types/core";
import { Customer } from "../types/customer";
import { CreateDepositAccountRequest, DepositAccount, PatchDepositAccountRequest } from "../types/depositAccount";
import { BaseResource } from "./baseResource";


export class DepositAccounts extends BaseResource {

    constructor(token: string, basePath: string) {
        super(token, basePath + '/accounts')
    }

    public async create(request: CreateDepositAccountRequest): Promise<UnitResponse<DepositAccount> | UnitError> {
        return this.httpPost<UnitResponse<DepositAccount>>('', { data: request })
    }

    public async closeAccount(accountId: number): Promise<UnitResponse<DepositAccount> | UnitError> {
        return this.httpPost<UnitResponse<DepositAccount>>(`/${accountId}/close`)
    }

    public async reopenAccount(accountId: number): Promise<UnitResponse<DepositAccount> | UnitError> {
        return this.httpPost<UnitResponse<DepositAccount>>(`/${accountId}/reopen`)
    }

    /**
     * Include is Optional. Related resource available to include: customer. See [Getting Related Resources](https://developers.unit.co/#intro-getting-related-resources)
     * @param depositId 
     * @param include 
     */
    public async get(depositId: number, include: string = ""): Promise<UnitResponse<DepositAccount> & Include<Customer> | UnitError> {
        return this.httpGet<UnitResponse<DepositAccount> & Include<Customer>>(`/${depositId}`, { params: { include } })
    }

    public async list(params: DepositAccountListParams): Promise<UnitResponse<DepositAccount> & Include<Customer> | UnitError> {
        const parameters = {
            'page[limit]': (params.limit ? params.limit : 100),
            'page[offset]': (params.offset ? params.offset : 0),
            ...(params.customerId && { 'filter[customerId]': params.customerId }),
            ...(params.tags && { 'filter[tags]': params.tags }),
            ...(params.include && { 'include': params.include }),
        }

        return this.httpGet<UnitResponse<DepositAccount> & Include<Customer>>('', { params: parameters })
    }

    public async update(request: PatchDepositAccountRequest) : Promise<UnitResponse<DepositAccount> | UnitError> {
        return this.httpPatch<UnitResponse<DepositAccount> | UnitError>(`/${request.accountId}`,{data: request.data})
    }

    public async limits(accountId: number) : Promise<UnitResponse<DepositAccountLimits> | UnitError> {
        return this.httpGet<UnitResponse<DepositAccountLimits>>(`/${accountId}/limits`)
    }
}

interface DepositAccountListParams {
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