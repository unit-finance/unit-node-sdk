import { Chargeback, CreateChargebackRequest, Unit } from "../unit"

import dotenv from "dotenv"
import { createIndividualAccount } from "./testHelpers"
import { createRelationship } from "../helpers"
dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")

describe("Chargebacks List", () => {
    test("Get Chargebacks List", async () => {
        const res = await unit.chargebacks.list()
        res.data.forEach(element => {
            expect(element.type).toBe("chargeback")
        })
    })

    test("Get Chargebacks list with included customer", async () => {
        const res = await unit.chargebacks.list()
        res.data.forEach(async (element: Chargeback) => {
            expect(element.type).toBe("chargeback")

            const chargeback: Chargeback = (await unit.chargebacks.get(element.id)).data
            expect(chargeback.id).toBe(element.id)
            expect(chargeback.type).toBe(element.type)
            expect(chargeback.attributes.amount).toBe(element.attributes.amount)
        })
    })

    test("Get Chargebacks list with included customer", async () => {
        const res = await unit.chargebacks.list({include: "customer"})
        res.data.forEach(async (element: Chargeback) => {
            expect(element.type).toBe("chargeback")
        })

        
        // expect(res.included).not.toBeUndefined()
    })
})

describe("Test Create Chargeback", () => {
    test("Create Chargeback", async () => {
        const accountId = (await createIndividualAccount(unit)).data.id
        const counterpartyId = (await createIndividualAccount(unit)).data.id

        const req: CreateChargebackRequest = {
            type: "chargeback",
            attributes: {
                amount: 50,
                description: "Chargeback for test"
            },
            relationships: {
                account: createRelationship("account", accountId),
                counterpartyAccount: createRelationship("depositAccount", counterpartyId)
            }
        }

        const res = await unit.chargebacks.create(req)
        expect(res.data.type).toBe("chargeback")
    })
})