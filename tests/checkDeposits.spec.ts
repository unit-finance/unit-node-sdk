import { CreateCheckDepositRequest, Unit, UploadCheckDepositRequest } from "../unit"
import axios from "axios"
import dotenv from "dotenv"
import { createIndividualAccount } from "./testHelpers"
dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")

async function createCheckDepositReqeust(amount = 20000): Promise<CreateCheckDepositRequest> {
    const accountId = (await createIndividualAccount(unit)).data.id
    return {
        "type": "checkDeposit",
        "attributes": {
            "amount": amount,
            "description": "Check deposit"
        },
        "relationships": {
            "account": {
                "data": {
                    "type": "depositAccount",
                    "id": accountId
                }
            }
        }
    }
}

describe("CheckDeposit Create Test", () => {
    test("Create CheckDeposit", async () => {
        const req = await createCheckDepositReqeust()
        const res = await unit.checkDeposits.create(req)
        expect(res.data.type).toBe("checkDeposit")
        expect(res.data.attributes.amount).toBe(20000)
    })
})

describe("Upload Check", () => {
    test("Create CheckDeposit and upload image", async () => {
        const createReq = await createCheckDepositReqeust(15000)
        const checkDeposit = await unit.checkDeposits.create(createReq)
        expect(checkDeposit.data.type).toBe("checkDeposit")
        expect(checkDeposit.data.attributes.amount).toBe(15000)

        const checkDepositId = checkDeposit.data.id

        const response = await axios.get("https://image.shutterstock.com/image-illustration/blank-check-design-open-spacing-260nw-76703974.jpg", { responseType: "arraybuffer" })
        const buffer = Buffer.from(response.data, "utf-8")
        const uploadReq: UploadCheckDepositRequest = {
            checkDepositId: checkDepositId,
            file: buffer
        }

        const uploadRes = await unit.checkDeposits.upload(uploadReq)
        expect(uploadRes.data.type).toBe("checkDeposit")

        const image = await unit.checkDeposits.getImage(checkDepositId)
        // const fileContents = Buffer.from(image, 'base64')

        // const fs = require('fs');
        
        // fs.writeFile("./a.jpeg", fileContents, (err: any) => {
        //     if (err) return console.error(err)
        // })

    })
})
