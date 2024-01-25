import { BaseListParams, TaxForm, UnitConfig, UnitResponse } from "../types"
import { BaseResource } from "./baseResource"

export class TaxForms extends BaseResource {
    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + "/tax-forms", config)
    }

    public async list(params?: TaxFormsListParams): Promise<UnitResponse<TaxForm[]>> {
        const parameters = {
            "page[limit]": (params?.limit ? params.limit : 100),
            "page[offset]": (params?.offset ? params.offset : 0),
            ...(params?.accountId && { "filter[accountId]": params.accountId }),
            ...(params?.customerId && { "filter[customerId]": params.customerId }),
            ...(params?.taxYears && { "filter[taxYears]": params.taxYears }),
            ...(params?.taxFormTypes && { "filter[taxFormTypes]": params.taxFormTypes })
        }

        return this.httpGet<UnitResponse<TaxForm[]>>("", { params: parameters })
    }

    public get(taxFormId: string): Promise<UnitResponse<TaxForm>> {
        return this.httpGet<UnitResponse<TaxForm>>(`/${taxFormId}`)
    }

    public getPdf(taxFormId: string): Promise<string> {
        return this.httpGet<string>(`/${taxFormId}/pdf`)
    }
}

export interface TaxFormsListParams extends BaseListParams {
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
     * Optional. Returns the available tax forms for one or more tax years. e.g. Usage example: filter[taxYears][0]=2023
     */
    taxYears?: string

    /**
     * Optional. Usage example: filter[taxFormsType][0]=1099-INT
     */
    taxFormTypes?: string
}
