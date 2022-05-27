import { Account, CreateBookPaymentRequest, Unit } from "../unit" //CreateLinkedPaymentRequest
import { createIndividualAccount } from "./accounts.spec"

import dotenv from "dotenv"
import { AchReceivedPayment } from "../types"
dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")
const receivedPaymentsId: string[] = []

describe("ReceivedPayments List", () => {
    test("Get ReceivedPayments List", async () => {
        const res = await unit.receivedPayments.list()
        res.data.forEach(element => {
            expect(element.type === "achReceivedPayment").toBeTruthy()
            receivedPaymentsId.push(element.id)
        })
    })
})

describe("Get ReceivedPayment Test", () => {
    test("get each ReceivedPayment", async () => {
        receivedPaymentsId.forEach(async id => {
            const res = await unit.receivedPayments.get(id, "account")
            expect(res.data.type === "achReceivedPayment").toBeTruthy()
            const acc = res.included as unknown
            expect((acc as Account).type).toContain("Account")
        })
    })
})

describe("Update ReceivedPayment Test", () => {
    test("update an ReceivedPayment", async () => {
        receivedPaymentsId.forEach(async rp => {
            const payment: AchReceivedPayment = await (await unit.receivedPayments.get(receivedPaymentsId[0])).data
            const res = await unit.receivedPayments.update(payment.id, {type: payment.type, attributes: {tags: {"update": "test"}}})
            expect(res.data.type).toBe("achReceivedPayment")
        })
    })
})
