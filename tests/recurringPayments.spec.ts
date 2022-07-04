import { Unit } from "../unit" 
import { createIndividualAccount } from "./testHelpers"

import dotenv from "dotenv"
import { CreateRecurringPaymentRequest } from "../types/recurringPayment"
import { createCounterpartyForTest } from "./counterparties.spec"
dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")

describe("Create", () => {
    test("create CreateRecurringCreditAchPayment", async () => {
        const createDepositAccountRes = await createIndividualAccount(unit)
        const createCounterpartRes = await createCounterpartyForTest("22603")

        const req: CreateRecurringPaymentRequest = {
            "type": "recurringCreditAchPayment",
            "attributes": {
                "schedule": {
                    "interval": "Monthly",
                    "dayOfMonth": 16
                },
                "amount": 1000,
                "description": "Rent"
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
                        "id": createCounterpartRes.data.id
                    }
                }
            }
        }

        const res = await unit.recurringPayments.create(req)
        expect(res.data.type === "recurringCreditAchPayment").toBeTruthy()
    })
})
