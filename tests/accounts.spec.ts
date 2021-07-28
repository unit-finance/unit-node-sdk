import { Unit } from "../unit"
import { CreateDepositAccountRequest } from "../types/account"

require("dotenv").config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")
let accountsId: string[] = []

describe('Accounts List', () => {
    test('Get Accounts List', async () => {
        const res = await unit.accounts.list()
        res.data.forEach(element => {
            expect(element.type === "batchAccount" || element.type === "depositAccount").toBeTruthy()
            accountsId.push(element.id)
        });
    })
})

describe('Get Account Test', () => {
    test('get each account', async () => {
        accountsId.forEach(async id => {
            const res = await unit.accounts.get(id)
            expect(res.data.type === "depositAccount" || res.data.type === "batchAccount").toBeTruthy()
        });
    })
})


describe('Create Account', () => {
    test('Create Deposit Account', async () => {
        const createDepositAccountRequest: CreateDepositAccountRequest = {
            type: "depositAccount",
            attributes: {
                depositProduct: "checking sdk",
                tags: {
                    purpose: "checking"
                }
            },
            relationships: {
                customer: {
                    data: {
                        type: "customer",
                        id: "22604"
                    }
                }
            }
        }

        const app = await unit.accounts.create(createDepositAccountRequest)

        expect(app.data.type === "depositAccount").toBeTruthy()
    })
})

