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
                "status": "Pending",
                "version": 1,
                "createdAt": "2023-01-01T00:00:00.000Z",
                "updatedAt": "2023-01-01T00:00:00.000Z",
                "currency": "USD",
                "total": 10000,
                "description": "Electric bill payment"
            },
            "relationships": {
                "org": {
                    "data": {
                        "type": "org",
                        "id": "1"
                    }
                },
                "vendor": {
                    "data": {
                        "type": "vendor",
                        "id": "100"
                    }
                }
            }
        }

        expect(bill.type).toBe("bill")
        expect(bill.attributes.status).toBe("Pending")
        expect(bill.attributes.total).toBe(10000)
    })

    test("Get Bill", async () => {
        const billId = process.env.TEST_BILL_ID
        if (billId) {
            const res = await unit.bills.get(billId)
            expect(res.data.type).toBe("bill")
            expect(res.data.id).toBe(billId)
            expect(typeof res.data.attributes.status).toBe("string")
            expect(typeof res.data.attributes.version).toBe("number")
            expect(typeof res.data.attributes.createdAt).toBe("string")
            expect(typeof res.data.attributes.updatedAt).toBe("string")
            expect(res.data.relationships.org.data.type).toBe("org")
            expect(typeof res.data.relationships.org.data.id).toBe("string")
        }
    })
})
