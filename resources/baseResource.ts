import axiosStatic, { AxiosInstance } from "axios"
import { UnitConfig, UnitError } from "../types/common"

export class BaseResource {
    private resourcePath: string
    private headers: {}
    private readonly axios: AxiosInstance

    constructor(token: string, resourcePath: string, config?: UnitConfig) {
        this.resourcePath = resourcePath

        this.headers = {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/vnd.api+json"
        }

        this.axios = config?.axios ?? axiosStatic
    }

    protected async httpGet<T>(path: string, config?: { headers?: object; params?: object; }) : Promise<UnitError | T> {

        const conf = {
            headers: this.mergeHeaders(config?.headers),
            ...(config?.params && { params: (config.params)})
        }

        return await this.axios.get<T | UnitError>(this.resourcePath + path, conf)
            .then(r => r.data)
            .catch<UnitError>(error => { throw error.response.data as UnitError })
    }

    protected async httpPatch<T>(path: string, data: object, config?: { headers?: object; params?: object; }) : Promise<UnitError | T> {
        const conf = {
            headers: this.mergeHeaders(config?.headers),
            ...(config?.params && { params: (config.params) })
        }

        return await this.axios.patch<T | UnitError>(this.resourcePath + path, data, conf)
            .then(r => r.data)
            .catch<UnitError>(error => { throw error.response.data as UnitError })
    }

    protected async httpPost<T>(path: string, data?: object, config?: { headers?: object; params?: object; }) : Promise<UnitError | T>{
        const conf = {
            headers: this.mergeHeaders(config?.headers),
            ...(config?.params && { params: (config.params) })
        }

        return await this.axios.post<T | UnitError>(this.resourcePath + path, data, conf)
            .then(r => r.data)
            .catch<UnitError>(error => { throw error.response.data as UnitError })
    }

    protected async httpPut<T>(path: string, data: object, config?: { headers?: object; params?: object; }) : Promise<UnitError | T>{
        const conf = {
            headers: this.mergeHeaders(config?.headers),
            ...(config?.params && { params: (config.params) })
        }

        return await this.axios.put<T | UnitError>(this.resourcePath + path, data, conf)
            .then(r => r.data)
            .catch<UnitError>(error => { throw error.response.data as UnitError })
    }

    protected async httpDelete<T>(path: string) : Promise<UnitError | T> {
        return await this.axios.delete<T | UnitError>(this.resourcePath + path, {headers: this.headers})
            .then(r => r.data)
            .catch<UnitError>(error => { throw error.response.data as UnitError })
    }

    private mergeHeaders(configHeaders: object | undefined){
        return configHeaders ? { ...this.headers, ...configHeaders } : this.headers
    }
}
