

import { Unit } from "../unit"
import * as common from "../types/common"
import { Application, CreateIndividualApplicationRequest } from "../types/application"
require("dotenv").config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")

describe('Create Application', () => {
    test('Create Individual Application', async () => {

        console.log(process.env.UNIT_TOKEN , process.env.UNIT_API_URL)

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
        const app = res as common.UnitResponse<Application>

        expect(app.data.type).toBe("individualApplication")
    });
});

