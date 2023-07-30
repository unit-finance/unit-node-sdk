import { Unit } from "../unit"

import dotenv from "dotenv"
dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")

describe("Test Check Payments", () => {
    test("Get Check Payments List", async () => {
        const checkPayments = (await unit.checkPayments.list()).data
       
        checkPayments.forEach(async cp => {
            expect(cp.type).toBe("checkPayment")
            expect(cp.attributes.checkNumber).not.toBe("")
            expect(cp.attributes.createdAt).not.toBe("")
            expect(cp.attributes.updatedAt).not.toBe("")
            expect(cp.attributes.description).not.toBe("")
            expect(cp.attributes.additionalVerificationStatus).not.toBe("")
            expect(cp.attributes.amount).not.toBe(undefined)
            expect(cp.attributes.counterpartyRoutingNumber).not.toBe("")
        })
    })

    test("Get Check Payment", async () => {
        const checkPayments = (await unit.checkPayments.list()).data
       
        checkPayments.forEach(async cp => {
            expect(cp.type).toBe("checkPayment")

            const res = (await unit.checkPayments.get(cp.id)).data

            expect(cp.type).toBe(res.type)
            expect(cp.attributes.checkNumber).toBe(res.attributes.checkNumber)
            expect(cp.attributes.createdAt).toBe(res.attributes.createdAt)
            expect(cp.attributes.updatedAt).toBe(res.attributes.updatedAt)
            expect(cp.attributes.description).toBe(res.attributes.description)
            expect(cp.attributes.additionalVerificationStatus).toBe(res.attributes.additionalVerificationStatus)
            expect(cp.attributes.amount).toBe(res.attributes.amount)
            expect(cp.attributes.counterpartyRoutingNumber).toBe(res.attributes.counterpartyRoutingNumber)

        })
    })
})