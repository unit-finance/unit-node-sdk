# unit-node-sdk

This library provides a typescript wrapper to [Unit's API](https://docs.unit.co/#introduction).

## Documentation
See https://docs.unit.co/

## Installation

```bash
npm install @unit-finance/unit-node-sdk
```

## Usage

#### Create an individual application (es6)
```js
import { Unit } from '@unit-finance/unit-node-sdk'

const unit = new Unit(UNIT_TOKEN, UNIT_API_URL)

let createApplicationRequest = {
    type: "individualApplication",
    attributes: {
        "ssn": "000000002",
        "fullName": unit.helpers.createFullName("Richard", "Hendricks"),
        "dateOfBirth": "2001-08-10",
        "address": unit.helpers.createAddress("20 Ingram St", null, "Forest Hills", "CA", "11375", "US"),
        "email": "april@baxter.com",
        "phone": unit.helpers.createPhone("1", "2025550158"),
        "ip": "127.0.0.1",
        "ein": "123456789",
        "dba": "Pied Piper Inc",
        "soleProprietorship": true
    }
}

let application = await unit.applications.create(createApplicationRequest).catch(err => {
    // handle errors
    return err
})

console.log(application)

```


#### Create an individual application (typescript)
```js
import { CreateIndividualApplicationRequest, Unit, UnitError } from "@unit-finance/unit-node-sdk";

const unit = new Unit(UNIT_TOKEN, UNIT_API_URL)

(async () => {
    let createApplicationRequest: CreateIndividualApplicationRequest = {
        type: "individualApplication",
        attributes: {
    		"ssn": "000000002",
        	"fullName": unit.helpers.createFullName("Richard", "Hendricks"),
            "dateOfBirth": "2001-08-10",
            "address": unit.helpers.createAddress("20 Ingram St", null, "Forest Hills", "CA", "11375", "US"),
            "email": "april@baxter.com",
            "phone": unit.helpers.createPhone("1", "2025550158"),
            "ip": "127.0.0.1",
            "ein": "123456789",
            "dba": "Pied Piper Inc",
            "soleProprietorship": true
        }
    }

    let application = await unit.applications.create(createApplicationRequest).catch<UnitError>(err => {
        // handle errors
        return err
    })

    console.log(application)
})();
```


#### Fetching a customer
```js
import { Unit, UnitError } from "@unit-finance/unit-node-sdk";

const unit = new Unit(UNIT_TOKEN, UNIT_API_URL)

(async () => {
    let customer = await unit.customers.get(customerId).catch<UnitError>(err => {
        // handle errors
        return err
    })

    console.log(customer)
})();
```
