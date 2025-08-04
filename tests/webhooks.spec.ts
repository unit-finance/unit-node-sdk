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
        const signature = "TzmTqUPhGiyHfKcpYoXePi/EVf0="
        const secret = "QK89mgP2v9KPGXVRp92IfYtHpbzrLpsjMp6sfWOPasQ="
        const payload = {"data":[{"id":"24","type":"application.created","attributes":{"createdAt":"2025-08-04T13:12:33.887Z","tags":{"key":"another-tag","test":"webhook-tag","number":"111"}},"relationships":{"application":{"data":{"id":"10006","type":"individualApplication"}}}}],"included":[{"id":"10006","type":"individualApplication","attributes":{"ssn":"663885441","tags":{"key":"another-tag","test":"webhook-tag","number":"111"},"email":"cheryl.mercado@mymail.com","phone":{"number":"3476042441","countryCode":"1"},"status":"New","address":{"city":"Cedar Falls","state":"IA","street":"26 Cardinal Dr.","country":"US","postalCode":"50613"},"message":"Pre created application","archived":false,"fullName":{"last":"Mercado","first":"Cheryl"},"createdAt":"2025-08-04T13:12:33.887Z","maskedSSN":"*****5441","occupation":"Doctor","dateOfBirth":"1946-04-11","evaluationId":null,"decisionMethod":null,"decisionReason":null,"decisionUserId":null,"evaluationCodes":null,"evaluationScores":null,"evaluationOutcome":null,"evaluationEntityId":null,"soleProprietorship":false},"relationships":{"org":{"data":{"id":"2","type":"org"}}}}]}

        const verifyResult = unit.webhooks.verify(signature, secret, payload)
        expect(verifyResult).toBeTruthy()
    })
})