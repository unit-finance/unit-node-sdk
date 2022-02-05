import { Unit } from "../unit"

import dotenv from "dotenv"
dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")
const customersId: string[] = []

describe("Customers List", () => {
    test("Get Customers List", async () => {
        const res = await unit.customers.list()
        res.data.forEach(element => {
            expect(element.type === "businessCustomer" || element.type === "individualCustomer").toBeTruthy()
            customersId.push(element.id)
        })
    })
})

describe("Get Customer Test", () => {
    test("get each customer", async () => {
        customersId.forEach(async id => {
            const res = await unit.customers.get(id)
            expect(res.data.type === "businessCustomer" || res.data.type === "individualCustomer").toBeTruthy()
        })
    })
})
