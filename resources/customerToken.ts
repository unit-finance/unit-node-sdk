import { UnitError, UnitResponse } from "../types/core";
import { CreateTokenRequest, CustomerToken, CreateTokenVerificationRequest, VerificationToken } from "../types/customerToken";
import { BaseResource } from "./baseResource";

export class Customers extends BaseResource {
    constructor(token: string,url: string){
        super(token,'')
    }

    public async createToken(request: CreateTokenRequest) : Promise<UnitResponse<CustomerToken> | UnitError> {
        return this.httpPost<UnitResponse<CustomerToken> | UnitError>(`customers/${request.customerId}/token`, { data: request.data })
    }

    public async createTokenVerification(request: CreateTokenVerificationRequest) : Promise<UnitResponse<VerificationToken> | UnitError> {
        return this.httpPost<UnitResponse<VerificationToken> | UnitError>(`customers/${request.customerId}/token/verification`,{ data: request.data})
    }
}

