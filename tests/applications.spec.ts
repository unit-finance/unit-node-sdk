

import { createAddress, createFullName, createPhone } from "../helpers"
import { Agent, BusinessApplication, CancelApplicationRequest, CreateBusinessApplicationRequest, CreateIndividualApplicationRequest, CreateSoleProprietorApplicationRequest, CreateTrustApplicationRequest, IndividualApplication, PatchApplicationRequest, PatchBusinessApplicationBeneficialOwner, RelationshipsArrayData, TrustApplication, Unit, VerifyDocumentRequest } from "../unit"
import {
    createIndividualApplication,
    createBusinessApplication,
    createTrustApplication,
    createIndividualApplicationWithRequiredDocument,
    createVerifyDocumentRequest,
    createIndividualApplicationWithSelfieVerification
} from "./testHelpers"
import dotenv from "dotenv"
import * as fs from "fs"
dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")

describe("Create Application", () => {
    test("Create Individual Application", async () => {
        const createRes = await createIndividualApplication(unit)
        const res = await unit.applications.get(createRes.data.id)
        expect(res.data.type).toBe("individualApplication")
    })

    test("Create Sole Individual Application", async () => {
        const req: CreateSoleProprietorApplicationRequest = {
            "type": "individualApplication",
            "attributes": {
              "ssn": "721074426",
              "fullName": {
                "first": "Peter",
                "last": "Parker"
              },
              "dateOfBirth": "2001-08-10",
              "address": {
                "street": "20 Ingram St",
                "city": "Forest Hills",
                "state": "NY",
                "postalCode": "11375",
                "country": "US"
              },
              "email": "peter@oscorp.com",
              "phone": {
                "countryCode": "1",
                "number": "5555555555"
              },
              "ip": "127.0.0.2",
              "occupation": "ArchitectOrEngineer",
              "annualIncome": "Between50kAnd100k",
              "sourceOfIncome": "EmploymentOrPayrollIncome",
              "annualRevenue": "Between100kAnd200k",
              "soleProprietorship": true,
              "ein": "123456789",
              "dba": "Piedpiper Inc",
              "numberOfEmployees": "Between5And10",
              "businessVertical": "TechnologyMediaOrTelecom",
              "website": "https://www.piedpiper.com",
              "tags": {
                "userId": "106a75e9-de77-4e25-9561-faffe59d7814"
              },
              "idempotencyKey": "3a1a33be-4e12-4603-9ed0-820922389fb8"
            }
          }

        const res = await unit.applications.create(req)
        expect(res.data.type).toBe("individualApplication")
    })

    test("Create Business Application", async () => {
        const createRes = await createBusinessApplication(unit)
        const res = await unit.applications.get(createRes.data.id)
        expect(res.data.type).toBe("businessApplication")
    })

    test("Create Trust Application", async () => {
        const createRes = await createTrustApplication(unit)
        const res = await unit.applications.get(createRes.data.id)
        expect(res.data.type).toBe("trustApplication")
    })
})

describe("Applications", () => {
    test("Get List of Applications", async () => {
        const res = await unit.applications.list()
        expect(res.data).toBeInstanceOf(Array)
    })
})

describe("Applications", () => {
    test("Simulate individualApplication response from API", async () => {

        const agent: Agent = {
            "status": "Approved",
            "fullName": {
              "first": "Peter",
              "last": "Parker"
            },
            "ssn": "721074426",
            "dateOfBirth": "2001-08-15",
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
            "email": "peter@oscorp.com"
          }
        
        const app: IndividualApplication = {
            "type": "individualApplication",
            "id": "53",
            "attributes": {
                "createdAt": "2020-01-14T14:05:04.718Z",
                "updatedAt": "2020-01-14T14:05:04.718Z",
                "fullName": {
                    "first": "Peter",
                    "last": "Parker"
                },
                "ssn": "721074426",
                "address": {
                    "street": "20 Ingram St",
                    "city": "Forest Hills",
                    "state": "NY",
                    "postalCode": "11375",
                    "country": "US"
                },
                "dateOfBirth": "2001-08-10",
                "email": "peter@oscorp.com",
                "phone": {
                    "countryCode": "1",
                    "number": "1555555578"
                },
                "status": "AwaitingDocuments",
                "message": "Waiting for you to upload the required documents.",
                "archived": false,
                "dba":"dba",
                "ein": "123",
                "ip":"1.1.1.100",
                "powerOfAttorneyAgent": agent,
                "industry": "OtherProfessionalServices",
                "soleProprietorship": true,
                "idTheftScore": 123,
                "tags": {
                    "userId": "106a75e9-de77-4e25-9561-faffe59d7814"
                }
            },
            "relationships": {
                "org": {
                    "data": {
                        "type": "org",
                        "id": "1"
                    }
                },
                "documents": {
                    "data": [
                        {
                            "type": "document",
                            "id": "1"
                        },
                        {
                            "type": "document",
                            "id": "2"
                        }
                    ]
                },
                "applicationForm": {
                    "data": {
                        "type": "applicationForm",
                        "id": "3"
                    }
                }
            }
        }

        expect(app.type).toBe("individualApplication")
    })

    test("Simulation CreateIndividualApplicationRequest - test structure", () => {
        const req: CreateIndividualApplicationRequest = {
            "type": "individualApplication",
            "attributes": {
              "ssn": "721074426",
              "fullName": {
                "first": "Peter",
                "last": "Parker"
              },
              "dateOfBirth": "2001-08-10",
              "address": {
                "street": "20 Ingram St",
                "city": "Forest Hills",
                "state": "NY",
                "postalCode": "11375",
                "country": "US"
              },
              "email": "peter@oscorp.com",
              "phone": {
                "countryCode": "1",
                "number": "5555555555"
              },
              "ip": "127.0.0.2",
              "occupation": "ArchitectOrEngineer",
              "annualIncome": "Between50kAnd100k",
              "sourceOfIncome": "EmploymentOrPayrollIncome",
              "tags": {
                "userId": "106a75e9-de77-4e25-9561-faffe59d7814"
              },
              "idempotencyKey": "3a1a33be-4e12-4603-9ed0-820922389fb8"
            }
          }

          expect(req.type).toBe("individualApplication")
    })

    test("Simulation CreateSoleProprietorApplicationRequest - test structure", () => {
        const req: CreateSoleProprietorApplicationRequest = {
            "type": "individualApplication",
            "attributes": {
              "ssn": "721074426",
              "fullName": {
                "first": "Peter",
                "last": "Parker"
              },
              "dateOfBirth": "2001-08-10",
              "address": {
                "street": "20 Ingram St",
                "city": "Forest Hills",
                "state": "NY",
                "postalCode": "11375",
                "country": "US"
              },
              "email": "peter@oscorp.com",
              "phone": {
                "countryCode": "1",
                "number": "5555555555"
              },
              "ip": "127.0.0.2",
              "occupation": "ArchitectOrEngineer",
              "annualIncome": "Between50kAnd100k",
              "sourceOfIncome": "EmploymentOrPayrollIncome",
              "annualRevenue": "Between100kAnd200k",
              "soleProprietorship": true,
              "ein": "123456789",
              "dba": "Piedpiper Inc",
              "numberOfEmployees": "Between5And10",
              "businessVertical": "TechnologyMediaOrTelecom",
              "website": "https://www.piedpiper.com",
              "tags": {
                "userId": "106a75e9-de77-4e25-9561-faffe59d7814"
              },
              "idempotencyKey": "3a1a33be-4e12-4603-9ed0-820922389fb8"
            }
          }

          expect(req.type).toBe("individualApplication")
    })

    test("Simulation UpdateIndividualApplicationRequest - test structure", () => {
        const req: PatchApplicationRequest = {
            applicationId: "123",
            data: {
                "type": "individualApplication",
                "attributes": {
                  "tags": {
                    "by": "Richard Hendricks",
                    "id": "23033b64-38f8-4dbc-91a1-313ff0156d02"
                  },
                  "occupation": "ArchitectOrEngineer",
                  "annualIncome": "Between10kAnd25k",
                  "sourceOfIncome": "EmploymentOrPayrollIncome"
                }
              }
        }

          expect(req.data.type).toBe("individualApplication")
    })

    test("Simulation UpdateIndividualApplicationRequest - Sole Proprietor - test structure", () => {
        const req: PatchApplicationRequest = {
            applicationId: "123",
            data: {
                "type": "individualApplication",
                "attributes": {
                  "tags": {
                    "by": "Richard Hendricks",
                    "id": "23033b64-38f8-4dbc-91a1-313ff0156d02"
                  },
                  "annualRevenue": "UpTo50k",
                  "numberOfEmployees": "Between2And5",
                  "businessVertical": "BusinessSupportOrBuildingServices",
                  "website": "https://unit.co"
                }
              }
        }

          expect(req.data.type).toBe("individualApplication")
    })
})


describe("Business Applications", () => {
    test("Simulate businessApplication response from API", async () => {
        const app: BusinessApplication = {
              "type": "businessApplication",
              "id": "50",
              "attributes": {
                "createdAt": "2020-01-13T16:01:19.346Z",
                "name": "Pied Piper",
                "message": "Waiting for you to upload the required documents.",
                "dba": undefined,
                "address": {
                  "street": "5230 Newell Rd",
                  "street2": undefined,
                  "city": "Palo Alto",
                  "state": "CA",
                  "postalCode": "94303",
                  "country": "US"
                },
                "phone": {
                  "countryCode": "1",
                  "number": "5555555555"
                },
                "stateOfIncorporation": "DE",
                "ein": "123456789",
                "entityType": "Corporation",
                "ip": "127.0.0.2",
                "website": "https://www.piedpiper.com",
                "annualRevenue": "Between500kAnd1m",
                "numberOfEmployees": "Between50And100",
                "cashFlow": "Predictable",
                "yearOfIncorporation": "2014",
                "countriesOfOperation": [
                  "US",
                  "CA"
                ],
                "stockSymbol": "PPI",
                "businessVertical": "TechnologyMediaOrTelecom",
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
                  "ssn": "123456789",
                  "address": {
                    "street": "5230 Newell Rd",
                    "street2": undefined,
                    "city": "Palo Alto",
                    "state": "CA",
                    "postalCode": "94303",
                    "country": "US"
                  },
                  "dateOfBirth": "2001-08-10",
                  "title": "CEO",
                  "email": "richard@piedpiper.com",
                  "phone": {
                    "countryCode": "1",
                    "number": "5555555555"
                  },
                  "status": "Approved"
                },
                "beneficialOwners": [
                  {
                    "fullName": {
                      "first": "Richard",
                      "last": "Hendricks"
                    },
                    "ssn": "123456789",
                    "address": {
                      "street": "5230 Newell Rd",
                      "street2": undefined,
                      "city": "Palo Alto",
                      "state": "CA",
                      "postalCode": "94303",
                      "country": "US"
                    },
                    "dateOfBirth": "2001-08-10",
                    "phone": {
                      "countryCode": "1",
                      "number": "5555555555"
                    },
                    "email": "richard@piedpiper.com",
                    "percentage": 75,
                    "status": "Approved"
                  }
                ],
                "tags": {
                  "userId": "2ab1f266-04b9-41fb-b728-cd1962bca52c"
                },
                "archived": false,
                "status": "AwaitingDocuments"
              },
              "relationships": {
                "org": {
                  "data": {
                    "type": "org",
                    "id": "1"
                  }
                },
                "documents": {
                  "data": [
                    {
                      "type": "document",
                      "id": "1"
                    },
                    {
                      "type": "document",
                      "id": "2"
                    },
                    {
                      "type": "document",
                      "id": "3"
                    }
                  ]
                }
            }
          }

        expect(app.type).toBe("businessApplication")
    })

    test("Simulation CreateBusinessApplicationRequest - test structure", () => {
        const req: CreateBusinessApplicationRequest = {
            "type": "businessApplication",
            "attributes": {
              "name": "Pied Piper",
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
              "stateOfIncorporation": "DE",
              "ein": "123456789",
              "entityType": "Corporation",
              "ip": "127.0.0.2",
              "annualRevenue": "Between500kAnd1m",
              "numberOfEmployees": "Between50And100",
              "cashFlow": "Predictable",
              "yearOfIncorporation": "2014",
              "countriesOfOperation": [
                "US",
                "CA"
              ],
              "stockSymbol": "PPI",
              "businessVertical": "TechnologyMediaOrTelecom",
              "website": "https://www.piedpiper.com",
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
              "tags": {
                "userId": "2ab1f266-04b9-41fb-b728-cd1962bca52c"
              },
              "idempotencyKey": "3a1a33be-4e12-4603-9ed0-820922389fb8"
            }
          }

          expect(req.type).toBe("businessApplication")
    })

    test("Simulation UpdateBusinessApplicationRequest - test structure", () => {
        const req: PatchApplicationRequest = {
            applicationId: "123",
            data: {
                "type": "businessApplication",
                "attributes": {
                  "tags": {
                    "by": "Richard Hendricks",
                    "id": "23033b64-38f8-4dbc-91a1-313ff0156d02"
                  }
                }
            }
        }

          expect(req.data.type).toBe("businessApplication")
    })

    test("Simulation UpdateBusinessApplicationRequest - update officer - test structure", () => {
        const req: PatchApplicationRequest = {
            applicationId: "123",
            data: {
                "type": "businessApplication",
                "attributes": {
                  "officer": {
                    "occupation": "ArchitectOrEngineer",
                    "annualIncome": "Between10kAnd25k",
                    "sourceOfIncome": "EmploymentOrPayrollIncome"
                  }
                }
            }
        }

          expect(req.data.type).toBe("businessApplication")
    })

    test("Test UpdateBusinessApplicationRequest - Update Officer", async () => {
        const res = await createBusinessApplication(unit)
        expect(res.data.type).toBe("businessApplication")

        const req: PatchApplicationRequest = {
            applicationId: res.data.id,
            data: {
                "type": "businessApplication",
                "attributes": {
                  "officer": {
                    "occupation": "ArchitectOrEngineer",
                    "annualIncome": "Between10kAnd25k",
                    "sourceOfIncome": "EmploymentOrPayrollIncome"
                  }
                }
            }
        }

        const updated_application = await unit.applications.update(req)

        expect(updated_application.data.type).toBe("businessApplication")
        expect(updated_application.data.id).toBe(res.data.id)
    })

    test("Test UpdateBusinessApplicationRequest - Update beneficial-owner", async () => {
        const res = await createBusinessApplication(unit)
        expect(res.data.type).toBe("businessApplication")

        const b_owner_id = ((res.data as BusinessApplication).relationships.beneficialOwners?.data as RelationshipsArrayData)[0].id

        const req: PatchBusinessApplicationBeneficialOwner = {
            beneficialOwnerId: b_owner_id,
            data: {
                "type": "beneficialOwner",
                "attributes": {
                    "occupation": "ArchitectOrEngineer",
                    "annualIncome": "Between10kAnd25k",
                    "sourceOfIncome": "EmploymentOrPayrollIncome"
                },
                "relationships": {
                    "application": {
                        "data":{
                            "type": "businessApplication",
                            "id": res.data.id
                        }
                    }
                }
            }
        }

        const updated_owner = await unit.applications.updateBeneficialOwner(req)

        expect(updated_owner.data.type).toBe("beneficialOwner")
    })
})


describe("TrustApplications", () => {
    test("Simulate trustApplication response from API", async () => {
        const app: TrustApplication = {
            "type": "trustApplication",
            "id": "51",
            "attributes": {
                "createdAt": "2022-04-02T21:59:46.324Z",
                "name": "Trust me Inc.",
                "contact": {
                    "fullName": {
                        "first": "Jared",
                        "last": "Dunn"
                    },
                    "email": "jared@piedpiper.com",
                    "phone": {
                        "countryCode": "1",
                        "number": "2025550108"
                    },
                    "address": {
                        "street": "5230 Newell Rd",
                        "city": "Palo Alto",
                        "state": "CA",
                        "postalCode": "94303",
                        "country": "US"
                    }
                },
                "status": "AwaitingDocuments",
                "message": "Waiting for you to upload the required documents.",
                "stateOfIncorporation": "CA",
                "revocability": "Revocable",
                "sourceOfFunds": "Salary",
                "taxId": "123456789",
                "grantor": {
                    "status": "PendingReview",
                    "fullName": {
                        "first": "Laurie",
                        "last": "Bream"
                    },
                    "ssn": "000000003",
                    "address": {
                        "street": "950 Allerton Street",
                        "city": "Redwood City",
                        "state": "CA",
                        "postalCode": "94063",
                        "country": "US"
                    },
                    "dateOfBirth": "2000-01-01",
                    "email": "laurie@raviga.com",
                    "phone": {
                        "countryCode": "1",
                        "number": "2025550108"
                    }
                },
                "tags": {
                    "test": "test1"
                },
                "archived": false
            },
            "relationships": {
                "org": {
                    "data": {
                        "type": "org",
                        "id": "1"
                    }
                },
                "trustees": {
                    "data": [
                        {
                            "type": "trustee",
                            "id": "21"
                        }
                    ]
                },
                "beneficiaries": {
                    "data": [
                        {
                            "type": "beneficiary",
                            "id": "33"
                        },
                        {
                            "type": "beneficiary",
                            "id": "34"
                        }
                    ]
                },
                "documents": {
                    "data": [
                        {
                            "type": "document",
                            "id": "201"
                        },
                        {
                            "type": "document",
                            "id": "202"
                        },
                        {
                            "type": "document",
                            "id": "203"
                        }
                    ]
                }
            }
        }

        expect(app.type).toBe("trustApplication")
        expect(app.attributes.grantor.address.street).toBe("950 Allerton Street")
    })

    test("Simulation CreateTrustApplicationRequest - test structure", () => {
        const req: CreateTrustApplicationRequest = {
            "type": "trustApplication",
            "attributes": {
              "name": "Trust me Inc.",
              "stateOfIncorporation": "CA",
              "revocability": "Revocable",
              "sourceOfFunds": "Salary",
              "taxId": "123456789",
              "trustees": [
                {
                  "fullName": {
                    "first": "Richard",
                    "last": "Hendricks"
                  },
                  "dateOfBirth": "2000-01-01",
                  "ssn": "000000002",
                  "email": "richard@piedpiper.com",
                  "phone": {
                    "countryCode": "1",
                    "number": "2025550108"
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
              "contact": {
                "fullName": {
                  "first": "Jared",
                  "last": "Dunn"
                },
                "email": "jared@piedpiper.com",
                "phone": {
                  "countryCode": "1",
                  "number": "2025550108"
                },
                "address": {
                  "street": "5230 Newell Rd",
                  "city": "Palo Alto",
                  "state": "CA",
                  "postalCode": "94303",
                  "country": "US"
                }
              },
              "grantor": {
                "fullName": {
                  "first": "Laurie",
                  "last": "Bream"
                },
                "dateOfBirth": "2000-01-01",
                "ssn": "000000003",
                "email": "laurie@raviga.com",
                "phone": {
                  "countryCode": "1",
                  "number": "2025550108"
                },
                "address": {
                  "street": "950 Allerton Street",
                  "city": "Redwood City",
                  "state": "CA",
                  "postalCode": "94063",
                  "country": "US"
                }
              },
              "tags": {
                "test": "test1"
              },
              "beneficiaries": [
                {
                  "fullName": {
                    "first": "Dinesh",
                    "last": "Chugtai"
                  },
                  "dateOfBirth": "2000-01-01"
                },
                {
                  "fullName": {
                    "first": "Gilfoyle",
                    "last": "Unknown"
                  },
                  "dateOfBirth": "2000-01-01"
                }
              ]
            }
          }

          expect(req.type).toBe("trustApplication")
    })

    test("Simulation UpdateTrustApplicationRequest - test structure", () => {
        const req: PatchApplicationRequest = {
            applicationId: "123",
            data: {
                "type": "trustApplication",
                "attributes": {
                  "tags": {
                    "by": "Richard Hendricks",
                    "id": "23033b64-38f8-4dbc-91a1-313ff0156d02"
                    }
                  }
                }
        }

          expect(req.data.type).toBe("trustApplication")
    })
})

describe("Applications", () => {
    test("Create Individual Application With Document Upload", async () => {
        // Create application
        const createRes = await createIndividualApplicationWithRequiredDocument(unit)
        const res = await unit.applications.get(createRes.data.id)
        expect(res.data.type).toBe("individualApplication")
        expect(res.data.attributes.status).toBe("AwaitingDocuments")

        // Get the document
        const documents = await unit.applications.listDocuments(createRes.data.id)
        expect(documents.data.length).toBe(1)
        const addressDocument = documents.data[0]

        // Load file into memory
        const fileBuffer = fs.readFileSync(__dirname + "/logo.png")
        // In a browser environment, having a "file: File" object, a "Buffer" can be extracted in the following way:
        // const fileBuffer = await file.arrayBuffer() as Buffer

        // Upload
        const documentUploadResponse = await unit.applications.upload({
            applicationId: res.data.id,
            documentId: addressDocument.id,
            fileType: "png",
            file: fileBuffer
        })
        expect(documentUploadResponse.data.attributes.status).toBe("PendingReview")
    })
})


describe("Create Document", () => {
    test("Create Document for Individual Application", async () => {
        const applicationId = (await createIndividualApplicationWithRequiredDocument(unit)).data.id
        const document = (await unit.applications.createDocument(applicationId)).data

        expect(document).not.toBeNull()
        expect(document?.type).toBe("document")
        expect(document?.attributes.documentType).toBe("ClientRequested")
        expect(document?.attributes.status).toBe("Required")
    })

    // TODO: skipping test for now
    test.skip("Verify Document for Individual Application", async () => {
        const applicationId = (await createIndividualApplicationWithSelfieVerification(unit)).data.id
        const documents = (await unit.applications.listDocuments(applicationId)).data

        expect(documents).not.toBeNull()
        const document = documents[0]
        expect(document.attributes.documentType).toBe("SelfieVerification")
        const documentId = document?.id || ""
        const req: VerifyDocumentRequest = createVerifyDocumentRequest(applicationId, documentId, "Tn4NxMisa")
        const res = await unit.applications.verifyDocument(req)
        expect(document?.id).toBe(res.data.id)
        expect(document?.attributes.description).toBe(res.data.attributes.description)
        expect(document?.attributes.documentType).toBe(res.data.attributes.documentType)
        expect(res.data.attributes.status).toBe("Approved") // TODO
    })
})

describe("Create and Close Application", () => {
    test("Create and Close Individual Application", async () => {

        const createIndividualApplication: CreateIndividualApplicationRequest = {
            type: "individualApplication",
            attributes: {
                ssn: "000000003",
                fullName: createFullName("Richard", "Hendricks"),
                dateOfBirth: "2001-08-10",
                address: createAddress("20 Ingram St", null, "Forest Hills", "CA", "11375", "US"),
                email: "april@baxter.com",
                phone: createPhone("1", "5555555555"),
                occupation: "Doctor"
            }
        }
    
        const createReq = await  unit.applications.create(createIndividualApplication)
        expect(createReq.data.type).toBe("individualApplication")
        const closeRequest: CancelApplicationRequest = {
            applicationId: createReq.data.id,
            data: {
                type: "applicationCancel",
                attributes: {
                    reason: "By Org"
                }
            } 
        }

        const closeRes = await unit.applications.cancel(closeRequest)
        expect(closeRes.data.type).toBe("individualApplication")
        expect(closeRes.data.id).toBe(closeRes.data.id)
        expect(closeRes.data.attributes.status).toBe("Canceled")
    })
})
