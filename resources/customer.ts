import { UnitResponse, UnitConfig, Meta, BaseListParams } from "../types/common"
import { Customer, PatchCustomerRequest } from "../types/customer"
import { BaseResource } from "./baseResource"

export class Customers extends BaseResource {

    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + "/customers", config)
    }

    public async update(request: PatchCustomerRequest): Promise<UnitResponse<Customer>>{
        return this.httpPatch<UnitResponse<Customer>>(`/${request.customerId}`, { data: request.data })
    }

    public async get(customerId: string): Promise<UnitResponse<Customer>> {
        return this.httpGet<UnitResponse<Customer>>(`/${customerId}`)
    }

    public async list(params?: CustomersListParams): Promise<UnitResponse<Customer[]> & Meta> {

        const parameters: any = {
            "page[limit]": (params?.limit ? params.limit : 100),
            "page[offset]": (params?.offset ? params.offset : 0),
            ...(params?.query && { "filter[query]": params.query }),
            ...(params?.email && { "filter[email]": params.email }),
            ...(params?.tags && { "filter[tags]": params.tags }),
            "sort": params?.sort ? params.sort : "-createdAt"
        }

        if (params?.status)
            params.status.forEach((s, idx) => {
                parameters[`filter[status][${idx}]`] = s
            })

        return this.httpGet<UnitResponse<Customer[]> & Meta>("", { params: parameters })
    }
}

export interface CustomersListParams extends BaseListParams {
    /**
     * Optional. Search term according to the Full-Text Search Rules.
     * default: empty
     */
    query?: string

    /**
     * Optional. Filter customers by email address (case sensitive).
     * default: empty
     */
    email?: string

    /**
     * Optional. Filter customers by Tags.
     * default: empty
     */
    tags?: object

    /**
     * Optional. Filter customers by status (Active, Archived). Usage example: *filter[status][0]=Active
     */
    status?: string[]

    /**
     * Optional. sort=createdAt for ascending order or sort=-createdAt (leading minus sign) for descending order.
     * default: sort=-createdAt
     */
    sort?: string
}
