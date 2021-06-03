import axios, { AxiosResponse } from 'axios'
import { Application, ApplicationDocument, CreateApplicationRequest, UploadDocumentRequest } from '../types/application';
import { UnitResponse, Include, UnitError } from '../types/core';
import { BaseResource } from './baseResource';

export class Applications extends BaseResource {

    constructor(token: string, basePath: string) {
        super(token, basePath + '/applications');
    }

    public async list(params: ApplicationListParams): Promise<UnitResponse<Application[]> | UnitError> {
        var parameters = {
            'page[limit]': (params.limit ? params.limit : 100),
            'page[offset]': (params.offset ? params.offset : 0),
            ...(params.query && { 'filter[query]': params.query }),
            ...(params.email && { 'filter[email]': params.email }),
            ...(params.tags && { 'filter[tags]': params.tags }),
            'sort': params.sort ? params.sort : '-createdAt'
        }

        return this.httpGet<UnitResponse<Application[]>>('', { params: parameters })
    }

    public async create(request: CreateApplicationRequest): Promise<UnitResponse<Application> | UnitError> {
        var headers = {
            'Content-Type': 'application/vnd.api+json'
        };

        return this.httpPost<UnitResponse<Application>>('', { data: request }, { headers })
    }

    public async upload(request: UploadDocumentRequest) : Promise<UnitResponse<ApplicationDocument> | UnitError> {

        let path = `/${request.applicationId}/documents/${request.documentId}`
        if (request.isBackSide)
            path += '/back'

        let headers = {}

        switch (request.fileType) {
            case 'jpeg':
                headers = {
                    'Content-Type': 'image/jpeg'
                }
                break;
            case 'png':
                headers = {
                    'Content-Type': 'image/png'
                }
                break;
            case 'pdf':
                headers = {
                    'Content-Type': 'application/pdf'
                }
                break;
            default:
                break;
        }

        return this.httpPut<UnitResponse<ApplicationDocument>>(path, { data: request.file }, {headers})
    }

    public async get(applicationId: number): Promise<UnitResponse<Application> & Include<ApplicationDocument[]> | UnitError> {
        return this.httpGet<UnitResponse<Application> & Include<ApplicationDocument[]>>(`/${applicationId}`)
    }

    public async listDocuments(applicationId: number): Promise<UnitResponse<ApplicationDocument[]> | UnitError> {
        return this.httpGet<UnitResponse<ApplicationDocument[]>>(`/${applicationId}/documents`)
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
