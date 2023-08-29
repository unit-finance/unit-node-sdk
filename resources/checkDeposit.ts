import { Account, CheckDepositStatus, Customer, Sort, Tags, Transaction } from "../types"
import { CheckDeposit, CreateCheckDepositRequest, PatchCheckDepositRequest, UploadCheckDepositRequest } from "../types"
import { UnitResponse, Include, UnitConfig, BaseListParams } from "../types"
import { BaseResource } from "./baseResource"
import {responseEncoding, ResponseType} from "axios"

export class CheckDeposits extends BaseResource {

    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + "/check-deposits", config)
    }

    public async list(params?: CheckDepositListParams): Promise<UnitResponse<CheckDeposit[]>> {
        const parameters: any = {
            "page[limit]": (params?.limit ? params.limit : 100),
            "page[offset]": (params?.offset ? params.offset : 0),
            ...(params?.accountId && { "filter[accountId]": params.accountId }),
            ...(params?.customerId && { "filter[customerId]": params.customerId }),
            ...(params?.tags && { "filter[tags]": params.tags }),
            "sort": params?.sort ? params.sort : "-createdAt",
            "include": params?.include ? params.include : "include"
        }

        if (params?.status)
            params.status.forEach((s, idx) => {
                parameters[`filter[status][${idx}]`] = s
            })


        return this.httpGet<UnitResponse<CheckDeposit[]>>("", { params: parameters })
    }

    public async create(request: CreateCheckDepositRequest): Promise<UnitResponse<CheckDeposit>> {
        return this.httpPost<UnitResponse<CheckDeposit>>("", { data: request })
    }

    public async get(id: string, include = ""): Promise<UnitResponse<CheckDeposit> & Include<(Customer | Account | Transaction)[]>> {
        return this.httpGet<UnitResponse<CheckDeposit> & Include<(Customer | Account | Transaction)[]>>(`/${id}`, { params: { include }})
    }

    public async update(request: PatchCheckDepositRequest): Promise<UnitResponse<CheckDeposit>> {
        return this.httpPatch<UnitResponse<CheckDeposit>>(`/${request.checkDepositId}`, { data: request.data })
    }

    public async upload(request: UploadCheckDepositRequest) : Promise<UnitResponse<CheckDeposit>> {

            let path = `/${request.checkDepositId}`
            path += request.isBackSide ? "/back" : "/front"
    
            const headers = { "Content-Type": "image/jpeg" }
                    
            return this.httpPut<UnitResponse<CheckDeposit>>(path, request.file, {headers})
        }

    public async getImage(id: string, front = true, responseEncoding: responseEncoding = "binary", responseType: ResponseType = "blob"): Promise<string> {
        const p = front ? "front" : "back"
        return this.httpGet<string>(`/${id}/${p}`, {responseEncoding, responseType})
    }

    public async confirm(id: string): Promise<UnitResponse<CheckDeposit>> {
        return this.httpPost<UnitResponse<CheckDeposit>>(`/${id}/confirm`)
    }
}

export interface CheckDepositListParams extends BaseListParams {
    /**
     * Optional. Filters the results by the specified account id.
     * default: empty
     */
    accountId?: string

    /**
     * Optional. Filters the results by the specified customer id.
     * default: empty
     */
    customerId?: string

    /**
     * Optional. Filter Applications by [Tags](https://developers.unit.co/#tags).
     * default: empty
     */
    tags?: Tags

    /**
     * Optional. Filter results by [Check Deposit Status](https://developers.unit.co/check-deposits#check-deposit-status).
     */
    status?: CheckDepositStatus[]

    /**
     * Optional. Leave empty or provide sort=createdAt for ascending order. Provide sort=-createdAt (leading minus sign) for descending order.
     */
    sort?: Sort

    /**
     * Optional. Related resource available to include: customer. See [Getting Related Resources](https://developers.unit.co/#intro-getting-related-resources).
     * default: empty
     */
    include?: string
}
