import { Unit } from "../unit"
import { verifyEach } from "./testHelpers"

import dotenv from "dotenv"
dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")
const eventsId: string[] = []

describe("Events List", () => {
    test("Get Events List", async () => {
        const res = await unit.events.list()
        res.data.forEach(element => {
            eventsId.push(element.id)
        })

        await verifyEach(eventsId, async id => {
            const res = await unit.events.get(id)
            expect(res.data.type.includes(".")).toBeTruthy()
        })
    })
})
