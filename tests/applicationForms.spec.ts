

import { Unit } from "../unit"

import dotenv from "dotenv"
dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")


describe("ApplicationForms", () => {
    const appFormsIds: string[] = []

    test("Get List of ApplicationForms", async () => {
        const res = await unit.applicationForms.list()
        expect(res.data).toBeInstanceOf(Array)
        res.data.forEach(a => {
            appFormsIds.push(a.id)
        })
    })
    
    test("Get ApplicationForm", async () => {
        appFormsIds.forEach(async id => {
            const res = await unit.applicationForms.get(id)
            expect(res.data.type == "applicationForm")
        })
    })
})