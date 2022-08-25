import { UnitResponse, UnitConfig } from "../types/common"
import { BaseResource } from "./baseResource"
import { ApiToken, CreateApiTokenRequest } from "../types/orgToken"

export class OrgTokens extends BaseResource {

    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + "/users", config)
    }

    public async create(userId: string, request: CreateApiTokenRequest): Promise<UnitResponse<ApiToken>> {
        return this.httpPost<UnitResponse<ApiToken>>(`/${userId}/api-tokens`, { data: request })
    }

    public async revoke(userId: string, tokenId: string): Promise<UnitResponse<ApiToken>> {
        return this.httpDelete<UnitResponse<ApiToken>>(`/${userId}/api-tokens/${tokenId}`)
    }

    public async list(userId: string): Promise<UnitResponse<ApiToken[]>> {
        return this.httpGet<UnitResponse<ApiToken[]>>(`/${userId}/api-tokens`)
    }

}
