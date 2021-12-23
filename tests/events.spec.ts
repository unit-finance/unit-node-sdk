import { Unit } from "../unit"

require("dotenv").config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")
let eventsId: string[] = []

describe('Events List', () => {
    test('Get Events List', async () => {
        const res = await unit.events.list()
        res.data.forEach(element => {
            //@ts-ignore
            eventsId.push(element.id)
        });

        eventsId.forEach(async id => {
            const res = await unit.events.get(id)
            //@ts-ignore
            expect(res.data.type.includes(".")).toBeTruthy()
        })
    })
})
