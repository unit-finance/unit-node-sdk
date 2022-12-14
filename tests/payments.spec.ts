import { Account, CreateBookPaymentRequest, CreateInlinePaymentRequest, CreateLinkedPaymentRequest, CreatePaymentRequest, Payment, Unit } from "../unit" //CreateLinkedPaymentRequest
import { createIndividualAccount } from "./testHelpers"

import dotenv from "dotenv"
import { createCounterpartyForTest } from "./counterparties.spec"
import { createRelationship } from "../helpers"
dotenv.config()

const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")
const paymentsId: string[] = []

function generateCreateLinkedPaymentRequest(accountId: string, counterpartyId: string ): CreateLinkedPaymentRequest {
    return {
        "type": "achPayment",
        "attributes": {
            "amount": 500,
            "direction": "Credit",
            "description": "ACH PYMT to linked Counterparty - Test"
        },
        "relationships": {
            "account": {
                "data": {
                    "type": "depositAccount",
                    "id": accountId
                }
            },
            "counterparty": {
                "data": {
                    "type": "counterparty",
                    "id": counterpartyId
                }
            }
        }
    }
}

function generateCreateBookPaymentRequest(accountId1: string, accountId2: string): CreateBookPaymentRequest {
    return {
        "type": "bookPayment",
        "attributes": {
            "amount": 200,
            "description": "Book payment - test"
        },
        "relationships": {
            "account": {
                "data": {
                    "type": "depositAccount",
                    "id": accountId1
                }
            },
            "counterpartyAccount": {
                "data": {
                    "type": "depositAccount",
                    "id": accountId2
                }
            }
        }
    }
}

describe("Payments List", () => {
    test("Get Payments List", async () => {
        const res = await unit.payments.list()
        res.data.forEach(element => {
            expect(element.type).toContain("Payment")
            paymentsId.push(element.id)
        })
    })
})

describe("Get Payment Test", () => {
    test("get each payment", async () => {
        const paymentsList = (await unit.payments.list({type: ["AchPayment", "BillPayment", "WirePayment"]})).data
        paymentsList.forEach(async p => {
            const res = await unit.payments.get(p.id, "account")
            expect(res.data.type).toContain("Payment")
            const acc = res.included ? res.included[0] as unknown : undefined
            if(acc)
                expect((acc as Account).type).toContain("Account")
        })
    })
})

describe("Create BookPayment", () => {
    test("create book payment test", async () => {
        const depositAccount = await createIndividualAccount(unit)
        const depositAccount2 = await createIndividualAccount(unit)

        const req: CreateBookPaymentRequest = generateCreateBookPaymentRequest(depositAccount.data.id, depositAccount2.data.id)

        const res = await unit.payments.create(req)
        expect(res.data.type === "bookPayment").toBeTruthy()
    })
})

describe("Create LinkedPayment", () => {
    let payment: Payment | null = null;

    beforeEach(async () => {
        const counterpartyId = (await createCounterpartyForTest("22603")).data.id
        const accountId = (await createIndividualAccount(unit)).data.id

        const req: CreateLinkedPaymentRequest = generateCreateLinkedPaymentRequest(accountId, counterpartyId)

        payment = (await unit.payments.create(req)).data
    })

    test("create linked payment", async () => {
        expect(payment).not.toBe(null)
        expect((payment as Payment).type).toBe("achPayment")
    })

    test("create and cancel linked payment", async () => {
        // expect(payment).not.toBe(null)

        // const p = payment as Payment
        // expect(p.type).toBe("achPayment")
        
        const account = await createIndividualAccount(unit)

        const req = {
            type: "achPayment",
            attributes: {
                amount: 100,
                direction: "Credit",
                description: "Payment from Sandbox for test"
            },
            relationships: {
                account: createRelationship("depositAccount", account.data.id)
            }
        }

        //@ts-ignore
        const ress = (await unit.simulations.receiveAchPayment(req)).data
        expect(ress.type).toBe("achPayment")
        expect(ress.attributes.status).toBe("Sent")
        const res = await unit.payments.cancel(ress.id)
        expect(res.data.type).toBe("achPayment")
    })
})

describe("Create Bulk Payments", () => {
    test("Create Bulk Payments", async () => {
        const counterpartyId = (await createCounterpartyForTest("22603")).data.id
        const accountId = (await createIndividualAccount(unit)).data.id

        const req1: CreateLinkedPaymentRequest = generateCreateLinkedPaymentRequest(accountId, counterpartyId)

        const depositAccount = await createIndividualAccount(unit)
        const depositAccount2 = await createIndividualAccount(unit)

        const req2: CreateBookPaymentRequest = generateCreateBookPaymentRequest(depositAccount.data.id, depositAccount2.data.id)

        const res = (await unit.payments.createBulk([req1, req2])).data
        expect(res.type).toBe("bulkPayments")
    })
})

describe("Create ACH Payment to inline Counterparty", () => {
    test("Create ACH Payment", async () => {
        const account = await createIndividualAccount(unit)

        const req: CreateInlinePaymentRequest = {
            type: "achPayment",
            attributes: {
                amount: 150,
                direction: "Credit",
                counterparty: {
                    "routingNumber": "812345673",
                    "accountNumber": "12345569",
                    "accountType": "Checking",
                    "name": "Jane Doe"
                },
                description: "Funding - SDK - Test"
            },
            relationships: {
                account: createRelationship("depositAccount", account.data.id) 
            }
        }

        const res  = (await unit.payments.create(req)).data

        expect(res.type).toBe("achPayment")
        expect(res.attributes.status).toBe("Sent") // We should fix this
    })
})



