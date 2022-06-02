import { Unit } from "../unit"
import dotenv from "dotenv"
dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")
const statementId: string[] = []

describe("Statements List", () => {
    test("Get Statements List", async () => {
        const res = await unit.statements.list({sort: "-period"})
        expect(res.data.length).toBeGreaterThan(0)
        res.data.forEach(element => {
            // expect(element.type === "statement").toBeTruthy()
            statementId.push(element.id)
        })
    })
})

describe("Get Statement Test", () => {
    test("get one statement", async () => {
        const res = await unit.statements.get(statementId[0])
        expect(res.includes("html")).toBeTruthy()
    })
})