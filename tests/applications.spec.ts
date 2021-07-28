

import { Unit, UnitResponse } from "../unit"
import { Application, CreateBusinessApplicationRequest, CreateIndividualApplicationRequest } from "../types/application"
import { createAddress, createPhone, createOfficer, createFullName, createBusinessContact } from "../helpers"

require("dotenv").config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")

describe('Create Application', () => {
    test('Create Individual Application', async () => {

        let createndividualApplication: CreateIndividualApplicationRequest = {
            type: "individualApplication",
            attributes: {
                ssn: "000000002",
                fullName: {
                    first: "Richard",
                    last: "Hendricks"
                },
                dateOfBirth: "2001-08-10",
                address: {
                    street: "20 Ingram St",
                    city: "Forest Hills",
                    state: "CA",
                    postalCode: "11375",
                    country: "US"
                },
                email: "april@baxter.com",
                phone: {
                    countryCode: "1",
                    number: "5555555555"
                }
            }
        }

        const res = await unit.applications.create(createndividualApplication)
        const app = res as UnitResponse<Application>

        expect(app.data.type).toBe("individualApplication")
    });

    test('Create Business Application', async () => {

        const businessApplication: CreateBusinessApplicationRequest = {
            type: "businessApplication",
            attributes: {
                name: "Acme Inc.",
                address: createAddress("1600 Pennsylvania Avenue Northwest", null, "Washington", "CA", "20500", "US"),
                phone: createPhone("1", "9294723497"),
                stateOfIncorporation: "CA",
                entityType: "Corporation",
                ein: "123456789",
                officer: createOfficer(null, createFullName("Jone", "Doe"), null, "000000005", null, null, "2012-05-05",
                    createAddress("950 Allerton Street", null, "Redwood City", "CA", "94063", "US"), createPhone("1", "2025550108"), "jone.doe@unit-finance.com"),
                contact: createBusinessContact(createFullName("Jone", "Doe"), "jone.doe@unit-finance.com", createPhone("1", "2025550108")),
                beneficialOwners: [
                    {
                        fullName: {
                            first: "James",
                            last: "Smith"
                        },
                        dateOfBirth: "2012-04-05",
                        ssn: "574567625",
                        email: "james@unit-finance.com",
                        phone: {
                            countryCode: "1",
                            number: "2025550127"
                        },
                        address: {
                            street: "650 Allerton Street",
                            city: "Redwood City",
                            state: "CA",
                            postalCode: "94063",
                            country: "US"
                        }
                    },
                    {
                        fullName: {
                            first: "Richard",
                            last: "Hendricks"
                        },
                        dateOfBirth: "2012-04-03",
                        ssn: "574572795",
                        email: "richard@unit-finance.com",
                        phone: {
                            countryCode: "1",
                            number: "2025550158"
                        },
                        address: {
                            street: "470 Allerton Street",
                            city: "Redwood City",
                            state: "CA",
                            postalCode: "94063",
                            country: "US"
                        }
                    }
                ]
            }
        }

        const res = await unit.applications.create(businessApplication)
        const app = res as UnitResponse<Application>

        expect(app.data.type).toBe("businessApplication")
    });
});

describe('Applications', () => {
    test('Get List of Applications', async () => {
        const res = await unit.applications.list()
        const app = res as UnitResponse<Application[]>
        expect(app.data).toBeInstanceOf(Array)
    })
})