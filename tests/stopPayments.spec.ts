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

    test("Create and Update ACH Stop Payment", async () => {
        const accountId = (await createIndividualAccount(unit)).data.id
        const relationships = {account: createRelationship("depositAccount", accountId)}

        const futureDate = (daysFromNow: number) =>
            new Date(Date.now() + daysFromNow * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
        const initialExpiration = futureDate(365)
        const updatedExpiration = futureDate(180)

        const response = await unit.stopPayments.create({
            type: "achStopPayment",
            attributes: {
                minAmount: 5001,
                originatorName: ["Pied Piper", "Pied Piper Inc."],
                direction: "Debit",
                description: "Stop subscription payments greater than $50 to the gym.",
                isMultiUse: true,
                expiration: initialExpiration,
                tags: {"test": "test"}
            },
            relationships
        })

        expect(response.data.type).toBe("achStopPayment")
        expect(response.data.attributes.minAmount).toBe(5001)
        expect(response.data.attributes.direction).toBe("Debit")
        expect(response.data.attributes.description).toBe("Stop subscription payments greater than $50 to the gym.")

        const updated = await unit.stopPayments.update(response.data.id, {
            type: "achStopPayment",
            attributes: {
                tags: {"newTag": "New tag value"},
                expiration: updatedExpiration
            }
        })

        expect(updated.data.type).toBe("achStopPayment")
        expect(updated.data.id).toBe(response.data.id)
        expect(updated.data.attributes.expiration).toBe(updatedExpiration)
    })

    test("Get Stop Payments List", async () => {
        const stopPayments = (await unit.stopPayments.list()).data

        for (const sp of stopPayments) {
            const res = (await unit.stopPayments.get(sp.id)).data

            expect(res.id).toBe(sp.id)
            expect(res.type).toBe(sp.type)
            expect(res.attributes.createdAt).toBe(sp.attributes.createdAt)
            expect(res.attributes.status).toBe(sp.attributes.status)

            if (sp.type === "stopPayment" && res.type === "stopPayment") {
                expect(res.attributes.updatedAt).toBe(sp.attributes.updatedAt)
                expect(res.attributes.amount).toBe(sp.attributes.amount)
                expect(res.attributes.checkNumber).toBe(sp.attributes.checkNumber)
            }

            if (sp.type === "achStopPayment" && res.type === "achStopPayment") {
                expect(res.attributes.direction).toBe(sp.attributes.direction)
                expect(res.attributes.description).toBe(sp.attributes.description)
            }
        }
    })
})