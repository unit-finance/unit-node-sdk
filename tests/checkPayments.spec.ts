import { CheckPayment, Unit } from "../unit"

import dotenv from "dotenv"
dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")

describe("Test Check Payments", () => {
    test("Get Check Payments List", async () => {
        const checkPayments = (await unit.checkPayments.list()).data
       
        checkPayments.forEach(async cp => {
            expect(cp.type).toBe("checkPayment")
            expect(cp.attributes.checkNumber).not.toBe("")
            expect(cp.attributes.createdAt).not.toBe("")
            expect(cp.attributes.updatedAt).not.toBe("")
            expect(cp.attributes.description).not.toBe("")
            expect(cp.attributes.additionalVerificationStatus).not.toBe("")
            expect(cp.attributes.amount).not.toBe(undefined)
            expect(cp.attributes.counterpartyRoutingNumber).not.toBe("")
        })
    })

    test("Get Check Payment", async () => {
        const checkPayments = (await unit.checkPayments.list()).data
       
        checkPayments.forEach(async cp => {
            expect(cp.type).toBe("checkPayment")

            const res = (await unit.checkPayments.get(cp.id)).data

            expect(cp.type).toBe(res.type)
            expect(cp.attributes.checkNumber).toBe(res.attributes.checkNumber)
            expect(cp.attributes.createdAt).toBe(res.attributes.createdAt)
            expect(cp.attributes.updatedAt).toBe(res.attributes.updatedAt)
            expect(cp.attributes.description).toBe(res.attributes.description)
            expect(cp.attributes.additionalVerificationStatus).toBe(res.attributes.additionalVerificationStatus)
            expect(cp.attributes.amount).toBe(res.attributes.amount)
            expect(cp.attributes.counterpartyRoutingNumber).toBe(res.attributes.counterpartyRoutingNumber)

        })
    })

    test("Test CheckPayment Resource", () => {
        const payment: CheckPayment = {
              "type": "checkPayment",
              "id": "3",
              "attributes": {
                "createdAt": "2023-02-21T11:31:03.704Z",
                "updatedAt": "2023-02-21T11:31:03.704Z",
                "amount": 10000,
                "sendAt": "2023-09-10T12:50:00.704Z",
                "description": "Check Payment | 0322",
                "status": "Processed",
                "deliveryStatus": "Delivered",
                "trackedAt": "2023-02-23T11:31:03.704Z",
                "postalCode": "94303",
                "checkNumber": "0322",
                "onUsAuxiliary": "0322",
                "onUs": "864800000002/",
                "counterparty": {
                  "name": "John Doe",
                  "address": {
                    "street": "5230 Newell Rd",
                    "city": "Palo Alto",
                    "state": "CA",
                    "postalCode": "94303",
                    "country": "US"
                  }
                },
                "counterpartyRoutingNumber": "051402372",
                "returnCutoffTime": "2023-03-23T15:50:00.000Z",
                "additionalVerificationStatus": "Required"
              },
              "relationships": {
                "account": {
                  "data": {
                    "type": "account",
                    "id": "75002"
                  }
                },
                "customer": {
                  "data": {
                    "type": "customer",
                    "id": "100425"
                  }
                },
                "customers": {
                  "data": [
                    {
                      "type": "customer",
                      "id": "10001"
                    }
                  ]
                },
                "transaction": {
                  "data": {
                    "type": "transaction",
                    "id": "123423"
                  }
                }
              }
            }

        expect(payment.type).toBe("checkPayment")
    })
})