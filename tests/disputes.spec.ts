import { Unit } from "../unit"

import dotenv from "dotenv"
dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")

describe("Disputes List", () => {
    test("Get Disputes List", async () => {
        const res = await unit.disputes.list()
        res.data.forEach(async element => {
            expect(element.type).toBe("dispute")
            const dispute = await unit.disputes.get(element.id)
            expect(dispute.data.type).toBe("dispute")
            expect(element.id == dispute.data.id).toBeTruthy()
        })
    })
})