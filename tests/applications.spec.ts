

import { Unit } from "../unit"
import { CreateBusinessApplicationRequest, CreateIndividualApplicationRequest } from "../types/application"
import { createAddress, createPhone, createOfficer, createFullName, createBusinessContact, createBeneficialOwner } from "../helpers"

import dotenv from "dotenv"
dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")

beforeEach(async () => {
    // Wait to prevent potential rate limits
    await setTimeout(() => {}, 2000)
})

export function createIndividualApplication() {
    const createndividualApplication: CreateIndividualApplicationRequest = {
        type: "individualApplication",
        attributes: {
            ssn: "721074426",
            fullName: createFullName("Richard","Hendricks"),
            dateOfBirth: "2001-08-10",
            address: createAddress("20 Ingram St",null,"Forest Hills","CA","11375","US"),
            email: "april@baxter.com",
            phone: createPhone("1","5555555555")
        }
    }

    return unit.applications.create(createndividualApplication)
}

export function createBusinessApplication() {
    const businessApplication: CreateBusinessApplicationRequest = {
        type: "businessApplication",
        attributes: {
            name: "Acme Inc.",
            address: createAddress("1600 Pennsylvania Avenue Northwest", null, "Washington", "CA", "20500", "US"),
            phone: createPhone("1", "9294723497"),
            stateOfIncorporation: "CA",
            entityType: "Corporation",
            ein: "123456789",
            officer: createOfficer(null, createFullName("Jone", "Doe"), null, "123456789", null, null, "2012-05-05",
                createAddress("950 Allerton Street", null, "Redwood City", "CA", "94063", "US"), createPhone("1", "2025550108"), "jone.doe@unit-finance.com"),
            contact: createBusinessContact(createFullName("Jone", "Doe"), "jone.doe@unit-finance.com", createPhone("1", "2025550108")),
            beneficialOwners: [
                createBeneficialOwner(null,createFullName("James","Smith"),"574567625",null,null,"2012-04-05",
                createAddress("650 Allerton Street",null,"Redwood City","CA","94063","US"),createPhone("1","2025550127"),"james@unit-finance.com",null),        
                createBeneficialOwner(null,createFullName("Richard","Hendricks"),"574572795",null,null,"2012-04-03",
                createAddress("470 Allerton Street",null,"Redwood City","CA","94063","US"),createPhone("1","2025550158"),"richard@unit-finance.com",null)
            ]
        }
    }

    return unit.applications.create(businessApplication)
}

describe("Create Application", () => {
    test("Create Individual Application", async () => {

        const createRes = await createIndividualApplication()
        const res = await unit.applications.get(createRes.data.id)
        expect(res.data.type).toBe("individualApplication")
    })

    test("Create Business Application", async () => {
        const createRes = await createBusinessApplication()
        const res = await unit.applications.get(createRes.data.id)
        expect(res.data.type).toBe("businessApplication")
    })
})

describe("Applications", () => {
    test("Get List of Applications", async () => {
        const res = await unit.applications.list()
        expect(res.data).toBeInstanceOf(Array)
    })
})