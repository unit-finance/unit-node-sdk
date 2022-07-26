import axiosStatic, { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, responseEncoding } from "axios"
import { extractUnitError, UnitConfig } from "../types/common"
import axiosRetry from "axios-retry"

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

        axiosRetry(this.axios, {
            retries: config?.retries || 3,
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
        const conf = this.makeRequestConfigurations(config)

        return await this.axios.post<T>(this.resourcePath + path, data, conf)
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

    private makeRequestConfigurations(config?: RequestConfig): AxiosRequestConfig {
        return {
            headers: this.mergeHeaders(config?.headers),
            ...(config?.params && { params: (config.params) }),
            ...(config?.responseEncoding && { responseEncoding: config.responseEncoding }),
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
    responseEncoding?: responseEncoding
    "axios-retry"?: {retries: number;}
}

function shouldRetry(status: number): boolean {
    return status === 408 || status === 429 || (status >= 500 && status <= 599)
}
