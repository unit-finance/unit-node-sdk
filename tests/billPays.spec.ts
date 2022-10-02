import { Unit } from "../unit"

import dotenv from "dotenv"
dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")

describe("Bill Pays List", () => {
    test("Get Billers List", async () => {
        const res = await unit.billPays.get({name: "Electric"})
        res.data.forEach(element => {
            expect(element.type === "biller").toBeTruthy()
        })
    })
})
