import { Include, Unit, UnitResponse } from "../unit"
import { Account, CreateDepositAccountRequest } from "../types/account"
import { Customer } from "../types/customer"

require("dotenv").config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")
let accountsId: string[] = []

describe('Accounts List', () => {
    test('Get Accounts List', async () => {
        const res = await unit.accounts.list()
        const accounts = res as UnitResponse<Account[]> & Include<Customer>
        accounts.data.forEach(element => {
            expect(element.type === "batchAccount" || element.type === "depositAccount").toBeTruthy()
            accountsId.push(element.id)
        });
    })
})

describe('Get Account Test', () => {
    test('get each account', async () => {
        accountsId.forEach(async id => {
            const res = await unit.accounts.get(id)
            const account = res as UnitResponse<Account>
            expect(account.data.type === "depositAccount" || account.data.type === "batchAccount").toBeTruthy()
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

        const res = await unit.accounts.create(createDepositAccountRequest)
        const app = res as UnitResponse<Account>

        expect(app.data.type === "depositAccount").toBeTruthy()
    })
})

