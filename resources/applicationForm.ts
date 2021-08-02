import { BaseResource } from "./baseResource"
import { UnitConfig, UnitResponse } from "../types/common"
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
}
