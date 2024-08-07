import { createFullName, createAddress, createPhone, createOfficer, createBusinessContact, createBeneficialOwner } from "../helpers"
import { CreateBusinessApplicationRequest, CreateBusinessCreditCardRequest, CreateCardPurchaseSimulation, CreateCounterpartyRequest, CreateCreditAccountRequest, CreateDepositAccountRequest, CreateIndividualApplicationRequest, Unit, VerifyDocumentRequest } from "../unit"

export function createIndividualApplication(unit: Unit) {
    const createIndividualApplication: CreateIndividualApplicationRequest = {
        type: "individualApplication",
        attributes: {
            ssn: "123456789",
            fullName: createFullName("Richard", "Hendricks"),
            dateOfBirth: "2001-08-10",
            address: createAddress("20 Ingram St", null, "Forest Hills", "CA", "11375", "US"),
            email: "april@baxter.com",
            phone: createPhone("1", "5555555555"),
            ip: "127.0.0.2",
            occupation: "ArchitectOrEngineer",
            annualIncome: "Between50kAnd100k",
            sourceOfIncome: "EmploymentOrPayrollIncome"
        }
    }

    return unit.applications.create(createIndividualApplication)
}

export function createIndividualApplicationWithRequiredDocument(unit: Unit) {
    const createIndividualApplication: CreateIndividualApplicationRequest = {
        type: "individualApplication",
        attributes: {
            ssn: "000000002",
            fullName: createFullName("Richard", "Hendricks"),
            dateOfBirth: "2001-08-10",
            address: createAddress("20 Ingram St", null, "Forest Hills", "CA", "11375", "US"),
            email: "april@baxter.com",
            phone: createPhone("1", "5555555555"),
            occupation: "Doctor",
            annualIncome: "Between50kAnd100k",
            sourceOfIncome: "EmploymentOrPayrollIncome"
        }
    }

    return unit.applications.create(createIndividualApplication)
}

export function createIndividualApplicationWithSelfieVerification(unit: Unit) {
    const createIndividualApplication: CreateIndividualApplicationRequest = {
        type: "individualApplication",
        attributes: {
            ssn: "000000003",
            fullName: createFullName("Richard", "Hendricks"),
            dateOfBirth: "2001-08-10",
            address: createAddress("20 Ingram St", null, "Forest Hills", "CA", "11375", "US"),
            email: "april@baxter.com",
            phone: createPhone("1", "5555555555"),
            evaluationParams: {
                "useSelfieVerification": "ReplaceIdentification"
            },
            occupation: "Doctor",
            annualIncome: "Between50kAnd100k",
            sourceOfIncome: "EmploymentOrPayrollIncome"
        }
    }

    return unit.applications.create(createIndividualApplication)
}

export function createBusinessApplication(unit: Unit) {
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
                createBeneficialOwner(null, createFullName("James", "Smith"), "574567625", null, null, "2012-04-05",
                    createAddress("650 Allerton Street", null, "Redwood City", "CA", "94063", "US"), createPhone("1", "2025550127"), "james@unit-finance.com", null),
                createBeneficialOwner(null, createFullName("Richard", "Hendricks"), "574572795", null, null, "2012-04-03",
                    createAddress("470 Allerton Street", null, "Redwood City", "CA", "94063", "US"), createPhone("1", "2025550158"), "richard@unit-finance.com", null)
            ],
            businessVertical: "Construction",
            yearOfIncorporation: "1999"
        }
    }

    return unit.applications.create(businessApplication)
}

function createAccount(customerId: string, unit: Unit) {
    const createDepositAccountRequest: CreateDepositAccountRequest = {
        type: "depositAccount",
        attributes: {
            depositProduct: "checking",
            tags: {
                purpose: "checking"
            }
        },
        relationships: {
            customer: {
                data: {
                    type: "customer",
                    id: customerId
                }
            }
        }
    }

    return unit.accounts.create(createDepositAccountRequest)
}

export async function createIndividualCustomer(unit: Unit) {
    const id = (await createIndividualApplication(unit)).data.relationships.customer?.data.id
    return id ? id : ""
}

export async function createBusinessCustomer(unit: Unit) {
    const id = (await createBusinessApplication(unit)).data.relationships.customer?.data.id
    return id ? id : ""
}

export async function createIndividualAccount(unit: Unit) {
    const customerId = await createIndividualCustomer(unit)
    return createAccount(customerId ? customerId : "", unit)
}

export async function createBussinessAccount(unit: Unit) {
    const customerId = await createBusinessCustomer(unit)
    return createAccount(customerId ? customerId : "", unit)
}

export async function createCreditAccount(unit: Unit, creditTerms = "credit_terms_test") {
    const customerId = await createBusinessCustomer(unit)

    const createDepositAccountRequest: CreateCreditAccountRequest = {
        type: "creditAccount",
        attributes: {
            creditTerms,
            creditLimit: 2000,
            tags: {
                purpose: "test_credit_account"
            }
        },
        relationships: {
            customer: {
                data: {
                    type: "customer",
                    id: customerId
                }
            }
        }
    }

    return unit.accounts.create(createDepositAccountRequest)
}

export function createVerifyDocumentRequest(applicationId: string, documentId: string, jobId: string): VerifyDocumentRequest {
    return { applicationId, documentId, data: { type: "selfieVerification", attributes: { jobId } } }
}

export async function createCounterparty(unit: Unit) {
    const customerId = await createIndividualCustomer(unit)

    const req: CreateCounterpartyRequest = {
        type: "achCounterparty",
        attributes: {
            "name": "Joe Doe",
            "routingNumber": "011000133",
            "accountNumber": "123",
            "accountType": "Checking",
            "type": "Person",
        },
        relationships: {
            customer: {
                data: {
                    type: "customer",
                    id: customerId
                }
            }
        }
    }
    return (await unit.counterparties.create(req)).data.id
}

export async function createPlaidCounterparty(unit: Unit) {
    const customerId = await createIndividualCustomer(unit)
    if(!process.env.TEST_COUNTERPARTY_PLAID_TOKEN) throw new Error("TEST_COUNTERPARTY_PLAID_TOKEN is not specifed in the environment")

    const req: CreateCounterpartyRequest = {
        type: "achCounterparty",
        attributes: {
            name: "Joe Doe",
            type: "Person",
            permissions: "CreditAndDebit",
            plaidProcessorToken: process.env.TEST_COUNTERPARTY_PLAID_TOKEN
        },
        relationships: {
            customer: {
                data: {
                    type: "customer",
                    id: customerId
                }
            }
        }
    }
    return (await unit.counterparties.create(req)).data.id
}

export async function initRepaymentRelatedRelationships(unit: Unit) {
    let partnerCreditAccountId = ""
    let nonPartnerCreditAccountId = ""
    let depositAccountId = ""
    let anotherDepositAccountId = ""
    let plaidCounterpartyId = ""

    const simulateCardPurchase = async (creditAccountId: string) => {
        const createCardReq: CreateBusinessCreditCardRequest = {
            type: "businessCreditCard",
            attributes: {
                shippingAddress: {
                    street: "5230 Newell Rd",
                    city: "Palo Alto",
                    state: "CA",
                    postalCode: "94303",
                    country: "US",
                },
                fullName: {
                    first: "Richard",
                    last: "Hendricks",
                },
                address: {
                    street: "5230 Newell Rd",
                    city: "Palo Alto",
                    state: "CA",
                    postalCode: "94303",
                    country: "US",
                },
                dateOfBirth: "2001-08-10",
                email: "richard@piedpiper.com",
                phone: {
                    countryCode: "1",
                    number: "5555555555",
                },
            },
            relationships: {
                account: {
                    data: {
                        type: "creditAccount",
                        id: creditAccountId,
                    },
                },
            },
        }
        
    
        const createCreditCardResponse = await unit.cards.create(createCardReq)
        await unit.simulations.activateCard(createCreditCardResponse.data.id)
    
        const purchaseReq: CreateCardPurchaseSimulation = {
            type: "purchaseTransaction",
            attributes: {
                amount: 2000,
                direction: "Credit",
                merchantName: "Apple Inc.",
                merchantType: 1000,
                merchantLocation: "Cupertino, CA",
                last4Digits: createCreditCardResponse.data.attributes.last4Digits,
                internationalServiceFee: 50,
            },
            relationships: {
                account: {
                    data: {
                        type: "creditAccount",
                        id: creditAccountId,
                    },
                },
            },
        }
        
        await unit.simulations.createCardPurchase(purchaseReq)
    }

    partnerCreditAccountId = (await createCreditAccount(unit)).data.id
    nonPartnerCreditAccountId = (await createCreditAccount(unit, "credit_terms_choice")).data.id
    depositAccountId = (await createIndividualAccount(unit)).data.id
    anotherDepositAccountId = (await createIndividualAccount(unit)).data.id
    plaidCounterpartyId = (await createPlaidCounterparty(unit))

    await simulateCardPurchase(partnerCreditAccountId)
    await simulateCardPurchase(nonPartnerCreditAccountId)

    return { partnerCreditAccountId, nonPartnerCreditAccountId, depositAccountId, anotherDepositAccountId, plaidCounterpartyId }
}