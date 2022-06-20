import axiosStatic, {AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, responseEncoding} from "axios"
import { extractUnitError, UnitConfig } from "../types/common"

export class BaseResource {
    private resourcePath: string
    private headers: AxiosRequestHeaders
    private readonly axios: AxiosInstance

    constructor(token: string, resourcePath: string, config?: UnitConfig) {
        this.resourcePath = resourcePath

        this.headers = {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/vnd.api+json",
            ...(config?.sdkUserAgent && { "User-Agent": "unit-node-sdk" })
        }

        this.axios = config?.axios ?? axiosStatic
    }

    protected async httpGet<T>(path: string, config?: { headers?: object; params?: object; responseEncoding?: responseEncoding;}) : Promise<T> {

        const conf = {
            headers: this.mergeHeaders(config?.headers),
            ...(config?.params && { params: (config.params)}),
            ...(config?.responseEncoding && {responseEncoding: config.responseEncoding})
        } as AxiosRequestConfig

        return await this.axios.get<T>(this.resourcePath + path, conf)
            .then(r => r.data)
            .catch(error => { throw extractUnitError(error) })
    }

    protected async httpPatch<T>(path: string, data: DataPayload | { data: DataPayload; }, config?: { headers?: object; params?: object; }) : Promise<T> {
        const conf = {
            headers: this.mergeHeaders(config?.headers),
            ...(config?.params && { params: (config.params) })
        }

        const d = !data || (data && "data" in data) ? data : { data: {
            type: data.type,
            attributes: data. attributes
        }}

        return await this.axios.patch<T>(this.resourcePath + path, d, conf)
            .then(r => r.data)
            .catch(error => { throw extractUnitError(error) })
    }

    protected async httpPost<T>(path: string, data?: DataPayload | { data: object; }, config?: { headers?: object; params?: object; }) : Promise<T>{
        const conf = {
            headers: this.mergeHeaders(config?.headers),
            ...(config?.params && { params: (config.params) })
        }

        return await this.axios.post<T>(this.resourcePath + path, data, conf)
            .then(r => r.data)
            .catch(error => { throw extractUnitError(error) })
    }

    protected async httpPut<T>(path: string, data: object | Buffer, config?: { headers?: object; params?: object; }) : Promise<T>{
        const conf = {
            headers: this.mergeHeaders(config?.headers),
            ...(config?.params && { params: (config.params) })
        }

        return await this.axios.put<T>(this.resourcePath + path, data, conf)
            .then(r => r.data)
            .catch(error => { throw extractUnitError(error) })
    }


    protected async httpDelete<T>(path: string, data?: object) : Promise<T> {
        const d = {...(data && {data: data})}
        return await this.axios.delete<T>(this.resourcePath + path,{headers: this.headers, data: d})
            .then(r => r.data)
            .catch(error => { throw extractUnitError(error) })
    }

    private mergeHeaders(configHeaders: object | undefined){
        return configHeaders ? { ...this.headers, ...configHeaders } : this.headers
    }
}

type DataPayload = {
    type: string
    attributes: object
}
