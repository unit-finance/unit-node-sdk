import { Unit } from "../unit"
import * as common from "../types/common"
import { Application, CreateBusinessApplicationRequest, CreateIndividualApplicationRequest } from "../types/application"
import { createAddress, createPhone, createOfficer, createFullName, createBusinessContact } from "../helpers"
import { Account } from "../types/account"
import { Customer } from "../types/customer"

require("dotenv").config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")

describe('Accounts List', () => {
    test('Get Accounts List', async () => {
        const res = await unit.accounts.list()
        const app = res as common.UnitResponse<Account[]> & common.Include<Customer>
        app.data.forEach(element => {
            expect(element.type === "batchAccount" || element.type === "depositAccount").toBeTruthy()
        });
    })
})

