import { Unit } from "../unit" 
import { createIndividualAccount } from "./testHelpers"

import dotenv from "dotenv"
import { CreateRecurringPaymentRequest } from "../types/recurringPayment"
dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")

describe("Create", () => {
    test("create CreateRecurringCreditAchPayment", async () => {
        const createDepositAccountRes = await createIndividualAccount(unit)

        const req: CreateRecurringPaymentRequest = {
            "type": "recurringCreditAchPayment",
            "attributes": {
                "amount": 200,
                "description": "Book payment",
                "schedule": {
                    "interval": "Monthly",
                    "dayOfMonth": 16
                },
            },
            "relationships": {
                "account": {
                    "data": {
                        "type": "depositAccount",
                        "id": createDepositAccountRes.data.id
                    }
                },
                "counterparty": {
                    "data": {
                        "type": "counterparty",
                        "id": "1"
                    }
                }
            }
        }

        const res = await unit.recurringPayments.create(req)
        expect(res.data.type === "recurringCreditAchPayment").toBeTruthy()
    })
})
