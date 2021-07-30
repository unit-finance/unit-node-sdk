import { createAddress } from "../helpers"
import { CreateDepositAccountRequest, CreateIndividualDebitCardRequest, Unit } from "../unit"

require("dotenv").config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")
let cardsId: string[] = []
const cardTypes = ["businessDebitCard","individualDebitCard","businessVirtualDebitCard","individualVirtualDebitCard"]

describe('Cards List', () => {
    test('Get Accounts List', async () => {
        const res = await unit.cards.list()
        res.data.forEach(element => {
            expect(cardTypes.includes(element.type)).toBeTruthy()
            cardsId.push(element.id)
        });
    })
})

describe('Get Card Test', () => {
    test('get each cards', async () => {
        cardsId.forEach(async id => {
            const res = await unit.cards.get(id)
            expect(cardTypes.includes(res.data.type)).toBeTruthy()
        });
    })
})

describe('Create Card', () => {
    test('create individual debitcard', async () => {
        const createDepositAccountRequest: CreateDepositAccountRequest = {
            type: "depositAccount",
            attributes: {
                depositProduct: "checking sdk",
                tags: {
                    purpose: "checking"
                }
            },
            relationships: {
                customer: {
                    data: {
                        type: "customer",
                        id: "22604"
                    }
                }
            }
        }

        const createAccountRes = await unit.accounts.create(createDepositAccountRequest)
        const CreateDebitCardRequest: CreateIndividualDebitCardRequest = {
            type: "individualDebitCard",
            attributes: {
                shippingAddress: createAddress("5230 Newell Rd",null,"Palo Alto","CA","94303","US")
            },
            relationships: {
                account: {
                    data: {
                        type: "depositAccount",
                        id: createAccountRes.data.id
                    }
                }
            }
        }

        const createRes = await unit.cards.createDebitCard(CreateDebitCardRequest)
        const res = await unit.cards.get(createRes.data.id)
        expect(res.data.type === "individualDebitCard").toBeTruthy()
    })
})
