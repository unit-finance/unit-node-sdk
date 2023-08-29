import { Unit } from "../unit"
import { createCounterparty, createIndividualAccount } from "./testHelpers"

import dotenv from "dotenv"
import { CreateRecurringCreditAchPaymentRequest, CreateRecurringCreditBookPaymentRequest, CreateRecurringDebitAchPaymentRequest, RecurringCreditAchPayment, RecurringCreditBookPayment } from "../types/recurringPayment"
dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")

describe("Create", () => {
    test("create CreateRecurringCreditAchPayment", async () => {
        const createDepositAccountRes = await createIndividualAccount(unit)
        const counterpartyId = await createCounterparty(unit)

        const req: CreateRecurringCreditAchPaymentRequest = {
            "type": "recurringCreditAchPayment",
            "attributes": {
                "schedule": {
                    "interval": "Monthly",
                    "dayOfMonth": 16
                },
                "amount": 1000,
                "description": "Rent"
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
                        "type": "counterparty",
                        "id": counterpartyId
                    }
                }
            }
        }

        const res = await unit.recurringPayments.create(req)
        expect(res.data.type === "recurringCreditAchPayment").toBeTruthy()
    })
})

describe("Request recurringCreditAchPayment", () => {
    test("create CreateRecurringCreditAchPayment", async () => {
        const req: CreateRecurringCreditAchPaymentRequest = {
            "type": "recurringCreditAchPayment",
            "attributes": {
                "schedule": {
                    "interval": "Monthly",
                    "dayOfMonth": 16
                },
                "amount": 1000,
                "description": "Rent-Apt15"
            },
            "relationships": {
                "account": {
                    "data": {
                        "type": "depositAccount",
                        "id": "10002"
                    }
                },
                "counterparty": {
                    "data": {
                        "type": "counterparty",
                        "id": "1"
                    }
                }
            }
        }

        expect(req.type).toBe("recurringCreditAchPayment")
    })

    test("List RecurringPayments", async () => {
        const res = await unit.recurringPayments.list()
        res.data.forEach(async p => {
            expect(["recurringCreditAchPayment", "recurringCreditBookPayment", "recurringDebitAchPayment"].includes(p.type)).toBeTruthy()
            const payment = await unit.recurringPayments.get(p.id)
            expect(p.attributes.amount).toBe(payment.data.attributes.amount)
            expect(p.attributes.schedule.dayOfMonth).toBe(payment.data.attributes.schedule.dayOfMonth)
            expect(p.id).toBe(payment.data.id)
        })
    })
})

describe("Request recurringCreditBookPaymentRequest", () => {
    test("create CreateRecurringCreditBookPaymentRequest", async () => {
        const req: CreateRecurringCreditBookPaymentRequest = {
            "type": "recurringCreditBookPayment",
            "attributes": {
                "amount": 40,
                "description": "Subscription - Basic Plan",
                "tags": {
                    "test": "test"
                },
                "schedule": {
                    "interval": "Monthly",
                    "dayOfMonth": 5
                }
            },
            "relationships": {
                "account": {
                    "data": {
                        "type": "depositAccount",
                        "id": "10002"
                    }
                },
                "counterpartyAccount": {
                    "data": {
                        "type": "depositAccount",
                        "id": "10000"
                    }
                }
            }
        }

        expect(req.type).toBe("recurringCreditBookPayment")
    })
})

describe("Request RecurringCreditBookPayment", () => {
    test("Test RecurringCreditBookPayment", async () => {
        const req: RecurringCreditBookPayment = {
            "type": "recurringCreditBookPayment",
            "id": "4",
            "attributes": {
                "createdAt": "2022-06-25T14:27:41.093Z",
                "updatedAt": "2022-06-25T14:27:41.093Z",
                "amount": 40,
                "description": "Subscription - Basic Plan",
                "schedule": {
                    "startTime": "2022-06-25",
                    "interval": "Monthly",
                    "nextScheduledAction": "2022-07-05",
                    "dayOfMonth": 5
                },
                "status": "Active",
                "tags": {
                    "test": "test"
                },
                "numberOfPayments": 0
            },
            "relationships": {
                "org": {
                    "data": {
                        "type": "org",
                        "id": "1"
                    }
                },
                "account": {
                    "data": {
                        "type": "account",
                        "id": "10002"
                    }
                },
                "counterpartyAccount": {
                    "data": {
                        "type": "account",
                        "id": "10000"
                    }
                },
                "customer": {
                    "data": {
                        "type": "customer",
                        "id": "10004"
                    }
                }
            }
        }
        expect(req.type).toBe("recurringCreditBookPayment")
    })
})

describe("Request recurringCreditAchPayment", () => {
    test("Test recurringCreditAchPayment", async () => {
        const req: RecurringCreditAchPayment = {
            "type": "recurringCreditAchPayment",
            "id": "1",
            "attributes": {
                "createdAt": "2022-06-25T08:50:49.391Z",
                "updatedAt": "2022-06-25T08:50:49.391Z",
                "amount": 1000,
                "description": "Rent - Apartment 15",
                "schedule": {
                    "startTime": "2022-06-25",
                    "interval": "Monthly",
                    "nextScheduledAction": "2022-07-18",
                    "dayOfMonth": 16
                },
                "status": "Active",
                "numberOfPayments": 0
            },
            "relationships": {
                "counterparty": {
                    "data": {
                        "type": "counterparty",
                        "id": "1"
                    }
                },
                "account": {
                    "data": {
                        "type": "account",
                        "id": "10002"
                    }
                },
                "customer": {
                    "data": {
                        "type": "customer",
                        "id": "10004"
                    }
                },
                "org": {
                    "data": {
                        "type": "org",
                        "id": "1"
                    }
                }
            }
        }

        expect(req.type).toBe("recurringCreditAchPayment")
    })
})

describe("Create RecurringDebitAchPayment Test", () => {
    test("Create CreateRecurringDebitAchPayment", async () => {
        const accountId = (await createIndividualAccount(unit)).data.id
        const counterpartyId = await createCounterparty(unit)

        const req: CreateRecurringDebitAchPaymentRequest = {
            "type": "recurringDebitAchPayment",
            "attributes": {
                "schedule": {
                    "interval": "Monthly",
                    "dayOfMonth": 16,
                    "totalNumberOfPayments": 12
                },
                "amount": 1000,
                "description": "Rent-Apt15"
            },
            "relationships": {
                "account": {
                    "data": {
                        "type": "depositAccount",
                        "id": accountId
                    }
                },
                "counterparty": {
                    "data": {
                        "type": "counterparty",
                        "id": counterpartyId
                    }
                }
            }
        }

        const res = await unit.recurringPayments.create(req)
        expect(res.data.type).toBe("recurringDebitAchPayment")
    })
})
