

import {ApiVersion, ApplicationFormPrefill, CreateApplicationForm, CreateApplicationFormV2, Unit} from "../unit"

import dotenv from "dotenv"
dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")
const unitWithVersion = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test", {apiVersion: ApiVersion.V2024_06})


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

    test("Create Application Form", async () => {
      const req: CreateApplicationForm = {
        type: "applicationForm",
        attributes: {},
        relationships: {}
      }
      const res = await unit.applicationForms.create(req)
      expect(res.data.type === "applicationForm")
    })

    test("Create White-Label Application Form", async () => {
      const req: CreateApplicationFormV2 = {
        type: "applicationForm",
        attributes: {
            idempotencyKey: Math.random().toString(36).substring(7),
        },
        relationships: {}
      }
      const res = await unitWithVersion.applicationForms.create(req)
      expect(res.data.type === "applicationFormV2")
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

    test("Create Application Form V2 for Business with requestedProducts", async () => {
      const req: CreateApplicationFormV2 = {
        type: "applicationForm",
        attributes: {
            idempotencyKey: Math.random().toString(36).substring(7),
            applicantDetails: {
              applicationType: "Business",
              name: "Pied Piper",
              address: {
                street: "5230 Newell Rd",
                city: "Palo Alto",
                state: "CA",
                postalCode: "94303",
                country: "US"
              },
              phone: {
                countryCode: "1",
                number: "5555555555"
              },
              stateOfIncorporation: "DE",
              ein: "123456789",
              entityType: "Corporation",
              contact: {
                fullName: {
                  first: "Richard",
                  last: "Hendricks"
                },
                email: "richard@piedpiper.com",
                phone: {
                  countryCode: "1",
                  number: "5555555555"
                }
              },
              officer: {
                fullName: {
                  first: "Richard",
                  last: "Hendricks"
                },
                dateOfBirth: "2001-08-10",
                title: "CEO",
                ssn: "721074426",
                email: "richard@piedpiper.com",
                phone: {
                  countryCode: "1",
                  number: "5555555555"
                },
                address: {
                  street: "5230 Newell Rd",
                  city: "Palo Alto",
                  state: "CA",
                  postalCode: "94303",
                  country: "US"
                }
              },
              beneficialOwners: [
                {
                  fullName: {
                    first: "Richard",
                    last: "Hendricks"
                  },
                  dateOfBirth: "2001-08-10",
                  ssn: "123456789",
                  email: "richard@piedpiper.com",
                  percentage: 75,
                  phone: {
                    countryCode: "1",
                    number: "5555555555"
                  },
                  address: {
                    street: "5230 Newell Rd",
                    city: "Palo Alto",
                    state: "CA",
                    postalCode: "94303",
                    country: "US"
                  }
                }
              ]
            },
            requestedProducts: ["Banking", "BillPay"]
        },
        relationships: {}
      }
      const res = await unitWithVersion.applicationForms.create(req)
      expect(res.data.type).toBe("applicationFormV2")
    })

    test("Create Application Form V2 for Sole Proprietor with requestedProducts", async () => {
      const req: CreateApplicationFormV2 = {
        type: "applicationForm",
        attributes: {
            idempotencyKey: Math.random().toString(36).substring(7),
            applicantDetails: {
              applicationType: "SoleProprietorship",
              fullName: {
                first: "Peter",
                last: "Parker"
              },
              ssn: "721074426",
              dateOfBirth: "2001-08-10",
              address: {
                street: "20 Ingram St",
                city: "Forest Hills",
                state: "NY",
                postalCode: "11375",
                country: "US"
              },
              email: "peter@oscorp.com",
              phone: {
                countryCode: "1",
                number: "5555555555"
              },
              occupation: "ArchitectOrEngineer",
              annualIncome: "Between50kAnd100k",
              sourceOfIncome: "EmploymentOrPayrollIncome",
              annualRevenue: "Between100kAnd200k",
              ein: "123456789",
              dba: "Piedpiper Inc",
              numberOfEmployees: "Between5And10",
              businessVertical: "TechnologyMediaOrTelecom",
              website: "https://www.piedpiper.com"
            },
            requestedProducts: ["BillPay"]
        },
        relationships: {}
      }
      const res = await unitWithVersion.applicationForms.create(req)
      expect(res.data.type).toBe("applicationFormV2")
    })

    test("Simulation CreateApplicationFormV2 for Business with requestedProducts - test structure", () => {
      const req: CreateApplicationFormV2 = {
        type: "applicationForm",
        attributes: {
            idempotencyKey: "3a1a33be-4e12-4603-9ed0-820922389fb8",
            applicantDetails: {
              applicationType: "Business",
              name: "Pied Piper",
              address: {
                street: "5230 Newell Rd",
                city: "Palo Alto",
                state: "CA",
                postalCode: "94303",
                country: "US"
              },
              phone: {
                countryCode: "1",
                number: "5555555555"
              },
              stateOfIncorporation: "DE",
              ein: "123456789",
              entityType: "Corporation",
              contact: {
                fullName: {
                  first: "Richard",
                  last: "Hendricks"
                },
                email: "richard@piedpiper.com",
                phone: {
                  countryCode: "1",
                  number: "5555555555"
                }
              },
              officer: {
                fullName: {
                  first: "Richard",
                  last: "Hendricks"
                },
                dateOfBirth: "2001-08-10",
                title: "CEO",
                ssn: "721074426",
                email: "richard@piedpiper.com",
                phone: {
                  countryCode: "1",
                  number: "5555555555"
                },
                address: {
                  street: "5230 Newell Rd",
                  city: "Palo Alto",
                  state: "CA",
                  postalCode: "94303",
                  country: "US"
                }
              },
              beneficialOwners: [
                {
                  fullName: {
                    first: "Richard",
                    last: "Hendricks"
                  },
                  dateOfBirth: "2001-08-10",
                  ssn: "123456789",
                  email: "richard@piedpiper.com",
                  percentage: 75,
                  phone: {
                    countryCode: "1",
                    number: "5555555555"
                  },
                  address: {
                    street: "5230 Newell Rd",
                    city: "Palo Alto",
                    state: "CA",
                    postalCode: "94303",
                    country: "US"
                  }
                }
              ]
            },
            requestedProducts: ["Banking", "BillPay", "Capital"]
        },
        relationships: {}
      }

      expect(req.type).toBe("applicationForm")
      expect(req.attributes.requestedProducts).toEqual(["Banking", "BillPay", "Capital"])
    })

    test("Simulation CreateApplicationFormV2 for Sole Proprietor with requestedProducts - test structure", () => {
      const req: CreateApplicationFormV2 = {
        type: "applicationForm",
        attributes: {
            idempotencyKey: "3a1a33be-4e12-4603-9ed0-820922389fb8",
            applicantDetails: {
              applicationType: "SoleProprietorship",
              fullName: {
                first: "Peter",
                last: "Parker"
              },
              ssn: "721074426",
              dateOfBirth: "2001-08-10",
              address: {
                street: "20 Ingram St",
                city: "Forest Hills",
                state: "NY",
                postalCode: "11375",
                country: "US"
              },
              email: "peter@oscorp.com",
              phone: {
                countryCode: "1",
                number: "5555555555"
              },
              ein: "123456789",
              dba: "Piedpiper Inc"
            },
            requestedProducts: ["Banking"]
        },
        relationships: {}
      }

      expect(req.type).toBe("applicationForm")
      expect(req.attributes.requestedProducts).toEqual(["Banking"])
    })
})