import { Unit } from "../unit"

import dotenv from "dotenv"
dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")
const statementId: string[] = []

describe("Statements List", () => {
    test("Get Statements List", async () => {
        const res = await unit.statements.list()
        res.data.forEach(element => {
            // expect(element.type === "statement").toBeTruthy()
            statementId.push(element.id)
        })
    })
})

describe('Get Statement Test', () => {
    test('get each card', async () => {
        statementId.forEach(async id => {
            const res = await unit.statements.get(id)
            expect(res.includes("HTML")).toBeTruthy()
        });
    })
})