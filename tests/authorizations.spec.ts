import { Unit } from "../unit"

import dotenv from "dotenv"
dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")
const authorizationIds: string[] = []

describe("Authorization Find", () => {
    test("Get Authorization List", async () => {
        const res = await unit.authorizations.find({limit: 10, status: "Authorized"})
        res.data.forEach(element => {0
            expect(element.type === "authorization").toBeTruthy()
            authorizationIds.push(element.id)
        })
    })
})

describe("Get Authorization", () => {
    test("get authorization", async () => {
        authorizationIds.forEach(async id => {
            const res = await unit.authorizations.get(id)
            expect(res.data.type === "authorization").toBeTruthy()
        })
    })
})