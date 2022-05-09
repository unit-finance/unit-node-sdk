import { BaseListParams, UnitConfig, UnitResponse } from "../types/common"
import { CreateWebhookRequest, PatchWebhookRequest, Webhook } from "../types/webhooks"
import { BaseResource } from "./baseResource"
import crypto = require("crypto")

export class Webhooks extends BaseResource {
    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + "/webhooks", config)
    }

    public async create(request: CreateWebhookRequest): Promise<UnitResponse<Webhook>> {
        return this.httpPost<UnitResponse<Webhook>>("", { data: request })
    }

    public async get(id: string): Promise<UnitResponse<Webhook>> {
        return this.httpGet<UnitResponse<Webhook>>(`/${id}`)
    }

    public async list(params?: WebhookListParams): Promise<UnitResponse<Webhook[]>> {
        const parameters = {
            "page[limit]": (params?.limit ? params.limit : 100),
            "page[offset]": (params?.offset ? params.offset : 0),
            ...(params?.since && { "filter[since]": params.since }),
            ...(params?.until && { "filter[until]": params.until }),
            ...(params?.fromId && { "filter[fromId]": params.fromId }),
            ...(params?.toId && { "filter[toId]": params.toId }),
        }

        return this.httpGet<UnitResponse<Webhook[]>>("", { params: parameters })
    }

    public async update(id: string, request: PatchWebhookRequest): Promise<UnitResponse<Webhook>> {
        return this.httpPatch<UnitResponse<Webhook>>(`/${id}`, { data: request })
    }

    public async enable(id: string): Promise<UnitResponse<Webhook>> {
        return this.httpPost<UnitResponse<Webhook>>(`/${id}/enable`)
    }

    public async disable(id: string): Promise<UnitResponse<Webhook>> {
        return this.httpPost<UnitResponse<Webhook>>(`/${id}/disable`)
    }

    public verify(signature: string, secret: string, payload: any) {
        const hmac = crypto.createHmac("sha1", secret)
        hmac.update(JSON.stringify(payload))
        return hmac.digest("base64") == signature
    }
}

export interface WebhookListParams extends BaseListParams {
    /**
     * Optional. Filters the results that occurred after the specified date. e.g. 2020-01-13T16:01:19.346Z
     * RFC3339 Date string
     */
    since?: string

    /**
     * Optional. Filters the results that occurred before the specified date. e.g. 2020-01-02T20:06:23.486Z
     * RFC3339 Date string
     */
    until?: string

    /**
     * Optional. Filters the results that have an id that is higher or equal to the specified id. e.g. 17421
     */
    fromId?: number

    /**
     * Optional. Filters the results that have an id that is lower or equal to the specified id. e.g. 17432
     */
    toId?: number
}
