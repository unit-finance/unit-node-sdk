import { Unit } from "@unit-finance/unit-node-sdk"

const UNIT_TOKEN = "YOUR TOKEN"
const UNIT_API_URL = "YOUR URL"

const unit = new Unit(UNIT_TOKEN, UNIT_API_URL)

async function getList() {
    const res = await unit.applications.list().catch(err => err)
    console.log(res)
}

async function getListDocuments() {
    const res = await unit.applications.listDocuments('12345').catch(err => err)
    console.log(res); //Array
}


async function createIndividualApplication() {
    const createndividualApplication = {
        type: "individualApplication",
        attributes: {
            ssn: "000000002",
            fullName: {
                first: "Richard",
                last: "Hendricks"
            },
            dateOfBirth: "2001-08-10",
            address: {
                street: "20 Ingram St",
                city: "Forest Hills",
                state: "CA",
                postalCode: "11375",
                country: "US"
            },
            email: "april@baxter.com",
            phone: {
                countryCode: "1",
                number: "5555555555"
            }
        }
    }

    const res = await unit.applications.create(createndividualApplication).catch(err => err)
    console.log(application.data)
}

async function getById(id) {
    const res = await unit.applications.get(id).catch(err => err)
    console.log(res)
}

async function uploadFile() {
    const fs = require('fs')

    fs.readFile('./file.jpg', async function (err, data) {
        if (err) {
            return console.log(err)
        }

        const res = await unit.applications.upload({
            applicationId: '12345',
            documentId: '1234',
            file: data,
            fileType: 'jpeg'
        }).catch(err => err)

        console.log(res)
    });
}