import { Unit } from "../unit"
import { AccountOwnersRequest, DepositAccount } from "../types/account"

import dotenv from "dotenv"
import { createRelationshipArray } from "../helpers"
import { createIndividualAccount, createIndividualCustomer } from "./testHelpers"
dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")
const accountsId: string[] = []

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
        const res = await createIndividualAccount(unit)
        const account = await unit.accounts.get(res.data.id)
        expect(account.data.type === "depositAccount").toBeTruthy()
    })
})

describe("Add Account Owners", () => {
    test("add account owners", async () => {
        const new_account = (await createIndividualAccount(unit)).data as DepositAccount
        const originated_customer_id = new_account.relationships.customer?.data.id
        const customer_id1 = await createIndividualCustomer(unit)
        const customer_id2 = await createIndividualCustomer(unit)
        let req: AccountOwnersRequest = {
            accountId: new_account.id,
            data: createRelationshipArray("customer", [customer_id1, customer_id2])
        }
        const account: any = await unit.accounts.addOwners(req)
        let da = account.data as DepositAccount
        expect(da.type === "depositAccount").toBeTruthy()
        expect(da.relationships.customers).toBeDefined()
        da.relationships.customers?.data.forEach(o => {
            expect([customer_id1, customer_id2, originated_customer_id].includes(o.id)).toBeTruthy()
        })

        req = {
            accountId: account.data.id,
            data: createRelationshipArray("customer", [customer_id1])
        }
        const a: any = await unit.accounts.removeOwners(req)
        da = a.data as DepositAccount
        expect(da.type === "depositAccount").toBeTruthy()
        expect(da.relationships.customers).toBeDefined()
        da.relationships.customers?.data.forEach(o => {
            expect([customer_id2, originated_customer_id].includes(o.id)).toBeTruthy()
        })
    })
})

