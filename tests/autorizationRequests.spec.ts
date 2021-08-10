import { Unit } from "../unit"

require("dotenv").config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")
let authorizationRequestsId: string[] = []

describe('AutorizationRequests List', () => {
    test('Get AutorizationRequests List', async () => {
        const res = await unit.authorizationRequests.list()
        res.data.forEach(element => {
            expect(element.type === "purchaseAuthorizationRequest").toBeTruthy()
            authorizationRequestsId.push(element.id)
        });
    })
})

describe('Get AutorizationRequest Test', () => {
    test('get autorizationRequest event', async () => {
        authorizationRequestsId.forEach(async id => {
            const res = await unit.authorizationRequests.get(id)
            expect(res.data.type === "purchaseAuthorizationRequest").toBeTruthy()
        });
    })
})