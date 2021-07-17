import { Unit } from "@unit-finance/unit-node-sdk"
import * as common from "@unit-finance/unit-node-sdk/dist/types/common"
import { ApplicationDocument, CreateIndividualApplicationRequest, Application } from "@unit-finance/unit-node-sdk/dist/types/application"

const UNIT_TOKEN = "YOUR TOKEN"
const UNIT_API_URL = "YOUR URL"

const unit = new Unit(UNIT_TOKEN, UNIT_API_URL)

async function getList() {
    const res = await unit.applications.list().catch((err: common.UnitError) => {
        //handle error
        return err
    })

    if (!unit.isError(res))
        console.log(res)
}

async function getListDocuments(id: string) {
    const res = await unit.applications.listDocuments(id).catch((err: common.UnitError) => {
        //handle error
        return err
    })

    if (!unit.isError(res)) {
        const documents = res as common.UnitResponse<ApplicationDocument[]>
        console.log(documents); //Array}
    }
}


async function createIndividualApplication() {
    const createndividualApplication: CreateIndividualApplicationRequest = {
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

    const res = await unit.applications.create(createndividualApplication).catch((err: common.UnitError) => {
        //handle error
        return err
    })

    if (!unit.isError(res)) {
        const application = res as common.UnitResponse<Application>
        console.log(application.data)
    }
}

async function getById(id: string) {
    const res = await unit.applications.get(id).catch((err: common.UnitError) => {
        //handle error
        return err
    })

    if (!unit.isError(res))
        console.log(res)
}

async function uploadFile() {
    const fs = require('fs')

    fs.readFile('./file.jpg', async function (err: any, data: Buffer) {
        if (err) {
            return console.log(err)
        }

        const res = await unit.applications.upload({
            applicationId: '12345',
            documentId: '1234',
            file: data,
            fileType: 'jpeg'
        }).catch((err: common.UnitError) => {
            //handle error
            return err
        })

        if (!unit.isError(res))
            console.log(res)
    });
}