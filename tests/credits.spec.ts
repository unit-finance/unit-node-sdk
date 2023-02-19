import { CreateBusinessCreditCardRequest, CreateBusinessVirtualCreditCardRequest, Unit } from "../unit"
import { CloseAccountRequest, CreditAccount } from "../types/account"

import dotenv from "dotenv"
import { createCreditAccount } from "./testHelpers"
import { createAddress, createFullName, createPhone } from "../helpers"
dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")
const accountsId: string[] = []

async function createAccount() {
    const res = await createCreditAccount(unit)
    const account = await unit.accounts.get(res.data.id)
    expect(account.data.type).toBe("creditAccount")
    return account.data.id
}

async function closeAccount(accountId: string) {
    const req: CloseAccountRequest = {
        accountId,
        data: {
            type: "creditAccountClose",
            attributes: {
                reason: "Overdue"
            }
        }
    }

    const res = await unit.accounts.closeAccount(req)
    expect(res.data.type).toBe("creditAccount")
    return res
}

describe("Credit Accounts List", () => {
    let accountId = ""

    beforeAll(async () => {
        accountId = await createAccount()
    })
    
    afterAll(async () => {
        await closeAccount(accountId)
    })

    test("Get Credit Accounts List", async () => {
        const res = await unit.accounts.list({type: "credit"})
        res.data.forEach(element => {
            expect(element.type).toBe("creditAccount")
            accountsId.push(element.id)
        })

        accountsId.forEach(async id => {
            const res = await unit.accounts.get(id)
            expect(res.data.type).toBe("creditAccount")
        })
    })

    test("Get accounts list with included customer", async () => {
        accountsId.forEach(async id => {
            const res = await unit.accounts.get(id, "customer")
            expect(res.included && res.included.length > 0).toBeTruthy()
        })
    })
})

describe("Create Account", () => {
    test("Create Credit Account", async () => {
        const accountId = await createAccount()
        const res = await closeAccount(accountId)
        expect(res.data.id).toBe(accountId)

    })
})

describe("Test DTO structure", () => {
    test("Test Credit Account DTO", () => {
        const creditAccount: CreditAccount = {
            "type": "creditAccount",
            "id": "42",
            "attributes": {
              "createdAt": "2000-05-11T10:19:30.409Z",
              "name": "Peter Parker",
              "status": "Open",
              "creditTerms": "credit_terms_1",
              "currency": "USD",
              "balance": 10000,
              "hold": 0,
              "available": 10000,
              "tags": {
                "purpose": "some_purpose"
              },
              "creditLimit": 200000
            },
            "relationships": {
              "customer": {
                "data": {
                  "type": "customer",
                  "id": "45555"
                }
              },
              "org": {
                "data": {
                  "type": "org",
                  "id": "1"
                }
              }
            }
          }

          expect(creditAccount.type).toBe("creditAccount")
    })
})

describe("Credit Credit Card", () => {
    test("Create Business Credit Card", async () => {
        const accountId = await createAccount()

        const req: CreateBusinessCreditCardRequest = {
            type: "businessCreditCard",
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
                        type: "creditAccount",
                        id: accountId
                    }
                }
            }
        }

        const res = await unit.cards.create(req)
        expect(res.data.type).toBe("businessCreditCard")

        const closeRes = await unit.cards.closeCard(res.data.id)
        expect(closeRes.data.id).toBe(res.data.id)
    })

    test("Create Business Virtual Credit Card", async () => {
        const accountId = await createAccount()

        const req: CreateBusinessVirtualCreditCardRequest = {
            type: "businessVirtualCreditCard",
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
                        type: "creditAccount",
                        id: accountId
                    }
                }
            }
        }

        const res = await unit.cards.create(req)
        expect(res.data.type).toBe("businessVirtualCreditCard")

        const closeRes = await unit.cards.closeCard(res.data.id)
        expect(closeRes.data.id).toBe(res.data.id)
    })
})

