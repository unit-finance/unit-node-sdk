import { Chargeback, Unit } from "../unit"

import dotenv from "dotenv"
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