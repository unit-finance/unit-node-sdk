import { Unit } from "../unit"
import { CreateDepositAccountRequest } from "../types/account"
import { createBusinessApplication, createIndividualApplication } from "./applications.spec"

import dotenv from "dotenv"
dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")
const accountsId: string[] = []

function createAccount(customerId: string) {
    const createDepositAccountRequest: CreateDepositAccountRequest = {
        type: "depositAccount",
        attributes: {
            depositProduct: "checking",
            tags: {
                purpose: "checking"
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

export async function createIndividualAccount() {
    const customerId = (await createIndividualApplication()).data.relationships.customer?.data.id
    return createAccount(customerId ? customerId : "")
}

export async function createBussinessAccount() {
    const customerId = (await createBusinessApplication()).data.relationships.customer?.data.id
    return createAccount(customerId ? customerId : "")
}   

describe("Accounts List", () => {
    test("Get Accounts List", async () => {
        const res = await unit.accounts.list()
        res.data.forEach(element => {
            expect(element.type === "batchAccount" || element.type === "depositAccount").toBeTruthy()
            accountsId.push(element.id)
        })

        accountsId.forEach(async id => {
            const res = await unit.accounts.get(id)
            expect(res.data.type === "depositAccount" || res.data.type === "batchAccount").toBeTruthy()
        })
    })
})


describe("Create Account", () => {
    test("Create Deposit Account", async () => {
        const res = await createIndividualAccount()
        const account = await unit.accounts.get(res.data.id)
        expect(account.data.type === "depositAccount").toBeTruthy()
    })
})

