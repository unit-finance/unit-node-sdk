import { BaseListParams, Statement, UnitConfig, UnitResponse } from "../types/common"
import { BaseResource } from "./baseResource"

export class Statments extends BaseResource {
    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + "/statements", config)
    }

    public async list(params?: StatementsListParams): Promise<UnitResponse<Statement[]>> {
        const parameters = {
            "page[limit]": (params?.limit ? params.limit : 100),
            "page[offset]": (params?.offset ? params.offset : 0),
            ...(params?.accountId && { "filter[accountId]": params.accountId }),
            ...(params?.customerId && { "filter[customerId]": params.customerId }),
            ...(params?.period && { "filter[period]": params.period }),
            ...(params?.sort && { "sort": params.sort })
        }

        return this.httpGet<UnitResponse<Statement[]>>("", { params: parameters })
    }

    public get(statementId: string, customerId?: string, isPDF = false): Promise<string> {
        const parameters = {
            ...(customerId && { "filter[customerId]": customerId })
        }

        const url = isPDF ? `/${statementId}/pdf` : `/${statementId}/html` 
        return this.httpGet<string>(url, {params: parameters})
    }

    public getBinary(statementId: string, customerId?: string, isPDF = false): Promise<string> {
        const parameters = {
            ...(customerId && { "filter[customerId]": customerId })
        }

        const url = isPDF ? `/${statementId}/pdf` : `/${statementId}/html`
        return this.httpGet<string>(url, {params: parameters, responseEncoding:"binary"})
    }
}

export interface StatementsListParams extends BaseListParams {
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
     * Optional. sort=period for ascending order. Provide sort=-period (leading minus sign) for descending order.
     * default: sort=-period
     */
    sort?: string

    /**
     * Optional. Filters the results for a specific month. e.g. 2021-01
     * ISO8601 Date string
     */
    period?: string
}
