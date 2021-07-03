import { UnitResponse, Statement, UnitError } from "../types/common"
import { BaseResource } from "./baseResource"

export class CustomerTokens extends BaseResource {
    constructor(token: string, basePath: string) {
        super(token, basePath + "/statements")
    }

    public async list(params?: StatementsListParams): Promise<UnitResponse<Statement[]> | UnitError> {
        const parameters = {
            "page[limit]": (params?.limit ? params?.limit : 100),
            "page[offset]": (params?.offset ? params?.offset : 0),
            ...(params?.accountId && { "filter[accountId]": params?.accountId }),
            ...(params?.customerId && { "filter[customerId]": params?.customerId })
        }

        return this.httpGet<UnitResponse<Statement[]>>("", { params: parameters })
    }

    public get(statementId: string, customerId?: string): void {
        const parameters = {
            "filter[customerId]": (customerId ? customerId : "")
        }

        this.httpGet(`/${statementId}`, { params: parameters })
    }
}

interface StatementsListParams {
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
}