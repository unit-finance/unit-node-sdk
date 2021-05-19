import axios, { AxiosResponse } from 'axios'
import { Application, ApplicationDocument, CreateApplicationRequest } from '../types/application';

export class Applications {
    private token: string;
    private basePath = 'https://api.s.unit.sh';
    private resourcePath = '/applications';

    constructor(token: string) {
        this.token = token;
    }

    public async list(params: ListParams): Promise<Application[] | []> {
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
        try {
            var res = await axios.get<AxiosResponse<Application[]>>(`${this.basePath + this.resourcePath}`, { headers: headers, params: parameters })

            return res.data.data
        }
        catch (error) {
            return error;
        }
    }

    public async create(request: CreateApplicationRequest): Promise<Application | []> {
        //     var ret: Application | [] = [];
        var headers = {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/vnd.api+json'
        };
        try {
            var res = await axios.post<AxiosResponse<Application | []>>(`${this.basePath + this.resourcePath}`, { data: request }, { headers })

            if (res.status === 201) {
                return res.data.data
            }
            else if (res.status >= 400) {
                return []
            }
            else {
                //status 201,300 ?
                return []
            }
        } catch (error) {
            //status 500, should return error
            return []
        }
    }

    public async get(id: number): Promise<{ data: Application, included: ApplicationDocument[] }> {
        var headers = {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/vnd.api+json'
        };

        var path = `${this.basePath + this.resourcePath}/${id}`

        try {
            var res = await axios.get<AxiosResponse<{ data: Application, included: ApplicationDocument[] }>>(path, { headers })
            return res.data.data
        } catch (error) {
            //status 500, should return error
            return error
        }
    }
}

interface ListParams {
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