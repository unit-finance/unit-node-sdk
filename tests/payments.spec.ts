import { CreateBookPaymentRequest, CreateLinkedPaymentRequest, Unit } from "../unit"
import { createIndividualAccount } from "./accounts.spec"
import { createCounterpartyForTest } from "./counterparties.spec"

import dotenv from "dotenv"
dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")
const paymentsId: string[] = []

describe("Payments List", () => {
    test("Get Payments List", async () => {
        const res = await unit.payments.list()
        res.data.forEach(element => {
            expect(element.type === "achPayment" || element.type === "bookPayment").toBeTruthy()
            paymentsId.push(element.id)
        })
    })
})

describe("Get Payment Test", () => {
    test("get each payment", async () => {
        paymentsId.forEach(async id => {
            const res = await unit.payments.get(id)
            expect(res.data.type === "achPayment" || res.data.type === "bookPayment").toBeTruthy()
        })
    })
})

describe("Create BookPayment", () => {
    test("create bookpayment", async () => {
        const createDepositAccountRes = await createIndividualAccount()
        const createAnotherDepositAccountRes = await createIndividualAccount()

        const req: CreateBookPaymentRequest = {
            "type": "bookPayment",
            "attributes": {
                "amount": 200,
                // "direction": "Credit",
                "description": "Book payment"
            },
            "relationships": {
                "account": {
                    "data": {
                        "type": "depositAccount",
                        "id": createDepositAccountRes.data.id
                    }
                },
                "counterpartyAccount": {
                    "data": {
                        "type": "depositAccount",
                        "id": createAnotherDepositAccountRes.data.id
                    }
                }
            }
        }

        const res = await unit.payments.create(req)
        expect(res.data.type === "bookPayment").toBeTruthy()

    })
})

async function createPayment() : Promise<CreateLinkedPaymentRequest> {
    const createCounterpartRes = await createCounterpartyForTest("22603")
    
    return {
            "type": "achPayment",
            "attributes": {
                "amount": 200,
                "direction": "Debit",
                "description": "ACH PYMT"
            },
            "relationships": {
                "account": {
                    "data": {
                        "type": "depositAccount",
                        "id": "27573"
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
}

// describe("Create LinkedPayment", () => {
//     test("create linked payment", async () => {
//
//
//         const req: CreateLinkedPaymentRequest = (await createPayment())
//
//         const createPaymentRes = await unit.payments.create(req)
//         const res = await unit.payments.get(createPaymentRes.data.id)
//         expect(res.data.type === "achPayment").toBeTruthy()
//     })
// })
//
// describe("Create and cancel LinkedPayment", () => {
//     test("create and cancel linked payment", async () => {
//
//
//         const req: CreateLinkedPaymentRequest = (await createPayment())
//
//         const createPaymentRes = await unit.payments.create(req)
//         const res = await unit.payments.cancel(createPaymentRes.data.id)
//         expect(res.data.type === "achPayment").toBeTruthy()
//     })
// })
