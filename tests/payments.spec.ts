import { AchPayment, CreateBookPaymentRequest, CreateLinkedPaymentRequest, Include, Transaction, Unit, UnitResponse } from "../unit"
import { Account } from "../types/account"
import { Customer } from "../types/customer"

require("dotenv").config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")
let paymentsId: string[] = []

describe('Payments List', () => {
    test('Get Payments List', async () => {
        const res = await unit.payments.list()
        const payments = res as UnitResponse<AchPayment[] & Include<Account[] | Customer[] | Transaction[]>>
        payments.data.forEach(element => {
            expect(element.type === "achPayment").toBeTruthy()
            paymentsId.push(element.id)
        });
    })
})

describe('Get Payment Test', () => {
    test('get each payment', async () => {
        paymentsId.forEach(async id => {
            const res = await unit.payments.get(id)
            const payment = res as UnitResponse<AchPayment & Include<Account[] | Customer[] | Transaction[]>>
            expect(payment.data.type === "achPayment").toBeTruthy()
        });
    })
})

describe('Create BookPayment', () => {
    test('create bookpayment', async () => {
        const req: CreateBookPaymentRequest = {
            "type":"bookPayment",
            "attributes": {
                "amount": 200,
                // "direction": "Credit",
                "description": "Book payment"
            },
            "relationships": {
                "account": {
                    "data": {
                        "type": "depositAccount",
                        "id": "27573"
                    }
                },
                "counterpartyAccount": {
                    "data": {
                        "type": "depositAccount",
                        "id": "12773"
                    }
                }
            }
        }
    
        const res = await unit.payments.create(req)
        const payment = res as UnitResponse<AchPayment>
        expect(payment.data.type === "achPayment").toBeTruthy()

    })
})

describe('Create Linkedayment', () => {
    test('create linked payment', async () => {
       const req: CreateLinkedPaymentRequest = {
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
                                "id": "12773"
                            }
                        }
                    }
                }
    
        const res = await unit.payments.create(req)
        const payment = res as UnitResponse<AchPayment>
        expect(payment.data.type === "achPayment").toBeTruthy()
    })
})
