import { Unit } from "../unit" //CreateLinkedPaymentRequest

import dotenv from "dotenv"
dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")
const paymentsId: string[] = []

describe("Repayments List", () => {
    test("Get Repayments List", async () => {
        const res = await unit.repayments.list()
        res.data.forEach(element => {
            expect(element.type).toContain("Repayment")
            paymentsId.push(element.id)
        })
    })
})

describe("Get Repayment Test", () => {
    test("get each repayment", async () => {
        const repayments = (await unit.repayments.list()).data
        repayments.forEach(async rp => {
            const res = await unit.repayments.get(rp.id)
            expect(res.data.type).toContain("Repayment")
        })
    })
})

// TODO: add create test here
// describe("Create BookPayment", () => {
//     test("create bookpayment", async () => {
//         const createDepositAccountRes = await createIndividualAccount(unit)
//         const createAnotherDepositAccountRes = await createIndividualAccount(unit)

//         const req: CreateBookPaymentRequest = {
//             "type": "bookPayment",
//             "attributes": {
//                 "amount": 200,
//                 // "direction": "Credit",
//                 "description": "Book payment"
//             },
//             "relationships": {
//                 "account": {
//                     "data": {
//                         "type": "depositAccount",
//                         "id": createDepositAccountRes.data.id
//                     }
//                 },
//                 "counterpartyAccount": {
//                     "data": {
//                         "type": "depositAccount",
//                         "id": createAnotherDepositAccountRes.data.id
//                     }
//                 }
//             }
//         }

//         const res = await unit.payments.create(req)
//         expect(res.data.type === "bookPayment").toBeTruthy()

//     })
// })