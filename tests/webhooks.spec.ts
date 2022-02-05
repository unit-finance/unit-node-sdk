import { Unit } from "../unit"

import dotenv from "dotenv"
dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")
const webhookId: string[] = []

describe("Webhooks List", () => {
    test("Get Webhooks List", async () => {
        const res = await unit.webhooks.list()
        res.data.forEach(element => {
            expect(element.type === "webhook").toBeTruthy()
            webhookId.push(element.id)
        })
    })
})

describe("Get Webhook Test", () => {
    test("get each webhook", async () => {
        webhookId.forEach(async id => {
            const res = await unit.webhooks.get(id)
            expect(res.data.type === "webhook").toBeTruthy()
        })
    })
})