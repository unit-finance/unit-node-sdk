

import { ApplicationFormPrefill, Unit } from "../unit"

import dotenv from "dotenv"
dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")


describe("ApplicationForms", () => {
    const appFormsIds: string[] = []

    test("Get List of ApplicationForms", async () => {
        const res = await unit.applicationForms.list()
        expect(res.data).toBeInstanceOf(Array)
        res.data.forEach(a => {
            appFormsIds.push(a.id)
        })
    })
    
    test("Get ApplicationForm", async () => {
        appFormsIds.forEach(async id => {
            const res = await unit.applicationForms.get(id)
            expect(res.data.type == "applicationForm")
        })
    })

    test("Test ApplicationFormPrefill Interface", () => {
        const applicationFormPrefill: ApplicationFormPrefill = {
            "applicationType": "Business",
            "fullName": {
              "first": "Peter",
              "last": "Parker"
            },
            "ssn": "721074426",
            "passport": "12345678",
            "nationality": "US",
            "dateOfBirth": "2001-08-10",
            "email": "peter@oscorp.com",
            "name": "Pied Piper",
            "stateOfIncorporation": "DE",
            "entityType": "Corporation",
            "contact": {
              "fullName": {
                "first": "Richard",
                "last": "Hendricks"
              },
              "email": "richard@piedpiper.com",
              "phone": {
                "countryCode": "1",
                "number": "5555555555"
              }
            },
            "officer": {
              "fullName": {
                "first": "Richard",
                "last": "Hendricks"
              },
              "dateOfBirth": "2001-08-10",
              "title": "CEO",
              "ssn": "721074426",
              "email": "richard@piedpiper.com",
              "phone": {
                "countryCode": "1",
                "number": "5555555555"
              },
              "address": {
                "street": "5230 Newell Rd",
                "city": "Palo Alto",
                "state": "CA",
                "postalCode": "94303",
                "country": "US"
              }
            },
            "beneficialOwners": [
              {
                "fullName": {
                  "first": "Richard",
                  "last": "Hendricks"
                },
                "dateOfBirth": "2001-08-10",
                "ssn": "123456789",
                "email": "richard@piedpiper.com",
                "percentage": 75,
                "phone": {
                  "countryCode": "1",
                  "number": "5555555555"
                },
                "address": {
                  "street": "5230 Newell Rd",
                  "city": "Palo Alto",
                  "state": "CA",
                  "postalCode": "94303",
                  "country": "US"
                }
              }
            ],
            "website": "https://www.piedpiper.com",
            "dba": "Piedpiper Inc",
            "ein": "123456789",
            "address": {
              "street": "5230 Newell Rd",
              "city": "Palo Alto",
              "state": "CA",
              "postalCode": "94303",
              "country": "US"
            },
            "phone": {
              "countryCode": "1",
              "number": "5555555555"
            },
            "occupation": "Doctor",
            "sourceOfIncome": "EmploymentOrPayrollIncome",
            "annualIncome": "Between10kAnd25k",
            "businessVertical": "TechnologyMediaOrTelecom",
            "annualRevenue": "Between500kAnd1m",
            "numberOfEmployees": "Between50And100",
            "cashFlow": "Predictable",
            "yearOfIncorporation": "2014",
            "countriesOfOperation": [
              "US",
              "CA"
            ],
            "stockSymbol": "PPI",
            "hasNonUsEntities": false
          }

          expect(applicationFormPrefill.applicationType).toBe("Business")
    })
})