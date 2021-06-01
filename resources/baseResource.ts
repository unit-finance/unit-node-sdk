import axios from "axios"
import { UnitError } from "../types/core"

export class BaseResource {
    private resourcePath: string
    private headers: {};

    constructor(token: string, resourcePath: string) {
        this.resourcePath = resourcePath

        this.headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/vnd.api+json'
        };
    }

    protected async httpGet<T>(path: string, config?: { headers?: object, params?: object }) : Promise<UnitError | T> {

        var conf = {
            headers: config?.headers ? { ...this.headers, ...config?.headers } : this.headers,
            ...(config?.params && { params: (config.params)})
        }

        return await axios.get<T | UnitError>(this.resourcePath + path, conf)
            .then(r => r.data)
            .catch(error => { return error.response.data })
    }

    protected async httpPatch<T>(path: string, data: object, config?: { headers?: object, params?: object }) : Promise<UnitError | T> {
        var conf = {
            headers: config?.headers ? { ...this.headers, ...config?.headers } : this.headers,
            ...(config?.params && { params: (config.params) })
        }

        return await axios.patch<T | UnitError>(this.resourcePath + path, data, conf)
            .then(r => r.data)
            .catch(error => { return error.response.data })
    }

    protected async httpPost<T>(path: string, data: object, config?: { headers?: object, params?: object }) : Promise<UnitError | T>{
        var conf = {
            headers: config?.headers ? { ...this.headers, ...config?.headers } : this.headers,
            ...(config?.params && { params: (config.params) })
        }

        return await axios.post<T | UnitError>(this.resourcePath + path, data, conf)
            .then(r => r.data)
            .catch(error => { return error.response.data })
    }

    protected async httpPut<T>(path: string, data: object, config?: { headers?: object, params?: object }) : Promise<UnitError | T>{
        var conf = {
            headers: config?.headers ? { ...this.headers, ...config?.headers } : this.headers,
            ...(config?.params && { params: (config.params) })
        }

        return await axios.put<T | UnitError>(this.resourcePath + path, data, conf)
            .then(r => r.data)
            .catch(error => { return error.response.data })
    }

    protected async httpDelete<T>(path: string) : Promise<UnitError | T> {
        return await axios.delete<T | UnitError>(this.resourcePath + path)
            .then(r => r.data)
            .catch(error => { return error.response.data })
    }
}