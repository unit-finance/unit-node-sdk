

import { BusinessApplication, IndividualApplication, TrustApplication, Unit } from "../unit"
import { createIndividualApplication, createBusinessApplication, createTrustApplication } from "./testHelpers"
import dotenv from "dotenv"
dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")

describe("Create Application", () => {
    test("Create Individual Application", async () => {

        const createRes = await createIndividualApplication(unit)
        const res = await unit.applications.get(createRes.data.id)
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
        const app: IndividualApplication = {
            "type": "individualApplication",
            "id": "53",
            "attributes": {
                "createdAt": "2020-01-14T14:05:04.718Z",
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
})


describe("Applications", () => {
    test("Simulate businessApplication response from API", async () => {
        const app: BusinessApplication = {
            "type": "businessApplication",
            "id": "50",
            "attributes": {
                "createdAt": "2020-01-13T16:01:19.346Z",
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
                    "number": "1555555578"
                },
                "stateOfIncorporation": "DE",
                "ein": "123456789",
                "entityType": "Corporation",
                "contact": {
                    "fullName": {
                        "first": "Richard",
                        "last": "Hendricks"
                    },
                    "email": "richard@piedpiper.com",
                    "phone": {
                        "countryCode": "1",
                        "number": "1555555578"
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
                        "city": "Palo Alto",
                        "state": "CA",
                        "postalCode": "94303",
                        "country": "US"
                    },
                    "dateOfBirth": "2001-08-10",
                    "email": "richard@piedpiper.com",
                    "phone": {
                        "countryCode": "1",
                        "number": "1555555589"
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
                            "city": "Palo Alto",
                            "state": "CA",
                            "postalCode": "94303",
                            "country": "US"
                        },
                        "dateOfBirth": "2001-08-10",
                        "phone": {
                            "countryCode": "1",
                            "number": "1555555589"
                        },
                        "email": "richard@piedpiper.com",
                        "status": "Approved"
                    }
                ],
                "tags": {
                    "userId": "106a75e9-de77-4e25-9561-faffe59d7814"
                },
                "archived": false,
                "status": "AwaitingDocuments",
                "message": "Waiting for you to upload the required documents."
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
                },
                "applicationForm": {
                    "data": {
                        "type": "applicationForm",
                        "id": "3"
                    }
                }
            }
        }

        expect(app.type).toBe("businessApplication")
    })
})


describe("Applications", () => {
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
})
