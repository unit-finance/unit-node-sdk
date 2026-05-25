import { StatementsListParams, Unit } from "../unit"
import dotenv from "dotenv"
import { createIndividualAccount } from "./testHelpers"
dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")

describe("Statements", () => {
    test("Get Statements List and get one statement", async () => {
        const params: StatementsListParams = { limit: 10, sort: "-period" }
        const listRes = await unit.statements.list(params)
        expect(listRes.data.length).toBeGreaterThan(0)

        const statementWithCustomer = listRes.data.find(element => element.relationships.customer)
        const statementId = (statementWithCustomer ?? listRes.data[0]).id

        const html = await unit.statements.get(statementId)
        expect(html.includes("html")).toBeTruthy()
    }, 180000)
})

describe("Get Bank Verification Test", () => {
    test("get bank verification", async () => {
        const account = await createIndividualAccount(unit)
        const res = await unit.statements.getBankVerification(account.data.id)
        expect(res.includes("PDF")).toBeTruthy()

        // Example for saving the pdf on the server,
        // fs.writeFileSync(__dirname + "/bankVerification.pdf", res, "binary")

        // note that the default responseEncoding is "binary" and responseType is "blob" and may be changed according
        // to different setups
    })
})
