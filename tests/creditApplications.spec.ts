import dotenv from "dotenv"
import { CreateExistingCustomerCreditApplicationRequest, Unit } from "../unit"
import { createBusinessApplication } from "./testHelpers"
import { createRelationship } from "../helpers"

dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")

describe("Get Credit Applications", () => {
    test("Test Get endpoint", async () => {
        const res = await unit.creditApplications.list()
        expect(res.data).toBeInstanceOf(Array)
        res.data.forEach(async element => {
            expect(element.type).toContain("CreditApplication")
            const app = await (await unit.creditApplications.get(element.id)).data
            expect(element.type).toBe(app.type)
            expect(element.id).toBe(app.id)
        })
    })

    test("Get List of Credit Applications", async () => {
        const res = await unit.creditApplications.list()
        expect(res.data).toBeInstanceOf(Array)
    })
})

describe("Create Credit Application", () => {
    test("Test Create Credit Application", async () => {
        const businessApplication = (await createBusinessApplication(unit)).data
        const customerId = businessApplication.relationships.customer?.data.id || ""

        const request: CreateExistingCustomerCreditApplicationRequest = {
            type: "createExistingCustomerCreditApplication",
            attributes: {},
            relationships: {
                customer: createRelationship("customer", customerId),
                lendingProgram: createRelationship("lendingProgram", "51")
            }
        }

        const creditApplication = (await unit.creditApplications.create(request)).data
        expect(creditApplication.type).toBe("existingCustomerCreditApplication")
    })
})