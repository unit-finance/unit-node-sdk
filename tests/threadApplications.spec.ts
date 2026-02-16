import {
    CreateIndividualThreadApplicationRequest,
    CreateSoleProprietorThreadApplicationRequest,
    CreateBusinessThreadApplicationRequest,
    UpdateIndividualThreadApplicationRequest,
    UpdateSoleProprietorThreadApplicationRequest,
    UpdateBusinessThreadApplicationRequest,
    UpdateBusinessBeneficialOwnerThreadApplicationRequest,
    IndividualThreadApplication,
    BusinessThreadApplication,
    BeneficialOwnerThreadApplication
} from "../types/threadApplication"
import { Unit } from "../unit"
import dotenv from "dotenv"
dotenv.config()

const unit = new Unit(process.env.UNIT_THREAD_TOKEN || "test", process.env.UNIT_API_URL || "test")

describe("Create Thread Application", () => {
    test("Create Individual Thread Application", async () => {
        const req: CreateIndividualThreadApplicationRequest = {
            type: "individualApplication",
            attributes: {
                ssn: "721074426",
                fullName: {
                    first: "Peter",
                    last: "Parker"
                },
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
                ip: "127.0.0.2",
                accountPurpose: "EverydaySpending",
                sourceOfFunds: "SalaryOrWages",
                transactionVolume: "Between5KAnd15K",
                profession: "Engineer",
                tags: {
                    userId: "106a75e9-de77-4e25-9561-faffe59d7814"
                }
            }
        }

        const res = await unit.applications.createThreadApplication(req)
        expect(res.data.type).toBe("individualApplication")
    })

    test("Create Sole Proprietor Thread Application", async () => {
        const req: CreateSoleProprietorThreadApplicationRequest = {
            type: "individualApplication",
            attributes: {
                soleProprietorship: true,
                ssn: "721074426",
                fullName: {
                    first: "Peter",
                    last: "Parker"
                },
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
                ip: "127.0.0.2",
                ein: "123456789",
                dba: "Piedpiper Inc",
                isIncorporated: false,
                countriesOfOperation: ["US"],
                usNexus: ["BankingRelationships"],
                businessDescription: "Software development and consulting services",
                accountPurpose: "TechnologyStartupOperations",
                sourceOfFunds: "SalesOfServices",
                transactionVolume: "Between5KAnd20K",
                profession: "BusinessOwner",
                businessIndustry: "FinTechOrPaymentProcessing",
                website: "https://www.piedpiper.com",
                tags: {
                    userId: "106a75e9-de77-4e25-9561-faffe59d7814"
                }
            }
        }

        const res = await unit.applications.createThreadApplication(req)
        expect(res.data.type).toBe("individualApplication")
    })

    test("Create Business Thread Application", async () => {
        const req: CreateBusinessThreadApplicationRequest = {
            type: "businessApplication",
            attributes: {
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
                entityType: "PrivatelyHeldCorporation",
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
                ],
                sourceOfFunds: "SalesOfServices",
                businessIndustry: "FinTechOrPaymentProcessing",
                businessDescription: "A compression company that makes the world a better place.",
                isRegulated: false,
                usNexus: ["Employees", "BankingRelationships"],
                accountPurpose: "TechnologyStartupOperations",
                transactionVolume: "Between10KAnd50K",
                yearOfIncorporation: "2014",
                countriesOfOperation: ["US"]
            }
        }

        const res = await unit.applications.createThreadApplication(req)
        expect(res.data.type).toBe("businessApplication")
    })
})

describe("Thread Applications - Individual", () => {
    test("Simulate IndividualThreadApplication response from API", () => {
        const app: IndividualThreadApplication = {
            type: "individualApplication",
            id: "53",
            attributes: {
                status: "AwaitingDocuments",
                message: "Waiting for you to upload the required documents.",
                createdAt: "2020-01-14T14:05:04.718Z",
                updatedAt: "2020-01-14T14:05:04.718Z",
                ssn: "721074426",
                nationality: "US",
                fullName: {
                    first: "Peter",
                    last: "Parker"
                },
                dateOfBirth: "2001-08-10",
                address: {
                    street: "20 Ingram St",
                    city: "Forest Hills",
                    state: "NY",
                    postalCode: "11375",
                    country: "US"
                },
                phone: {
                    countryCode: "1",
                    number: "1555555578"
                },
                email: "peter@oscorp.com",
                ip: "127.0.0.1",
                archived: false,
                idTheftScore: 123,
                tags: {
                    userId: "106a75e9-de77-4e25-9561-faffe59d7814"
                },
                accountPurpose: "EverydaySpending",
                sourceOfFunds: "SalaryOrWages",
                transactionVolume: "Between5KAnd15K",
                profession: "Engineer"
            },
            relationships: {
                org: {
                    data: {
                        type: "org",
                        id: "1"
                    }
                },
                documents: {
                    data: [
                        { type: "document", id: "1" },
                        { type: "document", id: "2" }
                    ]
                },
                customer: {
                    data: {
                        type: "customer",
                        id: "10"
                    }
                }
            }
        }

        expect(app.type).toBe("individualApplication")
        expect(app.attributes.accountPurpose).toBe("EverydaySpending")
        expect(app.attributes.profession).toBe("Engineer")
    })

    test("Simulation CreateIndividualThreadApplicationRequest - test structure", () => {
        const req: CreateIndividualThreadApplicationRequest = {
            type: "individualApplication",
            attributes: {
                ssn: "721074426",
                fullName: {
                    first: "Peter",
                    last: "Parker"
                },
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
                ip: "127.0.0.2",
                accountPurpose: "EverydaySpending",
                sourceOfFunds: "SalaryOrWages",
                transactionVolume: "Between5KAnd15K",
                profession: "Engineer",
                tags: {
                    userId: "106a75e9-de77-4e25-9561-faffe59d7814"
                },
                idempotencyKey: "3a1a33be-4e12-4603-9ed0-820922389fb8"
            }
        }

        expect(req.type).toBe("individualApplication")
        expect(req.attributes.accountPurpose).toBe("EverydaySpending")
        expect(req.attributes.profession).toBe("Engineer")
    })

    test("Simulation CreateIndividualThreadApplicationRequest with accountPurposeDetail - test structure", () => {
        const req: CreateIndividualThreadApplicationRequest = {
            type: "individualApplication",
            attributes: {
                ssn: "721074426",
                fullName: {
                    first: "Peter",
                    last: "Parker"
                },
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
                accountPurpose: "Cryptocurrency",
                accountPurposeDetail: "Trading Bitcoin and Ethereum",
                sourceOfFunds: "InvestmentIncome",
                transactionVolume: "Between30KAnd60K",
                profession: "BusinessOwner"
            }
        }

        expect(req.type).toBe("individualApplication")
        expect(req.attributes.accountPurpose).toBe("Cryptocurrency")
        expect(req.attributes.accountPurposeDetail).toBe("Trading Bitcoin and Ethereum")
    })

    test("Simulation UpdateIndividualThreadApplicationRequest - test structure", () => {
        const req: UpdateIndividualThreadApplicationRequest = {
            applicationId: "123",
            data: {
                type: "individualApplication",
                attributes: {
                    tags: {
                        by: "Richard Hendricks",
                        id: "23033b64-38f8-4dbc-91a1-313ff0156d02"
                    },
                    profession: "Doctor"
                }
            }
        }

        expect(req.data.type).toBe("individualApplication")
        expect(req.applicationId).toBe("123")
    })
})

describe("Thread Applications - Sole Proprietor", () => {
    test("Simulate IndividualThreadApplication (Sole Proprietor) response from API", () => {
        const app: IndividualThreadApplication = {
            type: "individualApplication",
            id: "54",
            attributes: {
                status: "Approved",
                message: "Application approved.",
                createdAt: "2020-01-14T14:05:04.718Z",
                ssn: "721074426",
                fullName: {
                    first: "Peter",
                    last: "Parker"
                },
                dateOfBirth: "2001-08-10",
                address: {
                    street: "20 Ingram St",
                    city: "Forest Hills",
                    state: "NY",
                    postalCode: "11375",
                    country: "US"
                },
                phone: {
                    countryCode: "1",
                    number: "1555555578"
                },
                email: "peter@oscorp.com",
                archived: false,
                soleProprietorship: true,
                ein: "123456789",
                dba: "Parker Consulting",
                accountPurpose: "EverydaySpending",
                sourceOfFunds: "SalaryOrWages",
                transactionVolume: "Between15KAnd30K",
                profession: "BusinessOwner"
            },
            relationships: {
                documents: {
                    data: []
                }
            }
        }

        expect(app.type).toBe("individualApplication")
        expect(app.attributes.soleProprietorship).toBe(true)
        expect(app.attributes.dba).toBe("Parker Consulting")
    })

    test("Simulation CreateSoleProprietorThreadApplicationRequest - test structure", () => {
        const req: CreateSoleProprietorThreadApplicationRequest = {
            type: "individualApplication",
            attributes: {
                soleProprietorship: true,
                ssn: "721074426",
                fullName: {
                    first: "Peter",
                    last: "Parker"
                },
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
                ip: "127.0.0.2",
                ein: "123456789",
                dba: "Piedpiper Inc",
                isIncorporated: false,
                countriesOfOperation: ["US"],
                usNexus: ["BankingRelationships"],
                businessDescription: "Software development and consulting services",
                accountPurpose: "TechnologyStartupOperations",
                sourceOfFunds: "SalesOfServices",
                transactionVolume: "Between5KAnd20K",
                profession: "BusinessOwner",
                businessIndustry: "FinTechOrPaymentProcessing",
                website: "https://www.piedpiper.com",
                tags: {
                    userId: "106a75e9-de77-4e25-9561-faffe59d7814"
                },
                idempotencyKey: "3a1a33be-4e12-4603-9ed0-820922389fb8"
            }
        }

        expect(req.type).toBe("individualApplication")
        expect(req.attributes.soleProprietorship).toBe(true)
        expect(req.attributes.businessIndustry).toBe("FinTechOrPaymentProcessing")
    })

    test("Simulation UpdateSoleProprietorThreadApplicationRequest - test structure", () => {
        const req: UpdateSoleProprietorThreadApplicationRequest = {
            applicationId: "123",
            data: {
                type: "individualApplication",
                attributes: {
                    tags: {
                        by: "Richard Hendricks",
                        id: "23033b64-38f8-4dbc-91a1-313ff0156d02"
                    },
                    profession: "BusinessOwner",
                    businessIndustry: "OnlineRetailOrECommerce",
                    website: "https://unit.co"
                }
            }
        }

        expect(req.data.type).toBe("individualApplication")
        expect(req.data.attributes.businessIndustry).toBe("OnlineRetailOrECommerce")
    })
})

describe("Thread Applications - Business", () => {
    test("Simulate BusinessThreadApplication response from API", () => {
        const app: BusinessThreadApplication = {
            type: "businessApplication",
            id: "50",
            attributes: {
                status: "AwaitingDocuments",
                message: "Waiting for you to upload the required documents.",
                createdAt: "2020-01-13T16:01:19.346Z",
                name: "Pied Piper",
                dba: "PP Inc",
                address: {
                    street: "5230 Newell Rd",
                    city: "Palo Alto",
                    state: "CA",
                    postalCode: "94303",
                    country: "US"
                },
                operatingAddress: {
                    street: "100 Main St",
                    city: "San Francisco",
                    state: "CA",
                    postalCode: "94105",
                    country: "US"
                },
                phone: {
                    countryCode: "1",
                    number: "5555555555"
                },
                stateOfIncorporation: "DE",
                ein: "123456789",
                entityType: "PrivatelyHeldCorporation",
                website: "https://www.piedpiper.com",
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
                    ssn: "123456789",
                    address: {
                        street: "5230 Newell Rd",
                        city: "Palo Alto",
                        state: "CA",
                        postalCode: "94303",
                        country: "US"
                    },
                    dateOfBirth: "2001-08-10",
                    email: "richard@piedpiper.com",
                    phone: {
                        countryCode: "1",
                        number: "5555555555"
                    },
                    title: "CEO",
                    status: "Approved",
                    idTheftScore: 150
                },
                beneficialOwners: [
                    {
                        fullName: {
                            first: "Richard",
                            last: "Hendricks"
                        },
                        ssn: "123456789",
                        address: {
                            street: "5230 Newell Rd",
                            city: "Palo Alto",
                            state: "CA",
                            postalCode: "94303",
                            country: "US"
                        },
                        dateOfBirth: "2001-08-10",
                        phone: {
                            countryCode: "1",
                            number: "5555555555"
                        },
                        email: "richard@piedpiper.com",
                        percentage: 75,
                        status: "Approved",
                        idTheftScore: 200
                    }
                ],
                archived: false,
                tags: {
                    userId: "2ab1f266-04b9-41fb-b728-cd1962bca52c"
                },
                sourceOfFunds: "SalesOfServices",
                businessIndustry: "FinTechOrPaymentProcessing",
                businessDescription: "A compression company that makes the world a better place.",
                isRegulated: false,
                usNexus: ["Employees", "BankingRelationships"],
                accountPurpose: "TechnologyStartupOperations",
                transactionVolume: "Between10KAnd50K",
                countriesOfOperation: ["US", "CA"],
                yearOfIncorporation: "2014"
            },
            relationships: {
                org: {
                    data: {
                        type: "org",
                        id: "1"
                    }
                },
                documents: {
                    data: [
                        { type: "document", id: "1" },
                        { type: "document", id: "2" },
                        { type: "document", id: "3" }
                    ]
                },
                beneficialOwners: {
                    data: [
                        { type: "beneficialOwner", id: "5" }
                    ]
                }
            }
        }

        expect(app.type).toBe("businessApplication")
        expect(app.attributes.businessIndustry).toBe("FinTechOrPaymentProcessing")
        expect(app.attributes.usNexus).toContain("BankingRelationships")
        expect(app.attributes.operatingAddress?.city).toBe("San Francisco")
    })

    test("Simulation CreateBusinessThreadApplicationRequest - test structure", () => {
        const req: CreateBusinessThreadApplicationRequest = {
            type: "businessApplication",
            attributes: {
                name: "Pied Piper",
                dba: "PP Inc",
                address: {
                    street: "5230 Newell Rd",
                    city: "Palo Alto",
                    state: "CA",
                    postalCode: "94303",
                    country: "US"
                },
                operatingAddress: {
                    street: "100 Main St",
                    city: "San Francisco",
                    state: "CA",
                    postalCode: "94105",
                    country: "US"
                },
                phone: {
                    countryCode: "1",
                    number: "5555555555"
                },
                stateOfIncorporation: "DE",
                ein: "123456789",
                entityType: "PrivatelyHeldCorporation",
                ip: "127.0.0.2",
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
                ],
                sourceOfFunds: "SalesOfServices",
                businessIndustry: "FinTechOrPaymentProcessing",
                businessDescription: "A compression company that makes the world a better place.",
                isRegulated: false,
                usNexus: ["Employees", "BankingRelationships"],
                accountPurpose: "TechnologyStartupOperations",
                transactionVolume: "Between10KAnd50K",
                countriesOfOperation: ["US", "CA"],
                yearOfIncorporation: "2014",
                website: "https://www.piedpiper.com",
                tags: {
                    userId: "2ab1f266-04b9-41fb-b728-cd1962bca52c"
                },
                idempotencyKey: "3a1a33be-4e12-4603-9ed0-820922389fb8"
            }
        }

        expect(req.type).toBe("businessApplication")
        expect(req.attributes.businessIndustry).toBe("FinTechOrPaymentProcessing")
        expect(req.attributes.usNexus).toContain("BankingRelationships")
        expect(req.attributes.operatingAddress?.city).toBe("San Francisco")
    })

    test("Simulation CreateBusinessThreadApplicationRequest with PubliclyTradedCorporation - test structure", () => {
        const req: CreateBusinessThreadApplicationRequest = {
            type: "businessApplication",
            attributes: {
                name: "Hooli",
                address: {
                    street: "1 Hooli Way",
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
                ein: "987654321",
                entityType: "PubliclyTradedCorporation",
                stockExchangeName: "NASDAQ",
                stockSymbol: "HOLI",
                contact: {
                    fullName: {
                        first: "Gavin",
                        last: "Belson"
                    },
                    email: "gavin@hooli.com",
                    phone: {
                        countryCode: "1",
                        number: "5555555555"
                    }
                },
                officer: {
                    fullName: {
                        first: "Gavin",
                        last: "Belson"
                    },
                    dateOfBirth: "1970-01-01",
                    title: "CEO",
                    ssn: "987654321",
                    email: "gavin@hooli.com",
                    phone: {
                        countryCode: "1",
                        number: "5555555555"
                    },
                    address: {
                        street: "1 Hooli Way",
                        city: "Palo Alto",
                        state: "CA",
                        postalCode: "94303",
                        country: "US"
                    }
                },
                beneficialOwners: [],
                sourceOfFunds: "SalesOfServices",
                businessIndustry: "FinTechOrPaymentProcessing",
                businessDescription: "Making the world a better place through technology.",
                isRegulated: false,
                usNexus: ["BankingRelationships"],
                accountPurpose: "TechnologyStartupOperations",
                transactionVolume: "GreaterThan2M"
            }
        }

        expect(req.type).toBe("businessApplication")
        expect(req.attributes.entityType).toBe("PubliclyTradedCorporation")
        expect(req.attributes.stockExchangeName).toBe("NASDAQ")
        expect(req.attributes.stockSymbol).toBe("HOLI")
    })

    test("Simulation CreateBusinessThreadApplicationRequest with regulated business - test structure", () => {
        const req: CreateBusinessThreadApplicationRequest = {
            type: "businessApplication",
            attributes: {
                name: "Secure Bank Services",
                address: {
                    street: "100 Financial St",
                    city: "New York",
                    state: "NY",
                    postalCode: "10001",
                    country: "US"
                },
                phone: {
                    countryCode: "1",
                    number: "5555555555"
                },
                stateOfIncorporation: "NY",
                ein: "111222333",
                entityType: "PrivatelyHeldCorporation",
                contact: {
                    fullName: {
                        first: "John",
                        last: "Banker"
                    },
                    email: "john@securebank.com",
                    phone: {
                        countryCode: "1",
                        number: "5555555555"
                    }
                },
                officer: {
                    fullName: {
                        first: "John",
                        last: "Banker"
                    },
                    dateOfBirth: "1980-05-15",
                    title: "CEO",
                    ssn: "111222333",
                    email: "john@securebank.com",
                    phone: {
                        countryCode: "1",
                        number: "5555555555"
                    },
                    address: {
                        street: "100 Financial St",
                        city: "New York",
                        state: "NY",
                        postalCode: "10001",
                        country: "US"
                    }
                },
                beneficialOwners: [],
                sourceOfFunds: "SalesOfServices",
                businessIndustry: "FinTechOrPaymentProcessing",
                businessDescription: "Providing secure banking services to businesses.",
                isRegulated: true,
                regulatorName: "Federal Reserve",
                usNexus: ["Employees", "BankingRelationships"],
                accountPurpose: "TechnologyStartupOperations",
                transactionVolume: "GreaterThan2M"
            }
        }

        expect(req.type).toBe("businessApplication")
        expect(req.attributes.isRegulated).toBe(true)
        expect(req.attributes.regulatorName).toBe("Federal Reserve")
    })

    test("Simulation UpdateBusinessThreadApplicationRequest - test structure", () => {
        const req: UpdateBusinessThreadApplicationRequest = {
            applicationId: "123",
            data: {
                type: "businessApplication",
                attributes: {
                    tags: {
                        by: "Richard Hendricks",
                        id: "23033b64-38f8-4dbc-91a1-313ff0156d02"
                    }
                }
            }
        }

        expect(req.data.type).toBe("businessApplication")
        expect(req.applicationId).toBe("123")
    })
})

describe("Thread Applications - Beneficial Owner", () => {
    test("Simulate BeneficialOwnerThreadApplication response from API", () => {
        const owner: BeneficialOwnerThreadApplication = {
            type: "beneficialOwner",
            id: "5",
            attributes: {
                status: "Approved",
                fullName: {
                    first: "Erlich",
                    last: "Bachman"
                },
                ssn: "721074426",
                nationality: "US",
                dateOfBirth: "1990-04-05",
                address: {
                    street: "20 Ingram St",
                    street2: "Apt #10",
                    city: "Forest Hills",
                    state: "NY",
                    postalCode: "11375",
                    country: "US"
                },
                phone: {
                    countryCode: "1",
                    number: "5555555555"
                },
                email: "erlich@piedpiper.com",
                percentage: 75,
                idTheftScore: 150
            }
        }

        expect(owner.type).toBe("beneficialOwner")
        expect(owner.attributes.fullName.first).toBe("Erlich")
        expect(owner.attributes.percentage).toBe(75)
    })

    test("Simulate BeneficialOwnerThreadApplication with passport response from API", () => {
        const owner: BeneficialOwnerThreadApplication = {
            type: "beneficialOwner",
            id: "6",
            attributes: {
                status: "PendingReview",
                fullName: {
                    first: "Jian",
                    last: "Yang"
                },
                passport: "E12345678",
                nationality: "CN",
                dateOfBirth: "1988-03-15",
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
                email: "jian@piedpiper.com",
                percentage: 50
            }
        }

        expect(owner.type).toBe("beneficialOwner")
        expect(owner.attributes.passport).toBe("E12345678")
        expect(owner.attributes.nationality).toBe("CN")
    })

    test("Simulation UpdateBusinessBeneficialOwnerThreadApplicationRequest - test structure", () => {
        const req: UpdateBusinessBeneficialOwnerThreadApplicationRequest = {
            beneficialOwnerId: "5",
            data: {
                type: "beneficialOwner",
                attributes: {
                    percentage: 50,
                    email: "erlich.new@piedpiper.com"
                },
                relationships: {
                    application: {
                        data: {
                            type: "businessApplication",
                            id: "50"
                        }
                    }
                }
            }
        }

        expect(req.data.type).toBe("beneficialOwner")
        expect(req.beneficialOwnerId).toBe("5")
        expect(req.data.attributes.percentage).toBe(50)
    })
})

describe("Update Thread Application", () => {
    test("Update Individual Thread Application", async () => {
        // First create an application
        const createReq: CreateIndividualThreadApplicationRequest = {
            type: "individualApplication",
            attributes: {
                ssn: "721074426",
                fullName: {
                    first: "Peter",
                    last: "Parker"
                },
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
                accountPurpose: "EverydaySpending",
                sourceOfFunds: "SalaryOrWages",
                transactionVolume: "Between5KAnd15K",
                profession: "Engineer"
            }
        }

        const createRes = await unit.applications.createThreadApplication(createReq)
        const applicationId = createRes.data.id

        // Now update the application
        const updateReq: UpdateIndividualThreadApplicationRequest = {
            applicationId,
            data: {
                type: "individualApplication",
                attributes: {
                    tags: {
                        updatedBy: "test"
                    },
                    profession: "Doctor"
                }
            }
        }

        const updateRes = await unit.applications.updateThreadApplication(updateReq)
        expect(updateRes.data.type).toBe("individualApplication")
    })

    test("Update Sole Proprietor Thread Application", async () => {
        // First create a sole proprietor application
        const createReq: CreateSoleProprietorThreadApplicationRequest = {
            type: "individualApplication",
            attributes: {
                soleProprietorship: true,
                ssn: "721074426",
                fullName: {
                    first: "Peter",
                    last: "Parker"
                },
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
                dba: "Parker Consulting",
                isIncorporated: false,
                countriesOfOperation: ["US"],
                usNexus: ["BankingRelationships"],
                businessDescription: "Software development and consulting services",
                accountPurpose: "TechnologyStartupOperations",
                sourceOfFunds: "SalesOfServices",
                transactionVolume: "Between5KAnd20K",
                profession: "BusinessOwner",
                businessIndustry: "FinTechOrPaymentProcessing"
            }
        }

        const createRes = await unit.applications.createThreadApplication(createReq)
        const applicationId = createRes.data.id

        // Now update the application
        const updateReq: UpdateSoleProprietorThreadApplicationRequest = {
            applicationId,
            data: {
                type: "individualApplication",
                attributes: {
                    tags: {
                        updatedBy: "test"
                    },
                    website: "https://parkerconsulting.com"
                }
            }
        }

        const updateRes = await unit.applications.updateThreadApplication(updateReq)
        expect(updateRes.data.type).toBe("individualApplication")
    })

    test("Update Business Thread Application", async () => {
        // First create a business application
        const createReq: CreateBusinessThreadApplicationRequest = {
            type: "businessApplication",
            attributes: {
                name: "Pied Piper",
                stateOfIncorporation: "CA",
                entityType: "LLC",
                ein: "123456789",
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
                    ssn: "721074426",
                    dateOfBirth: "1990-01-01",
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
                    email: "richard@piedpiper.com",
                    title: "CEO"
                },
                beneficialOwners: [
                    {
                        fullName: {
                            first: "Richard",
                            last: "Hendricks"
                        },
                        ssn: "721074426",
                        dateOfBirth: "1990-01-01",
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
                        email: "richard@piedpiper.com",
                        percentage: 75
                    }
                ],
                countriesOfOperation: ["US"],
                usNexus: ["Employees", "BankingRelationships"],
                businessDescription: "Software development for data compression",
                businessIndustry: "FinTechOrPaymentProcessing",
                isRegulated: false,
                accountPurpose: "TechnologyStartupOperations",
                transactionVolume: "Between10KAnd50K",
                sourceOfFunds: "SalesOfServices",
                yearOfIncorporation: "2014"
            }
        }

        const createRes = await unit.applications.createThreadApplication(createReq)
        const applicationId = createRes.data.id

        // Now update the application
        const updateReq: UpdateBusinessThreadApplicationRequest = {
            applicationId,
            data: {
                type: "businessApplication",
                attributes: {
                    tags: {
                        updatedBy: "test"
                    }
                }
            }
        }

        const updateRes = await unit.applications.updateThreadApplication(updateReq)
        expect(updateRes.data.type).toBe("businessApplication")
    })

    // disabled because of 403 errors for now
    test.skip("Update Business Beneficial Owner Thread Application", async () => {
        // First create a business application with a beneficial owner
        const createReq: CreateBusinessThreadApplicationRequest = {
            type: "businessApplication",
            attributes: {
                name: "Pied Piper",
                stateOfIncorporation: "CA",
                entityType: "LLC",
                ein: "123456789",
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
                    ssn: "721074426",
                    dateOfBirth: "1990-01-01",
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
                    email: "richard@piedpiper.com",
                    title: "CEO"
                },
                beneficialOwners: [
                    {
                        fullName: {
                            first: "Erlich",
                            last: "Bachman"
                        },
                        ssn: "987654321",
                        dateOfBirth: "1985-05-15",
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
                        email: "erlich@piedpiper.com",
                        percentage: 50
                    }
                ],
                countriesOfOperation: ["US"],
                usNexus: ["Employees", "BankingRelationships"],
                businessDescription: "Software development for data compression",
                businessIndustry: "FinTechOrPaymentProcessing",
                isRegulated: false,
                accountPurpose: "TechnologyStartupOperations",
                transactionVolume: "Between10KAnd50K",
                sourceOfFunds: "SalesOfServices",
                yearOfIncorporation: "2014"
            }
        }

        const createRes = await unit.applications.createThreadApplication(createReq)
        const applicationId = createRes.data.id
        
        // Get the beneficial owner ID from the relationships
        const beneficialOwnerData = (createRes.data as BusinessThreadApplication).relationships?.beneficialOwners?.data
        const beneficialOwnerId = Array.isArray(beneficialOwnerData) ? beneficialOwnerData[0]?.id : undefined
        
        expect(beneficialOwnerId).toBeDefined()

        // Now update the beneficial owner
        const updateReq: UpdateBusinessBeneficialOwnerThreadApplicationRequest = {
            beneficialOwnerId: beneficialOwnerId ?? "", // should never be null due to the expect above
            data: {
                type: "beneficialOwner",
                attributes: {
                    email: "erlich.new@piedpiper.com"
                },
                relationships: {
                    application: {
                        data: {
                            type: "businessApplication",
                            id: applicationId
                        }
                    }
                }
            }
        }

        const updateRes = await unit.applications.updateThreadApplicationBeneficialOwner(updateReq)
        expect(updateRes.data.type).toBe("beneficialOwner")
    })
})
