import { Include, Transaction, Unit, UnitResponse } from "../unit"
import { Account } from "../types/account"
import { Customer } from "../types/customer"

require("dotenv").config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")
let transactionsId: { accountId: string, transactionId: string }[] = []

describe('Transactions List', () => {
    test('Get Transactions List', async () => {
        const res = await unit.transactions.list()
        const transactions = res as UnitResponse<Transaction[]> & Include<Account[] | Customer[]>
        transactions.data.forEach(element => {
            
            expect(element.type === "originatedAchTransaction" || element.type === "adjustmentTransaction" || element.type === "atmTransaction"
                || element.type === "bookTransaction" || element.type === "cardReversalTransaction" || element.type === "cardTransaction"
                || element.type === "dishonoredReceivedAchTransaction" || element.type === "disputeTransaction" || element.type === "feeTransaction"
                || element.type === "interestTransaction" || element.type === "purchaseTransaction" || element.type === "receivedAchTransaction"
                || element.type === "releaseTransaction" || element.type === "returnedAchTransaction" || element.type === "returnedReceivedAchTransaction"
                || element.type === "wireTransaction").toBeTruthy()
            transactionsId.push({accountId: element.relationships.account.data.id, transactionId: element.id})
        });
    })
})

describe('Get Transaction Test', () => {
    test('get each transaction', async () => {
        transactionsId.forEach(async element => {
            const res = await unit.transactions.get(element.accountId,element.transactionId)
            const transaction = res as UnitResponse<Transaction> & Include<Account[] | Customer[]>
            expect(transaction.data.type === "originatedAchTransaction" || transaction.data.type === "adjustmentTransaction" || transaction.data.type === "atmTransaction"
                || transaction.data.type === "bookTransaction" || transaction.data.type === "cardReversalTransaction" || transaction.data.type === "cardTransaction"
                || transaction.data.type === "dishonoredReceivedAchTransaction" || transaction.data.type === "disputeTransaction" || transaction.data.type === "feeTransaction"
                || transaction.data.type === "interestTransaction" || transaction.data.type === "purchaseTransaction" || transaction.data.type === "receivedAchTransaction"
                || transaction.data.type === "releaseTransaction" || transaction.data.type === "returnedAchTransaction" || transaction.data.type === "returnedReceivedAchTransaction"
                || transaction.data.type === "wireTransaction").toBeTruthy()
        });
    })
})