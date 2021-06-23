import { UnitError, UnitResponse } from "../types/common";
import { CreateTokenRequest, CustomerToken, CreateTokenVerificationRequest, VerificationToken } from "../types/customerToken";
import { BaseResource } from "./baseResource";

export class CustomerTokens extends BaseResource {
    constructor(token: string, basePath: string){
        super(token,basePath + '/customers')
    }

    public async createToken(request: CreateTokenRequest) : Promise<UnitResponse<CustomerToken> | UnitError> {
        return this.httpPost<UnitResponse<CustomerToken>>(`/${request.customerId}/token`, { data: request.data })
    }

    public async createTokenVerification(request: CreateTokenVerificationRequest) : Promise<UnitResponse<VerificationToken> | UnitError> {
        return this.httpPost<UnitResponse<VerificationToken>>(`/${request.customerId}/token/verification`,{ data: request.data})
    }
}

