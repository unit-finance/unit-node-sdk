import { Customer, Account, Transaction } from "../types"
import { Chargeback, ChargebackListParams, CreateChargebackRequest } from "../types/chargeback"
import { Include, UnitConfig, UnitResponse } from "../types/common"
import {BaseResource} from "./baseResource"

type ChargebackIncluded = Customer[] | Account[] | Transaction[]

export class Chargebacks extends BaseResource {

    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + "/chargebacks", config)
    }

    public async create(request: CreateChargebackRequest): Promise<UnitResponse<Chargeback>> {
        return this.httpPost<UnitResponse<Chargeback>>("", {data: request})
    }

    /**
     * Include is Optional. Related resource available to include: customer, account, transaction. See [Getting Related Resources](https://developers.unit.co/#intro-getting-related-resources)
     * @param chargebackId
     * @param include
     */
    public async get(chargebackId: string, include = ""): Promise<UnitResponse<Chargeback> & Include<ChargebackIncluded>> {
        return this.httpGet<UnitResponse<Chargeback> & Include<ChargebackIncluded>>(`/${chargebackId}`, {params: {include}})
    }

    public async list(params?: ChargebackListParams): Promise<UnitResponse<Chargeback[]> & Include<ChargebackIncluded>> {
        const parameters: any = {
            "page[limit]": (params?.limit ? params.limit : 100),
            "page[offset]": (params?.offset ? params.offset : 0),
            ...(params?.accountId && {"filter[accountId]": params.accountId}),
            ...(params?.customerId && {"filter[customerId]": params.customerId}),
            ...(params?.since && {"filter[since]": params.since}),
            ...(params?.until && {"filter[until]": params.until}),
            ...(params?.tags && {"filter[tags]": params.tags}),
            ...(params?.include && {"include": params.include}),
            ...(params?.sort && {"sort": params.sort})
        }

        return this.httpGet<UnitResponse<Chargeback[]> & Include<ChargebackIncluded>>("", {params: parameters})
    }
    


}