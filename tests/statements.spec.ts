import { Unit } from "../unit"

import dotenv from "dotenv"
dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")
const statementId: string[] = []
let statementAccountId = ""

describe("Statements List", () => {
    test("Get Statements List", async () => {
        const res = await unit.statements.list({sort: "-period"})
        expect(res.data.length).toBeGreaterThan(0)
        res.data.forEach(element => {
            // expect(element.type === "statement").toBeTruthy()
            statementId.push(element.id)
        })
        if(res.data.length > 0)
            statementAccountId = res.data[0].relationships.account.data.id
    })
})

describe("Get Statement Test", () => {
    test("get statement html", async () => {
        const res = await unit.statements.get({statementId: statementId[0]})
        expect(res.includes("html")).toBeTruthy()
    })
})

describe("Get Statement Bank Verification Test", () => {
    test("get statement bank verification", async () => {
        const res = await unit.statements.getBankVerification(statementAccountId)
        expect(res.includes("PDF")).toBeTruthy()
    })
})