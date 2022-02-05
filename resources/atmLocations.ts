import { AtmLocation } from "../types/atmLocation"
import { UnitResponse, UnitConfig, Coordinates, Address } from "../types/common"
import { BaseResource } from "./baseResource"

export class AtmLocations extends BaseResource {

    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + "/atm-locations", config)
    }

    public async list(params?: AtmLocationListParams): Promise<UnitResponse<AtmLocation[]>> {
        const parameters = {
            ...(params?.coordinates && { "filter[coordinates]": params.coordinates }),
            ...(params?.address && { "filter[address]": params.address }),
            ...(params?.postalCode && { "filter[postalCode]": params.postalCode }),
            ...(params?.searchRadius && { "filter[searchRadius]": params.searchRadius })
        }

        return this.httpGet<UnitResponse<AtmLocation[]>>("", { params: parameters })
    }
}

export interface AtmLocationListParams {
    coordinates?: Coordinates
    address?: Address
    postalCode?: string
    searchRadius?: number
}