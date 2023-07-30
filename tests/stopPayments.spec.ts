import { createRelationship } from "../helpers"
import { Unit } from "../unit"

import dotenv from "dotenv"
import { createIndividualAccount } from "./testHelpers"
dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")

describe("E2E Test", () => {
    test("Create Check and Stop Payments", async () => {
        const accountId = (await createIndividualAccount(unit)).data.id
        const checkNumber = "12345"
        const relationships = {account: createRelationship("depositAccount", accountId)}
        const amount = 1000
        
        const checkPayment = (await unit.simulations.createCheckPayment({
            type: "checkPayment",
            attributes: {
                amount,
                checkNumber
            },
            relationships
        })).data

        expect(checkPayment.type).toBe("checkPayment")

        const response = await unit.stopPayments.create({
            type: "stopPayment",
            attributes: {
                amount: amount/2,
                checkNumber,
                tags: {"test": "test"}
            },
            relationships
        })

        expect(response.data.type).toBe("stopPayment")
    })

    test("Get Stop Payments List", async () => {
        const stopPayments = (await unit.stopPayments.list()).data
       
        stopPayments.forEach(async sp => {
            expect(sp.type).toBe("stopPayment")

            const res = (await unit.stopPayments.get(sp.id)).data

            expect(res.type).toBe("stopPayment")
            expect(res.id).toBe(sp.id)
            expect(res.attributes.createdAt).toBe(sp.attributes.createdAt)
            expect(res.attributes.updatedAt).toBe(sp.attributes.updatedAt)
            expect(res.attributes.amount).toBe(sp.attributes.amount)
            expect(res.attributes.checkNumber).toBe(sp.attributes.checkNumber)
            expect(res.attributes.status).toBe(sp.attributes.status)

        })
    })
})