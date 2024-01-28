import { Unit } from "../unit"

import dotenv from "dotenv"
dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")

describe("Tax Forms List", () => {
    test("Get Tax Forms List", async () => {
        const res = await unit.taxForms.list()
        res.data.forEach(element => {
            expect(element.type).toBe("taxForm")
        })
    })
})

describe("Tax Form", () => {
    test("Get Tax Form", async () => {
        const res = await unit.taxForms.list()
        res.data.forEach(async taxForm => {
            const res = await unit.taxForms.get(taxForm.id)
            expect(res.data.type).toBe("taxForm")
            expect(res.data.id).toBe(taxForm.id)
        })
    })
})

describe("Tax Forms PDF", () => {
    test("Get Tax Form as PDF", async () => {
        const res = await unit.taxForms.list()
        res.data.forEach(async taxForm => {
            const res = await unit.taxForms.getPdf(taxForm.id)
            expect(typeof(res)).toBe("string")}
        )
    })
})
