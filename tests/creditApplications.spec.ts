import dotenv from "dotenv"
import { Unit } from "../unit"

dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")

describe("Applications", () => {
    test("Get List of Applications", async () => {
        const res = await unit.creditApplications.list()
        expect(res.data).toBeInstanceOf(Array)
        res.data.forEach(async element => {
            expect(element.type).toBe("creditApplication")
            const app = await (await unit.creditApplications.get(element.id)).data
            expect(element.type).toBe(app.type)
            expect(element.id).toBe(app.id)
        })
    })
})