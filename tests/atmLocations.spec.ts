import { Unit } from "../unit"

import dotenv from "dotenv"
dotenv.config()
const unit = new Unit(process.env.UNIT_TOKEN || "test", process.env.UNIT_API_URL || "test")

describe("Get ATM Locations", () => {
    test("Get ATM Locations by coordinates",async () => {
        const res = await unit.atmLocations.list({coordinates: {longitude: -73.93041, latitude: 42.79894}})

        res.data.forEach(element => {
            expect(element.type).toBe("atmLocation")
        })
    })

    test("Get ATM Locations by address",async () => {
        const res = await unit.atmLocations.list({address: {"street":"1240 EASTERN AVE", "city":"SCHENECTADY", "state":"NY", "postalCode":"", "country":"US"}})
        
        res.data.forEach(element => {
            expect(element.type).toBe("atmLocation")
        })
    })
})