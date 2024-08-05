import { DepositAccount, Unit } from "../unit"

import dotenv from "dotenv"
import { createIndividualAccount } from "./testHelpers"
import { GenerateBarcodeRequest } from "../types/cashDeposit"
import { createRelationship } from "../helpers"
dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")

describe("Get Stores Locations", () => {
    test("Get Cash Deposits Stores by coordinates",async () => {
        const res = await unit.cashDeposits.list({serviceType: "Barcode", coordinates: {longitude: -73.93041, latitude: 42.79894}})

        res.data.forEach(element => {
            expect(element.type).toBe("storeLocation")
        })
    })
})

describe("Generate Barcode", () => {
    async function getGenerateBarcodeRequest(): Promise<GenerateBarcodeRequest> {
        const account = (await createIndividualAccount(unit)).data

        const request: GenerateBarcodeRequest = {
            type: "cashDepositBarcode",
            attributes: {
                storeId: "2433"
            },
            relationships: {
                customer: createRelationship("customer", (account as DepositAccount).relationships.customer?.data.id || ""),
                account: createRelationship("account", account.id)
            }
        }

        return request
    }

    // test("Generate Barcode for a Cash Deposit store location",async () => {
    //     const request = await getGenerateBarcodeRequest()
    //     const res = await unit.cashDeposits.generateBarcode(request)
    //     expect(res.data.type).toBe("cashDepositBarcode")
    // })
    //
    // test("Get Barcode as Image for a Cash Deposit store location",async () => {
    //     const request = await getGenerateBarcodeRequest()
    //
    //     const res = await unit.cashDeposits.generateBarcode(request)
    //     expect(res.data.type).toBe("cashDepositBarcode")
    //
    //     const barcode = await unit.cashDeposits.getImage(res.data.attributes.barcodeNumber)
    //     expect(barcode).not.toBeNull()
    //     expect(barcode.length).toBeGreaterThan(0)
    // })
})