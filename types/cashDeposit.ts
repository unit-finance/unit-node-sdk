import { Address, Coordinates, Phone, Relationship } from "./common"

export interface StoreLocation {
    type: "storeLocation"
    attributes: {
        storeId: string
        retailerName: string
        phone: Phone
        address: Address
        coordinates: Coordinates
        distance: number
    }
}

export interface CashDepositBarcode {
    type: "cashDepositBarcode"
    attributes: {
        barcodeNumber: string
        expiration: string
        storeId: string
        retailerName: string
    }
    relationships: {
        account: Relationship
        customer: Relationship
    }
}

export interface GenerateBarcodeRequest {
    type: "cashDepositBarcode"
    attributes: {
        storeId: string
    }
    relationships: {
        account: Relationship
        customer: Relationship
    }
}