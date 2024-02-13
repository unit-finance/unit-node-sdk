import { CashDepositBarcode, StoreLocation, GenerateBarcodeRequest} from "../types/cashDeposit"
import { UnitResponse, UnitConfig, Coordinates } from "../types/common"
import { BaseResource } from "./baseResource"

export class CashDeposits extends BaseResource {
    private basePath: string

    constructor(token: string, basePath: string, config?: UnitConfig) {
        super(token, basePath + "/cash-deposits", config)

        this.basePath = basePath
    }

    public async list(params: StoreLocationListParams): Promise<UnitResponse<StoreLocation[]>> {
        const parameters = {
            "filter[serviceType]": params.serviceType,
            ...(params?.coordinates && { "filter[coordinates]": this.customStringify(params.coordinates) }),
            ...(params?.postalCode && { "filter[postalCode]": params.postalCode }),
            ...(params?.limit && {"page[limit]": params.limit}),
            ...(params?.offset && { "page[offset]": params.offset})
        }

        return this.httpGet<UnitResponse<StoreLocation[]>>(`${this.basePath}/store-locations`, { params: parameters }, true)
    }

    public async generateBarcode(request: GenerateBarcodeRequest): Promise<UnitResponse<CashDepositBarcode>> {
        return this.httpPost<UnitResponse<CashDepositBarcode>>("/barcodes",{data: request})
    }

    public async getImage(barcodeNumber: string): Promise<string> {
        return this.httpGet<string>(`/barcodes/${barcodeNumber}/image`)
    }
}

export interface StoreLocationListParams {
    coordinates?: Coordinates
    postalCode?: string
    serviceType: "Barcode" | "Swipe"
    limit?: number
    offset?: number
}