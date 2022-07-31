import { AddAuthorizedUsersRequest, RemoveAuthorizedUsersRequest, Unit } from "../unit"

import dotenv from "dotenv"
import { createIndividualCustomer } from "./testHelpers"
import {
    createAuthorizedUser, createAddAuthorizedUsersRequest, createRemoveAuthorizedUsersRequest,
    createFullName, createPhone
} from "../helpers"
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

describe("Authorized Users for Customer Test", () => {
    test("add authorized users", async () => {
        const customerId = await createIndividualCustomer(unit)
        const a_user = createAuthorizedUser(createFullName("Erlich", "Backman"), "erlich@piedpiper.com", createPhone("1", "1234567890"))
        const req: AddAuthorizedUsersRequest = createAddAuthorizedUsersRequest(customerId, [a_user])
        const res = await unit.customers.addAuthorizedUsers(req)
        expect(res.data.type === "individualCustomer").toBeTruthy()
        expect(res.data.attributes.authorizedUsers[0].fullName.first).toBe("Erlich")
    })

    test("add and remove authorized users", async () => {
        const customerId = await createIndividualCustomer(unit)
        const a_user = createAuthorizedUser(createFullName("Erlich", "Backman"), "erlich@piedpiper.com", createPhone("1", "1234567890"))
        const req: AddAuthorizedUsersRequest = createAddAuthorizedUsersRequest(customerId, [a_user])
        const res = await unit.customers.addAuthorizedUsers(req)
        expect(res.data.type === "individualCustomer").toBeTruthy()
        expect(res.data.attributes.authorizedUsers[0].fullName.first).toBe("Erlich")
        const deleteReq: RemoveAuthorizedUsersRequest = createRemoveAuthorizedUsersRequest(customerId, [a_user.email])
        console.log(deleteReq)
        const deleteRes = await unit.customers.removeAuthorizedUsers(deleteReq)
        expect(deleteRes.data.type === "individualCustomer").toBeTruthy()
        expect(deleteRes.data.attributes.authorizedUsers).toStrictEqual([])
    })
})


