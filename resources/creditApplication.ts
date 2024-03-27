import { BaseResource } from "./baseResource"
import { UnitConfig, UnitResponse, CreditApplication, BaseListParams, DeniedCreditApplication, ApprovedCreditApplication, PatchCreditApplicationRequest, CreateCreditApplicationRequest } from "../types"

export class CreditApplications extends BaseResource {
    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + "/credit-applications", config)
    }

    public async create(request: CreateCreditApplicationRequest) {
        return this.httpPost<UnitResponse<CreditApplication>>("", { data: request })
    }

    public async approve(credit_application_id: string) {
        return this.httpPost<UnitResponse<ApprovedCreditApplication>>(`/approve/${credit_application_id}/`)
    }

    public async deny(credit_application_id: string) {
        return this.httpPost<UnitResponse<DeniedCreditApplication>>(`/deny/${credit_application_id}/`)
    }

    public async update(request: PatchCreditApplicationRequest) {
        return this.httpPatch<UnitResponse<CreditApplication>>(`/${request.id}`, { data: request.data })
    }

    public async get(credit_application_id: string) {
        return this.httpGet<UnitResponse<CreditApplication>>(`/${credit_application_id}`)
    }

    public async list(params?: CreditApplicationListParams) {
        const parameters: any = {
            "page[limit]": (params?.limit ? params?.limit : 100),
            "page[offset]": (params?.offset ? params?.offset : 0),
            ...(params?.lendingProgramId && { "filter[lendingProgramId]": params?.lendingProgramId }),
            ...(params?.orgId && { "filter[orgId]": params?.orgId }),
            ...(params?.applicationId && { "filter[applicationId]": params?.applicationId }),
            ...(params?.bankId && { "filter[bankId]": params?.bankId }),
            ...(params?.customerId && { "filter[customerId]": params?.customerId })
        }

        return this.httpGet<UnitResponse<CreditApplication[]>>("", { params: parameters })
    }
}

export interface CreditApplicationListParams extends BaseListParams {
    /**
     * Optional. Search resources by lending program id.
     * default: empty
     */
    lendingProgramId?: string

    /**
     * Optional. Search resources by organization id.
     * default: empty
     */
    orgId?: string

    /**
     * Optional. Search resources by lending program id.
     * default: empty
     */
    bankId?: string

    /**
     * Optional. Search resources by application id.
     * default: empty
     */
    applicationId?: string

    /**
     * Optional. Search resources by customer id.
     * default: empty
     */
    customerId?: string
}