import { Unit } from "../unit"

import dotenv from "dotenv"
import { CreateAchRepaymentRequest } from "../types"
dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")
const repaymentsId: string[] = []

const req: CreateAchRepaymentRequest = {
    "type": "achRepayment",
    "attributes": {
        "amount": 200,
        "description": "test"
    },
    "relationships": {
        "account": {
            "data": {
                "type": "depositAccount",
                "id": "10076"
            }
        },
        "creditAccount": {
            "data": {
                "type": "creditAccount",
                "id": "10082"
            }
        },
        "counterparty": {
            "data": {
                "type": "counterparty",
                "id": "3"
            }
        }
    }
}

describe("Create AchRepayment", () => {
    test("Create AchRepayment Test", async () => {
        const res = (await unit.repayments.create(req)).data
        expect(res.type).toBe("achRepayment")
        expect(res.attributes.amount).toBe(req.attributes.amount)
    })
})

describe("Repayments List and Get", () => {
    beforeAll(async () => {
        const res = (await unit.repayments.create(req)).data
        expect(res.type).toBe("achRepayment")
    })

    test("Repayments List", async () => {
        const res = await unit.repayments.list()
        res.data.forEach(element => {
            expect(["achRepayment", "bookRepayment"]).toContain(element.type)
            repaymentsId.push(element.id)
        })
    })

    test("Get Repayment", async () => {
        repaymentsId.forEach(async id => {
            const res = await unit.repayments.get(id)
            expect(["achRepayment", "bookRepayment"]).toContain(res.data.type)
        })
    })
})

