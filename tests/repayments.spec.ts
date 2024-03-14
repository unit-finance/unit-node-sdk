import { CreateAchRepaymentRequest, CreateBookRepaymentRequest, CreateCapitalPartnerAchRepaymentRequest, CreateCapitalPartnerBookRepayment, Unit } from "../unit" //CreateLinkedPaymentRequest

import dotenv from "dotenv"
import { createCounterparty, createCreditAccount, createIndividualAccount } from "./testHelpers"

dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")
const paymentsId: string[] = []

describe("Repayments List", () => {
    test("Get Repayments List", async () => {
        const res = await unit.repayments.list()
        res.data.forEach(element => {
            expect(element.type).toContain("Repayment")
            paymentsId.push(element.id)
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

describe("Create BookRepayment", async () => {
    test("create bookrepayment", async () => {
        const createCreditAccountRes = await createCreditAccount(unit)
        const createDepositAccountRes = await createIndividualAccount(unit)
        const createAnotherDepositAccountRes = await createIndividualAccount(unit)

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
                        "id": createDepositAccountRes.data.id
                    }
                },
                "counterpartyAccount": {
                    "data": {
                        "type": "depositAccount",
                        "id": createAnotherDepositAccountRes.data.id
                    }
                },
                "creditAccount": {
                    "data": {
                        "type": "creditAccount",
                        "id": createCreditAccountRes.data.id
                    }
                
                }
            }
        }

        const res = await unit.repayments.create(req)
        expect(res.data.type === "bookRepayment").toBeTruthy()
    })
})

describe("Create CapitalPartnerBookRepayment", async () => {
    const createCreditAccountRes = await createCreditAccount(unit)
    const createDepositAccountRes = await createIndividualAccount(unit)

    test("create capitalpartnerbookrepayment", async () => {

        const req: CreateCapitalPartnerBookRepayment = {
            "type": "capitalPartnerBookRepayment",
            "attributes": {
                "amount": 200,
                "description": "Capital partner book repayment"
            },
            "relationships": {
                "counterpartyAccount": {
                    "data": {
                        "type": "depositAccount",
                        "id": createDepositAccountRes.data.id
                    }
                },
                "creditAccount": {
                    "data": {
                        "type": "creditAccount",
                        "id": createCreditAccountRes.data.id
                    }
                
                }
            }
        }

        const res = await unit.repayments.create(req)
        expect(res.data.type === "capitalPartnerBookRepayment").toBeTruthy()
    })
})

describe("Create ACHRepayment", async () => {
    test("create achrepayment", async () => {
        const createCreditAccountRes = await createCreditAccount(unit)
        const createDepositAccountRes = await createIndividualAccount(unit)
        const counterpartyId = await createCounterparty(unit)
        

        const req: CreateAchRepaymentRequest = {
            "type": "achRepayment",
            "attributes": {
                "amount": 200,
                "description": "Ach repayment"
            },
            "relationships": {
                "account": {
                    "data": {
                        "type": "depositAccount",
                        "id": createDepositAccountRes.data.id
                    }
                },
                "counterparty": {
                    "data": {
                        "type": "depositAccount",
                        "id": counterpartyId
                    }
                },
                "creditAccount": {
                    "data": {
                        "type": "creditAccount",
                        "id": createCreditAccountRes.data.id
                    }
                
                }
            }
        }

        const res = await unit.repayments.create(req)
        expect(res.data.type === "achRepayment").toBeTruthy()
    })
})

describe("Create CapitalPartnerACHRepayment", async () => {
    test("create capitalpartnerachrepayment", async () => {
        const createCreditAccountRes = await createCreditAccount(unit)
        const counterpartyId = await createCounterparty(unit)
        
        const req: CreateCapitalPartnerAchRepaymentRequest = {
            "type": "capitalPartnerAchRepayment",
            "attributes": {
                "amount": 200,
                "description": "Ach repayment"
            },
            "relationships": {
                "counterparty": {
                    "data": {
                        "type": "depositAccount",
                        "id": counterpartyId
                    }
                },
                "creditAccount": {
                    "data": {
                        "type": "creditAccount",
                        "id": createCreditAccountRes.data.id
                    }
                
                }
            }
        }

        const res = await unit.repayments.create(req)
        expect(res.data.type === "achRepayment").toBeTruthy()
    })
})