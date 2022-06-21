

import { Unit } from "../unit"
import { createIndividualApplication, createBusinessApplication } from "./testHelpers"
import dotenv from "dotenv"
dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")

describe("Create Application", () => {
    test("Create Individual Application", async () => {

        const createRes = await createIndividualApplication(unit)
        const res = await unit.applications.get(createRes.data.id)
        expect(res.data.type).toBe("individualApplication")
    })

    test("Create Business Application", async () => {
        const createRes = await createBusinessApplication(unit)
        const res = await unit.applications.get(createRes.data.id)
        expect(res.data.type).toBe("businessApplication")
    })
})

describe("Applications", () => {
    test("Get List of Applications", async () => {
        const res = await unit.applications.list()
        expect(res.data).toBeInstanceOf(Array)
    })
})