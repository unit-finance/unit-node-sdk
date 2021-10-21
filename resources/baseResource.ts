import axiosStatic, { AxiosInstance } from "axios"
import { extractUnitError, UnitConfig } from "../types/common"

export class BaseResource {
    private resourcePath: string
    private headers: object
    private readonly axios: AxiosInstance

    constructor(token: string, resourcePath: string, config?: UnitConfig) {
        this.resourcePath = resourcePath

        this.headers = {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/vnd.api+json",
            "User-Agent": "unit-node-sdk"
        }

        this.axios = config?.axios ?? axiosStatic
    }

    protected async httpGet<T>(path: string, config?: { headers?: object; params?: object; }) : Promise<T> {

        const conf = {
            headers: this.mergeHeaders(config?.headers),
            ...(config?.params && { params: (config.params)})
        }

        return await this.axios.get<T>(this.resourcePath + path, conf)
            .then(r => r.data)
            .catch(error => { throw extractUnitError(error) })
    }

    protected async httpPatch<T>(path: string, data: object, config?: { headers?: object; params?: object; }) : Promise<T> {
        const conf = {
            headers: this.mergeHeaders(config?.headers),
            ...(config?.params && { params: (config.params) })
        }

        return await this.axios.patch<T>(this.resourcePath + path, data, conf)
            .then(r => r.data)
            .catch(error => { throw extractUnitError(error) })
    }

    protected async httpPost<T>(path: string, data?: object, config?: { headers?: object; params?: object; }) : Promise<T>{
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


    protected async httpDelete<T>(path: string) : Promise<T> {
        return await this.axios.delete<T>(this.resourcePath + path, {headers: this.headers})
            .then(r => r.data)
            .catch(error => { throw extractUnitError(error) })
    }

    private mergeHeaders(configHeaders: object | undefined){
        return configHeaders ? { ...this.headers, ...configHeaders } : this.headers
    }
}
