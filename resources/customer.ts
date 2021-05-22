import axios from "axios";
import { UnitResponse, UnitError, Address, Phone, BusinessContact, AuthorizedUser } from "../types/core";
import { Customer } from "../types/customer";

export class Customers {
    private token: string;
    private basePath = 'https://api.s.unit.sh';
    private resourcePath = '/customers'

    constructor(token: string) {
        this.token = token
    }

    public async updateIndividual(id: number, attributes: IndividualAttributes) {
        var headers = {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/vnd.api+json'
        };

        var path = `${this.basePath + this.resourcePath}/${id}`

        var res = await axios.patch<UnitResponse<Customer> | UnitError>(path, attributes, { headers: headers })
            .then(r => r.data)
            .catch(error => { return error.response.data })

        return res
    }

    public async updateBusiness(id: number, attributes: BusinessAttributes) {
        var headers = {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/vnd.api+json'
        };

        var path = `${this.basePath + this.resourcePath}/${id}`

        var res = await axios.patch<UnitResponse<Customer> | UnitError>(path, attributes, { headers: headers })
            .then(r => r.data)
            .catch(error => { return error.response.data })

        return res
    }

    public async get(id: number): Promise<UnitResponse<Customer> | UnitError> {
        var headers = {
            'Authorization': `Bearer ${this.token}`
        };

        var path = `${this.basePath + this.resourcePath}/${id}`

        var res = await axios.get<UnitResponse<Customer> | UnitError>(path, { headers })
            .then(r => r.data)
            .catch(error => { return error.response.data })

        return res
    }

    public async list(params: CustomersListParams): Promise<UnitResponse<Customer[]> | UnitError> {
        var headers = {
            'Authorization': `Bearer ${this.token}`
        };

        var parameters = {
            'page[limit]': (params.limit ? params.limit : 100),
            'page[offset]': (params.offset ? params.offset : 0),
            ...(params.query && { 'filter[query]': params.query }),
            ...(params.email && { 'filter[email]': params.email }),
            ...(params.tags && { 'filter[tags]': params.tags }),
            'sort': params.sort ? params.sort : '-createdAt'
        }

        var path = `${this.basePath + this.resourcePath}`

        var res = await axios.get<UnitResponse<Customer[] | UnitError>>(path, { headers: headers, params: parameters })
            .then(r => r.data)
            .catch(error => { return error.response.data })

        return res
    }
}

interface CustomersListParams {
    /**
     * Maximum number of resources that will be returned. Maximum is 1000 resources. See Pagination.
     * default: 100
     */
    limit?: number,

    /**
     * Number of resources to skip. See Pagination.
     * default: 0
     */
    offset?: number,

    /**
     * Optional. Search term according to the Full-Text Search Rules.
     * default: empty
     */
    query?: string,

    /**
     * Optional. Filter customers by email address (case sensitive).
     * default: empty
     */
    email?: string,

    /**
     * Optional. Filter customers by Tags.
     * default: empty
     */
    tags?: Object,

    /**
     * Optional. sort=createdAt for ascending order or sort=-createdAt (leading minus sign) for descending order.
     * default: sort=-createdAt	
     */
    sort?: string
}

interface IndividualAttributes {
    /**
     * Address of the individual. To modify or add specify the new address.
     */
    address?: Address

    /**
     * Phone of the individual. To modify or add specify the new phone number.
     */
    phone?: Phone

    /**
     * Email address of the individual. To modify or add specify the new email address.
     */
    email?: string

    /**
     * If the individual is a sole proprietor who is doing business under a different name.
     * To modify or add specify the new dba name.
     */
    dba?: string

    /**
     * See (Updating Tags)[https://developers.unit.co/#tags].
     */
    tags?: object
}

interface BusinessAttributes {
    /**
     * Address of the business. To modify specify the new address.
     */
    address?: Address

    /**
     * Phone of the business. To modify specify the new phone number.
     */
    phone?: Phone

    /**
     * Primary contact of the business.	
     */
    contact?: BusinessContact

    /**
     * Array of authorized users. The provided array items will replace the existing ones.
     */
    authorizedUsers?: AuthorizedUser[]

    /**
     * See (Updating Tags)[https://developers.unit.co/#tags].
     */
    tags?: object
}