import { BaseResource } from "./baseResource"
import { BaseListParams, Include, Sort, Tags, UnitConfig, UnitResponse } from "../types/common"
import { CreateApplicationFormRequest, CreateApplicationFormResponse, ApplicationForm } from "../types/applicationForm"
import { Application } from "../types"

export class ApplicationForms extends BaseResource {
    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + "/application-forms", config)
    }

    public async create(request: CreateApplicationFormRequest): Promise<UnitResponse<CreateApplicationFormResponse>> {
        return this.httpPost<UnitResponse<CreateApplicationFormResponse>>("", { data: request })
    }

    public async get(applicationFormId: string): Promise<UnitResponse<ApplicationForm> & Include<Application>> {
        return this.httpGet<UnitResponse<ApplicationForm> & Include<Application>>(`/${applicationFormId}`)
    }

    public async list(params?: ApplicationFormsListParams): Promise<UnitResponse<ApplicationForm[]>> {
        const parameters = {
            "page[limit]": (params?.limit ? params?.limit : 100),
            "page[offset]": (params?.offset ? params?.offset : 0),
            ...(params?.tags && { "filter[tags]": params?.tags }),
            ...(params?.sort && { "sort": params.sort })
        }
        return this.httpGet<UnitResponse<ApplicationForm[]>>("", { params: parameters })
    }
}

export interface ApplicationFormsListParams extends BaseListParams {
    /**
     * Optional. Filter Applications by [Tags](https://developers.unit.co/#tags).
     * default: empty
     */
    tags?: Tags

    /**
     * Optional. sort=period for ascending order. Provide sort=-period (leading minus sign) for descending order.
     * default: sort=-period
     */
    sort?: Sort
}
