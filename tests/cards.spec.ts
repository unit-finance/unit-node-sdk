import { createAddress, createFullName, createPhone } from "../helpers"
import { CreateBusinessDebitCardRequest, CreateBusinessVirtualDebitCardRequest, CreateDepositAccountRequest, CreateIndividualDebitCardRequest, CreateIndividualVirtualDebitCardRequest, Unit } from "../unit"
// import { createAccountForTest } from "./accounts.spec"

require("dotenv").config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")
let cardsId: string[] = []
const cardTypes = ["businessDebitCard", "individualDebitCard", "businessVirtualDebitCard", "individualVirtualDebitCard"]

function createAccountForTest(customerId: string) {
    const createDepositAccountRequest: CreateDepositAccountRequest = {
        type: "depositAccount",
        attributes: {
            depositProduct: "testing sdk",
            tags: {
                purpose: "testing"
            }
        },
        relationships: {
            customer: {
                data: {
                    type: "customer",
                    id: customerId
                }
            }
        }
    }

    return unit.accounts.create(createDepositAccountRequest)
}

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
        const createAccountRes = await createAccountForTest("22601")
        const CreateDebitCardRequest: CreateIndividualDebitCardRequest = {
            type: "individualDebitCard",
            attributes: {
                shippingAddress: createAddress("5230 Newell Rd", null, "Palo Alto", "CA", "94303", "US")
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

    test('create individual virtual debitcard', async () => {
        const createAccountRes = await createAccountForTest("22601")
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

    test('create business debitcard', async () => {
        const createAccountRes = await createAccountForTest("22601")
        const CreateDebitCardRequest: CreateBusinessDebitCardRequest = {
            type: "businessDebitCard",
            attributes: {
                fullName: createFullName("Richard","Hendricks"),
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
                        id: createAccountRes.data.id
                    }
                }
            }
        }

        const createRes = await unit.cards.createDebitCard(CreateDebitCardRequest)
        const res = await unit.cards.get(createRes.data.id)
        expect(res.data.type === "businessDebitCard").toBeTruthy()
    })

    test('create business virtual debitcard', async () => {
        const createAccountRes = await createAccountForTest("22601")
        const CreateDebitCardRequest: CreateBusinessVirtualDebitCardRequest = {
            type: "businessVirtualDebitCard",
            attributes: {
                fullName: createFullName("Richard","Hendricks"),
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
                        id: createAccountRes.data.id
                    }
                }
            }
        }

        const createRes = await unit.cards.createDebitCard(CreateDebitCardRequest)
        const res = await unit.cards.get(createRes.data.id)
        expect(res.data.type === "businessVirtualDebitCard").toBeTruthy()
    })
})
