import { BaseResource } from "./baseResource"
import { BaseListParams, UnitConfig, UnitResponse } from "../types/common"
import { CreateApplicationFormRequest, CreateApplicationFormResponse, ApplicationForm } from "../types/applicationForm"

export class ApplicationForms extends BaseResource {
    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + "/application-forms", config)
    }

    public async create(request: CreateApplicationFormRequest) : Promise<UnitResponse<CreateApplicationFormResponse>> {
        return this.httpPost<UnitResponse<CreateApplicationFormResponse>>("",{data: request})
    }

    public async get(applicationFormId: string) : Promise<UnitResponse<ApplicationForm>> {
        return this.httpGet<UnitResponse<ApplicationForm>>(`/${applicationFormId}`)
    }
    
    public async list(params?: ApplicationFormsListParams) : Promise<UnitResponse<ApplicationForm[]>> {
        const parameters = {
            "page[limit]": (params?.limit ? params?.limit : 100),
            "page[offset]": (params?.offset ? params?.offset : 0),
            ...(params?.tags && {"filter[tags]": params?.tags}),
        }
        return this.httpGet<UnitResponse<ApplicationForm[]>>("", {params: parameters})
    }
}

export interface ApplicationFormsListParams extends BaseListParams {
    /**
     * Optional. Filter Applications by [Tags](https://developers.unit.co/#tags).
     * default: empty
     */
    tags?: object
}
