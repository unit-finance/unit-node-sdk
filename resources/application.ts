import axios, { AxiosResponse } from 'axios'
import { Application, ApplicationDocument, CreateApplicationRequest } from '../types/application';
import { UnitResponse, Include, UnitError } from '../types/core';

export class Applications {
    private token: string;
    private basePath = 'https://api.s.unit.sh';
    private resourcePath = '/applications'

    constructor(token: string) {
        this.token = token
    }

    public async list(params: ApplicationListParams): Promise<UnitResponse<Application[]> | UnitError> {
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
        var res = await axios.get<AxiosResponse<Application[] | UnitError>>(`${this.basePath + this.resourcePath}`, { headers: headers, params: parameters })
            .then(r => r.data)
            .catch(error => { return error.response.data })

        return res

    }

    public async create(request: CreateApplicationRequest): Promise<UnitResponse<Application> | UnitError> {
        var headers = {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/vnd.api+json'
        };

        var res = await axios.post<UnitResponse<Application> | UnitError>(`${this.basePath + this.resourcePath}`, { data: request }, { headers })
            .then(r => r.data)
            .catch(error => { return error.response.data })

        return res
    }

    public async get(id: number): Promise<UnitResponse<Application> & Include<ApplicationDocument[]> | UnitError> {
        var headers = {
            'Authorization': `Bearer ${this.token}`
        };

        var path = `${this.basePath + this.resourcePath}/${id}`

        var res = await axios.get<UnitResponse<Application> & Include<ApplicationDocument[]> | UnitError>(path, { headers })
            .then(r => r.data)
            .catch(error => { return error.response.data })

        return res
    }
}

interface ApplicationListParams {
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
     * Optional. Filter applications by email address (case sensitive).
     * default: empty
     */
    email?: string,

    /**
     * Optional. Filter Applications by Tags.
     * default: empty
     */
    tags?: Object,

    /**
     * Optional. sort=createdAt for ascending order or sort=-createdAt (leading minus sign) for descending order.
     * default: sort=-createdAt	
     */
    sort?: string
}