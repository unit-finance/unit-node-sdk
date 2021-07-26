import { Card, CreateIndividualDebitCardRequest, Unit } from "../unit"
import * as common from "../types/common"
import { Account, CreateDepositAccountRequest } from "../types/account"
import { Customer } from "../types/customer"

require("dotenv").config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")
let customersId: string[] = []

describe('Customers List', () => {
    test('Get Customers List', async () => {
        const res = await unit.customers.list()
        const customers = res as common.UnitResponse<Customer[]>
        customers.data.forEach(element => {
            expect(element.type === "businessCustomer" || element.type === "individualCustomer").toBeTruthy()
                customersId.push(element.id)
        });
    })
})

describe('Get Customer Test', () => {
    test('get each customer', async () => {
        customersId.forEach(async id => {
            const res = await unit.customers.get(id)
            const customer = res as common.UnitResponse<Customer>
            expect(customer.data.type === "businessCustomer" || customer.data.type === "individualCustomer").toBeTruthy()
        });
    })
})
