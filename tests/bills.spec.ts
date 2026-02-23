import { Bill, Unit } from "../unit"

import dotenv from "dotenv"
dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")

describe("Test Bills", () => {
    test("Test Bill Resource", () => {
        const bill: Bill = {
            "type": "bill",
            "id": "1",
            "attributes": {
                "createdAt": "2023-01-01T00:00:00.000Z",
                "status": "Pending",
                "amount": 10000,
                "description": "Electric bill payment"
            },
            "relationships": {
                "account": {
                    "data": {
                        "type": "depositAccount",
                        "id": "1001"
                    }
                },
                "customer": {
                    "data": {
                        "type": "individualCustomer",
                        "id": "2001"
                    }
                }
            }
        }

        expect(bill.type).toBe("bill")
        expect(bill.attributes.status).toBe("Pending")
        expect(bill.attributes.amount).toBe(10000)
    })

    test("Get Bill", async () => {
        const billId = process.env.TEST_BILL_ID
        if (billId) {
            const res = await unit.bills.get(billId)
            expect(res.data.type).toBe("bill")
            expect(res.data.id).toBe(billId)
        }
    })
})
