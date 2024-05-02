import {CreateCounterpartyRequest, CreateCounterpartyWithTokenRequest, Unit} from "../unit"

import dotenv from "dotenv"

dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")
const counterpartiesId: string[] = []

export function createCounterpartyForTest(id: string) {
    const req: CreateCounterpartyRequest = {
        "type": "achCounterparty",
        "attributes": {
            "name": "Joe Doe",
            "routingNumber": "123456789",
            "accountNumber": "123400023",
            "accountType": "Checking",
            "type": "Person"
        },
        "relationships": {
            "customer": {
                "data": {
                    "type": "customer",
                    "id": id
                }
            }
        }
    }

    return unit.counterparties.create(req)
}

describe("Counterparties List", () => {
    test("Get Counterparties List", async () => {
        const res = await unit.counterparties.list()
        res.data.forEach(element => {
            expect(element.type === "achCounterparty").toBeTruthy()
            counterpartiesId.push(element.id)
        })
    })
})

describe("Get Counterparty Test", () => {
    test("get each counterparty", async () => {
        counterpartiesId.forEach(async id => {
            const res = await unit.counterparties.get(id)
            expect(res.data.type === "achCounterparty").toBeTruthy()
        })
    })
})

describe("Create Counterparty", () => {
    test("create achCounterparty", async () => {
        const createRes = await createCounterpartyForTest("22605")
        const res = await unit.counterparties.get(createRes.data.id)
        expect(res.data.type === "achCounterparty").toBeTruthy()
    })
})

describe("Delete Counterparty", () => {
    test("delete achCounterparty", async () => {
        const createRes = await createCounterpartyForTest("22605")
        const res = await unit.counterparties.get(createRes.data.id)
        expect(res.data.type === "achCounterparty").toBeTruthy()
        const deleteRes = await unit.counterparties.delete(res.data.id)
        expect(deleteRes === "").toBeTruthy() // NoContent
    })
})

describe("Simulate Counterparty Request", () => {
    test("Simulate Counterparty Request", async () => {
        const req: CreateCounterpartyRequest = {
            "type": "achCounterparty",
            "attributes": {
                "name": "Joe Doe",
                "routingNumber": "123456789",
                "accountNumber": "123",
                "accountType": "Checking",
                "type": "Person",
                "permissions": "CreditAndDebit"
            },
            "relationships": {
                "customer": {
                    "data": {
                        "type": "customer",
                        "id": "123"
                    }
                }
            }
        }

        expect(req.type).toBe("achCounterparty")
    })
})

describe("Simulate Counterparty with Plaid token Request", () => {
    test("Simulate Counterparty with Plaid token Request", async () => {
        const req: CreateCounterpartyWithTokenRequest = {
            "type": "achCounterparty",
            "attributes": {
                "name": "Sherlock Holmes",
                "type": "Person",
                "permissions": "DebitOnly",
                "plaidProcessorToken": "processor-5a62q307-ww0a-6737-f6db-pole26004556",
                verifyName: true
            },
            "relationships": {
                "customer": {
                    "data": {
                        "type": "customer",
                        "id": "123"
                    }
                }
            }
        }

        expect(req.type).toBe("achCounterparty")
    })
})
