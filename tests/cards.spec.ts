import { CreateIndividualDebitCardRequest, Unit } from "../unit"

require("dotenv").config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")
let cardsId: string[] = []

describe('Cards List', () => {
    test('Get Accounts List', async () => {
        const res = await unit.cards.list()
        res.data.forEach(element => {
            expect(element.type === "businessDebitCard" || element.type === "businessVirtualDebitCard"
                || element.type === "individualDebitCard" || element.type === "individualVirtualDebitCard").toBeTruthy()
            cardsId.push(element.id)
        });
    })
})

describe('Get Card Test', () => {
    test('get each cards', async () => {
        cardsId.forEach(async id => {
            const res = await unit.cards.get(id)
            expect(res.data.type === "businessDebitCard" || res.data.type === "businessVirtualDebitCard"
                || res.data.type === "individualDebitCard" || res.data.type === "individualVirtualDebitCard").toBeTruthy()
        });
    })
})

describe('Create Card', () => {
    test('create individual debitcard', async () => {
        const CreateDebitCardRequest: CreateIndividualDebitCardRequest = {
            type: "individualDebitCard",
            attributes: {
                shippingAddress: {
                    street: "5230 Newell Rd",
                    city: "Palo Alto",
                    state: "CA",
                    postalCode: "94303",
                    country: "US"
                }
            },
            relationships: {
                account: {
                    data: {
                        type: "depositAccount",
                        id: "27573"
                    }
                }
            }
        }

        const res = await unit.cards.createDebitCard(CreateDebitCardRequest)
        expect(res.data.type === "individualDebitCard").toBeTruthy()
    })
})
