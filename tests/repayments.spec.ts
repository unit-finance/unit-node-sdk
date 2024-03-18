import { CreateAchRepaymentRequest, CreateBookRepaymentRequest, CreateCapitalPartnerAchRepaymentRequest, CreateCapitalPartnerBookRepayment, Unit } from "../unit"

import dotenv from "dotenv"
import { createCounterparty, createCreditAccount, createIndividualAccount } from "./testHelpers"

dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")
const repaymentsId: string[] = []
let creditAccountId = ""
let depositAccountId = ""
let anotherDepositAccountId = ""
let counterpartyId = ""

describe("Create BookRepayment", () => {
    beforeAll(async () => {
        const creditAccountRes = await createCreditAccount(unit)
        const depositAccountRes = (await createIndividualAccount(unit))
        creditAccountId = creditAccountRes.data.id
        depositAccountId = depositAccountRes.data.id
        anotherDepositAccountId = (await createIndividualAccount(unit)).data.id
        counterpartyId = (await createCounterparty(unit))

        // TODO: we need to spend some money on the account to be able to create a repayments for it 
    })

    test("create bookrepayment", async () => {
        const req: CreateBookRepaymentRequest = {
            "type": "bookRepayment",
            "attributes": {
                "amount": 200,
                "description": "Book rep"
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
                        "id": creditAccountId
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
                        "id": creditAccountId
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
                        "id": counterpartyId
                    }
                },
                "creditAccount": {
                    "data": {
                        "type": "creditAccount",
                        "id": creditAccountId
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
                        "id": counterpartyId
                    }
                },
                "creditAccount": {
                    "data": {
                        "type": "creditAccount",
                        "id": creditAccountId
                    }
                
                }
            }
        }

        const res = await unit.repayments.create(req)
        expect(res.data.type === "achRepayment").toBeTruthy()
    })
})

describe("Repayments List", () => {
    test("Get Repayments List", async () => {
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