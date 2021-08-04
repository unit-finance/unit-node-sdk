import { CreateCounterpartyRequest, Unit } from "../unit"

require("dotenv").config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")
let counterpartiesId: string[] = []

describe('Counterparties List', () => {
    test('Get Counterparties List', async () => {
        const res = await unit.counterparties.list()
        res.data.forEach(element => {
            expect(element.type === "achCounterparty").toBeTruthy()
            counterpartiesId.push(element.id)
        });
    })
})

describe('Get Counterparty Test', () => {
    test('get each counterparty', async () => {
        counterpartiesId.forEach(async id => {
            const res = await unit.counterparties.get(id)
            expect(res.data.type === "achCounterparty").toBeTruthy()
        });
    })
})

describe('Create Counterparty', () => {
    test('create achCounterparty', async () => {
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
                        "id": "22603"
                    }
                }
            }
        }


        const createRes = await unit.counterparties.create(req)
        const res = await unit.counterparties.get(createRes.data.id)
        expect(res.data.type === "achCounterparty").toBeTruthy()
    })
})




