import { BaseResource } from "./baseResource"
import { UnitConfig, UnitError, UnitResponse } from "../types/common"
import { CreateApplicationFormRequest, CreateApplicationFormResponse } from "../types/applicationForm"

export class ApplicationForms extends BaseResource {
    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + "/application-forms", config)
    }

    public async create(request: CreateApplicationFormRequest) : Promise<UnitResponse<CreateApplicationFormResponse> | UnitError> {
        return this.httpPost<UnitResponse<CreateApplicationFormResponse>>("",{data: request})
    }
}
