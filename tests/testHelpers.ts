import { createFullName, createAddress, createPhone, createOfficer, createBusinessContact, createBeneficialOwner } from "../helpers"
import { CreateBusinessApplicationRequest, CreateDepositAccountRequest, CreateIndividualApplicationRequest, CreateTrustApplicationRequest, Unit } from "../unit"

export function createIndividualApplication(unit: Unit) {
    const createIndividualApplication: CreateIndividualApplicationRequest = {
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
                createBeneficialOwner(null,createFullName("James","Smith"),"574567625",null,null,"2012-04-05",
                createAddress("650 Allerton Street",null,"Redwood City","CA","94063","US"),createPhone("1","2025550127"),"james@unit-finance.com",null),        
                createBeneficialOwner(null,createFullName("Richard","Hendricks"),"574572795",null,null,"2012-04-03",
                createAddress("470 Allerton Street",null,"Redwood City","CA","94063","US"),createPhone("1","2025550158"),"richard@unit-finance.com",null)
            ]
        }
    }

    return unit.applications.create(businessApplication)
}

export function createTrustApplication(unit: Unit) {
    const createTrustApplication: CreateTrustApplicationRequest = {
        "type": "trustApplication",
        "attributes": {
          "name": "Trust me Inc.",
          "stateOfIncorporation": "CA",
          "revocability": "Revocable",
          "sourceOfFunds": "Salary",
          "taxId": "123456789",
          "trustees": [
            {
              "fullName": createFullName("Richard", "Hendricks"),
              "dateOfBirth": "2000-01-01",
              "ssn": "000000002",
              "email": "richard@piedpiper.com",
              "phone": createPhone("1", "2025550108"),
              "address": createAddress("5230 Newell Rd", null, "Palo Alto", "CA", "94303", "US")
            }
          ],
          "contact": {
            "fullName": createFullName("Jared", "Dunn"),
            "email": "jared@piedpiper.com",
            "phone": createPhone("1", "2025550108"),
            "address": createAddress("5230 Newell Rd", null, "Palo Alto", "CA", "94303", "US")
          },
          "grantor": {
            "fullName": createFullName("Jared", "Dunn"),
            "dateOfBirth": "2000-01-01",
            "ssn": "000000003",
            "email": "laurie@raviga.com",
            "phone": createPhone("1", "2025550108"),
            "address": createAddress("5230 Newell Rd", null, "Palo Alto", "CA", "94303", "US")
          },
          "tags": {
            "test": "test1"
          },
          "beneficiaries": [
            {
              "fullName": createFullName("Dinesh", "Chugtai"),
              "dateOfBirth": "2000-01-01"
            },
            {
              "fullName": createFullName("Gilfoyle", "Unknown"),
              "dateOfBirth": "2000-01-01"
            }
          ]
        }
    }

    return unit.applications.create(createTrustApplication)
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