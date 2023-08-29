import axiosStatic, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosRequestHeaders,
    responseEncoding,
    ResponseType
} from "axios"
import { extractUnitError, UnitConfig } from "../types"

import { version } from "../package.json"

const MAX_REQUEST_SIZE = 20000000

export class BaseResource {
    private resourcePath: string
    private headers: AxiosRequestHeaders
    private readonly axios: AxiosInstance

    constructor(token: string, resourcePath: string, config?: UnitConfig) {
        this.resourcePath = resourcePath

        this.headers = {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/vnd.api+json",
            "X-UNIT-SDK": `unit-node-sdk@v${version}`
        }

        this.axios = config?.axios ?? axiosStatic
    }

    protected async httpGet<T>(path: string, config?: { headers?: object; params?: object; responseEncoding?: responseEncoding; responseType?: ResponseType; }): Promise<T> {

        const conf = {
            headers: this.mergeHeaders(config?.headers),
            ...(config?.params && { params: (config.params) }),
            ...(config?.responseEncoding && { responseEncoding: config.responseEncoding }),
            ...(config?.responseType && { responseType: config.responseType })
        } as AxiosRequestConfig

        return await this.axios.get<T>(this.resourcePath + path, conf)
            .then(r => r.data)
            .catch(error => { throw extractUnitError(error) })
    }

    protected async httpGetWithInclude<T>(path: string, include?: string): Promise<T> {
        const params = {...(include && { include })}
        return this.httpGet<T>(path,  { params })
    }

    protected async httpPatch<T>(path: string, data: DataPayload | { data: DataPayload; }, config?: { headers?: object; params?: object; }): Promise<T> {
        return this.httpPatchFullPath<T>(this.resourcePath + path, data, config)
    }

    protected async httpPatchFullPath<T>(path: string, data: DataPayload | { data: DataPayload; }, config?: { headers?: object; params?: object; }): Promise<T> {
        const conf = {
            headers: this.mergeHeaders(config?.headers),
            maxBodyLength: MAX_REQUEST_SIZE,
            maxContentLength: MAX_REQUEST_SIZE,
            ...(config?.params && { params: (config.params) })
        }

        const d = !data || (data && "data" in data) ? data : {
            data: {
                type: data.type,
                attributes: data.attributes
            }
        }

        return await this.axios.patch<T>(path, d, conf)
            .then(r => r.data)
            .catch(error => { throw extractUnitError(error) })
    }

    protected async httpPost<T>(path: string, data?: DataPayload | { data: object; }, config?: { headers?: object; params?: object; }): Promise<T> {
        const conf = {
            headers: this.mergeHeaders(config?.headers),
            maxBodyLength: MAX_REQUEST_SIZE,
            maxContentLength: MAX_REQUEST_SIZE,
            ...(config?.params && { params: (config.params) })
        }

        return await this.axios.post<T>(this.resourcePath + path, data, conf)
            .then(r => r.data)
            .catch(error => { throw extractUnitError(error) })
    }

    protected async httpPostResourcePath<T>(data?: DataPayload | { data: object; }, config?: { headers?: object; params?: object; }): Promise<T> {
        return this.httpPost("", data, config)
    }
        

    protected async httpPostFullPath<T>(path: string, data?: DataPayload | { data: object; }, config?: { headers?: object; params?: object; }): Promise<T> {
        const conf = {
            headers: this.mergeHeaders(config?.headers),
            maxBodyLength: MAX_REQUEST_SIZE,
            maxContentLength: MAX_REQUEST_SIZE,
            ...(config?.params && { params: (config.params) })
        }

        return await this.axios.post<T>(path, data, conf)
            .then(r => r.data)
            .catch(error => { throw extractUnitError(error) })
    }

    protected async httpPut<T>(path: string, data: object | Buffer, config?: { headers?: object; params?: object; }): Promise<T> {
        const conf = {
            headers: this.mergeHeaders(config?.headers),
            maxBodyLength: MAX_REQUEST_SIZE,
            maxContentLength: MAX_REQUEST_SIZE,
            ...(config?.params && { params: (config.params) })
        }

        return await this.axios.put<T>(this.resourcePath + path, data, conf)
            .then(r => r.data)
            .catch(error => { throw extractUnitError(error) })
    }


    protected async httpDelete<T>(path: string, data?: { data: object; }): Promise<T> {
        const conf = {
            headers: this.headers,
            data
        }

        return await this.axios.delete<T>(this.resourcePath + path, conf)
            .then(r => r.data)
            .catch(error => { throw extractUnitError(error) })
    }

    private mergeHeaders(configHeaders: object | undefined) {
        return configHeaders ? { ...this.headers, ...configHeaders } : this.headers
    }
}

type DataPayload = {
    type: string
    attributes: object
}
