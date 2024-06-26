import { Unit } from "../unit"
import dotenv from "dotenv"
import {createIndividualAccount} from "./testHelpers"
dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")
const statementId: string[] = []

describe("Statements List", () => {
    test("Get Statements List", async () => {
        const res = await unit.statements.list()
        expect(res.data.length).toBeGreaterThan(0)
        res.data.forEach(element => {
            if(element.relationships.customer){
                statementId.push(element.id)
            }
        })
    }, 60000)
})

describe("Get Statement Test", () => {
    test("get one statement", async () => {
        const res = await unit.statements.get(statementId[0])
        expect(res.includes("html")).toBeTruthy()
    })
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