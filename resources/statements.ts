import { Statement, UnitConfig, UnitResponse } from "../types/common"
import { BaseResource } from "./baseResource"

export class Statments extends BaseResource {
    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + "/statements", config)
    }

    public async list(params?: StatementsListParams): Promise<UnitResponse<Statement[]>> {
        const parameters = {
            "page[limit]": (params?.limit ? params?.limit : 100),
            "page[offset]": (params?.offset ? params?.offset : 0),
            ...(params?.accountId && { "filter[accountId]": params?.accountId }),
            ...(params?.customerId && { "filter[customerId]": params?.customerId })
        }

        return this.httpGet<UnitResponse<Statement[]>>("", { params: parameters })
    }

    public get(request: GetStatementRequest): Promise<UnitResponse<String>> {
        const params = {
            "language": request.language,
            ...(request.customerId && { "filter[customerId]": request.customerId })
        }

        return this.httpGet<UnitResponse<String>>(`/${request.statementId}/${request.outputType}`, { params: params })
    }
}

export interface StatementsListParams {
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


export class GetStatementRequest {
    public statementId: string
    public outputType: string
    public customerId: string | undefined
    public language: string

    constructor(statementId: string, outputType: string = "html", language: string = "en", customerId?: string) {
        this.statementId = statementId
        this.outputType = outputType
        this.language = language
        this.customerId = customerId
    }
}
