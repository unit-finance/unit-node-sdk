import { UnitResponse, UnitError } from "../types/common"
import { CreateWebhookRequest, PatchWebhookRequest, Webhook, WebhookListParams } from "../types/webhooks"
import { BaseResource } from "./baseResource"

export class Webhooks extends BaseResource {
    constructor(token: string, basePath: string) {
        super(token, basePath + '/webhook')
    }
 
    public async create(request: CreateWebhookRequest) : Promise<UnitResponse<Webhook> | UnitError> {
        return this.httpPost<UnitResponse<Webhook> | UnitError>(`/${request.id}`,{data: request})
    }
 
    public async get(id: number) : Promise<UnitResponse<Webhook> | UnitError> {
        return this.httpGet<UnitResponse<Webhook> | UnitError>(`/${id}`)
    }
 
    public async list(params?: WebhookListParams) : Promise<UnitResponse<Webhook[]> | UnitError> {
        let parameters = {
            'page[limit]': (params?.limit ? params.limit : 100),
            'page[offset]': (params?.offset ? params.offset : 0)
        }
 
        return this.httpGet<UnitResponse<Webhook[]> | UnitError>('', {params: parameters})
    }
 
    public async update(request: PatchWebhookRequest) : Promise<UnitResponse<Webhook> | UnitError> {
        return this.httpPatch<UnitResponse<Webhook> | UnitError>(`/${request.id}`,{data: request.data})
    }
 
    public async enable(id: string) : Promise<UnitResponse<Webhook> | UnitError>{
        return this.httpPost<UnitResponse<Webhook> | UnitError>(`/${id}/enable`)
    }
 
    public async disable(id: string) : Promise<UnitResponse<Webhook> | UnitError>{
        return this.httpPost<UnitResponse<Webhook> | UnitError>(`/${id}/disable`)
    }
}