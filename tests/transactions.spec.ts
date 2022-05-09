import { Unit } from "../unit"

import dotenv from "dotenv"
dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")
const transactionsId: { accountId: string; transactionId: string; }[] = []

const transactionTypes = ["originatedAchTransaction","adjustmentTransaction","atmTransaction","bookTransaction","cardReversalTransaction","cardTransaction",
"dishonoredReceivedAchTransaction","disputeTransaction","feeTransaction","interestTransaction","purchaseTransaction","receivedAchTransaction","releaseTransaction",
"returnedAchTransaction","returnedReceivedAchTransaction","wireTransaction","rewardTransaction"]

describe("Transactions List", () => {
    test("Get Transactions List", async () => {
        const res = await unit.transactions.list()
        res.data.forEach(element => {
            expect(transactionTypes.includes(element.type)).toBeTruthy()
            transactionsId.push({ accountId: element.relationships.account.data.id, transactionId: element.id })
        })
    })
})

describe("Get Transaction Test", () => {
    test("get each transaction", async () => {
        transactionsId.forEach(async element => {
            const transaction = await unit.transactions.get(element.accountId, element.transactionId)
            expect(transactionTypes.includes(transaction.data.type)).toBeTruthy()
        })
    })
})