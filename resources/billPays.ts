import { Biller, GetBillerParams } from "../types/billPay"
import { UnitConfig, UnitResponse } from "../types/common"
import { BaseResource } from "./baseResource"

export class BillPays extends BaseResource {

    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + "/payments/billpay/billers", config)
    }

    public async get(params: GetBillerParams): Promise<UnitResponse<Biller[]>> {
        return await this.httpGet<UnitResponse<Biller[]>>("", {params: params})
    }
}