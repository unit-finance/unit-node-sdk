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

describe("Verify Webhook test", () => {
    test("verify webhook signature", () => {
        const signature = "UUNz8ch1Ovjg+ijXUEwlAlWEktU="
        const secret = "OB2HL5E3B4HJ7IVXRNL4YQKYIQIVJK36ZZLPZEFWZVSDSC7LLFJQ===="
        const payload = {"data":[{"id":"46306092","type":"application.approved","attributes":{"createdAt":"2025-08-05T06:48:38.957Z","tags":{"key":"another-tag","test":"webhook-tag","number":"111"}},"relationships":{"application":{"data":{"id":"3895367","type":"individualApplication"}},"customer":{"data":{"id":"3310133","type":"individualCustomer"}}}}]}

        const verifyResult = unit.webhooks.verify(signature, secret, payload)
        expect(verifyResult).toBeTruthy()
    })
})