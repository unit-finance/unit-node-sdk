import { createAddress, createFullName, createPhone } from "../helpers"
import { CreateBusinessDebitCardRequest, CreateBusinessVirtualDebitCardRequest, CreateIndividualDebitCardRequest, CreateIndividualVirtualDebitCardRequest, Unit } from "../unit"
import { createBussinessAccount, createIndividualAccount } from "./testHelpers"
// import { createBusinessApplication } from "./applications.spec"

import dotenv from "dotenv"
dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")
const cardsId: string[] = []
const cardTypes = ["businessDebitCard", "individualDebitCard", "businessVirtualDebitCard", "individualVirtualDebitCard"]

describe("Cards List", () => {
    test("Get Cards List", async () => {
        const res = await unit.cards.list()
        expect(res.data.length).toBeGreaterThan(0)
        res.data.forEach(element => {
            expect(cardTypes.includes(element.type)).toBeTruthy()
            cardsId.push(element.id)
        })
    })
})

describe("Get Card Test", () => {
    test("get each card", async () => {
        cardsId.forEach(async id => {
            const res = await unit.cards.get(id)
            expect(cardTypes.includes(res.data.type)).toBeTruthy()
        })
    })
})

describe("Create Card", () => {
    test("create individual debitcard", async () => {
        const createAccountRes = await createIndividualAccount(unit)
        const CreateDebitCardRequest: CreateIndividualDebitCardRequest = {
            type: "individualDebitCard",
            attributes: {
                shippingAddress: createAddress("5230 Newell Rd", null, "Palo Alto", "CA", "94303", "US"),
                limits: {
                    "dailyWithdrawal": 50000,
                    "dailyPurchase": 50000,
                    "monthlyWithdrawal": 500000,
                    "monthlyPurchase": 700000
                }
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

    test("create individual virtual debitcard", async () => {
        const createAccountRes = await createIndividualAccount(unit)
        const CreateDebitCardRequest: CreateIndividualVirtualDebitCardRequest = {
            type: "individualVirtualDebitCard",
            attributes: {},
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
        expect(res.data.type === "individualVirtualDebitCard").toBeTruthy()
    })

    test("create business debitcard", async () => {
        const account = await createBussinessAccount(unit)
        const CreateDebitCardRequest: CreateBusinessDebitCardRequest = {
            type: "businessDebitCard",
            attributes: {
                fullName: createFullName("Richard", "Hendricks"),
                ssn: "123456789",
                address: createAddress("5230 Newell Rd", null, "Palo Alto", "CA", "94303", "US"),
                shippingAddress: createAddress("5230 Newell Rd", null, "Palo Alto", "CA", "94303", "US"),
                dateOfBirth: "2001-08-10",
                email: "richard@piedpiper.com",
                phone: createPhone("1", "5555555555")
            },
            relationships: {
                account: {
                    data: {
                        type: "depositAccount",
                        id: account.data.id
                    }
                }
            }
        }

        const createRes = await unit.cards.createDebitCard(CreateDebitCardRequest)
        const res = await unit.cards.get(createRes.data.id)
        expect(res.data.type === "businessDebitCard").toBeTruthy()
    })

    test("create business virtual debitcard", async () => {
        const account = await createBussinessAccount(unit)
        const CreateDebitCardRequest: CreateBusinessVirtualDebitCardRequest = {
            type: "businessVirtualDebitCard",
            attributes: {
                fullName: createFullName("Richard", "Hendricks"),
                ssn: "123456789",
                address: createAddress("5230 Newell Rd", null, "Palo Alto", "CA", "94303", "US"),
                dateOfBirth: "2001-08-10",
                email: "richard@piedpiper.com",
                phone: createPhone("1", "5555555555")
            },
            relationships: {
                account: {
                    data: {
                        type: "depositAccount",
                        id: account.data.id
                    }
                }
            }
        }

        const createRes = await unit.cards.createDebitCard(CreateDebitCardRequest)
        const res = await unit.cards.get(createRes.data.id)
        expect(res.data.type === "businessVirtualDebitCard").toBeTruthy()
    })

    test("update individual virtual debitcard", async () => {
        const tags = { "test": "test" }
        const card = (await unit.cards.list()).data[0]
        const updateRes = await unit.cards.update({
            id: card.id,
            type: card.type,
            attributes: {
                tags: tags
            }
        })
        const res = await unit.cards.get(card.id)
        expect(updateRes.data.attributes.tags).toStrictEqual(res.data.attributes.tags)
    })
})
