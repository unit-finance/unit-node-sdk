import { CreateApiTokenRequest, Unit, RestrictedResource } from "../unit"

import dotenv from "dotenv"
dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")

const resource: RestrictedResource = {ids: ["121"] , type: "account"}


describe("Create API Tokens", () => {
    test("Create API Tokens", async () => {
        const req: CreateApiTokenRequest = {
            "type": "apiToken",
            "attributes": {
                "description": "test token",
                "scope": "customers applications",
                "expiration": "2026-09-01T13:47:17.000Z",
                "resources": [resource]
            }
        }

        const res = await unit.orgTokens.create("252", req)
        expect(res.data.type).toBe("apiToken")
    })
})

describe("API Tokens List", () => {
    test("Get API Tokens List", async () => {
        const res = await unit.orgTokens.list("252")
        res.data.forEach(element => {
            expect(element.type).toBe("apiToken")
        })
    })
})

