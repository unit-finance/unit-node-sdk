import { Unit } from "../unit"

import dotenv from "dotenv"
dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")
const authorizationRequestsId: string[] = []

describe("AuthorizationRequests List", () => {
    test("Get AuthorizationRequests List", async () => {
        const res = await unit.authorizationRequests.list()
        res.data.forEach(element => {
            expect(element.type.includes("AuthorizationRequest")).toBeTruthy()
            authorizationRequestsId.push(element.id)
        })
    })
})

describe("Get AuthorizationRequest Test", () => {
    test("get authorizationRequest event", async () => {
        authorizationRequestsId.forEach(async id => {
            const res = await unit.authorizationRequests.get(id)
            expect(res.data.type.includes("AuthorizationRequest")).toBeTruthy()
        })
    })
})