import {BaseResource} from "./baseResource"
import {UnitError, UnitResponse} from "../types/common"
import {CreateApplicationFormRequest, CreateApplicationFormResponse} from "../types/applicationForm"

export class ApplicationForm extends BaseResource {
    constructor(token: string, basePath: string) {
        super(token, basePath + "/application-forms")
    }

    public async create(request: CreateApplicationFormRequest) : Promise<UnitResponse<CreateApplicationFormResponse> | UnitError> {
        return this.httpPost<UnitResponse<CreateApplicationFormResponse>>("",{data: request})
    }
}