import { UnitError, UnitResponse } from "../types/common"
import { CreateTokenRequest, CustomerToken, CreateTokenVerificationRequest, VerificationToken } from "../types/customerToken"
import { BaseResource } from "./baseResource"

export class CustomerTokens extends BaseResource {
    constructor(token: string, basePath: string){
        super(token,basePath + "/customers")
    }

    public async createToken(customerId: string, request: CreateTokenRequest) : Promise<UnitResponse<CustomerToken> | UnitError> {
        return this.httpPost<UnitResponse<CustomerToken>>(`/${customerId}/token`, { data: request })
    }

    public async createTokenVerification(customerId: string, request: CreateTokenVerificationRequest) : Promise<UnitResponse<VerificationToken> | UnitError> {
        return this.httpPost<UnitResponse<VerificationToken>>(`/${customerId}/token/verification`,{ data: request})
    }
}

