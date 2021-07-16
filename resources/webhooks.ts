import { UnitResponse, UnitError } from "../types/common"
import { CreateWebhookRequest, PatchWebhookRequest, Webhook } from "../types/webhooks"
import { BaseResource } from "./baseResource"
import { AxiosInstance } from "axios"

export class Webhooks extends BaseResource {
    constructor(token: string, basePath: string, axios?: AxiosInstance) {
        super(token, basePath + "/webhooks", axios)
    }

    public async create(request: CreateWebhookRequest): Promise<UnitResponse<Webhook> | UnitError> {
        return this.httpPost<UnitResponse<Webhook> | UnitError>("", { data: request })
    }

    public async get(id: string): Promise<UnitResponse<Webhook> | UnitError> {
        return this.httpGet<UnitResponse<Webhook> | UnitError>(`/${id}`)
    }

    public async list(params?: WebhookListParams): Promise<UnitResponse<Webhook[]> | UnitError> {
        const parameters = {
            "page[limit]": (params?.limit ? params.limit : 100),
            "page[offset]": (params?.offset ? params.offset : 0)
        }

        return this.httpGet<UnitResponse<Webhook[]> | UnitError>("", { params: parameters })
    }

    public async update(id: string, request: PatchWebhookRequest): Promise<UnitResponse<Webhook> | UnitError> {
        return this.httpPatch<UnitResponse<Webhook> | UnitError>(`/${id}`, { data: request })
    }

    public async enable(id: string): Promise<UnitResponse<Webhook> | UnitError> {
        return this.httpPost<UnitResponse<Webhook> | UnitError>(`/${id}/enable`)
    }

    public async disable(id: string): Promise<UnitResponse<Webhook> | UnitError> {
        return this.httpPost<UnitResponse<Webhook> | UnitError>(`/${id}/disable`)
    }
}

export interface WebhookListParams {
    /**
     * Maximum number of resources that will be returned. Maximum is 1000 resources. See Pagination.
     * default: 100
     */
    limit?: number

    /**
     * Number of resources to skip. See Pagination.
     * default: 0
     */
    offset?: number
}
