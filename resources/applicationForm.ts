import { BaseResource } from "./baseResource"
import { UnitError, UnitResponse } from "../types/common"
import { CreateApplicationFormRequest, CreateApplicationFormResponse } from "../types/applicationForm"
import { AxiosInstance } from "axios"

export class ApplicationForms extends BaseResource {
    constructor(token: string, basePath: string, axios?: AxiosInstance) {
        super(token, basePath + "/application-forms", axios)
    }

    public async create(request: CreateApplicationFormRequest) : Promise<UnitResponse<CreateApplicationFormResponse> | UnitError> {
        return this.httpPost<UnitResponse<CreateApplicationFormResponse>>("",{data: request})
    }
}
