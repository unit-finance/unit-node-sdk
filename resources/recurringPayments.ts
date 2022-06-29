import { BaseResource } from "./baseResource";
import { UnitConfig, UnitResponse } from "../types/common"
import { CreateRecurringPaymentRequest, RecurringPayment } from "../types/recurringPayment";

export class RecurringPayments extends BaseResource {
    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + "/recurring-payments", config)
    }

    public async create(request: CreateRecurringPaymentRequest): Promise<UnitResponse<RecurringPayment>> {
        return this.httpPost<UnitResponse<RecurringPayment>>("", { data: request })
    }
}