import { Application, ApplicationDocument, CreateApplicationRequest, PatchApplicationRequest, UploadDocumentRequest } from "../types/application"
import { UnitResponse, Include, UnitConfig, BaseListParams } from "../types/common"
import { BaseResource } from "./baseResource"

export class Applications extends BaseResource {

    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + "/applications", config)
    }

    public async list(params?: ApplicationListParams): Promise<UnitResponse<Application[]>> {
        const parameters: any = {
            "page[limit]": (params?.limit ? params?.limit : 100),
            "page[offset]": (params?.offset ? params?.offset : 0),
            ...(params?.query && { "filter[query]": params?.query }),
            ...(params?.email && { "filter[email]": params?.email }),
            ...(params?.tags && { "filter[tags]": params?.tags }),
            "sort": params?.sort ? params.sort : "-createdAt"
        }

        if (params?.status)
            params.status.forEach((s, idx) => {
                parameters[`filter[status][${idx}]`] = s
            })

        return this.httpGet<UnitResponse<Application[]>>("", { params: parameters })
    }

    public async create(request: CreateApplicationRequest): Promise<UnitResponse<Application> & Include<ApplicationDocument[]>> {
        return this.httpPost<UnitResponse<Application> & Include<ApplicationDocument[]>>("", { data: request })
    }

    public async upload(request: UploadDocumentRequest) : Promise<UnitResponse<ApplicationDocument>> {

        let path = `/${request.applicationId}/documents/${request.documentId}`
        if (request.isBackSide)
            path += "/back"

        let headers = {}

        switch (request.fileType) {
            case "jpeg":
                headers = {
                    "Content-Type": "image/jpeg"
                }
                break
            case "png":
                headers = {
                    "Content-Type": "image/png"
                }
                break
            case "pdf":
                headers = {
                    "Content-Type": "application/pdf"
                }
                break
            default:
                break
        }

        return this.httpPut<UnitResponse<ApplicationDocument>>(path, request.file, {headers})
    }

    public async update(request: PatchApplicationRequest): Promise<UnitResponse<Application>> {
        return this.httpPatch<UnitResponse<Application>>(`/${request.applicationId}`, {data: request.data})
    }

    public async get(applicationId: string): Promise<UnitResponse<Application> & Include<ApplicationDocument[]>> {
        return this.httpGet<UnitResponse<Application> & Include<ApplicationDocument[]>>(`/${applicationId}`)
    }

    public async listDocuments(applicationId: string): Promise<UnitResponse<ApplicationDocument[]>> {
        return this.httpGet<UnitResponse<ApplicationDocument[]>>(`/${applicationId}/documents`)
    }
}

export interface ApplicationListParams extends BaseListParams {
    /**
     * Optional. Search term according to the Full-Text Search Rules.
     * default: empty
     */
    query?: string

    /**
     * Optional. Filter applications by email address (case sensitive).
     * default: empty
     */
    email?: string

    /**
     * Optional. Filter Applications by Tags.
     * default: empty
     */
    tags?: object

    /**
     * Optional. sort=createdAt for ascending order or sort=-createdAt (leading minus sign) for descending order.
     * default: sort=-createdAt
     */
    sort?: string

    /**
     * Optional. Filter Account by its status (Open, Frozen, or Closed). Usage example: filter[status][0]=Closed
     */
    status?: string[]
}
