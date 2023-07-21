import { Unit } from "../unit"

import dotenv from "dotenv"
dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")
const transactionsId: { accountId: string; transactionId: string; }[] = []

describe("Transactions List", () => {
    test("Get Transactions List", async () => {
        const res = await unit.transactions.list()
        res.data.forEach(element => {
            expect(element.type).toContain("Transaction")
            transactionsId.push({ accountId: element.relationships.account.data.id, transactionId: element.id })
        })
    })
})

describe("Get Transaction Test", () => {
    test("get each transaction", async () => {
        transactionsId.forEach(async element => {
            const transaction = (await unit.transactions.get(element.accountId, element.transactionId)).data
            expect(transaction.type).toContain("Transaction")
        })
    })
})

describe("Update Transaction Test", () => {
    test("update each transaction", async () => {
        transactionsId.forEach(async element => {
            const transaction = (await unit.transactions.get(element.accountId, element.transactionId)).data
            expect(transaction.type).toContain("Transaction")
            const response = (await unit.transactions.update({
                accountId: transaction.relationships.account.data.id, 
                transactionId: transaction.id,
                data: {
                    type: "transaction",
                    attributes: {
                        tags: {"purpose": "test"}
                    }
                }
            })).data
            expect(response.type).toBe(transaction.type)
            expect(response.id).toBe(transaction.id)
        })
    })
})