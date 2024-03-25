import { CreateAchRepaymentRequest, CreateBookRepaymentRequest, CreateBusinessCreditCardRequest, CreateCapitalPartnerAchRepaymentRequest, CreateCapitalPartnerBookRepayment, CreateCardPurchaseSimulation, Unit } from "../unit"

import dotenv from "dotenv"
import { createCreditAccount, createIndividualAccount, createPlaidCounterparty } from "./testHelpers"

dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")
const repaymentsId: string[] = []
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

describe("Init repayments related resources", () => {
    test("init resources", async () => {
        const creditAccountRes = await createCreditAccount(unit)
        const depositAccountRes = (await createIndividualAccount(unit))
        partnerCreditAccountId = creditAccountRes.data.id
        nonPartnerCreditAccountId = (await createCreditAccount(unit, "credit_terms_choice")).data.id
        depositAccountId = depositAccountRes.data.id
        anotherDepositAccountId = (await createIndividualAccount(unit)).data.id
        plaidCounterpartyId = (await createPlaidCounterparty(unit))

        await simulateCardPurchase(partnerCreditAccountId)
        await simulateCardPurchase(nonPartnerCreditAccountId)

    }, 180000)
})

describe("Create BookRepayment", () => {
    test("create bookrepayment", async () => {
        const req: CreateBookRepaymentRequest = {
            "type": "bookRepayment",
            "attributes": {
                "amount": 200,
                "description": "Book repayment"
            },
            "relationships": {
                "account": {
                    "data": {
                        "type": "depositAccount",
                        "id": depositAccountId
                    }
                },
                "counterpartyAccount": {
                    "data": {
                        "type": "depositAccount",
                        "id": anotherDepositAccountId
                    }
                },
                "creditAccount": {
                    "data": {
                        "type": "creditAccount",
                        "id": nonPartnerCreditAccountId
                    }
                
                }
            }
        }

        const res = await unit.repayments.create(req)
        expect(res.data.type === "bookRepayment").toBeTruthy()
    })
})

describe("Create CapitalPartnerBookRepayment", () => {
    test("create capitalpartnerbookrepayment", async () => {

        const req: CreateCapitalPartnerBookRepayment = {
            "type": "capitalPartnerBookRepayment",
            "attributes": {
                "amount": 200,
                "description": "Book rep"
            },
            "relationships": {
                "counterpartyAccount": {
                    "data": {
                        "type": "depositAccount",
                        "id": depositAccountId
                    }
                },
                "creditAccount": {
                    "data": {
                        "type": "creditAccount",
                        "id": partnerCreditAccountId
                    }
                
                }
            }
        }

        const res = await unit.repayments.create(req)
        expect(res.data.type === "capitalPartnerBookRepayment").toBeTruthy()
    })
})

describe("Create ACHRepayment", () => {
    test("create achrepayment", async () => {
        const req: CreateAchRepaymentRequest = {
            "type": "achRepayment",
            "attributes": {
                "amount": 200,
                "description": "Ach rep"
            },
            "relationships": {
                "account": {
                    "data": {
                        "type": "depositAccount",
                        "id":depositAccountId
                    }
                },
                "counterparty": {
                    "data": {
                        "type": "depositAccount",
                        "id": plaidCounterpartyId
                    }
                },
                "creditAccount": {
                    "data": {
                        "type": "creditAccount",
                        "id": nonPartnerCreditAccountId
                }
            }
        }
    }

        const res = await unit.repayments.create(req)
        expect(res.data.type === "achRepayment").toBeTruthy()
    })
})

describe("Create CapitalPartnerACHRepayment", () => {
    test("create capitalpartnerachrepayment", async () => {
        const req: CreateCapitalPartnerAchRepaymentRequest = {
            "type": "capitalPartnerAchRepayment",
            "attributes": {
                "amount": 200,
                "description": "Ach rep"
            },
            "relationships": {
                "counterparty": {
                    "data": {
                        "type": "depositAccount",
                        "id": plaidCounterpartyId
                    }
                },
                "creditAccount": {
                    "data": {
                        "type": "creditAccount",
                        "id": partnerCreditAccountId
                    }
                
                }
            }
        }

        const res = await unit.repayments.create(req)
        expect(res.data.type === "capitalPartnerAchRepayment").toBeTruthy()
    })
})

describe("Repayments List", () => {
    test("get repayments List", async () => {
        const res = await unit.repayments.list()
        res.data.forEach(element => {
            expect(element.type).toContain("Repayment")
            repaymentsId.push(element.id)
        })
    })
})

describe("Get Repayment Test", () => {
    test("get each repayment", async () => {
        const repayments = (await unit.repayments.list()).data
        repayments.forEach(async rp => {
            const res = await unit.repayments.get(rp.id)
            expect(res.data.type).toContain("Repayment")
        })
    })
})