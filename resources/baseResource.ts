import axiosStatic, { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, responseEncoding, ResponseType} from "axios"
import { extractUnitError, UnitConfig } from "../types/common"
import axiosRetry from "axios-retry"

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
        this.axios.defaults.timeout = 120000

        axiosRetry(this.axios, {
            retries: config?.retries || 0,
            retryDelay: axiosRetry.exponentialDelay,
            retryCondition: (error: any) => {
                // if retry condition is not specified, by default idempotent requests are retried
                return shouldRetry(error?.response?.status)
            },
        })
    }

    protected async httpGet<T>(path: string, config?: RequestConfig): Promise<T> {
        const conf = this.makeRequestConfigurations(config)

        return await this.axios.get<T>(this.resourcePath + path, conf)
            .then(r => r.data)
            .catch(error => { throw extractUnitError(error) })
    }

    protected async httpPatch<T>(path: string, data: DataPayload | { data: DataPayload; }, config?: RequestConfig): Promise<T> {
        const conf = this.makeRequestConfigurations(config)

        const d = !data || (data && "data" in data) ? data : {
            data: {
                type: data.type,
                attributes: data.attributes
            }
        }

        return await this.axios.patch<T>(this.resourcePath + path, d, conf)
            .then(r => r.data)
            .catch(error => { throw extractUnitError(error) })
    }

    protected async httpPost<T>(path: string, data?: DataPayload | { data: object; }, config?: RequestConfig): Promise<T> {
        const conf = this.makePostRequestConfigurations(config)

        return await this.axios.post<T>(this.resourcePath + path, data, conf)
            .then(r => r.data)
            .catch(error => { throw extractUnitError(error) })
    }

    protected async httpPostResourcePath<T>(data?: DataPayload | { data: object; }, config?: { headers?: object; params?: object; }): Promise<T> {
        const conf = this.makePostRequestConfigurations(config)

        return await this.axios.post<T>("", data, conf)
            .then(r => r.data)
            .catch(error => { throw extractUnitError(error) })
    }
        

    protected async httpPostFullPath<T>(path: string, data?: DataPayload | { data: object; }, config?: { headers?: object; params?: object; }): Promise<T> {
        const conf = this.makePostRequestConfigurations(config)

        return await this.axios.post<T>(path, data, conf)
            .then(r => r.data)
            .catch(error => { throw extractUnitError(error) })
    }

    protected async httpPut<T>(path: string, data: object | Buffer, config?: RequestConfig): Promise<T> {
        const conf = this.makeRequestConfigurations(config)

        return await this.axios.put<T>(this.resourcePath + path, data, conf)
            .then(r => r.data)
            .catch(error => { throw extractUnitError(error) })
    }

    protected async httpDelete<T>(path: string, data?: { data: object; }, config?: RequestConfig): Promise<T> {
        const conf = {
            ...this.makeRequestConfigurations(config),
            ...{data: data}
        }

        return await this.axios.delete<T>(this.resourcePath + path, conf)
            .then(r => r.data)
            .catch(error => {
                throw extractUnitError(error)
             })
    }

    private makePostRequestConfigurations(config?: RequestConfig): AxiosRequestConfig {
        return {
            ...this.makeRequestConfigurations(config),
            maxBodyLength: MAX_REQUEST_SIZE,
            maxContentLength: MAX_REQUEST_SIZE
        }
    }

    private makeRequestConfigurations(config?: RequestConfig): AxiosRequestConfig {
        return {
            headers: this.mergeHeaders(config?.headers),
            ...(config?.params && { params: (config.params) }),
            ...(config?.responseEncoding && { responseEncoding: config.responseEncoding }),
            ...(config?.responseType && { responseType: config.responseType }),
            ...(config?.timeout && { timeout: config.timeout }),
            ...(config?.["axios-retry"] && { "axios-retry": {retries: config?.["axios-retry"].retries} })
        }
    }

    private mergeHeaders(configHeaders: object | undefined) {
        return configHeaders ? { ...this.headers, ...configHeaders } : this.headers
    }
}

type DataPayload = {
    type: string
    attributes: object
}

type RequestConfig = {
    headers?: object
    params?: object
    timeout?: number
    responseEncoding?: responseEncoding
    responseType?: ResponseType
    "axios-retry"?: {retries: number;}
}

function shouldRetry(status: number): boolean {
    return status === 408 || status === 429 || (status >= 500 && status <= 599)
}
