import { UnitResponse, UnitConfig, Meta, BaseListParams, Tags, Sort } from "../types/common"
import { Customer, PatchCustomerRequest, ArchiveCustomerRequest, AddAuthorizedUsersRequest, RemoveAuthorizedUsersRequest, CustomerStatus } from "../types/customer"
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

    public async archiveCustomer(request: ArchiveCustomerRequest): Promise<UnitResponse<Customer>> {
        return this.httpPost<UnitResponse<Customer>>(`/${request.customerId}/archive`, { data: request.data })
    }

    public async addAuthorizedUsers(request: AddAuthorizedUsersRequest): Promise<UnitResponse<Customer>> {
        return this.httpPost<UnitResponse<Customer>>(`/${request.customerId}/authorized-users`, { data: request.data })
    }

    public async removeAuthorizedUsers(request: RemoveAuthorizedUsersRequest): Promise<UnitResponse<Customer>> {
        return this.httpDelete<UnitResponse<Customer>>(`/${request.customerId}/authorized-users`, { data: request.data })
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
    tags?: Tags

    /**
     * Optional. Filter customers by status (Active, Archived). Usage example: *filter[status][0]=Active
     */
    status?: CustomerStatus[]

    /**
     * Optional. sort=createdAt for ascending order or sort=-createdAt (leading minus sign) for descending order.
     * default: sort=-createdAt
     */
    sort?: Sort
}
