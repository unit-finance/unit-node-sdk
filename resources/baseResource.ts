import axios from "axios"
import { UnitError } from "../types/core"

export class BaseResource {
    private resourcePath: string
    private headers: {};

    constructor(token: string, resourcePath: string) {
        this.resourcePath = resourcePath

        this.headers = {
            'Authorization': `Bearer ${token}`
        };
    }

    public async HttpGet<T>(path: string, config?: { headers?: object, params?: object }) {

        var conf = {
            headers: config?.headers ? { ...this.headers, ...config?.headers } : this.headers,
            ...(config?.params && { params: (config.params) })
        }

        return await axios.get<T | UnitError>(this.resourcePath + path, conf)
            .then(r => r.data)
            .catch(error => { return error.response.data })
    }

    public async HttpPatch<T>(path: string, data: object, config?: { headers?: object, params?: object }) {
        return await axios.patch<T | UnitError>(this.resourcePath + path, data, config)
            .then(r => r.data)
            .catch(error => { return error.response.data })
    }

    public async HttpPost<T>(path: string, data: object, config?: { headers?: object, params?: object }) {
        return await axios.post<T | UnitError>(this.resourcePath + path, data, config)
            .then(r => r.data)
            .catch(error => { return error.response.data })
    }
}


// export async function delete(){

// }