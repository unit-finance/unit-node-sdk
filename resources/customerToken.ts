import { UnitConfig, UnitError, UnitResponse } from "../types/common"
import {
    CreateTokenRequest,
    CreateTokenVerificationRequest,
    CustomerToken,
    VerificationToken
} from "../types/customerToken"
import { BaseResource } from "./baseResource"

export class CustomerTokens extends BaseResource {
    constructor(token: string, basePath: string, config?: UnitConfig){
        super(token,basePath + "/customers", config)
    }

    public async createToken(customerId: string, request: CreateTokenRequest) : Promise<UnitResponse<CustomerToken> | UnitError> {
        return this.httpPost<UnitResponse<CustomerToken>>(`/${customerId}/token`, { data: request })
    }

    public async createTokenVerification(customerId: string, request: CreateTokenVerificationRequest) : Promise<UnitResponse<VerificationToken> | UnitError> {
        return this.httpPost<UnitResponse<VerificationToken>>(`/${customerId}/token/verification`,{ data: request})
    }
}
