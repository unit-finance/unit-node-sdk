import { Unit, CreateRewardRequest } from "../unit"
import { createIndividualAccount } from "./testHelpers"

import dotenv from "dotenv"
dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")

describe("Test Reward Resource", () => {
    test("create new reward", async () => {
        const createAccountRes = await createIndividualAccount(unit)
        const req: CreateRewardRequest = {
            type: "reward",
            attributes: {
                amount: 3000,
                description: "Reward for transaction #5678"
            },
            relationships: {
                receivingAccount: {
                    data: {
                        "type": "depositAccount",
                        "id": createAccountRes.data.id
                      }
                }
            }
        }

        const res = await unit.rewards.create(req)
        expect(res.data.type).toBe("reward")
    })

    test("list and get rewards",async () => {
        const res = await unit.rewards.list()

        res.data.forEach(element => {
            expect(element.type).toBe("reward")
        })

        res.data.forEach(async element => {
            const rewardRes = await unit.rewards.get(element.id) 
            expect(rewardRes.data.type).toBe("reward")
        })
    })
})