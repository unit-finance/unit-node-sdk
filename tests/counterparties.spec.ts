import {CreateCounterpartyRequest, Unit} from "../unit"

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
            "accountNumber": "123",
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